import { useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const CONTACTS = [
  { id: '1', name: 'Asha Verma', role: 'Mentor' },
  { id: '2', name: 'Jordan Lee', role: 'Coordinator' },
];

const TRUSTED = [
  { id: 't1', name: 'Priya N.', note: 'Emergency contact' },
  { id: 't2', name: 'Sam O.', note: 'Care partner' },
];

export default function ContactScreen() {
  const { width: pageWidth } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [page, setPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / pageWidth);
    if (next !== page) setPage(next);
  };

  const goTo = (idx: number) => {
    scrollRef.current?.scrollTo({ x: idx * pageWidth, animated: true });
    setPage(idx);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={['top']}>
      <Text style={[styles.title, { color: colors.text }]}>Contact</Text>
      <Text style={[styles.sub, { color: colors.muted }]}>
        Slide between general contacts and trusted people — same pattern as a tab pager.
      </Text>

      <View style={styles.tabs}>
        {['Contacts', 'Trusted people'].map((label, idx) => (
          <Text
            key={label}
            onPress={() => goTo(idx)}
            style={[
              styles.tab,
              {
                color: page === idx ? colors.tint : colors.muted,
                borderBottomColor: page === idx ? colors.tint : 'transparent',
              },
            ]}>
            {label}
          </Text>
        ))}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.pager}>
        <View style={[styles.page, { width: pageWidth }]}>
          {CONTACTS.map((c) => (
            <View
              key={c.id}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.tabIconDefault }]}>
              <Text style={[styles.name, { color: colors.text }]}>{c.name}</Text>
              <Text style={[styles.meta, { color: colors.muted }]}>{c.role}</Text>
            </View>
          ))}
        </View>
        <View style={[styles.page, { width: pageWidth }]}>
          {TRUSTED.map((c) => (
            <View
              key={c.id}
              style={[styles.card, { backgroundColor: colors.card, borderColor: colors.tabIconDefault }]}>
              <Text style={[styles.name, { color: colors.text }]}>{c.name}</Text>
              <Text style={[styles.meta, { color: colors.muted }]}>{c.note}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  title: { fontSize: 26, fontWeight: '800', paddingHorizontal: 20 },
  sub: { fontSize: 14, lineHeight: 20, paddingHorizontal: 20, marginTop: 6 },
  tabs: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 20,
    gap: 20,
  },
  tab: {
    fontSize: 16,
    fontWeight: '700',
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
  pager: { marginTop: 8 },
  page: { paddingHorizontal: 20, paddingBottom: 24 },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: '700' },
  meta: { fontSize: 13, marginTop: 4 },
});
