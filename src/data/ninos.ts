import type { Nino } from '../types/models';

// Datos de ejemplo (ficticios). Para agregar foto: foto: require('../../assets/ninos/emma.png')
export const NINOS: Nino[] = [
  { id: 'nino-01', nombre: 'Emma', apellido: 'Castaño', fechaNacimiento: '2025-12-14', grupoId: 'grupo-01', acudiente: 'Laura Castaño', telefono: '573005550101', asistencia: 'presente', nota: 'Toma el biberón a las 10:00 a. m.' },
  { id: 'nino-02', nombre: 'Tomás', apellido: 'Ibáñez', fechaNacimiento: '2024-11-03', grupoId: 'grupo-02', acudiente: 'Jorge Ibáñez', telefono: '573005550102', asistencia: 'presente' },
  { id: 'nino-03', nombre: 'Valentina', apellido: 'Ruiz', fechaNacimiento: '2024-02-19', grupoId: 'grupo-03', acudiente: 'Carolina Ruiz', telefono: '573005550103', asistencia: 'ausente', nota: 'Avisó que hoy tiene cita médica.' },
  { id: 'nino-04', nombre: 'Lucas', apellido: 'Peña', fechaNacimiento: '2023-12-02', grupoId: 'grupo-03', acudiente: 'Andrea Peña', telefono: '573005550104', asistencia: 'presente' },
  { id: 'nino-05', nombre: 'Ana', apellido: 'Mejía', fechaNacimiento: '2023-03-10', grupoId: 'grupo-04', acudiente: 'Felipe Mejía', telefono: '573005550105', asistencia: 'pendiente' },
  { id: 'nino-06', nombre: 'Mateo', apellido: 'Gómez', fechaNacimiento: '2022-06-21', grupoId: 'grupo-05', acudiente: 'Paula Gómez', telefono: '573005550106', asistencia: 'presente', nota: 'Le encanta pintar con las manos.' },
  { id: 'nino-07', nombre: 'Sofía', apellido: 'Lara', fechaNacimiento: '2022-09-08', grupoId: 'grupo-05', acudiente: 'Diego Lara', telefono: '573005550107', asistencia: 'presente' },
  { id: 'nino-08', nombre: 'Santiago', apellido: 'Duarte', fechaNacimiento: '2021-05-14', grupoId: 'grupo-06', acudiente: 'Marta Duarte', telefono: '573005550108', asistencia: 'pendiente' },
];
