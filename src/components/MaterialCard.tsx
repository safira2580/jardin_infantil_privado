import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CATEGORIAS } from '../data/materials';
import { blockCard, blocks, colors, font, pressedBlock, radius, spacing, type BlockKey } from '../theme';
import type { Material } from '../types/models';
import { formatCOP } from '../utils/format';

const TONES: BlockKey[] = ['coral', 'sun', 'blue', 'green'];

interface Props {
  material: Material;
  onPress?: () => void;
}

export default function MaterialCard({ material, onPress }: Props) {
  const agotado = material.stock === 0;
  const bajo = !agotado && material.stock <= material.minStock;
  const tone = blocks[TONES[Math.max(0, CATEGORIAS.indexOf(material.category)) % TONES.length]];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${material.name}, ${formatCOP(material.price)} por ${material.unit}`}
      style={({ pressed }) => [styles.card, pressed && pressedBlock]}
    >
      <View style={[styles.iconBox, { backgroundColor: tone.tint, borderBottomColor: tone.main }]}>
        <Text style={styles.emoji}>{material.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{material.name}</Text>
        <Text style={styles.category} numberOfLines={1}>{material.category}</Text>
        <Text style={[styles.stock, (agotado || bajo) && styles.stockWarn]}>
          {agotado ? 'Agotado' : bajo ? `Stock bajo: ${material.stock}` : `${material.stock} en stock`}
        </Text>
      </View>
      <View style={styles.priceBox}>
        <Text style={styles.price}>{formatCOP(material.price)}</Text>
        <Text style={styles.unit}>{material.unit}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { ...blockCard, flexDirection: 'row', alignItems: 'center', padding: spacing.md, gap: spacing.md },
  iconBox: { width: 56, height: 56, borderRadius: radius.md, borderBottomWidth: 4, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 28 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: font.md, fontWeight: '800', color: colors.ink },
  category: { fontSize: font.sm, color: colors.muted },
  stock: { fontSize: font.sm, color: colors.ok, fontWeight: '700' },
  stockWarn: { color: colors.warn },
  priceBox: { alignItems: 'flex-end', maxWidth: 110 },
  price: { fontSize: font.md, fontWeight: '800', color: colors.ink },
  unit: { fontSize: 11, color: colors.muted, textAlign: 'right' },
});
