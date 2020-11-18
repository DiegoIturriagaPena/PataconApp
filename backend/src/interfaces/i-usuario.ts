export interface IUsuario {
  rut?: string;
  correo?: string;
  nombres?: string;
  username?: string;
  password?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  telefono?: number;
  api_token?: string;
  rol?: number;
  password_generated?: boolean;
  password_set?: boolean;
  estado?: number;
}
