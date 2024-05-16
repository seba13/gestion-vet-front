export interface Pet {
  idMascota: number;
  nombreMascota: string;
  edadMascota: number;
  especie: string;
  raza: string;
  genero: string;
  fecNac?: string;
}

export interface PetList {
  pets: Pet[] | null;
}
