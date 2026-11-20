// SEMANA 2: inputs controlados, teclados numéricos y validación manual.
// SEMANA 3: se presenta como pantalla modal dentro del Stack de Materiales.
// SEMANA 6: React Hook Form + Zod reemplazan los useState y la validación manual.
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Chip from '../components/Chip';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { CATEGORIAS } from '../data/materials';
import { materialSchema, type MaterialFormData, type MaterialFormInput } from '../schemas/materialSchema';
import { useMaterialsStore } from '../store/useMaterialsStore';
import { colors, font, spacing } from '../theme';
import type { MaterialesStackScreenProps } from '../types/navigation';

const VALORES_INICIALES: MaterialFormInput = {
  name: '',
  category: CATEGORIAS[0],
  unit: '',
  price: '',
  stock: '',
  description: '',
};

export default function MaterialFormScreen({ navigation }: MaterialesStackScreenProps<'MaterialForm'>) {
  const addMaterial = useMaterialsStore((s) => s.addMaterial);
  const { control, handleSubmit } = useForm<MaterialFormInput, unknown, MaterialFormData>({
    resolver: zodResolver(materialSchema),
    defaultValues: VALORES_INICIALES,
  });

  const onSubmit = (data: MaterialFormData) => {
    const nuevo = addMaterial(data);
    Alert.alert('Material guardado', `${nuevo.name} ya está en el catálogo.`, [
      { text: 'Aceptar', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <FormField control={control} name="name" label="Nombre" placeholder="Ej. Tijeras punta roma" />

        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <View style={styles.group}>
              <Text style={styles.groupLabel}>Categoría</Text>
              <View style={styles.chips}>
                {CATEGORIAS.map((c) => (
                  <Chip key={c} label={c} selected={field.value === c} onPress={() => field.onChange(c)} />
                ))}
              </View>
            </View>
          )}
        />

        <FormField control={control} name="unit" label="Unidad de venta" placeholder="Ej. caja x12" />
        <FormField control={control} name="price" label="Precio (COP)" keyboardType="numeric" placeholder="Ej. 25000" />
        <FormField control={control} name="stock" label="Stock inicial" keyboardType="number-pad" placeholder="Ej. 40" />
        <FormField
          control={control}
          name="description"
          label="Descripción (opcional)"
          placeholder="Para qué se usa, edad recomendada…"
          multiline
          numberOfLines={3}
          style={styles.multiline}
        />

        <SubmitButton label="Guardar material" onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  group: { gap: spacing.sm },
  groupLabel: { fontSize: font.sm, fontWeight: '700', color: colors.ink },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
});
