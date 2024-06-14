import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroDto } from './registroDto.model';
import { LoginDto } from './loginDto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginRegistroService {
  private apiUrl = 'https://localhost:7161/api/LoginRegistro';

  constructor(private http: HttpClient) { }

  login(loginDto: { nombre: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, loginDto);
  }

  register(registroDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Registro`, registroDto);
  }
  getOfertasUsuario(idUsuario: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/VerOfertasdeUsuario/${idUsuario}`);
  }

}