import { useMemo, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { searchOccupations, type Occupation } from '@/constants/occupations';
import { useColorScheme } from '@/components/useColorScheme';

export default function OccupationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [query, setQuery] = useState('');
  const [listening, setListening] = useState(false);

  const results = useMemo(() => searchOccupations(query), [query]);

  const onMic = () => {
    if (listening) return;
    setListening(true);
    setTimeout(() => {
      setQuery('Software Engineer');
      setListening(false);
    }, 900);
  };

  const renderItem = ({ item }: { item: Occupation }) => (
    <View style={[styles.row, { borderColor: colors.tabIconDefault, backgroundColor: colors.card }]}>
      <View>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.rowMeta, { color: colors.muted }]}>{item.category}</Text>
      </View>
      <Text style={{ color: colors.tint, fontWeight: '700' }}>Save</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.h1, { color: colors.text }]}>Occupation search</Text>
        <Text style={[styles.hint, { color: colors.muted }]}>
          Type to filter seeded roles. Mic demos voice-to-text (wire your STT API later).
        </Text>
      </View>

      <View
        style={[
          styles.searchWrap,
          { backgroundColor: colors.card, borderColor: colors.tabIconDefault },
        ]}>
        <TextInput
          placeholder="Search occupations…"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          style={[styles.input, { color: colors.text }]}
          returnKeyType="search"
        />
        <Pressable
          onPress={onMic}
          accessibilityLabel="Voice search"
          style={({ pressed }) => [
            styles.mic,
            { backgroundColor: listening ? colors.tint : `${colors.tint}22` },
            pressed && { opacity: 0.85 },
          ]}>
          {listening ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <FontAwesome name="microphone" size={18} color={colors.tint} />
          )}
        </Pressable>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.muted }]}>No matches. Try another word.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 8 },
  h1: { fontSize: 26, fontWeight: '800' },
  hint: { marginTop: 6, fontSize: 14, lineHeight: 20 },
  searchWrap: {
    marginHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 16 },
  mic: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { paddingHorizontal: 20, paddingBottom: 24 },
  row: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowTitle: { fontSize: 16, fontWeight: '700' },
  rowMeta: { fontSize: 13, marginTop: 2 },
  empty: { textAlign: 'center', marginTop: 24 },
});
