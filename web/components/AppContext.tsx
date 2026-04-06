import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type AppContextValue = {
  onboardingComplete: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  statusNote: string;
  setStatusNote: (v: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [statusNote, setStatusNote] = useState('');

  const completeOnboarding = useCallback(() => setOnboardingComplete(true), []);
  const resetOnboarding = useCallback(() => setOnboardingComplete(false), []);

  const value = useMemo(
    () => ({
      onboardingComplete,
      completeOnboarding,
      resetOnboarding,
      statusNote,
      setStatusNote,
    }),
    [onboardingComplete, completeOnboarding, resetOnboarding, statusNote],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
