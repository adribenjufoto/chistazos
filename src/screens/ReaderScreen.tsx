import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Mascot } from '../components/Mascot';
import { JokeActions, JokeText, PillButton } from '../components/ui';
import { getCategory, type CategoryId } from '../data/categories';
import { jokesFor } from '../data/jokes';
import { onJokeViewed } from '../lib/ads';
import { colors, fonts, radius } from '../theme';

function shuffled<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Lector de una categoría: un chiste a pantalla completa y botón "Otro".
export function ReaderScreen({ categoryId, onBack }: { categoryId: CategoryId; onBack: () => void }) {
  const cat = getCategory(categoryId);
  const order = useMemo(() => shuffled(jokesFor(categoryId)), [categoryId]);
  const [index, setIndex] = useState(0);
  const joke = order[index % order.length];
  const dark = cat.ink === colors.white;

  const next = () => {
    setIndex((i) => i + 1);
    onJokeViewed();
  };

  return (
    <View style={[styles.screen, { backgroundColor: cat.color }]}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={12} style={[styles.back, { borderColor: cat.ink }]}>
          <Text style={[styles.backText, { color: cat.ink }]}>←</Text>
        </Pressable>
        <Text style={[styles.counter, { color: cat.ink }]}>
          {(index % order.length) + 1} / {order.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: cat.ink }]}>{cat.name}</Text>
        <Mascot
          color={dark ? colors.white : colors.ink}
          shape={cat.shape}
          mood={cat.mood}
          size={90}
          style={{ alignSelf: 'flex-end', marginTop: -20, marginRight: 8 }}
        />
        <View style={[styles.card, { backgroundColor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.55)' }]}>
          <JokeText key={joke.id} text={joke.text} color={cat.ink} size={24} />
          <JokeActions joke={joke} dark={dark} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PillButton
          label="Otro chiste →"
          onPress={next}
          bg={dark ? colors.yellow : colors.ink}
          fg={dark ? colors.ink : colors.white}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8 },
  back: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 22, fontFamily: fonts.bold },
  counter: { fontFamily: fonts.bold, fontSize: 15 },
  content: { padding: 20, paddingBottom: 30 },
  title: { fontFamily: fonts.display, fontSize: 52, lineHeight: 54, letterSpacing: -1.5, textTransform: 'uppercase' },
  card: { borderRadius: radius.card, padding: 24, marginTop: -4 },
  footer: { paddingHorizontal: 20, paddingBottom: 12 },
});
