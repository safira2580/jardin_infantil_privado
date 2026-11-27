# Semana 7: persistencia local (MMKV, AsyncStorage y SecureStore)

Proyecto: Jardín Infantil Semillitas (dominio: jardín infantil privado).

## Qué se logró
- **MMKV**: preferencias de la lista de avisos (orden, modo compacto y avisos por página). Se guardan al instante y sin botón "Guardar".
- **AsyncStorage**: copia local de los avisos. Sin internet se muestran los últimos avisos guardados, con un aviso amarillo. Los avisos que se crean en la app ahora también se conservan al cerrar la app.
- **SecureStore**: PIN de la dirección guardado cifrado. Nunca se muestra completo en pantalla.
- Pantalla **Ajustes**, a la que se llega con el engranaje de la pestaña Avisos.
- Los avisos de ejemplo ahora salen en **español** (`src/data/avisosEs.ts`).

## Qué guardar en cada lugar
| Dato | Dónde | Por qué |
|---|---|---|
| Orden, modo compacto, avisos por página | MMKV | Son pequeños, se leen seguido y deben ser síncronos y reactivos |
| Lista de avisos (copia sin red) | AsyncStorage | Es una lista más grande y se lee una sola vez al cargar |
| PIN de la dirección | SecureStore | Es un dato sensible: se cifra con Keychain o Keystore |
| Lista de avisos "en vivo" | TanStack Query | Es dato del servidor: lo gestiona la caché de Query |

## Paso a paso
1. **Instalar** (los nativos con `expo install` para que coincidan con SDK 57):
   ```bash
   pnpm expo install @react-native-async-storage/async-storage expo-secure-store
   pnpm add react-native-mmkv@4.3.2 react-native-nitro-modules@0.36.1
   ```
2. **MMKV** (`src/storage/mmkv.ts`): una sola instancia con `createMMKV({ id: 'jardin-storage' })`.
3. **`usePreferences`** (`src/hooks/usePreferences.ts`): `useMMKVString`, `useMMKVBoolean` y `useMMKVNumber`.
   Son reactivos: cambiar un valor redibuja las pantallas que lo usan. Si lo guardado no es válido,
   se usa el valor predeterminado.
4. **Lista de avisos** (`AvisosListScreen.tsx`): ordena según `ordenAvisos`, cambia el diseño con
   `modoCompacto` y muestra solo `avisosPorPagina` avisos, con el botón "Ver más avisos".
5. **Caché offline** (`src/storage/avisosCache.ts` y `useAvisos.ts`): con red se guarda la lista;
   sin red se lee la copia local. Al leer se valida con Zod. El hook anota en MMKV si la lista viene de
   la red o de la copia, y la pantalla muestra el banner.
6. **PIN** (`AjustesScreen.tsx`): `setItemAsync`, `getItemAsync` y `deleteItemAsync`, con formulario
   de React Hook Form y `pinSchema` (4 a 6 dígitos).

## Muy importante: build nativo
MMKV usa código nativo, así que **no funciona con Expo Go**. Hay que generar una "development build":
```bash
pnpm expo run:android      # necesita Android Studio, el SDK de Android y JDK 17
```
`app.json` ya trae `android.package` y `ios.bundleIdentifier` (`com.safira2580.jardinapp`);
cámbialos si quieres otro nombre. Las carpetas `android/` e `ios/` se generan solas y están en `.gitignore`.

## Cómo probarlo
1. Avisos → engranaje → activa **Modo compacto**: la lista pierde los mensajes.
2. Cambia el orden a **A → Z** y los avisos por página a **5**: aparece "Ver más avisos".
3. Cierra la app y ábrela de nuevo: las preferencias siguen igual.
4. Crea un aviso, cierra la app y ábrela: el aviso sigue ahí.
5. Activa el modo avión y abre Avisos de nuevo (cierra la app antes, para que vuelva a cargar):
   se ve el aviso amarillo y la lista guardada.
6. Ajustes → Seguridad: guarda `1234`, pulsa "Ver PIN" (solo muestra puntos) y elimínalo.

## Pendiente (semanas siguientes)
- Semana 8: autenticación (el PIN podría usarse para proteger la publicación de avisos).
