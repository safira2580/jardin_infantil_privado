// Pantalla de inicio: resumen del día, niños, grupos y material por reponer.
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '../components/Avatar';
import GrupoCard from '../components/GrupoCard';
import StatCard from '../components/StatCard';
import { GRUPOS } from '../data/grupos';
import { useMaterialsStore } from '../store/useMaterialsStore';
import { useNinosStore } from '../store/useNinosStore';
import { blockCard, blocks, colors, font, pressedBlock, radius, spacing } from '../theme';
import type { RootTabScreenProps } from '../types/navigation';
import { fechaCorta, formatCOP } from '../utils/format';

export default function HomeScreen({ navigation }: RootTabScreenProps<'InicioTab'>) {
  const materials = useMaterialsStore((s) => s.materials);
  const ninos = useNinosStore((s) => s.ninos);
  const insets = useSafeAreaInsets();

  const gruposEnCurso = GRUPOS.filter((o) => o.estado === 'activo');
  const stockBajo = materials.filter((m) => m.stock <= m.minStock);
  const valorInventario = materials.reduce((sum, m) => sum + m.price * m.stock, 0);
  const presentes = ninos.filter((n) => n.asistencia === 'presente').length;

  const ringDe = (a: string) => (a === 'presente' ? blocks.green.main : a === 'ausente' ? blocks.coral.main : blocks.sun.main);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={[styles.hero, { height: 190 + insets.top }]}>
        <Image source={require('../../assets/hero.png')} style={styles.heroImage} resizeMode="cover" />
      </View>

      <View style={styles.welcome}>
        <Text style={styles.title}>Jardín Infantil Semillitas</Text>
        <Text style={styles.date}>{fechaCorta()}</Text>
        <View style={styles.attendance}>
          <Text style={styles.attendanceNumber}>{presentes}</Text>
          <Text style={styles.attendanceText}>de {ninos.length} niños ya llegaron</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.statsRow}>
          <StatCard tone="coral" label="Niños" value={String(ninos.length)} />
          <StatCard tone="sun" label="Grupos en clases" value={String(gruposEnCurso.length)} />
        </View>
        <View style={styles.statsRow}>
          <StatCard tone="blue" label="Material" value={String(materials.length)} hint={formatCOP(valorInventario)} />
          <StatCard tone="green" label="Por reponer" value={String(stockBajo.length)} />
        </View>

        <Text style={styles.sectionTitle}>Niños de hoy</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.kids}>
          {ninos.map((n) => (
            <Pressable
              key={n.id}
              accessibilityRole="button"
              accessibilityLabel={`${n.nombre} ${n.apellido}`}
              style={({ pressed }) => [styles.kid, pressed && pressedBlock]}
              onPress={() => navigation.navigate('NinosTab', { screen: 'NinoDetail', params: { ninoId: n.id } })}
            >
              <Avatar source={n.foto} nombre={n.nombre} size={68} ring={ringDe(n.asistencia)} />
              <Text style={styles.kidName} numberOfLines={1}>{n.nombre}</Text>
            </Pressable>
          ))}
        </ScrollView>

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

        {stockBajo.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Por reponer</Text>
            <View style={styles.alertBox}>
              {stockBajo.map((m, i) => (
                <Pressable
                  key={m.id}
                  style={[styles.alertRow, i === stockBajo.length - 1 && styles.noBorder]}
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl },
  hero: { borderBottomLeftRadius: 32, borderBottomRightRadius: 32, overflow: 'hidden' },
  heroImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  welcome: { ...blockCard, marginHorizontal: spacing.lg, marginTop: -36, padding: spacing.lg, gap: 2 },
  title: { fontSize: font.xl, fontWeight: '800', color: colors.ink },
  date: { fontSize: font.md, color: colors.muted },
  attendance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    backgroundColor: blocks.green.tint,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
  },
  attendanceNumber: { fontSize: font.lg, fontWeight: '800', color: blocks.green.dark },
  attendanceText: { fontSize: font.sm, fontWeight: '700', color: blocks.green.dark },
  body: { padding: spacing.lg, gap: spacing.md },
  statsRow: { flexDirection: 'row', gap: spacing.md },
  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.ink, marginTop: spacing.md },
  kids: { gap: spacing.lg, paddingVertical: spacing.xs },
  kid: { width: 72, alignItems: 'center', gap: 6 },
  kidName: { fontSize: font.sm, fontWeight: '700', color: colors.ink },
  list: { gap: spacing.md },
  alertBox: { ...blockCard, paddingHorizontal: spacing.lg },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  noBorder: { borderBottomWidth: 0 },
  alertName: { fontSize: font.md, color: colors.ink, flex: 1, fontWeight: '600' },
  alertStock: { fontSize: font.md, fontWeight: '800', color: colors.warn },
});
