import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { blocks, colors, font, spacing } from '../theme';

interface Props {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
}

export default function EmptyState({ icon = 'happy-outline', title, message }: Props) {
  return (
    <View style={styles.box}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={36} color={blocks.blue.dark} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { alignItems: 'center', padding: spacing.xxl, gap: spacing.sm },
  iconBox: { width: 72, height: 72, borderRadius: 24, backgroundColor: blocks.blue.tint, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm },
  title: { fontSize: font.lg, fontWeight: '800', color: colors.ink },
  message: { fontSize: font.md, color: colors.muted, textAlign: 'center' },
});
