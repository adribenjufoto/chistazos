import type { CategoryId } from './categories';
import { RAW } from './jokes.generated';

export type Joke = {
  id: string;
  category: CategoryId;
  text: string;
};

export const JOKES: Joke[] = (Object.keys(RAW) as CategoryId[]).flatMap((category) =>
  (RAW[category] as readonly string[]).map((text, i) => ({ id: `${category}-${i + 1}`, category, text })),
);

export function jokesFor(category: CategoryId): Joke[] {
  return JOKES.filter((j) => j.category === category);
}

export function getJoke(id: string): Joke | undefined {
  return JOKES.find((j) => j.id === id);
}
