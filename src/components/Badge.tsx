import { StyleSheet, Text, View } from 'react-native';
import { blocks, font, radius, spacing, type BlockKey } from '../theme';
import type { EstadoGrupo } from '../types/models';

const CONFIG: Record<EstadoGrupo, { label: string; tone: BlockKey }> = {
  inscripciones: { label: 'Inscripciones abiertas', tone: 'blue' },
  activo: { label: 'En clases', tone: 'green' },
  completo: { label: 'Cupo completo', tone: 'sun' },
};

export default function Badge({ estado }: { estado: EstadoGrupo }) {
  const c = CONFIG[estado];
  return (
    <View style={[styles.badge, { backgroundColor: blocks[c.tone].tint }]}>
      <Text style={[styles.text, { color: blocks[c.tone].dark }]}>{c.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: spacing.md, paddingVertical: 5, borderRadius: radius.pill },
  text: { fontSize: font.sm, fontWeight: '700' },
});
