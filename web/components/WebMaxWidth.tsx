import { Platform, StyleSheet, View, type ViewProps } from 'react-native';

/** Constrains content width on large browser viewports; unchanged on native. */
export function WebMaxWidth({ children, style, ...rest }: ViewProps) {
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.outer, style]} {...rest}>
        <View style={styles.inner}>{children}</View>
      </View>
    );
  }
  return (
    <View style={[{ flex: 1 }, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: 960,
  },
});
