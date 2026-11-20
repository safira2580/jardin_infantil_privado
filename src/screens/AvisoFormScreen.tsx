// Crear aviso. SEMANA 5: useMutation. SEMANA 6: React Hook Form + Zod (AvisoForm).
import { Alert } from 'react-native';
import AvisoForm from '../components/AvisoForm';
import { useCreateAviso } from '../hooks/useAvisos';
import type { AvisoFormData, AvisoFormInput } from '../schemas/avisoSchema';
import type { AvisosStackScreenProps } from '../types/navigation';

const VALORES_INICIALES: AvisoFormInput = { titulo: '', mensaje: '', autorId: '' };

export default function AvisoFormScreen({ navigation }: AvisosStackScreenProps<'AvisoForm'>) {
  const crear = useCreateAviso();

  const onSubmit = async (data: AvisoFormData) => {
    try {
      await crear.mutateAsync(data);
      navigation.goBack();
    } catch {
      Alert.alert('No se pudo guardar', 'Inténtalo de nuevo.');
    }
  };

  return <AvisoForm defaultValues={VALORES_INICIALES} submitLabel="Guardar aviso" onSubmit={onSubmit} />;
}
