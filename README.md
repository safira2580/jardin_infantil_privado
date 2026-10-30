# Jardín Infantil Semillitas - Semana 04: Zustand (sobre React Navigation 7)

Bootcamp React Native (bc-reactnative) - Dominio: **Jardín infantil privado** (grupos y material didáctico).

## Qué incluye esta semana
- Todo lo de las semanas 1 y 2.
- **Bottom Tabs** (Inicio, Grupos, Material, Contacto) con **Native Stack** anidado en Grupos y Material.
- Detalle de grupo y de material con **parámetros tipados** (`grupoId`, `materialId`).
- Navegación cruzada: desde un grupo al material que usa, y desde un material a los grupos que lo usan.
- Formulario de nuevo material como pantalla **modal**.

## Archivos principales
- `src/navigation/` (RootTabs, GruposStack, MaterialesStack)
- `src/types/navigation.ts` (tipos de rutas)
- `src/screens/GrupoDetailScreen.tsx`, `MaterialDetailScreen.tsx`

## Cómo ejecutarlo
```bash
npm install
npx expo install --fix
npx expo start -c
```

## Mapa de navegación
```
RootTabs (Bottom Tabs)
├── InicioTab       -> HomeScreen
├── GruposTab       -> GruposStack
│     ├── GruposList
│     └── GrupoDetail     { grupoId: string }
├── NinosTab        -> NinosStack
│     ├── NinosList
│     └── NinoDetail      { ninoId: string }
├── MaterialesTab   -> MaterialesStack
│     ├── MaterialesList
│     ├── MaterialDetail  { materialId: string }
│     └── MaterialForm    (modal)
└── ContactoTab     -> ContactoScreen
```

## Rediseño visual
- Estilo de "cubos de juguete": fichas con borde inferior grueso y los cuatro colores de la imagen de inicio (`blocks` en `src/theme.ts`).
- Nueva pestaña **Niños** con fotos (ilustraciones en `assets/ninos/`), búsqueda, filtro por grupo y ficha con llamada al acudiente.
- Inicio con resumen del día, tira de niños y estadísticas en bloques de color.
- Para usar fotos reales: reemplaza los PNG de `assets/ninos/` (mismo nombre) o cambia `foto` en `src/data/ninos.ts`.

## Semana 4: estado global con Zustand
Stores en `src/store/` (materiales, niños y favoritos). Detalle y paso a paso en `docs/semana-04-zustand.md`.

## Siguiente semana
Semana 5: estado de servidor con TanStack Query.
