import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

// En web no hay AdMob: se muestra el hueco para ver cómo queda el diseño.
export function AdBanner() {
  return (
    <View style={styles.ad}>
      <Text style={styles.adText}>Espacio publicitario</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
