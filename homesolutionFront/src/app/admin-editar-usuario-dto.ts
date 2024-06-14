export interface AdminEditarUsuarioDto {
    nombreUsuario: string;
    correoElectronico: string;
    password: string;
    rol?: string;
    telefono?: string;
    direccion?: string;
  }
  
  export interface CrearUsuarioDto {
    nombreUsuario: string;
    correoElectronico: string;
    password: string;
    rol?: string;
    telefono?: string;
    direccion?: string;
  }