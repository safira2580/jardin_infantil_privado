# Semana 4: estado global con Zustand

Proyecto: Jardín Infantil Semillitas (dominio: jardín infantil privado).

## Qué se logró
- Se reemplazó `MaterialsContext` (Context API) por **stores de Zustand**.
- Tres stores independientes, cada uno con su estado y sus acciones:
  - `useMaterialsStore`: lista de materiales, `addMaterial`, `ajustarStock`.
  - `useNinosStore`: lista de niños y `marcarAsistencia`.
  - `useFavoritosStore`: ids de materiales favoritos y `toggleMaterial`.
- Se eliminó el `Provider` de `App.tsx`: los stores son globales y no necesitan envolver la app.
- Las pantallas leen el estado con **selectores** (`useStore((s) => s.campo)`), así solo se re-renderizan cuando cambia lo que usan.

## Paso a paso
1. **Instalar Zustand**
   ```bash
   npx expo install zustand
   ```
2. **Crear la carpeta `src/store/`** y un archivo por store. Estructura de cada store:
   ```ts
   export const useXStore = create<XState>((set) => ({
     dato: valorInicial,
     accion: (arg) => set((state) => ({ dato: /* nuevo valor sin mutar */ })),
   }));
   ```
3. **Migrar materiales**: se copió la lógica de `addMaterial` desde el Context al store y se agregó `ajustarStock`. Se actualizaron `HomeScreen`, `GrupoDetailScreen`, `MaterialDetailScreen`, `MaterialFormScreen` y `MaterialesListScreen` para usar `useMaterialsStore`.
4. **Crear el store de niños**: `Home`, `Niños` y `Grupo` leen `ninos` del store; en la ficha del niño los botones Presente / Ausente / Por confirmar llaman a `marcarAsistencia`. El cambio se ve al instante en Inicio (contador de presentes y borde de la foto) y en el detalle del grupo.
5. **Crear el store de favoritos**: corazón en el detalle del material, corazón pequeño en la tarjeta y filtro "Solo favoritos" en la lista.
6. **Quitar el Provider**: `App.tsx` ya no usa `MaterialsProvider` y se borró `src/context/`.

## Reglas que se aplicaron
- Actualizar siempre **sin mutar** (`map`, `filter`, spread).
- Seleccionar solo lo necesario: `useNinosStore((s) => s.ninos)`, no el store completo.
- No crear arrays u objetos nuevos dentro del selector (en Zustand 5 provoca renders infinitos); lo derivado se calcula en el componente con `filter`/`useMemo`.
- Un store por responsabilidad, en vez de un store gigante.

## Cómo probarlo
1. Ficha de un niño → cambia la asistencia → vuelve a Inicio y mira el contador.
2. Material → botones − / + → Inicio, sección "Por reponer".
3. Material → corazón → lista de materiales → "Solo favoritos".

## Pendiente (semanas siguientes)
- Persistir los stores en el dispositivo (middleware `persist`), normalmente con la semana de almacenamiento local.
