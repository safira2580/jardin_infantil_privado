import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import { GRUPOS } from '../data/grupos';
import { useFavoritosStore } from '../store/useFavoritosStore';
import { useMaterialsStore } from '../store/useMaterialsStore';
import { blockCard, blocks, colors, font, pressedBlock, radius, spacing } from '../theme';
import type { MaterialesStackScreenProps } from '../types/navigation';
import { formatCOP } from '../utils/format';

export default function MaterialDetailScreen({ navigation, route }: MaterialesStackScreenProps<'MaterialDetail'>) {
  const { materialId } = route.params;
  const material = useMaterialsStore((s) => s.materials.find((m) => m.id === materialId));
  const ajustarStock = useMaterialsStore((s) => s.ajustarStock);
  const favorito = useFavoritosStore((s) => s.materialIds.includes(materialId));
  const toggleFavorito = useFavoritosStore((s) => s.toggleMaterial);

  useLayoutEffect(() => {
    navigation.setOptions({ title: material ? material.name : 'Material no encontrado' });
  }, [navigation, material]);

  if (!material) {
    return <EmptyState icon="alert-circle-outline" title="Material no encontrado" message="Vuelve a la lista e inténtalo de nuevo." />;
  }

  const agotado = material.stock === 0;
  const bajo = !agotado && material.stock <= material.minStock;
  const gruposQueLoUsan = GRUPOS.filter((o) => o.materialIds.includes(material.id));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.emojiTile}>
          <Text style={styles.emoji}>{material.emoji}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{material.name}</Text>
          <Text style={styles.category}>{material.category}</Text>
        </View>
        <Pressable
          onPress={() => toggleFavorito(material.id)}
          accessibilityRole="button"
          accessibilityLabel={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          hitSlop={10}
        >
          <Ionicons name={favorito ? 'heart' : 'heart-outline'} size={30} color={blocks.coral.main} />
        </Pressable>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>{formatCOP(material.price)}</Text>
        <Text style={styles.unit}>por {material.unit}</Text>
      </View>

      <View style={[styles.stockBox, (agotado || bajo) && styles.stockBoxWarn]}>
        <Text style={[styles.stockText, (agotado || bajo) && styles.stockTextWarn]}>
          {agotado ? 'Agotado: reponer cuanto antes' : bajo ? `Stock bajo: ${material.stock} (mínimo ${material.minStock})` : `${material.stock} disponibles`}
        </Text>
      </View>

      <View style={styles.stepper}>
        <Text style={styles.stepperLabel}>Ajustar stock</Text>
        <View style={styles.stepperButtons}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Restar una unidad"
            style={({ pressed }) => [styles.stepBtn, pressed && pressedBlock]}
            onPress={() => ajustarStock(material.id, -1)}
          >
            <Ionicons name="remove" size={24} color={colors.ink} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sumar una unidad"
            style={({ pressed }) => [styles.stepBtn, styles.stepBtnPlus, pressed && pressedBlock]}
            onPress={() => ajustarStock(material.id, 1)}
          >
            <Ionicons name="add" size={24} color={blocks.green.onMain} />
          </Pressable>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.description}>{material.description || 'Sin descripción.'}</Text>

      <Text style={styles.sectionTitle}>Grupos que lo usan</Text>
      {gruposQueLoUsan.length === 0 ? (
        <Text style={styles.description}>Todavía no lo usa ningún grupo.</Text>
      ) : (
        <View style={styles.card}>
          {gruposQueLoUsan.map((o, i) => (
            <Pressable
              key={o.id}
              accessibilityRole="button"
              style={[styles.grupoRow, i === gruposQueLoUsan.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => navigation.navigate('GruposTab', { screen: 'GrupoDetail', params: { grupoId: o.id } })}
            >
              <Text style={styles.grupoName}>{o.nombre}</Text>
              <Text style={styles.grupoPlace}>{o.salon}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  emojiTile: { width: 76, height: 76, borderRadius: radius.lg, backgroundColor: blocks.sun.tint, borderBottomWidth: 6, borderBottomColor: blocks.sun.main, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 40 },
  headerText: { flex: 1 },
  title: { fontSize: font.xl, fontWeight: '800', color: colors.ink },
  category: { fontSize: font.md, color: colors.muted },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  price: { fontSize: font.xxl, fontWeight: '800', color: colors.sky },
  unit: { fontSize: font.md, color: colors.muted },
  stockBox: { backgroundColor: blocks.green.tint, borderRadius: radius.md, padding: spacing.md },
  stockBoxWarn: { backgroundColor: blocks.coral.tint },
  stockText: { fontSize: font.md, fontWeight: '700', color: colors.ok },
  stockTextWarn: { color: colors.warn },
  stepper: { ...blockCard, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md, paddingLeft: spacing.lg },
  stepperLabel: { fontSize: font.md, fontWeight: '800', color: colors.ink },
  stepperButtons: { flexDirection: 'row', gap: spacing.md },
  stepBtn: { width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.bg, borderBottomWidth: 4, borderBottomColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  stepBtnPlus: { backgroundColor: blocks.green.main, borderBottomColor: blocks.green.dark },
  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.ink, marginTop: spacing.sm },
  description: { fontSize: font.md, color: colors.muted, lineHeight: 22 },
  card: { ...blockCard, paddingHorizontal: spacing.lg },
  grupoRow: { paddingVertical: spacing.md, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  grupoName: { fontSize: font.md, fontWeight: '700', color: colors.ink },
  grupoPlace: { fontSize: font.sm, color: colors.muted },
});
