// IDs de AdMob. Mientras estén a null se usan los anuncios de prueba de Google,
// que no generan ingresos pero tampoco ponen en riesgo la cuenta.
// Cuando Adri cree la app en AdMob, pegar aquí los IDs de bloque de anuncios
// y los App ID en app.json (plugin react-native-google-mobile-ads).
export const AD_UNITS = {
  android: {
    banner: 'ca-app-pub-6660144113673128/2362886487' as string | null,
    interstitial: 'ca-app-pub-6660144113673128/1359876138' as string | null,
  },
  ios: {
    banner: null as string | null,
    interstitial: null as string | null,
  },
};

// Intersticial cada N chistes pasados con "Otro chiste". Nunca en el chiste del día.
export const INTERSTITIAL_EVERY = 8;

// URL pública de la política de privacidad (texto en docs/privacidad.md).
// Las dos tiendas la exigen. Pendiente de publicar.
export const PRIVACY_URL: string | null = null;
