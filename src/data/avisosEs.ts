// Los avisos de ejemplo vienen de JSONPlaceholder, cuyo texto es "lorem ipsum" (latín).
// Esta tabla pone el contenido en español usando el id del post, sin dejar de hacer
// la petición real con Axios (loading, errores y reintentos siguen funcionando igual).
// Los avisos que crea o edita la persona NO se traducen: llevan lo que ella escribió.
export interface TextoAviso {
  titulo: string;
  mensaje: string;
}

export const AVISOS_ES: Record<number, TextoAviso> = {
  1: { titulo: 'Reunión general de padres de familia', mensaje: 'Los esperamos el viernes a las 6:00 p. m. en el salón principal para conversar sobre el avance del primer periodo. Por favor confirmar asistencia con la docente.' },
  2: { titulo: 'Uniforme de educación física', mensaje: 'Recordamos que los martes y jueves los niños deben venir con la sudadera y los tenis del jardín. Marcar todas las prendas con el nombre del niño.' },
  3: { titulo: 'Salida pedagógica al parque ecológico', mensaje: 'El próximo miércoles visitaremos el parque ecológico con los grupos de párvulos y prejardín. Enviar la autorización firmada, gorra y una botella de agua.' },
  4: { titulo: 'Pago de la pensión de este mes', mensaje: 'La fecha límite para el pago de la pensión es el día 10. Pueden pagar en la administración o por transferencia enviando el soporte al correo del jardín.' },
  5: { titulo: 'Celebración del Día del Niño', mensaje: 'Habrá juegos, música y refrigerio saludable. Los niños pueden venir disfrazados de su personaje favorito. Se ruega no enviar dulces ni juguetes de casa.' },
  6: { titulo: 'Horario especial por jornada pedagógica', mensaje: 'El viernes el jardín atenderá solo hasta las 12:00 m. por la capacitación del personal docente. El servicio de ruta saldrá a las 12:15 p. m.' },
  7: { titulo: 'Lista de útiles para el segundo periodo', mensaje: 'Necesitamos una caja de plastilina, dos pliegos de cartulina de colores y un block de papel iris. Pueden entregarlos a la docente hasta el lunes.' },
  8: { titulo: 'Jornada de vacunación en el jardín', mensaje: 'La secretaría de salud realizará una jornada de vacunación el jueves por la mañana. Quienes deseen participar deben traer el carné de vacunas del niño.' },
  9: { titulo: 'Taller de música para las familias', mensaje: 'Invitamos a las familias al taller de música y canto del sábado a las 9:00 a. m. Compartiremos rondas y canciones que los niños aprenden en clase.' },
  10: { titulo: 'Cambio de ruta escolar', mensaje: 'A partir del lunes la ruta de la zona norte pasará 10 minutos más temprano. Por favor tener a los niños listos en el punto de encuentro habitual.' },
  11: { titulo: 'Entrega de boletines del primer periodo', mensaje: 'Los boletines se entregarán de manera personal durante la reunión con cada docente. Pueden separar su cita en la recepción del jardín.' },
  12: { titulo: 'Semana de la lectura', mensaje: 'Durante esta semana cada niño traerá un cuento de casa para compartir con sus compañeros. Al final lo llevará de regreso, marcado con su nombre.' },
  13: { titulo: 'Recomendaciones por temporada de lluvias', mensaje: 'Enviar a los niños con un cambio de ropa completo y una chaqueta impermeable. Recuerden marcar las botas y los paraguas con el nombre.' },
  14: { titulo: 'Inscripciones abiertas para el próximo año', mensaje: 'Ya están abiertas las inscripciones para el nuevo año escolar. Los hermanos de niños actuales tienen un descuento en la matrícula hasta fin de mes.' },
  15: { titulo: 'Fumigación de las instalaciones', mensaje: 'El sábado se realizará la fumigación preventiva del jardín con productos aprobados. El lunes los salones estarán ventilados y listos para recibir a los niños.' },
  16: { titulo: 'Muestra de arte y manualidades', mensaje: 'Los trabajos de los niños estarán expuestos en el pasillo central toda la semana. Las familias pueden visitarla en el horario de entrada o de salida.' },
  17: { titulo: 'Ingreso y salida de los niños', mensaje: 'Para la seguridad de todos, solo se entregará a los niños a las personas autorizadas en la ficha de matrícula. Cualquier cambio debe avisarse por escrito.' },
  18: { titulo: 'Almuerzos y loncheras saludables', mensaje: 'Pedimos incluir frutas y evitar las gaseosas y las golosinas en las loncheras. La nutricionista enviará un menú de ejemplo por el grupo de familias.' },
  19: { titulo: 'Reunión del comité de padres', mensaje: 'El comité de padres se reunirá el martes a las 5:30 p. m. para organizar la fiesta de fin de año. Toda la comunidad está invitada a participar.' },
  20: { titulo: 'Vacaciones de mitad de año', mensaje: 'Las clases terminan el viernes y se retoman el primer lunes de julio. Les deseamos a todas las familias unas vacaciones tranquilas y llenas de juegos.' },
};
