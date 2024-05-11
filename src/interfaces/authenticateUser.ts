export interface AuthenticateUser {
  sessionInfo: any | null;
  usuario: string | null;
  isLogged: boolean | null;
  handleChangeSession: () => void;
  logout: () => void;
  validateSession: () => Promise<boolean>;
}
