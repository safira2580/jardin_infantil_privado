// SEMANA 7: pantalla de ajustes con los tres tipos de almacenamiento local.
//  - MMKV: preferencias de la lista de avisos (se guardan al instante, sin botón "Guardar").
//  - AsyncStorage: copia local de los avisos (se puede borrar desde aquí).
//  - SecureStore: PIN de la dirección, cifrado en el Keychain (iOS) o Keystore (Android).
import { zodResolver } from '@hookform/resolvers/zod';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Chip from '../components/Chip';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { OPCIONES_POR_PAGINA, usePreferences, type OrdenAvisos } from '../hooks/usePreferences';
import { pinSchema, type PinFormData } from '../schemas/pinSchema';
import { borrarCacheDeAvisos } from '../storage/avisosCache';
import { blockCard, blocks, colors, font, radius, spacing } from '../theme';

// Las claves de SecureStore solo admiten letras, números, ".", "-" y "_".
const PIN_KEY = 'jardin.pin_direccion';

const ETIQUETAS_ORDEN: Record<OrdenAvisos, string> = {
  recientes: 'Recientes',
  az: 'A → Z',
  za: 'Z → A',
};

export default function AjustesScreen() {
  const { ordenAvisos, setOrdenAvisos, modoCompacto, setModoCompacto, avisosPorPagina, setAvisosPorPagina } =
    usePreferences();

  const [tienePin, setTienePin] = useState(false);
  const [pinOculto, setPinOculto] = useState<string | null>(null);

  const { control, handleSubmit, reset, formState } = useForm<PinFormData>({
    resolver: zodResolver(pinSchema),
    defaultValues: { pin: '' },
  });

  useEffect(() => {
    SecureStore.getItemAsync(PIN_KEY)
      .then((valor) => setTienePin(valor !== null))
      .catch(() => setTienePin(false));
  }, []);

  const guardarPin = async ({ pin }: PinFormData) => {
    try {
      await SecureStore.setItemAsync(PIN_KEY, pin);
      setTienePin(true);
      setPinOculto(null);
      reset({ pin: '' });
      Alert.alert('PIN guardado', 'El PIN quedó guardado de forma segura en este teléfono.');
    } catch {
      Alert.alert('No se pudo guardar', 'Inténtalo de nuevo.');
    }
  };

  // Nunca se muestra el PIN completo: solo puntos y la cantidad de dígitos.
  const verPin = async () => {
    try {
      const valor = await SecureStore.getItemAsync(PIN_KEY);
      if (!valor) {
        Alert.alert('Sin PIN', 'Todavía no hay un PIN guardado.');
        return;
      }
      setPinOculto(`${'•'.repeat(valor.length)}  (${valor.length} dígitos)`);
    } catch {
      Alert.alert('No se pudo leer', 'Inténtalo de nuevo.');
    }
  };

  const eliminarPin = () => {
    Alert.alert('Eliminar PIN', '¿Seguro que quieres eliminar el PIN guardado?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          await SecureStore.deleteItemAsync(PIN_KEY);
          setTienePin(false);
          setPinOculto(null);
        },
      },
    ]);
  };

  const borrarCopiaLocal = () => {
    Alert.alert(
      'Borrar copia local',
      'Se borrarán los avisos guardados en el teléfono, incluidos los que creaste aquí. ¿Continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            await borrarCacheDeAvisos();
            Alert.alert('Listo', 'La copia local de avisos fue borrada.');
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      {/* ── MMKV ───────────────────────────────────────────── */}
      <Text style={styles.sectionTitle}>Cómo se ven los avisos</Text>
      <Text style={styles.hint}>Estos cambios se guardan solos, al instante.</Text>

      <View style={[styles.card, styles.rowBetween]}>
        <View style={styles.rowInfo}>
          <Text style={styles.label}>Modo compacto</Text>
          <Text style={styles.desc}>Muestra solo el título de cada aviso.</Text>
        </View>
        <Switch
          value={modoCompacto}
          onValueChange={setModoCompacto}
          trackColor={{ false: colors.line, true: blocks.blue.main }}
          thumbColor="#FFFFFF"
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Orden de la lista</Text>
        <View style={styles.chips}>
          {(Object.keys(ETIQUETAS_ORDEN) as OrdenAvisos[]).map((orden) => (
            <Chip
              key={orden}
              label={ETIQUETAS_ORDEN[orden]}
              selected={ordenAvisos === orden}
              onPress={() => setOrdenAvisos(orden)}
            />
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Avisos por página</Text>
        <View style={styles.chips}>
          {OPCIONES_POR_PAGINA.map((n) => (
            <Chip key={n} label={String(n)} selected={avisosPorPagina === n} onPress={() => setAvisosPorPagina(n)} />
          ))}
        </View>
      </View>

      {/* ── AsyncStorage ───────────────────────────────────── */}
      <Text style={[styles.sectionTitle, styles.sectionGap]}>Datos en el teléfono</Text>
      <Text style={styles.hint}>
        Los avisos se guardan para poder verlos sin internet. También se conservan los que crees.
      </Text>
      <Pressable style={styles.outlineButton} onPress={borrarCopiaLocal} accessibilityRole="button">
        <Text style={styles.outlineButtonText}>Borrar copia local de avisos</Text>
      </Pressable>

      {/* ── SecureStore ────────────────────────────────────── */}
      <Text style={[styles.sectionTitle, styles.sectionGap]}>Seguridad</Text>
      <Text style={styles.hint}>
        PIN de la dirección. Se guarda cifrado con SecureStore y nunca se muestra completo en pantalla.
      </Text>

      <View style={styles.card}>
        <Text style={styles.status}>{tienePin ? '✅ Hay un PIN guardado' : 'No hay un PIN guardado'}</Text>
        {pinOculto && <Text style={styles.masked}>{pinOculto}</Text>}

        <FormField
          control={control}
          name="pin"
          label={tienePin ? 'Nuevo PIN (reemplaza al anterior)' : 'PIN (4 a 6 dígitos)'}
          keyboardType="number-pad"
          secureTextEntry
          maxLength={6}
          placeholder="••••"
        />
        <SubmitButton label="Guardar PIN" onPress={handleSubmit(guardarPin)} loading={formState.isSubmitting} />

        {tienePin && (
          <View style={styles.rowButtons}>
            <Pressable style={[styles.outlineButton, styles.flex]} onPress={verPin} accessibilityRole="button">
              <Text style={styles.outlineButtonText}>Ver PIN</Text>
            </Pressable>
            <Pressable
              style={[styles.outlineButton, styles.flex, styles.danger]}
              onPress={eliminarPin}
              accessibilityRole="button"
            >
              <Text style={[styles.outlineButtonText, { color: colors.warn }]}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.ink },
  sectionGap: { marginTop: spacing.lg },
  hint: { fontSize: font.sm, color: colors.muted },
  card: { ...blockCard, padding: spacing.lg, gap: spacing.md },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowInfo: { flex: 1, marginRight: spacing.md, gap: 2 },
  label: { fontSize: font.md, fontWeight: '800', color: colors.ink },
  desc: { fontSize: font.sm, color: colors.muted },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  status: { fontSize: font.md, fontWeight: '700', color: colors.ink },
  masked: { fontSize: font.lg, fontWeight: '800', color: blocks.blue.main, letterSpacing: 2 },
  outlineButton: {
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  outlineButtonText: { fontSize: font.md, fontWeight: '800', color: colors.ink },
  rowButtons: { flexDirection: 'row', gap: spacing.md },
  flex: { flex: 1 },
  danger: { borderColor: colors.warn },
});
