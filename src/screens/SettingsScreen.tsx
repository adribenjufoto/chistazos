import { Alert, Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { ScreenTitle } from '../components/ui';
import { PRIVACY_URL } from '../config/ads';
import { openPrivacyOptions, usePrivacyOptionsRequired } from '../lib/ads';
import { cancelDailyJoke, scheduleDailyJoke } from '../lib/notifications';
import { useStore } from '../lib/store';
import { colors, fonts, radius } from '../theme';

const pad = (n: number) => String(n).padStart(2, '0');

export function SettingsScreen() {
  const { notifications, setNotifications, adultOk, setAdultOk } = useStore();
  const privacyOptions = usePrivacyOptionsRequired();

  const apply = async (enabled: boolean, hour: number) => {
    if (!enabled) {
      setNotifications({ ...notifications, enabled: false, hour });
      await cancelDailyJoke();
      return;
    }
    const ok = await scheduleDailyJoke(hour, notifications.minute);
    if (!ok) {
      Alert.alert('Sin permiso', 'Activa las notificaciones de la app en los ajustes del móvil para recibir el chiste diario.');
    }
    setNotifications({ ...notifications, enabled: ok, hour });
  };

  const shiftHour = (delta: number) => apply(notifications.enabled, (notifications.hour + delta + 24) % 24);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenTitle>Ajustes</ScreenTitle>

      <View style={styles.section}>
        <Row label="Aviso del chiste diario" sub="Una notificación al día, nada más.">
          <Switch
            value={notifications.enabled}
            onValueChange={(v) => apply(v, notifications.hour)}
            trackColor={{ true: colors.orange, false: colors.line }}
            thumbColor={colors.white}
          />
        </Row>
        <View style={styles.divider} />
        <Row label="Hora del aviso">
          <View style={styles.stepper}>
            <Step label="−" onPress={() => shiftHour(-1)} />
            <Text style={styles.time}>
              {pad(notifications.hour)}:{pad(notifications.minute)}
            </Text>
            <Step label="+" onPress={() => shiftHour(1)} />
          </View>
        </Row>
      </View>

      <View style={styles.section}>
        <Row label="Contenido +18" sub="Humor negro y chistes verdes.">
          <Switch value={adultOk} onValueChange={setAdultOk} trackColor={{ true: colors.orange, false: colors.line }} thumbColor={colors.white} />
        </Row>
      </View>

      <View style={styles.section}>
        <Pressable onPress={() => PRIVACY_URL && Linking.openURL(PRIVACY_URL)} disabled={!PRIVACY_URL}>
          <Row label="Política de privacidad" sub={PRIVACY_URL ? 'Qué datos usamos y para qué.' : 'Disponible próximamente.'}>
            {PRIVACY_URL && <Text style={styles.chevron}>›</Text>}
          </Row>
        </Pressable>
        {privacyOptions && (
          <>
            <View style={styles.divider} />
            <Pressable onPress={openPrivacyOptions}>
              <Row label="Gestionar consentimiento" sub="Cambia tus preferencias de anuncios.">
                <Text style={styles.chevron}>›</Text>
              </Row>
            </Pressable>
          </>
        )}
        <View style={styles.divider} />
        <Row label="Versión" sub="1.0.0" />
      </View>
    </ScrollView>
  );
}

function Row({ label, sub, children }: { label: string; sub?: string; children?: React.ReactNode }) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {sub && <Text style={styles.sub}>{sub}</Text>}
      </View>
      {children}
    </View>
  );
}

function Step({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.step} hitSlop={6}>
      <Text style={styles.stepText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 40, gap: 16 },
  section: { backgroundColor: colors.white, borderRadius: radius.card, paddingHorizontal: 20, paddingVertical: 6 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12 },
  divider: { height: 1, backgroundColor: colors.line },
  label: { fontFamily: fonts.bold, fontSize: 17, color: colors.ink },
  sub: { fontFamily: fonts.medium, fontSize: 13, color: colors.inkSoft, marginTop: 2 },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  step: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.cream, alignItems: 'center', justifyContent: 'center' },
  stepText: { fontFamily: fonts.bold, fontSize: 20, color: colors.ink },
  chevron: { fontFamily: fonts.bold, fontSize: 24, color: colors.inkSoft },
  time: { fontFamily: fonts.display, fontSize: 20, color: colors.ink, minWidth: 60, textAlign: 'center' },
});
