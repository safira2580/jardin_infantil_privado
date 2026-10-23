// SEMANA 3: pantalla de detalle con parámetros tipados y navegación entre tabs.
import { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import ProgressBar from '../components/ProgressBar';
import { useMaterials } from '../context/MaterialsContext';
import { GRUPOS } from '../data/grupos';
import { colors, font, radius, spacing } from '../theme';
import type { GruposStackScreenProps } from '../types/navigation';
import { formatCOP, formatDate, ocupacionDe } from '../utils/format';

export default function GrupoDetailScreen({ navigation, route }: GruposStackScreenProps<'GrupoDetail'>) {
  const { grupoId } = route.params;
  const { materials } = useMaterials();
  const grupo = GRUPOS.find((o) => o.id === grupoId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: grupo ? grupo.nombre : 'Grupo no encontrado' });
  }, [navigation, grupo]);

  if (!grupo) {
    return <EmptyState icon="alert-circle-outline" title="Grupo no encontrado" message="Vuelve a la lista e inténtalo de nuevo." />;
  }

  const usados = materials.filter((m) => grupo.materialIds.includes(m.id));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Badge estado={grupo.estado} />
      <Text style={styles.title}>{grupo.nombre}</Text>
      <Text style={styles.description}>{grupo.descripcion}</Text>

      <View style={styles.card}>
        <View style={styles.progressHeader}>
          <Text style={styles.label}>Ocupación del grupo</Text>
          <Text style={styles.progressValue}>{ocupacionDe(grupo)}%</Text>
        </View>
        <ProgressBar value={ocupacionDe(grupo)} />
      </View>

      <View style={styles.card}>
        <Dato label="Docente" value={grupo.docente} />
        <Dato label="Salón" value={grupo.salon} />
        <Dato label="Edades" value={grupo.edad} />
        <Dato label="Cupos" value={`${grupo.matriculados} de ${grupo.cupos}`} />
        <Dato label="Inicio de clases" value={formatDate(grupo.fechaInicio)} />
        <Dato label="Mensualidad" value={formatCOP(grupo.mensualidad)} last />
      </View>

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
  title: { fontSize: font.xl, fontWeight: '800', color: colors.ink },
  description: { fontSize: font.md, color: colors.muted, lineHeight: 22 },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.sm },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  progressValue: { fontSize: font.md, fontWeight: '800', color: colors.ink },
  label: { fontSize: font.sm, color: colors.muted },
  datoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  datoValue: { flex: 1, textAlign: 'right', fontSize: font.md, fontWeight: '600', color: colors.ink },
  noBorder: { borderBottomWidth: 0 },
  sectionTitle: { fontSize: font.lg, fontWeight: '700', color: colors.ink, marginTop: spacing.sm },
  materialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  materialName: { flex: 1, fontSize: font.md, color: colors.ink },
  materialPrice: { fontSize: font.md, fontWeight: '700', color: colors.sky },
});
