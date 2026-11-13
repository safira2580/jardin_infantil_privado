// Detalle de un aviso: marcar favorito (Zustand) y eliminar (useMutation).
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import { useAviso, useDeleteAviso } from '../hooks/useAvisos';
import { useAvisosFavoritosStore } from '../store/useAvisosFavoritosStore';
import { blocks, colors, spacing } from '../theme';
import type { AvisosStackScreenProps } from '../types/navigation';

export default function AvisoDetailScreen({ navigation, route }: AvisosStackScreenProps<'AvisoDetail'>) {
  const { avisoId } = route.params;
  const { data: aviso, isLoading } = useAviso(avisoId);
  const eliminar = useDeleteAviso();
  const esFavorito = useAvisosFavoritosStore((s) => s.avisoIds.includes(avisoId));
  const toggleAviso = useAvisosFavoritosStore((s) => s.toggleAviso);

  if (!aviso && isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={blocks.blue.main} />
      </View>
    );
  }

  if (!aviso) {
    return (
      <View style={styles.center}>
        <EmptyState icon="alert-circle-outline" title="Aviso no disponible" message="No se encontró este aviso." />
      </View>
    );
  }

  const confirmarEliminar = () => {
    Alert.alert('Eliminar aviso', '¿Seguro que quieres eliminar este aviso?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () =>
          eliminar.mutate(avisoId, {
            onSuccess: () => {
              if (esFavorito) toggleAviso(avisoId);
              navigation.goBack();
            },
          }),
      },
    ]);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{aviso.titulo}</Text>
      <Text style={styles.message}>{aviso.mensaje}</Text>

      <Pressable style={styles.button} onPress={() => toggleAviso(avisoId)}>
        <Ionicons name={esFavorito ? 'star' : 'star-outline'} size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>{esFavorito ? 'Quitar de favoritos' : 'Marcar como favorito'}</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.danger]} onPress={confirmarEliminar} disabled={eliminar.isPending}>
        <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>{eliminar.isPending ? 'Eliminando...' : 'Eliminar aviso'}</Text>
      </Pressable>

      {eliminar.isError && <Text style={styles.error}>No se pudo eliminar. Inténtalo de nuevo.</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  title: { color: colors.ink, fontWeight: '800', fontSize: 22 },
  message: { color: colors.ink, opacity: 0.8, fontSize: 16, lineHeight: 24 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: blocks.blue.main,
    borderRadius: 14,
    paddingVertical: spacing.md,
  },
  danger: { backgroundColor: '#D64545' },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  error: { color: '#D64545', fontWeight: '700' },
});
