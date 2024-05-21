export interface IAppointment {
  idCitaMedica: string;
  fechaCitaMedica: string;
  horaCitaMedica: string;
  idMascota: string;
  idEstadoCita: number;
}

export interface IAppointments {
  appointments: Array<IAppointment>;
}

export enum EstadosCita {
  Ninguno = 0,
  Agendado = 1,
  Cancelado = 2,
  Finalizado = 3,
}
