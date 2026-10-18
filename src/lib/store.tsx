import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type Vote = 'up' | 'down';

type Persisted = {
  favorites: string[];
  votes: Record<string, Vote>;
  adultOk: boolean;
  notifications: { enabled: boolean; hour: number; minute: number };
};

const DEFAULTS: Persisted = {
  favorites: [],
  votes: {},
  adultOk: false,
  notifications: { enabled: false, hour: 9, minute: 0 },
};

const KEY = 'chistes:v1';

type Store = Persisted & {
  ready: boolean;
  toggleFavorite: (id: string) => void;
  vote: (id: string, vote: Vote) => void;
  setAdultOk: (ok: boolean) => void;
  setNotifications: (n: Persisted['notifications']) => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(DEFAULTS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (raw) setState({ ...DEFAULTS, ...JSON.parse(raw) });
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const update = useCallback((fn: (s: Persisted) => Persisted) => {
    setState((prev) => {
      const next = fn(prev);
      AsyncStorage.setItem(KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const store: Store = {
    ...state,
    ready,
    toggleFavorite: (id) =>
      update((s) => ({
        ...s,
        favorites: s.favorites.includes(id) ? s.favorites.filter((f) => f !== id) : [id, ...s.favorites],
      })),
    vote: (id, vote) =>
      update((s) => {
        const votes = { ...s.votes };
        if (votes[id] === vote) delete votes[id];
        else votes[id] = vote;
        return { ...s, votes };
      }),
    setAdultOk: (adultOk) => update((s) => ({ ...s, adultOk })),
    setNotifications: (notifications) => update((s) => ({ ...s, notifications })),
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): Store {
  const store = useContext(StoreContext);
  if (!store) throw new Error('useStore fuera de StoreProvider');
  return store;
}
