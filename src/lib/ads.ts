// Versión web y de respaldo: sin anuncios. La versión real está en ads.native.ts.
import { useSyncExternalStore } from 'react';

export async function initAds(): Promise<void> {}

export function onJokeViewed(): void {}

export function useAdsReady(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => false,
  );
}

export function usePrivacyOptionsRequired(): boolean {
  return false;
}

export async function openPrivacyOptions(): Promise<void> {}
