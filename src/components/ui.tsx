import type { ReactNode } from 'react';
import { Pressable, Share, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { getCategory } from '../data/categories';
import type { Joke } from '../data/jokes';
import { useStore } from '../lib/store';
import { colors, fonts, radius } from '../theme';

export function PillButton({
  label,
  onPress,
  bg = colors.ink,
  fg = colors.white,
  style,
}: {
  label: string;
  onPress: () => void;
  bg?: string;
  fg?: string;
  style?: ViewStyle;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pill, { backgroundColor: bg, opacity: pressed ? 0.85 : 1 }, style]}
    >
      <Text style={[styles.pillText, { color: fg }]}>{label}</Text>
    </Pressable>
  );
}

export function Tag({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <View style={[styles.tag, { backgroundColor: bg }]}>
      <Text style={[styles.tagText, { color: fg }]}>{label}</Text>
    </View>
  );
}

export function JokeText({ text, color = colors.ink, size = 22 }: { text: string; color?: string; size?: number }) {
  return (
    <Text style={{ fontFamily: fonts.bold, fontSize: size, lineHeight: size * 1.3, color }}>{text}</Text>
  );
}

// Fila de acciones bajo cada chiste: votar, guardar y compartir.
export function JokeActions({ joke, dark = false }: { joke: Joke; dark?: boolean }) {
  const { favorites, votes, toggleFavorite, vote } = useStore();
  const fav = favorites.includes(joke.id);
  const v = votes[joke.id];
  const base = dark ? 'rgba(255,255,255,0.14)' : 'rgba(22,22,29,0.07)';
  const fg = dark ? colors.white : colors.ink;

  const share = () =>
    Share.share({ message: `${joke.text}\n\n😂 Más chistes en la app Chistazos` }).catch(() => {});

  return (
    <View style={styles.actions}>
      <Action label="👍" active={v === 'up'} onPress={() => vote(joke.id, 'up')} base={base} fg={fg} />
      <Action label="👎" active={v === 'down'} onPress={() => vote(joke.id, 'down')} base={base} fg={fg} />
      <Action label={fav ? '♥' : '♡'} active={fav} onPress={() => toggleFavorite(joke.id)} base={base} fg={fg} />
      <Pressable onPress={share} style={[styles.shareBtn, { backgroundColor: dark ? colors.white : colors.ink }]}>
        <Text style={[styles.shareText, { color: dark ? colors.ink : colors.white }]}>Compartir</Text>
      </Pressable>
    </View>
  );
}

function Action({
  label,
  active,
  onPress,
  base,
  fg,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  base: string;
  fg: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.action, { backgroundColor: active ? colors.yellow : base }]}
      accessibilityRole="button"
    >
      <Text style={[styles.actionText, { color: active ? colors.ink : fg }]}>{label}</Text>
    </Pressable>
  );
}

export function CategoryTag({ joke }: { joke: Joke }) {
  const c = getCategory(joke.category);
  return <Tag label={c.name} bg={c.color} fg={c.ink} />;
}

export function ScreenTitle({ children, color = colors.ink }: { children: ReactNode; color?: string }) {
  return <Text style={[styles.title, { color }]}>{children}</Text>;
}

// Hueco reservado para el banner de AdMob.
export function AdSlot() {
  return (
    <View style={styles.ad}>
      <Text style={styles.adText}>Espacio publicitario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { borderRadius: radius.pill, paddingVertical: 16, paddingHorizontal: 24, alignItems: 'center' },
  pillText: { fontFamily: fonts.bold, fontSize: 17 },
  tag: { alignSelf: 'flex-start', borderRadius: radius.pill, paddingVertical: 5, paddingHorizontal: 12 },
  tagText: { fontFamily: fonts.bold, fontSize: 13 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 },
  action: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  actionText: { fontSize: 20 },
  shareBtn: { flex: 1, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  shareText: { fontFamily: fonts.bold, fontSize: 16 },
  title: { fontFamily: fonts.display, fontSize: 40, lineHeight: 42, letterSpacing: -1 },
  ad: {
    height: 56,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adText: { fontFamily: fonts.medium, color: colors.inkSoft, fontSize: 12 },
});
