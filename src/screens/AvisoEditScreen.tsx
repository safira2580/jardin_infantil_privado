// SEMANA 6: editar un aviso. Carga el aviso con useAviso y rellena el formulario con defaultValues.
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import AvisoForm from '../components/AvisoForm';
import EmptyState from '../components/EmptyState';
import { useAviso, useUpdateAviso } from '../hooks/useAvisos';
import type { AvisoFormData } from '../schemas/avisoSchema';
import { blocks, colors, spacing } from '../theme';
import type { AvisosStackScreenProps } from '../types/navigation';

export default function AvisoEditScreen({ navigation, route }: AvisosStackScreenProps<'AvisoEdit'>) {
  const { avisoId } = route.params;
  const { data: aviso, isLoading } = useAviso(avisoId);
  const actualizar = useUpdateAviso();

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

  const onSubmit = async (data: AvisoFormData) => {
    try {
      await actualizar.mutateAsync({ id: aviso.id, ...data });
      navigation.goBack();
    } catch {
      Alert.alert('No se pudo guardar', 'Inténtalo de nuevo.');
    }
  };

  return (
    <AvisoForm
      defaultValues={{ titulo: aviso.titulo, mensaje: aviso.mensaje, autorId: String(aviso.autorId) }}
      submitLabel="Guardar cambios"
      onSubmit={onSubmit}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
});
