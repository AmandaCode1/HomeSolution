// admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminEditarOfertaDto, EnlazarOfertaUsuarioDto, OfertaDto } from './ofertaDto';
import { ServicioDto } from './serviciosDto';
import { AdminEditarUsuarioDto } from './admin-editar-usuario-dto';

  @Injectable({
    providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7161/api';

  constructor(private http: HttpClient) {}

  crearOferta(OfertaDto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>('https://localhost:7161/api/Ofertas/CrearOferta', OfertaDto, { headers });
  }
  verOferta(idOferta: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/Ofertas/VerOferta/${idOferta}`, { headers });
  }
  editarOferta(idOferta: number, adminEditarOfertaDto: AdminEditarOfertaDto): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/Ofertas/AdminEditarOferta/${idOferta}`, adminEditarOfertaDto, { headers });
  }
  borrarOferta(idOferta: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/Ofertas/BorrarOferta/${idOferta}`, { headers });
  }

  verServicio(idServicio: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/Servicios/VerServicio/${idServicio}`, { headers });
  }

  crearServicio(servicioDto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Servicios/CrearServicio`, servicioDto, { headers });
  }

  eliminarServicio(idServicio: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Servicios/BorrarServicio/${idServicio}`);
  }

  editarServicio(idServicio: number, adminEditarServicioDto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/Servicios/AdminEditarServicio/${idServicio}`, adminEditarServicioDto, { headers });
  }

  borrarServicio(idServicio: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/Servicios/BorrarServicio/${idServicio}`, { headers });
  }

  obtenerListaUsuarios(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/Usuarios/VerLista`, { headers });
  }
  crearUsuario(AdminEditarUsuarioDto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/Usuarios/CrearUsuario`, AdminEditarUsuarioDto, { headers });
  }
  editarUsuario(idUsuario: number, AdminEditarUsuarioDto: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/Usuarios/AdminEditarUsuario/${idUsuario}`, AdminEditarUsuarioDto, { headers });
  }
  borrarUsuario(idUsuario: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}/Usuarios/BorrarUsuario/${idUsuario}`, { headers });
  }
  obtenerUsuariosOfertas(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/UsuariosOfertas/VerLista`, { headers });
  }
  enlazarOfertaUsuario(usuarioId: number, ofertaId: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/UsuariosOfertas/EnlazarOfertaUsuario?usuarioId=${usuarioId}&ofertaId=${ofertaId}`;
    return this.http.post<any>(url, {}, { headers });
  }
  borrarOfertaUsuario(usuarioId: number, ofertaId: number): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/UsuariosOfertas/BorrarOfertaUsuario?usuarioId=${usuarioId}&ofertaId=${ofertaId}`;
    return this.http.delete<any>(url, { headers });
  }

}