import { Image, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { blocks, colors } from '../theme';

interface Props {
  source?: ImageSourcePropType;
  nombre: string;
  size?: number;
  ring?: string;
}

export default function Avatar({ source, nombre, size = 56, ring = colors.surface }: Props) {
  const r = size / 2;
  return (
    <View style={[styles.ring, { width: size, height: size, borderRadius: r, borderColor: ring }]}>
      {source ? (
        <Image source={source} style={{ width: '100%', height: '100%', borderRadius: r }} accessibilityIgnoresInvertColors />
      ) : (
        <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{nombre.charAt(0).toUpperCase()}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ring: { borderWidth: 3, backgroundColor: blocks.blue.tint, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  initial: { fontWeight: '800', color: blocks.blue.dark },
});
