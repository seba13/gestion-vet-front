export interface IEmployee {
  codMedico: string;
  rut: number | string;
  dv: string;
  fechaNacimiento: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  sexo: string;
  telefono: number | string;
  direccion: string;
  fechaIngreso: string;
  fechaSalida: string;
  idCargo: number;
  idEmpleado: string;
  idEspecialidad: number;
  idEstadoEmpleado: number;
  idPersona: string;
}
export enum EstadoEmpleado {
  Activo = 1,
  Desvinculado = 2,
  Vacaciones = 3,
  Licencia = 4,
  Inactivo = 5,
}
export enum Cargos {
  Veterinario = 1,
  Enfermero = 2,
  Recepcionista = 3,
  Administrador = 4,
}
export enum Especialidad {
  Cirugia = 1,
  Dermatologia = 2,
  Cardiologia = 3,
  Oftalmologia = 4,
  Neurologia = 5,
  Oncologia = 6,
  Exoticos = 7,
  MedicinaGeneral = 8,
  Tens = 9,
}

export enum Sexo {
  Masculino = "m",
  Femenino = "f",
}
