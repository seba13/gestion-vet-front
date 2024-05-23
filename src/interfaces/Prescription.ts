export interface IPrescription {
  idReceta?: string;
  descripcion: string;
  medico: string;
  vigencia: number;
  fechaEmision: string;
  retieneReceta: number;
  idFichaIngreso?: string;
}
