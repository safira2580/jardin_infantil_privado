// Lista de avisos desde la API (TanStack Query) con pull-to-refresh.
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import { useAvisos } from '../hooks/useAvisos';
import { useAvisosFavoritosStore } from '../store/useAvisosFavoritosStore';
import { blocks, colors, spacing } from '../theme';
import type { AvisosStackScreenProps } from '../types/navigation';

export default function AvisosListScreen({ navigation }: AvisosStackScreenProps<'AvisosList'>) {
  const { data, isLoading, isError, isRefetching, refetch } = useAvisos();
  const favoritos = useAvisosFavoritosStore((s) => s.avisoIds);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={blocks.blue.main} />
      </View>
    );
  }

  if (isError && !data) {
    return (
      <View style={styles.center}>
        <EmptyState
          icon="cloud-offline-outline"
          title="No se pudieron cargar los avisos"
          message="Revisa tu conexión e inténtalo de nuevo."
        />
        <Pressable style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListHeaderComponent={
          <Pressable style={[styles.button, styles.newButton]} onPress={() => navigation.navigate('AvisoForm')}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Nuevo aviso</Text>
          </Pressable>
        }
        ListEmptyComponent={
          <EmptyState icon="megaphone-outline" title="Sin avisos" message="Crea el primero con el botón Nuevo aviso." />
        }
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('AvisoDetail', { avisoId: item.id })}>
            <View style={styles.cardHeader}>
              <Text style={styles.title} numberOfLines={1}>
                {item.titulo}
              </Text>
              {favoritos.includes(item.id) && <Ionicons name="star" size={18} color={blocks.blue.main} />}
            </View>
            <Text style={styles.message} numberOfLines={2}>
              {item.mensaje}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl, flexGrow: 1 },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 2,
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  title: { flex: 1, color: colors.ink, fontWeight: '800', fontSize: 16 },
  message: { color: colors.ink, opacity: 0.7, fontSize: 14 },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: blocks.blue.main,
    borderRadius: 14,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  newButton: { marginBottom: spacing.md },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
