export interface Tratamiento {
  idTratamiento: string;
  descripcion: string;
  fecha: string;
  tipo: string;
  costo: number;
  idFichaClinica?: string;
}
