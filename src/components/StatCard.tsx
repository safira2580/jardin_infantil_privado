import { StyleSheet, Text, View } from 'react-native';
import { blocks, font, radius, spacing, type BlockKey } from '../theme';

interface Props {
  label: string;
  value: string;
  hint?: string;
  tone?: BlockKey;
}

export default function StatCard({ label, value, hint, tone = 'blue' }: Props) {
  const c = blocks[tone];
  return (
    <View style={[styles.card, { backgroundColor: c.main, borderBottomColor: c.dark }]}>
      <Text style={[styles.value, { color: c.onMain }]} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
      <Text style={[styles.label, { color: c.onMain }]}>{label}</Text>
      {!!hint && <Text style={[styles.hint, { color: c.onMain }]} numberOfLines={1}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: radius.lg, padding: spacing.lg, borderBottomWidth: 6, gap: 2 },
  value: { fontSize: 32, fontWeight: '800' },
  label: { fontSize: font.md, fontWeight: '700' },
  hint: { fontSize: font.sm, opacity: 0.85 },
});
