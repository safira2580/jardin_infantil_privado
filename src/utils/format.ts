import type { Grupo } from '../types/models';

/** Formatea un número como pesos colombianos: $1.250.000 */
export function formatCOP(value: number): string {
  return '$' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** Convierte 2026-01-26 en 26/01/2026 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

/** Porcentaje de cupos ocupados de un grupo (0 a 100). */
export function ocupacionDe(g: Pick<Grupo, 'matriculados' | 'cupos'>): number {
  return g.cupos === 0 ? 0 : Math.round((g.matriculados / g.cupos) * 100);
}
