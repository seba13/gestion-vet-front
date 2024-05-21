
export interface PetHistory {
  date: string;
  description: string;
  vetName: string;
}

export interface ClinicalRecord {
  fechaIngreso: string;
  enfermedades: string;
  peso: number;
  observaciones: string;
  antecedentes: string;
  idFichaClinica: string;
}

export interface Treatment {
  descripcion: string;
  fecha: string;
  tipo: string;
  costo: number;
}

export interface AdmissionRecord {
  sintomas: string;
  antecedentes: string;
  fechaAlta: string;
  fechaIngreso: string;
  diagnostico: string;
  observaciones: string;
  temperatura: number;
}
