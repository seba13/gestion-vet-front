export interface Pet {
  id: number;
  nombre: string;
  edad: number;
  tipo: string;
  raza: string;
  sexo: string;
  fecNac: string;
}

export interface PetList {
  listOfPets: Pet[] | null;
}
