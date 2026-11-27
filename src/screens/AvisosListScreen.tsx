// Lista de avisos desde la API (TanStack Query) con pull-to-refresh.
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import { useAvisos } from '../hooks/useAvisos';
import { useFuenteAvisos, usePreferences } from '../hooks/usePreferences';
import { useAvisosFavoritosStore } from '../store/useAvisosFavoritosStore';
import { blocks, colors, spacing } from '../theme';
import type { AvisosStackScreenProps } from '../types/navigation';

export default function AvisosListScreen({ navigation }: AvisosStackScreenProps<'AvisosList'>) {
  const { data, isLoading, isError, isRefetching, refetch } = useAvisos();
  const favoritos = useAvisosFavoritosStore((s) => s.avisoIds);

  // SEMANA 7: preferencias guardadas en MMKV (se cambian en Ajustes y se aplican al instante)
  const { ordenAvisos, modoCompacto, avisosPorPagina } = usePreferences();
  const fuente = useFuenteAvisos();
  const [paginas, setPaginas] = useState(1);

  const ordenados = useMemo(() => {
    const lista = [...(data ?? [])];
    if (ordenAvisos === 'az') lista.sort((a, b) => a.titulo.localeCompare(b.titulo, 'es'));
    if (ordenAvisos === 'za') lista.sort((a, b) => b.titulo.localeCompare(a.titulo, 'es'));
    return lista;
  }, [data, ordenAvisos]);

  const limite = avisosPorPagina * paginas;
  const visibles = ordenados.slice(0, limite);
  const restantes = ordenados.length - visibles.length;

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
      {fuente === 'cache' && (
        <View style={styles.offlineBanner}>
          <Ionicons name="cloud-offline-outline" size={16} color="#7A4B00" />
          <Text style={styles.offlineText}>Sin conexión: mostrando los avisos guardados en el teléfono.</Text>
        </View>
      )}
      <FlatList
        data={visibles}
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
        ListFooterComponent={
          restantes > 0 ? (
            <Pressable style={[styles.button, styles.moreButton]} onPress={() => setPaginas((p) => p + 1)}>
              <Text style={styles.buttonText}>Ver más avisos ({restantes} restantes)</Text>
            </Pressable>
          ) : null
        }
        ListEmptyComponent={
          <EmptyState icon="megaphone-outline" title="Sin avisos" message="Crea el primero con el botón Nuevo aviso." />
        }
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, modoCompacto && styles.cardCompact]}
            onPress={() => navigation.navigate('AvisoDetail', { avisoId: item.id })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.title} numberOfLines={1}>
                {item.titulo}
              </Text>
              {favoritos.includes(item.id) && <Ionicons name="star" size={18} color={blocks.blue.main} />}
            </View>
            {!modoCompacto && (
              <Text style={styles.message} numberOfLines={2}>
                {item.mensaje}
              </Text>
            )}
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
  moreButton: { marginTop: spacing.md },
  cardCompact: { padding: spacing.md, gap: 0 },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: blocks.sun.tint,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  offlineText: { flex: 1, color: '#7A4B00', fontSize: 13, fontWeight: '700' },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
