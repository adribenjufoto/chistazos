import {
  BricolageGrotesque_400Regular,
  BricolageGrotesque_500Medium,
  BricolageGrotesque_700Bold,
  BricolageGrotesque_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/bricolage-grotesque';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AdSlot } from './src/components/ui';
import type { CategoryId } from './src/data/categories';
import { StoreProvider, useStore } from './src/lib/store';
import { CategoriesScreen } from './src/screens/CategoriesScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { ReaderScreen } from './src/screens/ReaderScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { TodayScreen } from './src/screens/TodayScreen';
import { colors, fonts } from './src/theme';

type Tab = 'hoy' | 'categorias' | 'favoritos' | 'ajustes';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'hoy', label: 'Hoy', icon: '☀' },
  { id: 'categorias', label: 'Categorías', icon: '▦' },
  { id: 'favoritos', label: 'Favoritos', icon: '♥' },
  { id: 'ajustes', label: 'Ajustes', icon: '⚙' },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_400Regular,
    BricolageGrotesque_500Medium,
    BricolageGrotesque_700Bold,
    BricolageGrotesque_800ExtraBold,
  });

  return (
    <SafeAreaProvider>
      <StoreProvider>{fontsLoaded ? <Main /> : <View style={styles.root} />}</StoreProvider>
    </SafeAreaProvider>
  );
}

function Main() {
  const { ready } = useStore();
  const [tab, setTab] = useState<Tab>('hoy');
  const [reading, setReading] = useState<CategoryId | null>(null);

  if (!ready) return <View style={styles.root} />;

  if (reading) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar style="auto" />
        <ReaderScreen categoryId={reading} onBack={() => setReading(null)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <View style={{ flex: 1 }}>
        {tab === 'hoy' && <TodayScreen onExplore={() => setTab('categorias')} />}
        {tab === 'categorias' && <CategoriesScreen onOpen={setReading} />}
        {tab === 'favoritos' && <FavoritesScreen />}
        {tab === 'ajustes' && <SettingsScreen />}
      </View>
      <AdSlot />
      <View style={styles.tabBar}>
        {TABS.map((t) => {
          const active = t.id === tab;
          return (
            <Pressable key={t.id} onPress={() => setTab(t.id)} style={[styles.tab, active && styles.tabActive]}>
              <Text style={[styles.tabIcon, { color: active ? colors.ink : colors.white }]}>{t.icon}</Text>
              {active && <Text style={styles.tabLabel}>{t.label}</Text>}
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.cream },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.ink,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 999,
    padding: 6,
    justifyContent: 'space-between',
  },
  tab: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 999 },
  tabActive: { backgroundColor: colors.lime },
  tabIcon: { fontSize: 18 },
  tabLabel: { fontFamily: fonts.bold, fontSize: 14, color: colors.ink },
});
