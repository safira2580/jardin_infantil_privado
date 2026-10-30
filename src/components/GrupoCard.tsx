import { Pressable, StyleSheet, Text, View } from 'react-native';
import { blockCard, blocks, colors, font, lookDeGrupo, pressedBlock, radius, spacing } from '../theme';
import type { Grupo } from '../types/models';
import { ocupacionDe } from '../utils/format';
import Badge from './Badge';
import ProgressBar from './ProgressBar';

interface Props {
  grupo: Grupo;
  onPress?: () => void;
}

export default function GrupoCard({ grupo, onPress }: Props) {
  const look = lookDeGrupo(grupo.id);
  const c = blocks[look.tone];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Grupo ${grupo.nombre}, ocupación ${ocupacionDe(grupo)} por ciento`}
      style={({ pressed }) => [styles.card, pressed && pressedBlock]}
    >
      <View style={styles.top}>
        <View style={[styles.tile, { backgroundColor: c.main, borderBottomColor: c.dark }]}>
          <Text style={styles.emoji}>{look.emoji}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{grupo.nombre}</Text>
          <Text style={styles.meta} numberOfLines={1}>{grupo.edad} · {grupo.salon}</Text>
          <Badge estado={grupo.estado} />
        </View>
      </View>
      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <ProgressBar value={ocupacionDe(grupo)} color={c.main} />
        </View>
        <Text style={styles.pct}>{grupo.matriculados}/{grupo.cupos}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { ...blockCard, padding: spacing.lg, gap: spacing.md },
  top: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  tile: { width: 64, height: 64, borderRadius: radius.md, borderBottomWidth: 5, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 30 },
  info: { flex: 1, gap: 4 },
  title: { fontSize: font.lg, fontWeight: '800', color: colors.ink },
  meta: { fontSize: font.sm, color: colors.muted },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  progressBar: { flex: 1 },
  pct: { fontSize: font.sm, fontWeight: '800', color: colors.ink, minWidth: 44, textAlign: 'right' },
});
