import { colors } from '../theme';

export type CategoryId =
  | 'cortos'
  | 'largos'
  | 'humor-negro'
  | 'verdes'
  | 'jaimito'
  | 'parejas'
  | 'trabajo'
  | 'absurdos'
  | 'de-padre';

export type MascotShape = 'blob' | 'squircle' | 'pill' | 'circle';
export type MascotMood = 'happy' | 'sly' | 'shock' | 'grin';

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  color: string;
  ink: string;
  shape: MascotShape;
  mood: MascotMood;
  adult?: boolean;
};

export const CATEGORIES: Category[] = [
  { id: 'cortos', name: 'Cortos', tagline: 'Rápidos y certeros', color: colors.lime, ink: colors.ink, shape: 'squircle', mood: 'happy' },
  { id: 'largos', name: 'Largos', tagline: 'Para contar en la cena', color: colors.purple, ink: colors.white, shape: 'pill', mood: 'sly' },
  { id: 'humor-negro', name: 'Humor negro', tagline: 'Duros. Avisado quedas', color: colors.ink, ink: colors.white, shape: 'circle', mood: 'sly', adult: true },
  { id: 'verdes', name: 'Verdes', tagline: 'Solo para adultos', color: colors.pink, ink: colors.ink, shape: 'blob', mood: 'grin', adult: true },
  { id: 'jaimito', name: 'Jaimito', tagline: 'El terror de la clase', color: colors.yellow, ink: colors.ink, shape: 'squircle', mood: 'grin' },
  { id: 'parejas', name: 'Parejas', tagline: 'Amor, celos y suegras', color: colors.orange, ink: colors.white, shape: 'blob', mood: 'shock' },
  { id: 'trabajo', name: 'Trabajo', tagline: 'Lunes, jefes y reuniones', color: colors.blue, ink: colors.white, shape: 'pill', mood: 'shock' },
  { id: 'absurdos', name: 'Absurdos', tagline: 'Sin pies ni cabeza', color: colors.green, ink: colors.white, shape: 'circle', mood: 'happy' },
  { id: 'de-padre', name: 'De padre', tagline: 'Tan malos que son buenos', color: colors.lavender, ink: colors.ink, shape: 'squircle', mood: 'sly' },
];

export function getCategory(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id)!;
}
