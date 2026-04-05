import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  title: string;
  subtitle?: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

export function PowerToYouButton({
  title,
  subtitle,
  icon,
  onPress,
  variant = 'primary',
}: Props) {
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.wrap,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}>
      <View style={styles.row}>
        <View style={[styles.iconCircle, isPrimary && styles.iconCirclePrimary]}>
          <FontAwesome name={icon} size={22} color={isPrimary ? '#fff' : '#0d9488'} />
        </View>
        <View style={styles.textCol}>
          <Text style={[styles.title, !isPrimary && styles.titleSecondary]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.sub, !isPrimary && styles.subSecondary]}>{subtitle}</Text>
          ) : null}
        </View>
        <FontAwesome
          name="chevron-right"
          size={14}
          color={isPrimary ? 'rgba(255,255,255,0.8)' : '#64748b'}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  primary: {
    backgroundColor: '#0d9488',
    shadowColor: '#0d9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  secondary: {
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: '#99f6e4',
  },
  pressed: { opacity: 0.92, transform: [{ scale: 0.99 }] },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccfbf1',
  },
  iconCirclePrimary: { backgroundColor: 'rgba(255,255,255,0.2)' },
  textCol: { flex: 1 },
  title: { fontSize: 17, fontWeight: '700', color: '#fff' },
  titleSecondary: { color: '#0f766e' },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  subSecondary: { color: '#64748b' },
});
