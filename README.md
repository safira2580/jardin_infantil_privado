# Jardín Infantil Semillitas - Semana 03: React Navigation 7

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
npx expo start
```

## Mapa de navegación
```
RootTabs (Bottom Tabs)
├── InicioTab       -> HomeScreen
├── GruposTab       -> GruposStack
│     ├── GruposList
│     └── GrupoDetail     { grupoId: string }
├── MaterialesTab   -> MaterialesStack
│     ├── MaterialesList
│     ├── MaterialDetail  { materialId: string }
│     └── MaterialForm    (modal)
└── ContactoTab     -> ContactoScreen
```

## Siguiente semana
Semana 4: estado global con Zustand.
