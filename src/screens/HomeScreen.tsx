// SEMANA 1: Core Components (View, Text, Image, ScrollView, Pressable) y Flexbox.
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import GrupoCard from '../components/GrupoCard';
import StatCard from '../components/StatCard';
import { useMaterials } from '../context/MaterialsContext';
import { GRUPOS } from '../data/grupos';
import { colors, font, radius, spacing } from '../theme';
import type { RootTabScreenProps } from '../types/navigation';
import { formatCOP } from '../utils/format';

export default function HomeScreen({ navigation }: RootTabScreenProps<'InicioTab'>) {
  const { materials } = useMaterials();

  const gruposEnCurso = GRUPOS.filter((o) => o.estado === 'activo');
  const stockBajo = materials.filter((m) => m.stock <= m.minStock);
  const valorInventario = materials.reduce((sum, m) => sum + m.price * m.stock, 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Hero */}
      <View style={styles.hero}>
        <Image source={require('../../assets/hero.png')} style={styles.heroImage} resizeMode="cover" />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Jardín Infantil Semillitas</Text>
          <Text style={styles.heroSubtitle}>Grupos y material didáctico en un solo lugar</Text>
        </View>
      </View>

      {/* Fila de estadísticas (Flexbox: flexDirection row + flex: 1) */}
      <View style={styles.statsRow}>
        <StatCard label="Grupos en clases" value={String(gruposEnCurso.length)} />
        <StatCard label="Material didáctico" value={String(materials.length)} />
      </View>
      <View style={styles.statsRow}>
        <StatCard label="Valor del inventario" value={formatCOP(valorInventario)} />
        <StatCard label="Con stock bajo" value={String(stockBajo.length)} warn={stockBajo.length > 0} />
      </View>

      {/* Grupos en clases */}
      <Text style={styles.sectionTitle}>Grupos en clases</Text>
      <View style={styles.list}>
        {gruposEnCurso.map((grupo) => (
          <GrupoCard
            key={grupo.id}
            grupo={grupo}
            onPress={() => navigation.navigate('GruposTab', { screen: 'GrupoDetail', params: { grupoId: grupo.id } })}
          />
        ))}
      </View>

      {/* Alertas de stock */}
      {stockBajo.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Por reponer</Text>
          <View style={styles.alertBox}>
            {stockBajo.map((m) => (
              <Pressable
                key={m.id}
                style={styles.alertRow}
                accessibilityRole="button"
                onPress={() =>
                  navigation.navigate('MaterialesTab', { screen: 'MaterialDetail', params: { materialId: m.id } })
                }
              >
                <Text style={styles.alertName}>{m.emoji} {m.name}</Text>
                <Text style={styles.alertStock}>{m.stock === 0 ? 'Agotado' : `${m.stock} u.`}</Text>
              </Pressable>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  hero: { height: 170, borderRadius: radius.lg, overflow: 'hidden', justifyContent: 'flex-end' },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  heroOverlay: { padding: spacing.lg, backgroundColor: 'rgba(31,42,51,0.72)' },
  heroTitle: { fontSize: font.xl, fontWeight: '800', color: colors.surface },
  heroSubtitle: { fontSize: font.md, color: colors.accent, marginTop: 2 },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  sectionTitle: { fontSize: font.lg, fontWeight: '700', color: colors.ink, marginTop: spacing.md },
  list: { gap: spacing.md },
  alertBox: { backgroundColor: colors.surface, borderRadius: radius.md, paddingHorizontal: spacing.lg },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  alertName: { fontSize: font.md, color: colors.ink, flex: 1 },
  alertStock: { fontSize: font.md, fontWeight: '700', color: colors.warn },
});
