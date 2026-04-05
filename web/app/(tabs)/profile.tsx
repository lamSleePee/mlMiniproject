import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '@/components/AppContext';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function ProfileScreen() {
  const router = useRouter();
  const { resetOnboarding, statusNote } = useApp();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [displayName, setDisplayName] = useState('You');
  const [pushEnabled, setPushEnabled] = useState(true);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <Text style={[styles.h1, { color: colors.text }]}>Profile</Text>
      <Text style={[styles.note, { color: colors.muted }]}>
        Email and phone are omitted here on purpose — add them only when your backend requires
        verified contact fields.
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.tabIconDefault }]}>
        <Text style={[styles.label, { color: colors.muted }]}>Display name</Text>
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          style={[styles.input, { color: colors.text, borderColor: colors.tabIconDefault }]}
        />
      </View>

      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.tabIconDefault }]}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={[styles.label, { color: colors.text }]}>Push notifications</Text>
            <Text style={[styles.small, { color: colors.muted }]}>Demo toggle only</Text>
          </View>
          <Switch value={pushEnabled} onValueChange={setPushEnabled} />
        </View>
      </View>

      <Pressable
        onPress={() => router.push('/status')}
        style={[styles.linkBtn, { borderColor: colors.tint }]}>
        <Text style={[styles.linkText, { color: colors.tint }]}>Status update</Text>
        <Text style={[styles.small, { color: colors.muted }]}>
          {statusNote ? `Current: ${statusNote.slice(0, 40)}${statusNote.length > 40 ? '…' : ''}` : 'No status yet'}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          resetOnboarding();
          router.replace('/onboarding');
        }}
        style={[styles.ghost, { borderColor: colors.tabIconDefault }]}>
        <Text style={{ color: colors.muted, fontSize: 14 }}>Demo: reset onboarding</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, paddingHorizontal: 20 },
  h1: { fontSize: 26, fontWeight: '800' },
  note: { fontSize: 13, lineHeight: 18, marginTop: 8, marginBottom: 16 },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  label: { fontSize: 13, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  small: { fontSize: 12, marginTop: 4 },
  linkBtn: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
  },
  linkText: { fontSize: 17, fontWeight: '700' },
  ghost: {
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
  },
});
