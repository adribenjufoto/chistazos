import { useState } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { BANNER_UNIT, useAdsReady } from '../lib/ads.native';

// Banner fijo encima de la barra de pestañas. No ocupa sitio hasta que hay anuncio.
export function AdBanner() {
  const ready = useAdsReady();
  const [failed, setFailed] = useState(false);
  if (!ready || failed) return null;
  return (
    <View style={{ alignItems: 'center', marginBottom: 6 }}>
      <BannerAd
        unitId={BANNER_UNIT}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={() => setFailed(true)}
      />
    </View>
  );
}
