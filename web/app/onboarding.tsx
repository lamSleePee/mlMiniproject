import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useApp } from '@/components/AppContext';
import { WebMaxWidth } from '@/components/WebMaxWidth';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const STEPS = 3;

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useApp();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState('');
  const [focus, setFocus] = useState('');

  const next = () => {
    if (step < STEPS - 1) setStep(step + 1);
    else {
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <WebMaxWidth style={{ flex: 1, backgroundColor: colors.background }}>
    <SafeAreaView style={[styles.safe, { backgroundColor: 'transparent' }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={styles.headerRow}>
          <Pressable onPress={back} disabled={step === 0} hitSlop={12}>
            <Text style={[styles.back, { color: step === 0 ? 'transparent' : colors.tint }]}>
              Back
            </Text>
          </Pressable>
          <Text style={[styles.stepLabel, { color: colors.muted }]}>
            Step {step + 1} of {STEPS}
          </Text>
          <View style={{ width: 48 }} />
        </View>

        <View style={styles.dots}>
          {Array.from({ length: STEPS }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: i <= step ? colors.tint : colors.tabIconDefault },
              ]}
            />
          ))}
        </View>

        {step === 0 && (
          <View style={styles.section}>
            <Text style={[styles.h1, { color: colors.text }]}>Welcome</Text>
            <Text style={[styles.p, { color: colors.muted }]}>
              Tell us what to call you. Email and phone stay out of onboarding — you can add
              details later from profile if your team enables them.
            </Text>
            <TextInput
              placeholder="Your name"
              placeholderTextColor={colors.muted}
              value={displayName}
              onChangeText={setDisplayName}
              style={[
                styles.input,
                { color: colors.text, borderColor: colors.tabIconDefault, backgroundColor: colors.card },
              ]}
            />
          </View>
        )}

        {step === 1 && (
          <View style={styles.section}>
            <Text style={[styles.h1, { color: colors.text }]}>Occupation focus</Text>
            <Text style={[styles.p, { color: colors.muted }]}>
              What kind of work are you exploring? This helps tailor search and suggestions.
            </Text>
            <TextInput
              placeholder="e.g. healthcare, trades, technology"
              placeholderTextColor={colors.muted}
              value={focus}
              onChangeText={setFocus}
              style={[
                styles.input,
                { color: colors.text, borderColor: colors.tabIconDefault, backgroundColor: colors.card },
              ]}
            />
          </View>
        )}

        {step === 2 && (
          <View style={styles.section}>
            <Text style={[styles.h1, { color: colors.text }]}>You&apos;re set</Text>
            <Text style={[styles.p, { color: colors.muted }]}>
              Use the Occupation tab to search roles, Contact for people, and Profile for your
              settings. Status updates live under Profile → Status update.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Pressable
            onPress={next}
            style={({ pressed }) => [
              styles.cta,
              { backgroundColor: colors.tint, opacity: pressed ? 0.9 : 1 },
            ]}>
            <Text style={styles.ctaText}>{step === STEPS - 1 ? 'Get started' : 'Continue'}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </WebMaxWidth>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1, paddingHorizontal: 24 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  back: { fontSize: 16, fontWeight: '600' },
  stepLabel: { fontSize: 14 },
  dots: { flexDirection: 'row', gap: 8, marginBottom: 28 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  section: { flex: 1 },
  h1: { fontSize: 28, fontWeight: '800', marginBottom: 12 },
  p: { fontSize: 16, lineHeight: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  footer: { paddingBottom: 8 },
  cta: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
