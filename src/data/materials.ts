import type { Material } from '../types/models';

export const MATERIALS: Material[] = [
  { id: 'mat-01', name: 'Colores triangulares x12', category: 'Arte y manualidades', unit: 'caja', price: 14500, stock: 60, minStock: 20, emoji: '🖍️', description: 'Colores gruesos triangulares, fáciles de agarrar para manos pequeñas.' },
  { id: 'mat-02', name: 'Plastilina no tóxica', category: 'Arte y manualidades', unit: 'caja 12 barras', price: 11800, stock: 45, minStock: 20, emoji: '🎨', description: 'Plastilina suave y atóxica para modelado y motricidad fina.' },
  { id: 'mat-03', name: 'Pegante en barra', category: 'Arte y manualidades', unit: 'unidad', price: 4200, stock: 8, minStock: 15, emoji: '🧴', description: 'Pegante lavable y sin solventes para trabajos de collage.' },
  { id: 'mat-04', name: 'Bloques de madera', category: 'Juegos y motricidad', unit: 'set 100 piezas', price: 89000, stock: 6, minStock: 3, emoji: '🧱', description: 'Bloques de construcción en madera con bordes redondeados.' },
  { id: 'mat-05', name: 'Colchonetas de gimnasia', category: 'Juegos y motricidad', unit: 'unidad', price: 65000, stock: 18, minStock: 8, emoji: '🤸', description: 'Colchonetas antideslizantes para circuitos de psicomotricidad.' },
  { id: 'mat-06', name: 'Balones de espuma', category: 'Juegos y motricidad', unit: 'unidad', price: 18500, stock: 0, minStock: 10, emoji: '⚽', description: 'Balones blandos y livianos para juegos de lanzar y atrapar.' },
  { id: 'mat-07', name: 'Cuentos ilustrados', category: 'Lectura y lenguaje', unit: 'unidad', price: 24900, stock: 70, minStock: 25, emoji: '📚', description: 'Cuentos de tapa dura con ilustraciones grandes para lectura en voz alta.' },
  { id: 'mat-08', name: 'Tarjetas de vocabulario', category: 'Lectura y lenguaje', unit: 'set 60 tarjetas', price: 32000, stock: 22, minStock: 10, emoji: '🔤', description: 'Tarjetas con imágenes para ampliar vocabulario y reconocer letras.' },
  { id: 'mat-09', name: 'Jabón líquido antibacterial', category: 'Higiene y cuidado', unit: 'galón', price: 36000, stock: 15, minStock: 6, emoji: '🧼', description: 'Jabón suave para el lavado de manos frecuente de los niños.' },
  { id: 'mat-10', name: 'Pañitos húmedos hipoalergénicos', category: 'Higiene y cuidado', unit: 'paquete 80 und', price: 9800, stock: 120, minStock: 40, emoji: '🧻', description: 'Pañitos sin alcohol ni fragancia para cambio de pañal y limpieza.' },
  { id: 'mat-11', name: 'Vasos y platos plásticos', category: 'Alimentación', unit: 'set x6', price: 15500, stock: 30, minStock: 12, emoji: '🍽️', description: 'Vajilla infantil libre de BPA para refrigerios y almuerzo.' },
  { id: 'mat-12', name: 'Cuaderno de comunicaciones', category: 'Papelería', unit: 'unidad', price: 5200, stock: 90, minStock: 30, emoji: '📒', description: 'Cuaderno para informar a las familias sobre el día de cada niño.' },
];

export const CATEGORIAS = [
  'Arte y manualidades',
  'Juegos y motricidad',
  'Lectura y lenguaje',
  'Higiene y cuidado',
  'Alimentación',
  'Papelería',
] as const;
