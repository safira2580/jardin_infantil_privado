// SEMANA 6: formulario de avisos (React Hook Form + zodResolver) compartido por Crear y Editar.
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { avisoSchema, type AvisoFormData, type AvisoFormInput } from '../schemas/avisoSchema';
import { colors, spacing } from '../theme';
import FormField from './FormField';
import SubmitButton from './SubmitButton';

interface Props {
  defaultValues: AvisoFormInput;
  submitLabel: string;
  onSubmit: (data: AvisoFormData) => Promise<void>;
}

export default function AvisoForm({ defaultValues, submitLabel, onSubmit }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AvisoFormInput, unknown, AvisoFormData>({
    resolver: zodResolver(avisoSchema),
    defaultValues,
  });

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FormField control={control} name="titulo" label="Título" placeholder="Ej: Reunión de padres" maxLength={80} />
        <FormField
          control={control}
          name="autorId"
          label="Docente que publica (1 a 10)"
          keyboardType="number-pad"
          placeholder="Ej: 3"
          maxLength={2}
        />
        <FormField
          control={control}
          name="mensaje"
          label="Mensaje"
          placeholder="Escribe el comunicado"
          multiline
          numberOfLines={5}
          style={styles.multiline}
          maxLength={500}
        />
        <SubmitButton label={submitLabel} onPress={handleSubmit(onSubmit)} loading={isSubmitting} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  multiline: { minHeight: 120, textAlignVertical: 'top' },
});
