import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfertaService {
  private apiUrl = 'https://localhost:7161/api/Ofertas';

  constructor(private http: HttpClient) { }

  getOfertas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/VerLista`);
  }

  verOferta(idOferta: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/VerOferta/${idOferta}`);
  }

  crearOferta(oferta: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CrearOferta`, oferta);
  }

  adminEditarOferta(idOferta: number, adminEditarOfertaDto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/AdminEditarOferta/${idOferta}`, adminEditarOfertaDto);
  }

  borrarOferta(idOferta: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/BorrarOferta/${idOferta}`);
  }


}
