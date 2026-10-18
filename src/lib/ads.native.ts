import * as TrackingTransparency from 'expo-tracking-transparency';
import { Platform } from 'react-native';
import mobileAds, {
  AdEventType,
  AdsConsent,
  AdsConsentPrivacyOptionsRequirementStatus,
  InterstitialAd,
  MaxAdContentRating,
  TestIds,
} from 'react-native-google-mobile-ads';
import { useSyncExternalStore } from 'react';
import { AD_UNITS, INTERSTITIAL_EVERY } from '../config/ads';

const units = Platform.OS === 'ios' ? AD_UNITS.ios : AD_UNITS.android;
export const BANNER_UNIT = (!__DEV__ && units.banner) || TestIds.ADAPTIVE_BANNER;
const INTERSTITIAL_UNIT = (!__DEV__ && units.interstitial) || TestIds.INTERSTITIAL;

// Estado compartido: si ya se pueden pedir anuncios y si hay que ofrecer
// el botón de "gestionar consentimiento" (obligatorio en la UE).
let state = { ready: false, privacyOptions: false };
const listeners = new Set<() => void>();
function setState(next: Partial<typeof state>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useAdsReady(): boolean {
  return useSyncExternalStore(subscribe, () => state.ready);
}

export function usePrivacyOptionsRequired(): boolean {
  return useSyncExternalStore(subscribe, () => state.privacyOptions);
}

let interstitial: InterstitialAd | null = null;
let interstitialLoaded = false;
let jokesSeen = 0;

function loadInterstitial() {
  interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_UNIT);
  interstitialLoaded = false;
  interstitial.addAdEventListener(AdEventType.LOADED, () => {
    interstitialLoaded = true;
  });
  interstitial.addAdEventListener(AdEventType.CLOSED, loadInterstitial);
  interstitial.addAdEventListener(AdEventType.ERROR, () => {
    interstitialLoaded = false;
  });
  interstitial.load();
}

let started = false;

// Orden obligatorio: consentimiento UE (UMP) → permiso de seguimiento en iOS (ATT)
// → inicializar el SDK. Sin consentimiento válido no se pide ningún anuncio.
export async function initAds(): Promise<void> {
  if (started) return;
  started = true;
  try {
    const consent = await AdsConsent.gatherConsent();
    setState({
      privacyOptions:
        consent.privacyOptionsRequirementStatus === AdsConsentPrivacyOptionsRequirementStatus.REQUIRED,
    });
    if (!consent.canRequestAds) return;

    if (Platform.OS === 'ios') {
      await TrackingTransparency.requestTrackingPermissionsAsync().catch(() => {});
    }

    // Contenido adulto: los anuncios pueden ser para público maduro.
    await mobileAds().setRequestConfiguration({ maxAdContentRating: MaxAdContentRating.MA });
    await mobileAds().initialize();
    setState({ ready: true });
    loadInterstitial();
  } catch {
    // Si falla el consentimiento o el SDK, la app sigue funcionando sin anuncios.
    started = false;
  }
}

// Llamar cada vez que el usuario pasa a otro chiste.
export function onJokeViewed(): void {
  jokesSeen += 1;
  if (jokesSeen % INTERSTITIAL_EVERY === 0 && interstitial && interstitialLoaded) {
    interstitialLoaded = false;
    interstitial.show().catch(loadInterstitial);
  }
}

export async function openPrivacyOptions(): Promise<void> {
  await AdsConsent.showPrivacyOptionsForm().catch(() => {});
}
