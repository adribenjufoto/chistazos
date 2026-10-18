# Chistazos

App de chistes en español con chiste del día, categorías (cortos, largos, humor negro, verdes, Jaimito, parejas, trabajo, absurdos, de padre), favoritos y aviso diario. Hecha con Expo (React Native) para Android e iOS.

## Probarla en tu móvil

1. Instala Node.js (versión 20 o superior).
2. En esta carpeta: `npm install` y después `npx expo start`.
3. Las notificaciones y la publicidad necesitan una *development build* (`npx eas-cli@latest build --profile development`); el resto se puede ver en el navegador con `npx expo start --web`.

## Dónde está cada cosa

- `src/data/jokes.ts`: los chistes. Añade los nuevos **al final** de cada categoría para no cambiar los ids de los favoritos.
- `src/data/categories.ts`: categorías, colores y personajes.
- `src/lib/daily.ts`: elección del chiste del día (igual para todos los usuarios).
- `src/lib/ads.ts` y `AdSlot` en `src/components/ui.tsx`: huecos preparados para AdMob.
- `src/theme.ts`: paleta y tipografía (Bricolage Grotesque).

## Pendiente

- Integrar AdMob (banner + intersticial cada 8 chistes) con consentimiento UE (UMP) y ATT en iOS.
- Política de privacidad publicada y enlazada desde Ajustes.
- Icono y pantalla de carga propios.
