export interface IMedicalRecord {
  idFichaClinica: string;
  fechaIngreso: string;
  enfermedades: string;
  peso: number;
  observaciones: string;
  antecedentes: string;
  idMascota: string;
  idCitaMedica?: null | string;
}
