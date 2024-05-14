export interface IFormEmployee {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: number | string;
  dv: string;
  telefono: number | string;
  direccion: string;
  email: string;
  codMedico: string;
  nombreUsuario: string;
  password: string;
  sexo: string;
  confirmarFormulario?: string;
}
