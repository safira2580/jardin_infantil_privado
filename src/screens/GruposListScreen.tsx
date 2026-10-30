// SEMANA 2: FlatList, filtros con estado local y ListEmptyComponent.
import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import Chip from '../components/Chip';
import EmptyState from '../components/EmptyState';
import GrupoCard from '../components/GrupoCard';
import { GRUPOS } from '../data/grupos';
import { colors, spacing } from '../theme';
import type { EstadoGrupo } from '../types/models';
import type { GruposStackScreenProps } from '../types/navigation';

type Filtro = 'todas' | EstadoGrupo;

const FILTROS: { value: Filtro; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'activo', label: 'En clases' },
  { value: 'inscripciones', label: 'Inscripciones' },
  { value: 'completo', label: 'Completos' },
];

export default function GruposListScreen({ navigation }: GruposStackScreenProps<'GruposList'>) {
  const [filtro, setFiltro] = useState<Filtro>('todas');

  const data = useMemo(() => (filtro === 'todas' ? GRUPOS : GRUPOS.filter((o) => o.estado === filtro)), [filtro]);

  return (
    <View style={styles.screen}>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {FILTROS.map((f) => (
            <Chip key={f.value} label={f.label} selected={filtro === f.value} onPress={() => setFiltro(f.value)} />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GrupoCard grupo={item} onPress={() => navigation.navigate('GrupoDetail', { grupoId: item.id })} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState title="Sin grupos" message="No hay grupos con este estado. Prueba con otro filtro." />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  chips: { gap: spacing.sm, padding: spacing.lg },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, flexGrow: 1 },
});
