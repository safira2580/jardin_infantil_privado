// Detalle de grupo con parámetros tipados y navegación entre tabs.
import { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import AsistenciaBadge from '../components/AsistenciaBadge';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import ProgressBar from '../components/ProgressBar';
import { GRUPOS } from '../data/grupos';
import { useMaterialsStore } from '../store/useMaterialsStore';
import { useNinosStore } from '../store/useNinosStore';
import { blockCard, blocks, colors, font, lookDeGrupo, radius, spacing } from '../theme';
import type { GruposStackScreenProps } from '../types/navigation';
import { formatCOP, formatDate, ocupacionDe } from '../utils/format';

export default function GrupoDetailScreen({ navigation, route }: GruposStackScreenProps<'GrupoDetail'>) {
  const { grupoId } = route.params;
  const materials = useMaterialsStore((s) => s.materials);
  const todosLosNinos = useNinosStore((s) => s.ninos);
  const grupo = GRUPOS.find((o) => o.id === grupoId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: grupo ? grupo.nombre : 'Grupo no encontrado' });
  }, [navigation, grupo]);

  if (!grupo) {
    return <EmptyState icon="alert-circle-outline" title="Grupo no encontrado" message="Vuelve a la lista e inténtalo de nuevo." />;
  }

  const look = lookDeGrupo(grupo.id);
  const c = blocks[look.tone];
  const usados = materials.filter((m) => grupo.materialIds.includes(m.id));
  const ninos = todosLosNinos.filter((n) => n.grupoId === grupo.id);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.banner, { backgroundColor: c.tint }]}>
        <View style={[styles.tile, { backgroundColor: c.main, borderBottomColor: c.dark }]}>
          <Text style={styles.emoji}>{look.emoji}</Text>
        </View>
        <View style={styles.bannerText}>
          <Text style={styles.title}>{grupo.nombre}</Text>
          <Badge estado={grupo.estado} />
        </View>
      </View>
      <Text style={styles.description}>{grupo.descripcion}</Text>

      <View style={styles.card}>
        <View style={styles.progressHeader}>
          <Text style={styles.label}>Cupos ocupados</Text>
          <Text style={styles.progressValue}>{grupo.matriculados} de {grupo.cupos} · {ocupacionDe(grupo)}%</Text>
        </View>
        <ProgressBar value={ocupacionDe(grupo)} color={c.main} />
      </View>

      <View style={styles.card}>
        <Dato label="Docente" value={grupo.docente} />
        <Dato label="Salón" value={grupo.salon} />
        <Dato label="Edades" value={grupo.edad} />
        <Dato label="Inicio de clases" value={formatDate(grupo.fechaInicio)} />
        <Dato label="Mensualidad" value={formatCOP(grupo.mensualidad)} last />
      </View>

      <Text style={styles.sectionTitle}>Niños del grupo</Text>
      {ninos.length === 0 ? (
        <Text style={styles.description}>Todavía no hay niños registrados en este grupo.</Text>
      ) : (
        <View style={styles.card}>
          {ninos.map((n, i) => (
            <Pressable
              key={n.id}
              accessibilityRole="button"
              accessibilityLabel={`${n.nombre} ${n.apellido}`}
              onPress={() => navigation.navigate('NinosTab', { screen: 'NinoDetail', params: { ninoId: n.id } })}
              style={[styles.ninoRow, i === ninos.length - 1 && styles.noBorder]}
            >
              <Avatar source={n.foto} nombre={n.nombre} size={44} ring={c.main} />
              <Text style={styles.ninoName} numberOfLines={1}>{n.nombre} {n.apellido}</Text>
              <AsistenciaBadge asistencia={n.asistencia} />
            </Pressable>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Material que usa este grupo</Text>
      <View style={styles.card}>
        {usados.map((m, i) => (
          <Pressable
            key={m.id}
            accessibilityRole="button"
            onPress={() => navigation.navigate('MaterialesTab', { screen: 'MaterialDetail', params: { materialId: m.id } })}
            style={[styles.materialRow, i === usados.length - 1 && styles.noBorder]}
          >
            <Text style={styles.materialName}>{m.emoji} {m.name}</Text>
            <Text style={styles.materialPrice}>{formatCOP(m.price)}</Text>
          </Pressable>
        ))}
      </View>
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
  banner: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, borderRadius: radius.lg, padding: spacing.lg },
  tile: { width: 72, height: 72, borderRadius: radius.md, borderBottomWidth: 6, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 36 },
  bannerText: { flex: 1, gap: spacing.sm },
  title: { fontSize: font.xl, fontWeight: '800', color: colors.ink },
  description: { fontSize: font.md, color: colors.muted, lineHeight: 22 },
  card: { ...blockCard, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.sm },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  progressValue: { fontSize: font.sm, fontWeight: '800', color: colors.ink },
  label: { fontSize: font.sm, color: colors.muted },
  datoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  datoValue: { flex: 1, textAlign: 'right', fontSize: font.md, fontWeight: '700', color: colors.ink },
  noBorder: { borderBottomWidth: 0 },
  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.ink, marginTop: spacing.sm },
  ninoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  ninoName: { flex: 1, fontSize: font.md, fontWeight: '700', color: colors.ink },
  materialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  materialName: { flex: 1, fontSize: font.md, color: colors.ink },
  materialPrice: { fontSize: font.md, fontWeight: '800', color: colors.sky },
});
