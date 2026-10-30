import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GRUPOS } from '../data/grupos';
import { blockCard, blocks, colors, font, lookDeGrupo, pressedBlock, spacing } from '../theme';
import type { Nino } from '../types/models';
import { edadDe } from '../utils/format';
import AsistenciaBadge from './AsistenciaBadge';
import Avatar from './Avatar';

interface Props {
  nino: Nino;
  onPress?: () => void;
}

export default function NinoCard({ nino, onPress }: Props) {
  const grupo = GRUPOS.find((g) => g.id === nino.grupoId);
  const tone = lookDeGrupo(nino.grupoId).tone;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${nino.nombre} ${nino.apellido}, ${edadDe(nino.fechaNacimiento)}`}
      style={({ pressed }) => [styles.card, pressed && pressedBlock]}
    >
      <Avatar source={nino.foto} nombre={nino.nombre} size={60} ring={blocks[tone].main} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{nino.nombre} {nino.apellido}</Text>
        <Text style={styles.meta} numberOfLines={1}>{edadDe(nino.fechaNacimiento)} · {grupo?.nombre ?? 'Sin grupo'}</Text>
        <AsistenciaBadge asistencia={nino.asistencia} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { ...blockCard, flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  info: { flex: 1, gap: 4 },
  name: { fontSize: font.lg, fontWeight: '800', color: colors.ink },
  meta: { fontSize: font.sm, color: colors.muted },
});
