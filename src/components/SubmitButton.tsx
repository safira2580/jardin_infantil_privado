import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { blocks, font, radius, spacing } from '../theme';

interface Props {
  label: string;
  onPress: () => void;
  loading?: boolean;
}

/** Botón principal de los formularios: se deshabilita y muestra un spinner mientras se envía. */
export default function SubmitButton({ label, onPress, loading = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      accessibilityRole="button"
      accessibilityState={{ disabled: loading, busy: loading }}
      style={({ pressed }) => [styles.button, (pressed || loading) && { opacity: 0.7 }]}
    >
      {loading ? <ActivityIndicator color={blocks.coral.onMain} /> : <Text style={styles.text}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: blocks.coral.main,
    borderRadius: radius.lg,
    borderBottomWidth: 6,
    borderBottomColor: blocks.coral.dark,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  text: { fontSize: font.lg, fontWeight: '800', color: blocks.coral.onMain },
});
