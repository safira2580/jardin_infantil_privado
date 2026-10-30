import { StyleSheet, Text, View } from 'react-native';
import { blocks, font, radius, spacing, type BlockKey } from '../theme';
import type { Asistencia } from '../types/models';

export const ASISTENCIA: Record<Asistencia, { label: string; tone: BlockKey }> = {
  presente: { label: 'Presente', tone: 'green' },
  ausente: { label: 'Ausente', tone: 'coral' },
  pendiente: { label: 'Por confirmar', tone: 'sun' },
};

export default function AsistenciaBadge({ asistencia }: { asistencia: Asistencia }) {
  const c = ASISTENCIA[asistencia];
  return (
    <View style={[styles.badge, { backgroundColor: blocks[c.tone].tint }]}>
      <View style={[styles.dot, { backgroundColor: blocks[c.tone].main }]} />
      <Text style={[styles.text, { color: blocks[c.tone].dark }]}>{c.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: spacing.md, paddingVertical: 5, borderRadius: radius.pill },
  dot: { width: 8, height: 8, borderRadius: 4 },
  text: { fontSize: font.sm, fontWeight: '700' },
});
