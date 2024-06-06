// admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfertaDto } from './ofertaDto';

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
}