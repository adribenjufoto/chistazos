import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Mascot } from '../components/Mascot';
import { CategoryTag, JokeActions, JokeText, ScreenTitle } from '../components/ui';
import { getJoke } from '../data/jokes';
import { useStore } from '../lib/store';
import { colors, fonts, radius } from '../theme';

export function FavoritesScreen() {
  const { favorites } = useStore();
  const jokes = favorites.map(getJoke).filter((j) => j !== undefined);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenTitle>Tus favoritos</ScreenTitle>
      {jokes.length === 0 ? (
        <View style={styles.empty}>
          <Mascot color={colors.pink} shape="blob" mood="shock" size={120} />
          <Text style={styles.emptyTitle}>Aún no has guardado nada</Text>
          <Text style={styles.emptyText}>Toca ♡ en un chiste para tenerlo aquí y contarlo cuando quieras.</Text>
        </View>
      ) : (
        jokes.map((joke) => (
          <View key={joke.id} style={styles.card}>
            <CategoryTag joke={joke} />
            <View style={{ height: 10 }} />
            <JokeText text={joke.text} size={18} />
            <JokeActions joke={joke} />
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40, gap: 14 },
  card: { backgroundColor: colors.white, borderRadius: radius.card, padding: 20, borderWidth: 2, borderColor: colors.ink },
  empty: { alignItems: 'center', marginTop: 50, gap: 10 },
  emptyTitle: { fontFamily: fonts.display, fontSize: 22, color: colors.ink, marginTop: 12 },
  emptyText: { fontFamily: fonts.medium, fontSize: 15, color: colors.inkSoft, textAlign: 'center', maxWidth: 260 },
});
