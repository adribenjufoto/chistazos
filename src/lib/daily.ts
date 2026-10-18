import { getCategory } from '../data/categories';
import { JOKES, type Joke } from '../data/jokes';

// Día de calendario local, para que el chiste cambie a medianoche del usuario.
export function dayNumber(date = new Date()): number {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
}

// Todos los usuarios ven el mismo chiste cada día. Los chistes +18 solo entran
// en el sorteo si el usuario ha confirmado que es mayor de edad.
export function jokeOfTheDay(adultOk: boolean, date = new Date()): Joke {
  const pool = JOKES.filter((j) => adultOk || !getCategory(j.category).adult);
  // Multiplicador primo para que días consecutivos no caigan en la misma categoría.
  const index = (dayNumber(date) * 7919) % pool.length;
  return pool[index];
}
