// admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfertaDto } from './ofertaDto';
import { ServicioDto } from './serviciosDto';
import { UsuarioDto } from './usuario-dto';
import { AdminEditarUsuarioDto } from './admin-editar-usuario-dto';

  @Injectable({
    providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7161/api';

  constructor(private http: HttpClient) {}

  crearOferta(oferta: OfertaDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Ofertas/CrearOferta`, oferta);
  }

  eliminarOferta(idOferta: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Ofertas/BorrarOferta/${idOferta}`);
  }

  obtenerOferta(idOferta: number): Observable<OfertaDto> {
    return this.http.get<OfertaDto>(`${this.apiUrl}/Ofertas/VerOferta/${idOferta}`);
  }

  editarOferta(idOferta: number, ofertaEditada: OfertaDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Ofertas/AdminEditarOferta/${idOferta}`, ofertaEditada);
  }

  crearServicio(servicio: ServicioDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Servicios/CrearServicio`, servicio);
  }

  eliminarServicio(idServicio: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Servicios/BorrarServicio/${idServicio}`);
  }

  editarServicio(idServicio: number, servicioEditado: ServicioDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Servicios/AdminEditarServicio/${idServicio}`, servicioEditado);
  }



  eliminarUsuario(idUsuario: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Usuarios/BorrarUsuario/${idUsuario}`);
  }
  editarUsuario(idUsuario: number, usuarioEditado: AdminEditarUsuarioDto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Usuarios/AdminEditarUsuario/${idUsuario}`, usuarioEditado);
  }
}