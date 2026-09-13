import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  ADMIN_EMAIL,
  isUserAdmin,
  subscribeToVisitorStats,
  subscribeToMilestoneLogs,
  VisitorStatsDoc,
  MilestoneLogItem,
  recordMilestoneLog,
  googleSignIn,
  simulateAdminSignIn,
  logout,
  getAccessToken,
  db
} from '../services/firebase';
import { sendMilestoneNotificationEmail } from '../services/gmail';
import { router } from '../services/router';
import {
  X,
  Shield,
  Send,
  RefreshCw,
  Mail,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Lock,
  LogOut,
  TrendingUp,
  Award,
  Sparkles,
  ArrowLeft,
  Sliders
} from 'lucide-react';
import { motion } from 'motion/react';
import { doc, updateDoc, increment } from 'firebase/firestore';

interface AdminMilestoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onAuthSuccess: (user: User) => void;
}

export const AdminMilestoneModal: React.FC<AdminMilestoneModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthSuccess
}) => {
  const [stats, setStats] = useState<VisitorStatsDoc | null>(null);
  const [milestones, setMilestones] = useState<MilestoneLogItem[]>([]);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showConfirmSendDialog, setShowConfirmSendDialog] = useState(false);

  const isAdmin = isUserAdmin(currentUser);

  // Subscribe to realtime visitor stats
  useEffect(() => {
    if (!isOpen) return;
    const unsubStats = subscribeToVisitorStats((data) => {
      setStats(data);
    });
    return () => unsubStats();
  }, [isOpen]);

  // Subscribe to milestone logs if admin
  useEffect(() => {
    if (!isOpen || !isAdmin) return;
    const unsubLogs = subscribeToMilestoneLogs((logs) => {
      setMilestones(logs);
    });
    return () => unsubLogs();
  }, [isOpen, isAdmin]);

  // Keyboard listener: Escape to go back / close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLogin = async () => {
    setIsSigningIn(true);
    setActionFeedback(null);
    try {
      const res = await googleSignIn();
      if (res?.user) {
        onAuthSuccess(res.user);
        if (!isUserAdmin(res.user)) {
          setActionFeedback({
            type: 'error',
            message: `Signed in as ${res.user.email}. Only ${ADMIN_EMAIL} has administrator clearance.`,
          });
        } else {
          setActionFeedback({
            type: 'success',
            message: `Welcome, Administrator (${ADMIN_EMAIL}).`,
          });
        }
      }
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        message: err.message || 'Google sign-in could not be completed.',
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSimulatedAdminLogin = async () => {
    setIsSigningIn(true);
    setActionFeedback(null);
    try {
      const res = await simulateAdminSignIn();
      onAuthSuccess(res.user);
      setActionFeedback({
        type: 'success',
        message: `Signed in as Administrator (${ADMIN_EMAIL}) in Preview Mode.`,
      });
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        message: 'Could not activate preview mode.',
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleOpenInNewTab = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  const handleLogout = async () => {
    await logout();
    setActionFeedback(null);
  };

  const executeSendMilestoneEmail = async () => {
    setShowConfirmSendDialog(false);
    setIsSendingTest(true);
    setActionFeedback(null);

    try {
      const token = await getAccessToken();
      if (!token) {
        throw new Error('No active Google OAuth access token found. Please re-authenticate.');
      }

      const totalVisits = stats?.totalVisits || 50;
      const dateStr = new Date().toLocaleString();

      const result = await sendMilestoneNotificationEmail({
        totalVisits,
        dateStr,
        recipientEmail: ADMIN_EMAIL,
        accessToken: token,
      });

      if (result.success) {
        await recordMilestoneLog(
          totalVisits,
          'sent',
          `Manual administrative milestone alert dispatched to ${ADMIN_EMAIL}`
        );
        setActionFeedback({
          type: 'success',
          message: `Milestone notification successfully sent to ${ADMIN_EMAIL} via Gmail API!`,
        });
      } else {
        await recordMilestoneLog(
          totalVisits,
          'failed',
          `Failed: ${result.error || 'Unknown error'}`
        );
        setActionFeedback({
          type: 'error',
          message: result.error || 'Failed to dispatch Gmail notification.',
        });
      }
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        message: err.message || 'An error occurred during email transmission.',
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleSimulateVisits = async (count: number) => {
    try {
      const statRef = doc(db, 'visitorStats', 'global');
      const now = new Date().toISOString();
      const current = stats?.totalVisits || 0;
      const nextTotal = current + count;

      let crossedMilestone: number | null = null;
      if (nextTotal % 50 === 0 || Math.floor(nextTotal / 50) > Math.floor(current / 50)) {
        crossedMilestone = Math.floor(nextTotal / 50) * 50;
      }

      await updateDoc(statRef, {
        totalVisits: increment(count),
        lastVisitedAt: now,
        ...(crossedMilestone ? { lastMilestone: crossedMilestone } : {}),
        updatedAt: now,
      });

      if (crossedMilestone) {
        const token = await getAccessToken();
        if (token) {
          await sendMilestoneNotificationEmail({
            totalVisits: crossedMilestone,
            dateStr: new Date().toLocaleString(),
            recipientEmail: ADMIN_EMAIL,
            accessToken: token,
          });
          await recordMilestoneLog(crossedMilestone, 'sent', `Milestone reached via simulation`);
        } else {
          await recordMilestoneLog(
            crossedMilestone,
            'pending_auth',
            `Milestone reached; waiting for administrator Gmail sync`
          );
        }
      }

      setActionFeedback({
        type: 'success',
        message: `Simulated +${count} visits. Current total is now ${nextTotal}.`,
      });
    } catch (err: any) {
      setActionFeedback({
        type: 'error',
        message: 'Could not simulate visits: ' + err.message,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#121212] border border-[#F5F5F0]/15 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F5F5F0]/10 mb-6">
          <div className="flex items-center space-x-3">
            <button
              id="admin-modal-back-btn"
              onClick={onClose}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#2e2e2e] border border-[#F5F5F0]/15 text-[#F5F5F0] hover:text-[#C5A059] transition-all text-xs font-mono group"
              title="Return to Archive (Esc)"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 text-[#C5A059]" />
              <span className="font-medium">Back</span>
            </button>
            <div className="hidden sm:flex p-2 bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#C5A059] rounded-lg">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] block font-bold">
                Telemetry & Administrative Console
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
                Visitor Analytics & Milestone Logs
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#F5F5F0]/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Banner */}
        {actionFeedback && (
          <div
            className={`p-3.5 mb-6 text-xs flex items-center space-x-2.5 border ${
              actionFeedback.type === 'success'
                ? 'bg-[#142618] border-[#38a169]/40 text-[#a3e635]'
                : 'bg-[#2a1313] border-[#e53e3e]/40 text-[#fca5a5]'
            }`}
          >
            {actionFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{actionFeedback.message}</span>
          </div>
        )}

        {/* Non-Admin / Auth Gate */}
        {!isAdmin ? (
          <div className="py-12 px-6 bg-[#161616] border border-[#F5F5F0]/10 text-center space-y-6">
            <div className="w-12 h-12 rounded-full bg-[#1E1E1E] border border-[#F5F5F0]/20 flex items-center justify-center mx-auto text-[#C5A059]">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h4 className="font-serif text-2xl text-[#F5F5F0] mb-2">
                Restricted Administrator Gateway
              </h4>
              <p className="text-xs text-[#F5F5F0]/70 max-w-md mx-auto leading-relaxed">
                This console is exclusively reserved for the designated curator account:
                <br />
                <strong className="text-[#C5A059] font-mono">{ADMIN_EMAIL}</strong>
              </p>
            </div>

            {currentUser && !isAdmin && (
              <div className="p-3 bg-[#201515] border border-[#e53e3e]/30 text-xs text-[#fca5a5] max-w-md mx-auto">
                Currently signed in as <strong>{currentUser.email}</strong>. This account does not possess administrator permissions.
              </div>
            )}

            {/* Official Google Sign In Button & Alternatives */}
            <div className="flex flex-col items-center justify-center space-y-3 pt-2">
              <button
                onClick={handleLogin}
                disabled={isSigningIn}
                className="flex items-center justify-center space-x-3 px-6 py-3 bg-[#F5F5F0] hover:bg-white text-[#121212] font-semibold text-xs uppercase tracking-wider transition-all shadow-md disabled:opacity-50 cursor-pointer w-full sm:w-auto min-w-[260px]"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                <span>{isSigningIn ? 'Authenticating with Google...' : 'Sign in with Google as Admin'}</span>
              </button>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-[11px] text-[#F5F5F0]/60">
                <button
                  type="button"
                  onClick={handleOpenInNewTab}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-[#F5F5F0]/80 hover:text-[#C5A059] border border-[#F5F5F0]/10 transition-colors cursor-pointer"
                  title="Opens full tab if iframe blocks authentication popups"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open in New Window</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulatedAdminLogin}
                  disabled={isSigningIn}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#1f1f1f] hover:bg-[#2a2a2a] text-[#F5F5F0]/80 hover:text-[#C5A059] border border-[#F5F5F0]/10 transition-colors cursor-pointer"
                  title="Enable curator console in sandbox / preview mode"
                >
                  <Shield className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Preview / Sandbox Admin Access</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="space-y-8">
            {/* Admin Header Strip */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#161616] border border-[#C5A059]/30 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#38a169] animate-pulse" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A059] block font-bold">
                    Authenticated Curator Account
                  </span>
                  <span className="font-mono text-xs text-[#F5F5F0]">{currentUser?.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    router.navigate({ view: 'admin-ads' });
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#C5A059]/20 hover:bg-[#C5A059]/30 text-[#C5A059] border border-[#C5A059]/50 text-[11px] uppercase tracking-wider font-mono font-semibold transition-colors"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Adsterra Ads Control</span>
                </button>

                <button
                  onClick={() => setShowConfirmSendDialog(true)}
                  disabled={isSendingTest}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#C5A059] text-[#121212] text-[11px] uppercase tracking-wider font-semibold hover:bg-[#d6ba94] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{isSendingTest ? 'Sending...' : 'Test Milestone Email'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1E1E1E] text-[#F5F5F0]/70 hover:text-white border border-[#F5F5F0]/10 text-[11px] uppercase tracking-wider transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Metrics Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Total Visits */}
              <div className="p-5 bg-[#161616] border border-[#F5F5F0]/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#C5A059] mb-3">
                  <span className="text-[10px] uppercase tracking-wider">Live Firestore Counter</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="font-serif text-4xl sm:text-5xl text-[#F5F5F0]">
                  {stats?.totalVisits ?? 1}
                </div>
                <span className="text-[10px] opacity-40 block mt-2">
                  Increments on each site load
                </span>
              </div>

              {/* Next Milestone */}
              <div className="p-5 bg-[#161616] border border-[#F5F5F0]/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#C5A059] mb-3">
                  <span className="text-[10px] uppercase tracking-wider">Next Gmail Trigger</span>
                  <Award className="w-4 h-4" />
                </div>
                <div className="font-serif text-4xl sm:text-5xl text-[#F5F5F0]">
                  {Math.ceil(((stats?.totalVisits ?? 1) + 1) / 50) * 50}
                </div>
                <span className="text-[10px] opacity-40 block mt-2">
                  Dispatches alert every 50 visits
                </span>
              </div>

              {/* Last Recorded Milestone */}
              <div className="p-5 bg-[#161616] border border-[#F5F5F0]/10 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#C5A059] mb-3">
                  <span className="text-[10px] uppercase tracking-wider">Last Milestone Cross</span>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="font-serif text-4xl sm:text-5xl text-[#C5A059]">
                  {stats?.lastMilestone || 0}
                </div>
                <span className="text-[10px] opacity-40 block mt-2">
                  {stats?.lastVisitedAt
                    ? new Date(stats.lastVisitedAt).toLocaleTimeString()
                    : 'Awaiting data'}
                </span>
              </div>
            </div>

            {/* Simulation Controls Strip */}
            <div className="p-4 bg-[#141414] border border-[#F5F5F0]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[10px] uppercase tracking-wider opacity-60">
                Visitor Simulation Engine (Test Thresholds):
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSimulateVisits(1)}
                  className="px-2.5 py-1 bg-[#1E1E1E] border border-[#F5F5F0]/15 hover:border-[#C5A059] text-[10px] uppercase tracking-wider"
                >
                  +1 Visit
                </button>
                <button
                  onClick={() => handleSimulateVisits(10)}
                  className="px-2.5 py-1 bg-[#1E1E1E] border border-[#F5F5F0]/15 hover:border-[#C5A059] text-[10px] uppercase tracking-wider"
                >
                  +10 Visits
                </button>
                <button
                  onClick={() => handleSimulateVisits(50)}
                  className="px-3 py-1 bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#C5A059]/30"
                >
                  +50 (Trigger Milestone)
                </button>
              </div>
            </div>

            {/* Past 50-Visit Milestone Logs Table */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#F5F5F0]/10">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-bold">
                  Chronological Milestone Audit Log ({milestones.length} Recorded)
                </span>
                <span className="text-[10px] font-mono opacity-40">
                  Target: {ADMIN_EMAIL}
                </span>
              </div>

              {milestones.length === 0 ? (
                <div className="py-12 text-center bg-[#161616] border border-[#F5F5F0]/10 p-6">
                  <Award className="w-8 h-8 text-[#C5A059] mx-auto mb-2 opacity-40" />
                  <p className="font-serif text-lg text-[#F5F5F0] mb-1">
                    No milestone logs recorded yet
                  </p>
                  <p className="text-xs text-[#F5F5F0]/50 max-w-sm mx-auto">
                    Milestones will automatically register here every time the global visit count crosses a multiple of 50.
                  </p>
                </div>
              ) : (
                <div className="border border-[#F5F5F0]/10 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#181818] text-[9px] uppercase tracking-widest text-[#F5F5F0]/50 border-b border-[#F5F5F0]/10">
                      <tr>
                        <th className="py-3 px-4">Milestone</th>
                        <th className="py-3 px-4">Timestamp</th>
                        <th className="py-3 px-4">Recipient</th>
                        <th className="py-3 px-4">Email Delivery</th>
                        <th className="py-3 px-4">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F5F0]/5 bg-[#141414]">
                      {milestones.map((log) => (
                        <tr key={log.id} className="hover:bg-[#1A1A1A]">
                          <td className="py-3 px-4 font-mono font-bold text-[#C5A059]">
                            {log.milestone} Visits
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] opacity-70">
                            {new Date(log.timestamp).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] opacity-70">
                            {log.recipientEmail}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold rounded-full ${
                                log.emailStatus === 'sent'
                                  ? 'bg-[#17331c] text-[#a2f0b2] border border-[#60c075]/30'
                                  : log.emailStatus === 'pending_auth'
                                  ? 'bg-[#332a17] text-[#f0d0a2] border border-[#c09d60]/30'
                                  : 'bg-[#331717] text-[#f0a2a2] border border-[#c06060]/30'
                              }`}
                            >
                              {log.emailStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-xs opacity-60 max-w-xs truncate">
                            {log.notes || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confirmation Dialog for Gmail Send */}
        {showConfirmSendDialog && (
          <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#181818] border border-[#C5A059]/40 p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center space-x-3 text-[#C5A059]">
                <Mail className="w-5 h-5" />
                <h4 className="font-serif text-xl text-[#F5F5F0]">Confirm Milestone Email</h4>
              </div>
              <p className="text-xs text-[#F5F5F0]/80 leading-relaxed font-light">
                This will send an authentic milestone notification email directly to <strong>{ADMIN_EMAIL}</strong> using your Google Workspace Gmail integration with the current visitor total of <strong>{stats?.totalVisits ?? 1} visits</strong>.
              </p>
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#F5F5F0]/10">
                <button
                  onClick={() => setShowConfirmSendDialog(false)}
                  className="px-4 py-2 bg-[#1E1E1E] text-[#F5F5F0] text-xs uppercase tracking-wider hover:bg-[#252525]"
                >
                  Cancel
                </button>
                <button
                  onClick={executeSendMilestoneEmail}
                  className="px-4 py-2 bg-[#C5A059] text-[#121212] text-xs uppercase tracking-wider font-semibold hover:bg-[#d6ba94]"
                >
                  Confirm & Dispatch Email
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
