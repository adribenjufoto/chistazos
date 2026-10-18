// Punto único para la publicidad. Mientras no esté integrado AdMob
// (react-native-google-mobile-ads, requiere development build), estas funciones
// no hacen nada y AdSlot muestra un hueco reservado.

export const INTERSTITIAL_EVERY = 8;

let jokesSeen = 0;

// Llamar cada vez que el usuario pasa a otro chiste. Cuando toque, mostrará un
// intersticial (nunca en el chiste del día ni al abrir la app).
export function onJokeViewed(): void {
  jokesSeen += 1;
  if (jokesSeen % INTERSTITIAL_EVERY === 0) {
    // TODO(admob): mostrar intersticial cargado previamente.
  }
}
