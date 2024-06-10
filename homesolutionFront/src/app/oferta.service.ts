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
}
