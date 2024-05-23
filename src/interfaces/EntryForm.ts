export interface IEntryForm {
  idFichaIngreso?: string;
  sintomas: string;
  antecedentes: string;
  fechaAlta: string;
  fechaIngreso: string;
  diagnostico: string;
  observaciones: string;
  temperatura: number;
  idEstados: number;
  idFichaClinica: string;
  idMascota?: string;
}

export enum AtentionStatus {
  Activo = 1,
  Inactivo = 2,
  EnEspera = 3,
  EnTratamiento = 4,
  Alta = 5,
  EnObservacion = 6,
  EnRecuperacion = 7,
  EsperaDePago = 8,
  EnProceso = 9,
  Cancelado = 10,
}
