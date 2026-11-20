// SEMANA 6: campo reutilizable conectado a React Hook Form (Controller + TextInput + error).
// Tipado con genéricos, sin any.
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

interface Props<TIn extends FieldValues, TContext, TOut>
  extends Omit<TextInputProps, 'value' | 'onChangeText' | 'onBlur'> {
  control: Control<TIn, TContext, TOut>;
  name: Path<TIn>;
  label: string;
}

export default function FormField<TIn extends FieldValues, TContext, TOut>({
  control,
  name,
  label,
  style,
  ...inputProps
}: Props<TIn, TContext, TOut>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const mensaje = fieldState.error?.message;
        return (
          <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              placeholderTextColor={colors.muted}
              accessibilityLabel={label}
              style={[styles.input, !!mensaje && styles.inputError, style]}
              value={field.value == null ? '' : String(field.value)}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              {...inputProps}
            />
            {!!mensaje && <Text style={styles.error}>{mensaje}</Text>}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs },
  label: { fontSize: font.sm, fontWeight: '800', color: colors.ink },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: font.md,
    color: colors.ink,
  },
  inputError: { borderColor: colors.warn },
  error: { fontSize: font.sm, color: colors.warn, fontWeight: '600' },
});
