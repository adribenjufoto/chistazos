import { StyleSheet, View, type ViewStyle } from 'react-native';
import type { MascotMood, MascotShape } from '../data/categories';
import { colors } from '../theme';

type Props = {
  color: string;
  shape?: MascotShape;
  mood?: MascotMood;
  size?: number;
  style?: ViewStyle;
};

// Personaje de colores planos con ojos grandes, como en las referencias visuales.
export function Mascot({ color, shape = 'blob', mood = 'happy', size = 120, style }: Props) {
  const body = bodyStyle(shape, size);
  const eye = size * 0.26;
  const pupil = eye * (mood === 'shock' ? 0.38 : 0.5);
  const lookX = mood === 'sly' ? eye * 0.18 : 0;
  const outline = color === colors.ink ? colors.white : colors.ink;

  return (
    <View style={[body, { backgroundColor: color, alignItems: 'center' }, style]}>
      <View style={[styles.eyes, { marginTop: size * 0.24, gap: size * 0.08 }]}>
        {[0, 1].map((i) => (
          <View
            key={i}
            style={{
              width: eye,
              height: eye,
              borderRadius: eye / 2,
              backgroundColor: colors.white,
              // Sobre un cuerpo blanco, los ojos necesitan contorno para verse.
              borderWidth: color === colors.white ? size * 0.025 : 0,
              borderColor: colors.ink,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: pupil,
                height: pupil,
                borderRadius: pupil / 2,
                backgroundColor: colors.ink,
                transform: [{ translateX: lookX }, { translateY: mood === 'grin' ? eye * 0.1 : 0 }],
              }}
            />
            {mood === 'sly' && (
              <View style={[styles.lid, { height: eye * 0.45, backgroundColor: color }]} />
            )}
          </View>
        ))}
      </View>
      <Mouth mood={mood} size={size} color={outline} />
    </View>
  );
}

function Mouth({ mood, size, color }: { mood: MascotMood; size: number; color: string }) {
  if (mood === 'shock') {
    const d = size * 0.12;
    return <View style={{ marginTop: size * 0.08, width: d, height: d * 1.2, borderRadius: d, backgroundColor: color }} />;
  }
  if (mood === 'sly') {
    return <View style={{ marginTop: size * 0.1, width: size * 0.18, height: size * 0.04, borderRadius: 4, backgroundColor: color, transform: [{ rotate: '-8deg' }] }} />;
  }
  const w = size * (mood === 'grin' ? 0.34 : 0.22);
  const h = w * 0.5;
  return (
    <View
      style={{
        marginTop: size * 0.07,
        width: w,
        height: h,
        backgroundColor: color,
        borderBottomLeftRadius: w,
        borderBottomRightRadius: w,
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {mood === 'grin' && (
        <View style={{ flexDirection: 'row', gap: w * 0.08 }}>
          <View style={{ width: w * 0.16, height: h * 0.32, backgroundColor: colors.white, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }} />
          <View style={{ width: w * 0.16, height: h * 0.32, backgroundColor: colors.white, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }} />
        </View>
      )}
    </View>
  );
}

function bodyStyle(shape: MascotShape, size: number): ViewStyle {
  switch (shape) {
    case 'circle':
      return { width: size, height: size, borderRadius: size / 2 };
    case 'pill':
      return { width: size * 0.8, height: size * 1.15, borderRadius: size * 0.4 };
    case 'squircle':
      return { width: size, height: size, borderRadius: size * 0.32 };
    case 'blob':
      return {
        width: size * 1.1,
        height: size,
        borderTopLeftRadius: size * 0.6,
        borderTopRightRadius: size * 0.45,
        borderBottomLeftRadius: size * 0.4,
        borderBottomRightRadius: size * 0.55,
      };
  }
}

const styles = StyleSheet.create({
  eyes: { flexDirection: 'row' },
  lid: { position: 'absolute', top: 0, left: 0, right: 0 },
});
