import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useApp } from '@/components/AppContext';
import { WebMaxWidth } from '@/components/WebMaxWidth';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function StatusScreen() {
  const { statusNote, setStatusNote } = useApp();
  const [draft, setDraft] = useState(statusNote);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <WebMaxWidth style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <Text style={[styles.label, { color: colors.muted }]}>
          Share a short status. In production this syncs to your team&apos;s drive or cloud per
          policy.
        </Text>
        <TextInput
          multiline
          numberOfLines={5}
          placeholder="What should others know?"
          placeholderTextColor={colors.muted}
          value={draft}
          onChangeText={setDraft}
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.tabIconDefault, backgroundColor: colors.card },
          ]}
        />
        <Pressable
          onPress={() => setStatusNote(draft.trim())}
          style={({ pressed }) => [
            styles.save,
            { backgroundColor: colors.tint, opacity: pressed ? 0.9 : 1 },
          ]}>
          <Text style={styles.saveText}>Save status</Text>
        </Pressable>
        {statusNote ? (
          <Text style={[styles.saved, { color: colors.muted }]}>
            Last saved (this session): {statusNote}
          </Text>
        ) : null}
      </View>
    </WebMaxWidth>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    minHeight: 120,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  save: {
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  saved: { marginTop: 16, fontSize: 13 },
});
