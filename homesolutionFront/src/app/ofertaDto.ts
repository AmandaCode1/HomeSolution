// oferta.dto.ts
export interface OfertaDto {
  descripcionOferta: string;
  categoriaServicio: string;
  servicioId: number;
}

export interface AdminEditarOfertaDto {

  descripcionOferta: string;
  categoriaServicio: string;
  servicioId: number;
}


export interface EnlazarOfertaUsuarioDto {
  usuarioId: number;
  ofertaId: number;
}