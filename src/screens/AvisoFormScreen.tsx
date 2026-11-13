// Formulario para crear un aviso con useMutation (la validación con Zod llega en la semana 6).
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useCreateAviso } from '../hooks/useAvisos';
import { blocks, colors, spacing } from '../theme';
import type { AvisosStackScreenProps } from '../types/navigation';

export default function AvisoFormScreen({ navigation }: AvisosStackScreenProps<'AvisoForm'>) {
  const [titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const crear = useCreateAviso();

  const valido = titulo.trim().length >= 3 && mensaje.trim().length >= 3;

  const guardar = () => {
    crear.mutate(
      { titulo: titulo.trim(), mensaje: mensaje.trim() },
      { onSuccess: () => navigation.goBack() },
    );
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ej: Reunión de padres"
          placeholderTextColor="#8A9AB3"
        />

        <Text style={styles.label}>Mensaje</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={mensaje}
          onChangeText={setMensaje}
          placeholder="Escribe el comunicado"
          placeholderTextColor="#8A9AB3"
          multiline
        />

        <Pressable
          style={[styles.button, (!valido || crear.isPending) && styles.disabled]}
          onPress={guardar}
          disabled={!valido || crear.isPending}
        >
          <Text style={styles.buttonText}>{crear.isPending ? 'Guardando...' : 'Guardar aviso'}</Text>
        </Pressable>

        {crear.isError && <Text style={styles.error}>No se pudo guardar. Inténtalo de nuevo.</Text>}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md },
  label: { color: colors.ink, fontWeight: '800', fontSize: 14 },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.ink,
    fontSize: 16,
  },
  multiline: { minHeight: 120, textAlignVertical: 'top' },
  button: {
    alignItems: 'center',
    backgroundColor: blocks.blue.main,
    borderRadius: 14,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  disabled: { opacity: 0.5 },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
  error: { color: '#D64545', fontWeight: '700' },
});
