import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Mascot } from '../components/Mascot';
import { CategoryTag, JokeActions, JokeText, PillButton } from '../components/ui';
import { getCategory } from '../data/categories';
import { jokeOfTheDay } from '../lib/daily';
import { useStore } from '../lib/store';
import { colors, fonts, radius } from '../theme';

const DATE_FMT = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function TodayScreen({ onExplore }: { onExplore: () => void }) {
  const { adultOk } = useStore();
  const joke = jokeOfTheDay(adultOk);
  const cat = getCategory(joke.category);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.date}>{capitalize(DATE_FMT.format(new Date()))}</Text>
      <Text style={styles.title}>
        Tu chiste{'\n'}
        <Text style={{ color: colors.orange }}>de hoy</Text>
      </Text>

      <View style={styles.cardWrap}>
        <Mascot color={cat.color} shape={cat.shape} mood={cat.mood} size={110} style={styles.peek} />
        <View style={[styles.card, { backgroundColor: colors.white }]}>
          <CategoryTag joke={joke} />
          <View style={{ height: 14 }} />
          <JokeText text={joke.text} size={24} />
          <JokeActions joke={joke} />
        </View>
      </View>

      <PillButton label="Quiero más chistes" onPress={onExplore} bg={colors.lime} fg={colors.ink} />
      <Text style={styles.hint}>Mañana, otro. Activa el aviso diario en Ajustes.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40 },
  date: { fontFamily: fonts.medium, fontSize: 15, color: colors.inkSoft },
  title: { fontFamily: fonts.display, fontSize: 48, lineHeight: 50, letterSpacing: -1.5, color: colors.ink, marginTop: 4 },
  cardWrap: { marginTop: 70, marginBottom: 20 },
  peek: { position: 'absolute', top: -62, right: 24 },
  card: {
    borderRadius: radius.card,
    padding: 24,
    borderWidth: 2,
    borderColor: colors.ink,
  },
  hint: { textAlign: 'center', marginTop: 14, fontFamily: fonts.medium, color: colors.inkSoft },
});
