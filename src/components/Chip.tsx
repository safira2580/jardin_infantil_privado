import { Pressable, StyleSheet, Text } from 'react-native';
import { blocks, colors, font, radius, spacing } from '../theme';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function Chip({ label, selected, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
  },
  chipSelected: { backgroundColor: blocks.blue.main, borderColor: blocks.blue.dark },
  text: { fontSize: font.sm, color: colors.ink, fontWeight: '700' },
  textSelected: { color: colors.surface },
});
