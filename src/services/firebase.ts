import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  memoryLocalCache,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  getDocFromServer,
  increment,
  query,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App & Services with in-memory caching to avoid IndexedDB lock / closing/hidden errors
const app = initializeApp(firebaseConfig);

const customDbId = (firebaseConfig as any).firestoreDatabaseId;
export const db = initializeFirestore(
  app,
  {
    localCache: memoryLocalCache(),
  },
  customDbId
);
export const auth = getAuth(app);

// Google Auth Provider with Gmail send scope
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/gmail.send');

// In-memory access token cache
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test Connection on Initial Boot silently
async function testFirestoreConnection() {
  try {
    await getDoc(doc(db, 'visitorStats', 'global'));
  } catch (error) {
    // Silently continue if offline or initializing
  }
}
testFirestoreConnection();

export const ADMIN_EMAIL = 'skushekana@gmail.com';

export function isUserAdmin(user: User | null): boolean {
  if (!user) return false;
  return user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

export interface VisitorStatsDoc {
  totalVisits: number;
  lastVisitedAt: string;
  lastMilestone: number;
  updatedAt: string;
}

export interface MilestoneLogItem {
  id: string;
  milestone: number;
  timestamp: string;
  recipientEmail: string;
  emailStatus: 'sent' | 'pending_auth' | 'failed' | 'simulated';
  notes?: string;
  createdAt: string;
}

/**
 * Increment the global visitor counter on site load.
 * Returns the updated total visits and checks if a 50-visit milestone was crossed.
 */
export async function trackSiteVisit(): Promise<{
  totalVisits: number;
  crossedMilestone: number | null;
}> {
  const statRef = doc(db, 'visitorStats', 'global');
  const now = new Date().toISOString();

  try {
    const snap = await getDoc(statRef);

    if (!snap.exists()) {
      const initialData: VisitorStatsDoc = {
        totalVisits: 1,
        lastVisitedAt: now,
        lastMilestone: 0,
        updatedAt: now,
      };
      await setDoc(statRef, initialData);
      return { totalVisits: 1, crossedMilestone: null };
    }

    const currentData = snap.data() as VisitorStatsDoc;
    const newTotal = (currentData.totalVisits || 0) + 1;
    const lastMilestone = currentData.lastMilestone || 0;

    let crossedMilestone: number | null = null;
    if (newTotal % 50 === 0 && newTotal > lastMilestone) {
      crossedMilestone = newTotal;
    } else if (Math.floor(newTotal / 50) > Math.floor(lastMilestone / 50)) {
      crossedMilestone = Math.floor(newTotal / 50) * 50;
    }

    await updateDoc(statRef, {
      totalVisits: increment(1),
      lastVisitedAt: now,
      ...(crossedMilestone ? { lastMilestone: crossedMilestone } : {}),
      updatedAt: now,
    });

    return { totalVisits: newTotal, crossedMilestone };
  } catch (err: any) {
    // Graceful offline fallback
    const isOffline = err?.message?.includes('offline') || err?.code === 'unavailable';
    if (!isOffline) {
      console.warn('Visitor stats sync notice:', err?.message || err);
    }
    return { totalVisits: 1, crossedMilestone: null };
  }
}

/**
 * Record a 50-visit milestone in Firestore log
 */
export async function recordMilestoneLog(
  milestone: number,
  emailStatus: 'sent' | 'pending_auth' | 'failed' | 'simulated',
  notes?: string
): Promise<string> {
  const milestoneId = `milestone-${milestone}-${Date.now()}`;
  const logRef = doc(db, 'milestoneLogs', milestoneId);
  const now = new Date().toISOString();

  const payload: Omit<MilestoneLogItem, 'id'> = {
    milestone,
    timestamp: now,
    recipientEmail: ADMIN_EMAIL,
    emailStatus,
    notes: notes || `Visitor count crossed ${milestone} milestone on ${new Date().toLocaleDateString()}`,
    createdAt: now,
  };

  try {
    await setDoc(logRef, payload);
    return milestoneId;
  } catch (err: any) {
    console.warn('Milestone log recording notice:', err?.message || err);
    return milestoneId;
  }
}

/**
 * Subscribe to Visitor Stats in Realtime
 */
export function subscribeToVisitorStats(
  onUpdate: (stats: VisitorStatsDoc | null) => void,
  onError?: (err: Error) => void
) {
  const statRef = doc(db, 'visitorStats', 'global');
  return onSnapshot(
    statRef,
    (snap) => {
      if (snap.exists()) {
        onUpdate(snap.data() as VisitorStatsDoc);
      } else {
        onUpdate(null);
      }
    },
    (err) => {
      // Don't throw fatal error if offline
      if (onError) onError(err);
    }
  );
}

/**
 * Subscribe to Milestone Logs
 */
export function subscribeToMilestoneLogs(
  onUpdate: (logs: MilestoneLogItem[]) => void,
  onError?: (err: Error) => void
) {
  const q = query(collection(db, 'milestoneLogs'), orderBy('timestamp', 'desc'), limit(50));
  return onSnapshot(
    q,
    (snap) => {
      const items: MilestoneLogItem[] = [];
      snap.forEach((d) => {
        items.push({ id: d.id, ...(d.data() as Omit<MilestoneLogItem, 'id'>) });
      });
      onUpdate(items);
    },
    (err) => {
      if (onError) onError(err);
    }
  );
}

/**
 * Auth & Token Helpers
 */
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      cachedAccessToken = credential.accessToken;
    }
    return { user: result.user, accessToken: cachedAccessToken || '' };
  } catch (error: any) {
    const errorCode = error?.code || '';
    console.warn('Firebase Auth error notice:', errorCode, error?.message || error);

    let friendlyMessage = error?.message || 'Google sign-in could not be completed.';
    if (errorCode === 'auth/network-request-failed') {
      const isIframe = typeof window !== 'undefined' && window.self !== window.top;
      friendlyMessage = isIframe
        ? 'Network request failed: Authentication popups are restricted inside embedded preview iframes or when third-party cookies are blocked. Please open the website in a new window to sign in.'
        : 'Network request failed while connecting to Google Authentication. Please check your internet connection or ad/cookie blocker and try again.';
    } else if (errorCode === 'auth/popup-blocked') {
      friendlyMessage = 'The Google Sign-in popup was blocked by your browser. Please allow popups for this site or open in a new tab.';
    } else if (errorCode === 'auth/popup-closed-by-user') {
      friendlyMessage = 'Sign-in was cancelled because the popup window was closed before completion.';
    } else if (errorCode === 'auth/cancelled-popup-request') {
      friendlyMessage = 'Previous sign-in request was cancelled. Please try again.';
    }

    const enhancedError = new Error(friendlyMessage);
    (enhancedError as any).code = errorCode;
    throw enhancedError;
  } finally {
    isSigningIn = false;
  }
};

export const simulateAdminSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  const mockUser = {
    uid: 'admin-curator-preview-uid',
    email: ADMIN_EMAIL,
    displayName: 'Lead Curator (Admin)',
    emailVerified: true,
    isAnonymous: false,
    providerData: [{ providerId: 'google.com', email: ADMIN_EMAIL, displayName: 'Lead Curator (Admin)', uid: 'admin-curator-preview-uid', phoneNumber: null, photoURL: null }],
    refreshToken: 'mock-token',
    tenantId: null,
    metadata: { creationTime: new Date().toISOString(), lastSignInTime: new Date().toISOString() },
  } as unknown as User;

  cachedAccessToken = 'preview_simulated_access_token';
  return { user: mockUser, accessToken: cachedAccessToken };
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    // Ignore signout errors if in mock/offline mode
  }
  cachedAccessToken = null;
};
