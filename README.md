# Chistazos

App de chistes en español con chiste del día, categorías (cortos, largos, humor negro, verdes, Jaimito, parejas, trabajo, absurdos, de padre), favoritos y aviso diario. Hecha con Expo (React Native) para Android e iOS.

## Probarla en tu móvil

1. Instala Node.js (versión 20 o superior).
2. En esta carpeta: `npm install` y después `npx expo start`.
3. Las notificaciones y la publicidad necesitan una *development build* (`npx eas-cli@latest build --profile development`, perfiles en `eas.json`); el resto se puede ver en el navegador con `npx expo start --web`.

## Dónde está cada cosa

- `content/<categoría>.txt`: los chistes (más de 500), uno por bloque separados por una línea en blanco. Añade los nuevos **al final** para no cambiar los ids de los favoritos y después ejecuta `npm run jokes`, que regenera `src/data/jokes.generated.ts`.
- `src/data/categories.ts`: categorías, colores y personajes.
- `src/lib/daily.ts`: elección del chiste del día (igual para todos los usuarios).
- `src/config/ads.ts`: IDs de bloques de anuncios de AdMob y URL de la política de privacidad. Los App ID van en `app.json`. Mientras estén vacíos se usan los anuncios de prueba de Google.
- `src/lib/ads.native.ts` y `src/components/AdBanner.native.tsx`: consentimiento UE (UMP), permiso de seguimiento en iOS (ATT), banner e intersticial cada 8 chistes. En web no hay anuncios.
- `docs/privacidad.md`: política de privacidad, con los datos del responsable por rellenar.
- `src/theme.ts`: paleta y tipografía (Bricolage Grotesque).

## Pendiente

- Rellenar y publicar `docs/privacidad.md` en una URL pública y ponerla en `PRIVACY_URL`.
- Configurar el mensaje de consentimiento RGPD en AdMob (Privacidad y mensajes) para que aparezca el formulario.
- Icono y pantalla de carga propios.
