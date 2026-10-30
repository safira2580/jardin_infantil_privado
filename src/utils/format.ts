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

/** Edad en texto: "10 meses" o "4 años". */
export function edadDe(iso: string, hoy: Date = new Date()): string {
  const [y, m, d] = iso.split('-').map(Number);
  let meses = (hoy.getFullYear() - y) * 12 + (hoy.getMonth() + 1 - m);
  if (hoy.getDate() < d) meses -= 1;
  if (meses < 24) return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  return `${Math.floor(meses / 12)} años`;
}

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** "Viernes 30 de octubre" */
export function fechaCorta(hoy: Date = new Date()): string {
  const dia = DIAS[hoy.getDay()];
  return `${dia.charAt(0).toUpperCase()}${dia.slice(1)} ${hoy.getDate()} de ${MESES[hoy.getMonth()]}`;
}
