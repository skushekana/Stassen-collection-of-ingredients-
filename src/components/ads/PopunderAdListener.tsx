import React from 'react';
import { InAppInterstitialAd } from './InAppInterstitialAd';
import { AppView } from '../../types';

interface PopunderAdListenerProps {
  currentView: AppView;
}

/**
 * In-Website Non-Intrusive Popunder / Interstitial Component
 * Renders the 5-second in-website modal without redirecting or hijacking external window clicks.
 */
export const PopunderAdListener: React.FC<PopunderAdListenerProps> = ({ currentView }) => {
  return <InAppInterstitialAd currentView={currentView} />;
};
