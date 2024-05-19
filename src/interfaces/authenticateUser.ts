export interface AuthenticateUser {
  nombreUsuario: string | null;
  nombreEmpleado: string | null; 
  apellidoPaterno: string | null;
  idUsuario: string | null;
  idEmpleado: string | null;
  token: string | null;
  handleChangeSession: () => void;
  logout: () => void;
  validateSession: () => Promise<boolean>;
}
