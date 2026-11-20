// Lista de niños con búsqueda y filtro por grupo.
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import Chip from '../components/Chip';
import EmptyState from '../components/EmptyState';
import NinoCard from '../components/NinoCard';
import SearchInput from '../components/SearchInput';
import { GRUPOS } from '../data/grupos';
import { useNinosStore } from '../store/useNinosStore';
import { colors, spacing } from '../theme';
import type { NinosStackScreenProps } from '../types/navigation';

export default function NinosListScreen({ navigation }: NinosStackScreenProps<'NinosList'>) {
  const ninos = useNinosStore((s) => s.ninos);
  const [query, setQuery] = useState('');
  const [grupoId, setGrupoId] = useState<string>('todos');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ninos.filter((n) => {
      if (grupoId !== 'todos' && n.grupoId !== grupoId) return false;
      if (q && !`${n.nombre} ${n.apellido}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [ninos, query, grupoId]);

  return (
    <View style={styles.screen}>
      <View style={styles.filters}>
        <SearchInput value={query} onChangeText={setQuery} placeholder="Buscar niño" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          <Chip label="Todos" selected={grupoId === 'todos'} onPress={() => setGrupoId('todos')} />
          {GRUPOS.map((g) => (
            <Chip key={g.id} label={g.nombre} selected={grupoId === g.id} onPress={() => setGrupoId(g.id)} />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NinoCard nino={item} onPress={() => navigation.navigate('NinoDetail', { ninoId: item.id })} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <EmptyState icon="search-outline" title="Sin resultados" message="Cambia la búsqueda o elige otro grupo." />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  filters: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.md },
  chips: { gap: spacing.sm, paddingBottom: spacing.xs },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl, flexGrow: 1 },
});
