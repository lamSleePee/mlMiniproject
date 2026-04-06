import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PowerToYouButton } from '@/components/PowerToYouButton';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.kicker, { color: colors.tint }]}>Power to you</Text>
        <Text style={[styles.title, { color: colors.text }]}>What do you want to do today?</Text>
        <Text style={[styles.sub, { color: colors.muted }]}>
          Jump into search, trusted contacts, or vendors — all from one place.
        </Text>

        <View style={styles.block}>
          <PowerToYouButton
            title="Search occupations"
            subtitle="Filter roles and save picks locally"
            icon="briefcase"
            onPress={() => router.push('/(tabs)/occupation')}
          />
          <PowerToYouButton
            title="Trusted people & contacts"
            subtitle="Swipe between contact lists"
            icon="users"
            variant="secondary"
            onPress={() => router.push('/(tabs)/contact')}
          />
          <PowerToYouButton
            title="Browse vendors"
            subtitle="Smooth list with light motion"
            icon="truck"
            variant="secondary"
            onPress={() => router.push('/vendor')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },
  kicker: { fontSize: 13, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' },
  title: { fontSize: 28, fontWeight: '800', marginTop: 8 },
  sub: { fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 20 },
  block: { marginTop: 8 },
});
