import { StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../theme';
import type { EstadoGrupo } from '../types/models';

const CONFIG: Record<EstadoGrupo, { label: string; bg: string; fg: string }> = {
  inscripciones: { label: 'Inscripciones abiertas', bg: '#DCE7F2', fg: colors.sky },
  activo: { label: 'En clases', bg: '#FBEFC2', fg: colors.accentInk },
  completo: { label: 'Cupo completo', bg: '#D8EEE3', fg: colors.ok },
};

export default function Badge({ estado }: { estado: EstadoGrupo }) {
  const c = CONFIG[estado];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.fg }]}>{c.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: radius.sm },
  text: { fontSize: font.sm, fontWeight: '600' },
});
