import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Mascot } from '../components/Mascot';
import { ScreenTitle, Tag } from '../components/ui';
import { CATEGORIES, type Category, type CategoryId } from '../data/categories';
import { jokesFor } from '../data/jokes';
import { useStore } from '../lib/store';
import { colors, fonts, radius } from '../theme';

export function CategoriesScreen({ onOpen }: { onOpen: (id: CategoryId) => void }) {
  const { adultOk, setAdultOk } = useStore();

  const open = (c: Category) => {
    if (!c.adult || adultOk) return onOpen(c.id);
    Alert.alert(
      'Contenido +18',
      'Esta categoría tiene humor duro y chistes para adultos. ¿Eres mayor de 18 años?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, soy mayor de edad',
          onPress: () => {
            setAdultOk(true);
            onOpen(c.id);
          },
        },
      ],
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenTitle>
        ¿De qué te{'\n'}quieres reír?
      </ScreenTitle>
      <View style={styles.grid}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => open(c)}
            style={({ pressed }) => [styles.card, { backgroundColor: c.color, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
          >
            <View style={styles.cardTop}>
              <Mascot color={c.color === colors.ink ? '#2A2A35' : 'rgba(255,255,255,0.35)'} shape={c.shape} mood={c.mood} size={56} />
              {c.adult && <Tag label="+18" bg={colors.white} fg={colors.ink} />}
            </View>
            <Text style={[styles.name, { color: c.ink }]}>{c.name}</Text>
            <Text style={[styles.tagline, { color: c.ink }]}>{c.tagline}</Text>
            <Text style={[styles.count, { color: c.ink }]}>{jokesFor(c.id).length} chistes</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12, marginTop: 20 },
  card: { width: '48.5%', borderRadius: radius.card, padding: 16, minHeight: 190 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  name: { fontFamily: fonts.display, fontSize: 24, marginTop: 14, letterSpacing: -0.5 },
  tagline: { fontFamily: fonts.medium, fontSize: 13, opacity: 0.85, marginTop: 2 },
  count: { fontFamily: fonts.bold, fontSize: 12, marginTop: 'auto', paddingTop: 10, opacity: 0.7 },
});
