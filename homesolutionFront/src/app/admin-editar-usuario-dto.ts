// admin-editar-usuario-dto.ts

export interface AdminEditarUsuarioDto {
    nombreUsuario: string;
    correoElectronico: string;
    password: string;
    rol?: string;
    telefono?: string;
    direccion?: string;
  }
  