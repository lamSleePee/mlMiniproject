import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { WebMaxWidth } from '@/components/WebMaxWidth';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function VendorScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    // Placeholder for vendor list fetch
  }, []);

  return (
    <WebMaxWidth style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <Animated.View entering={FadeInUp.duration(420)}>
          <Text style={[styles.h1, { color: colors.text }]}>Partner vendors</Text>
          <Text style={[styles.sub, { color: colors.muted }]}>
            Simple fade-in animation — extend with your vendor API.
          </Text>
        </Animated.View>
        {['Repairs', 'Training', 'Supplies'].map((label, i) => (
          <Animated.View
            key={label}
            entering={FadeInDown.delay(80 * (i + 1)).duration(380)}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.tabIconDefault }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{label}</Text>
            <Text style={[styles.cardMeta, { color: colors.muted }]}>Demo row {i + 1}</Text>
          </Animated.View>
        ))}
      </View>
    </WebMaxWidth>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  h1: { fontSize: 24, fontWeight: '800' },
  sub: { fontSize: 15, marginTop: 6, marginBottom: 8 },
  card: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 17, fontWeight: '700' },
  cardMeta: { fontSize: 13, marginTop: 4 },
});
