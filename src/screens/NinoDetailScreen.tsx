// Ficha de un niño: foto, grupo, acudiente y llamada rápida.
import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsistenciaBadge, { ASISTENCIA } from '../components/AsistenciaBadge';
import Avatar from '../components/Avatar';
import EmptyState from '../components/EmptyState';
import { GRUPOS } from '../data/grupos';
import { useNinosStore } from '../store/useNinosStore';
import { blockCard, blocks, colors, font, lookDeGrupo, pressedBlock, radius, spacing } from '../theme';
import type { Asistencia } from '../types/models';
import type { NinosStackScreenProps } from '../types/navigation';
import { edadDe, formatDate } from '../utils/format';

export default function NinoDetailScreen({ navigation, route }: NinosStackScreenProps<'NinoDetail'>) {
  const { ninoId } = route.params;
  const nino = useNinosStore((s) => s.ninos.find((n) => n.id === ninoId));
  const marcarAsistencia = useNinosStore((s) => s.marcarAsistencia);

  useLayoutEffect(() => {
    navigation.setOptions({ title: nino ? nino.nombre : 'Niño no encontrado' });
  }, [navigation, nino]);

  if (!nino) {
    return <EmptyState icon="alert-circle-outline" title="Niño no encontrado" message="Vuelve a la lista e inténtalo de nuevo." />;
  }

  const grupo = GRUPOS.find((g) => g.id === nino.grupoId);
  const look = lookDeGrupo(nino.grupoId);
  const c = blocks[look.tone];
  const telefonoLegible = `+${nino.telefono.slice(0, 2)} ${nino.telefono.slice(2, 5)} ${nino.telefono.slice(5, 8)} ${nino.telefono.slice(8)}`;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.banner, { backgroundColor: c.tint }]}>
        <Avatar source={nino.foto} nombre={nino.nombre} size={128} ring={c.main} />
        <Text style={styles.name}>{nino.nombre} {nino.apellido}</Text>
        <Text style={styles.age}>{edadDe(nino.fechaNacimiento)}</Text>
        <AsistenciaBadge asistencia={nino.asistencia} />
      </View>

      <View style={styles.asistenciaRow}>
        {(Object.keys(ASISTENCIA) as Asistencia[]).map((a) => {
          const sel = nino.asistencia === a;
          const t = blocks[ASISTENCIA[a].tone];
          return (
            <Pressable
              key={a}
              accessibilityRole="button"
              accessibilityState={{ selected: sel }}
              onPress={() => marcarAsistencia(nino.id, a)}
              style={[styles.asistenciaBtn, sel && { backgroundColor: t.main, borderColor: t.dark }]}
            >
              <Text style={[styles.asistenciaText, sel && { color: t.onMain }]} numberOfLines={1}>{ASISTENCIA[a].label}</Text>
            </Pressable>
          );
        })}
      </View>

      {!!nino.nota && (
        <View style={styles.note}>
          <Ionicons name="chatbubble-ellipses" size={20} color={blocks.sun.dark} />
          <Text style={styles.noteText}>{nino.nota}</Text>
        </View>
      )}

      {grupo && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ver grupo ${grupo.nombre}`}
          style={({ pressed }) => [styles.grupoCard, pressed && pressedBlock]}
          onPress={() => navigation.navigate('GruposTab', { screen: 'GrupoDetail', params: { grupoId: grupo.id } })}
        >
          <View style={[styles.tile, { backgroundColor: c.main, borderBottomColor: c.dark }]}>
            <Text style={styles.emoji}>{look.emoji}</Text>
          </View>
          <View style={styles.grupoInfo}>
            <Text style={styles.grupoName}>{grupo.nombre}</Text>
            <Text style={styles.grupoMeta}>{grupo.docente} · {grupo.salon}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color={colors.muted} />
        </Pressable>
      )}

      <View style={styles.card}>
        <Dato label="Acudiente" value={nino.acudiente} />
        <Dato label="Teléfono" value={telefonoLegible} />
        <Dato label="Nacimiento" value={formatDate(nino.fechaNacimiento)} last />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Llamar a ${nino.acudiente}`}
        style={({ pressed }) => [styles.callButton, pressed && pressedBlock]}
        onPress={() => Linking.openURL(`tel:+${nino.telefono}`)}
      >
        <Ionicons name="call" size={22} color={blocks.coral.onMain} />
        <Text style={styles.callText}>Llamar al acudiente</Text>
      </Pressable>
    </ScrollView>
  );
}

function Dato({ label, value, last = false }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.datoRow, last && styles.noBorder]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.datoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  banner: { borderRadius: radius.lg, alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  name: { fontSize: font.xl, fontWeight: '800', color: colors.ink, marginTop: spacing.sm },
  age: { fontSize: font.md, color: colors.muted, fontWeight: '600' },
  asistenciaRow: { flexDirection: 'row', gap: spacing.sm },
  asistenciaBtn: { flex: 1, alignItems: 'center', paddingVertical: spacing.md, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 2, borderBottomWidth: 4, borderColor: colors.line },
  asistenciaText: { fontSize: font.sm, fontWeight: '800', color: colors.ink },
  note: { flexDirection: 'row', gap: spacing.md, alignItems: 'center', backgroundColor: blocks.sun.tint, borderRadius: radius.md, padding: spacing.md },
  noteText: { flex: 1, fontSize: font.md, color: blocks.sun.onMain, fontWeight: '600' },
  grupoCard: { ...blockCard, flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.md },
  tile: { width: 52, height: 52, borderRadius: radius.md, borderBottomWidth: 4, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 26 },
  grupoInfo: { flex: 1 },
  grupoName: { fontSize: font.lg, fontWeight: '800', color: colors.ink },
  grupoMeta: { fontSize: font.sm, color: colors.muted },
  card: { ...blockCard, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  label: { fontSize: font.sm, color: colors.muted },
  datoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  noBorder: { borderBottomWidth: 0 },
  datoValue: { flex: 1, textAlign: 'right', fontSize: font.md, fontWeight: '700', color: colors.ink },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: blocks.coral.main,
    borderRadius: radius.lg,
    borderBottomWidth: 6,
    borderBottomColor: blocks.coral.dark,
    paddingVertical: spacing.lg,
  },
  callText: { fontSize: font.lg, fontWeight: '800', color: blocks.coral.onMain },
});
