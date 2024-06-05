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
}