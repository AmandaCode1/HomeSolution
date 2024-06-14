import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroDto } from './registroDto.model';
import { LoginDto } from './loginDto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginRegistroService {
  private apiUrl = 'https://localhost:7161/api/LoginRegistro';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) { }

  login(loginDto: { nombre: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, loginDto);
  }

  register(registroDto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Registro`, registroDto);
  }
  obtenerListaUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Usuarios/VerLista`, { headers: this.headers });
  }

  obtenerDetallesUsuario(nombre: string): Observable<RegistroDto> {
    return this.http.get<RegistroDto>(`${this.apiUrl}/Usuarios/DetalleUsuario?nombre=${nombre}`, { headers: this.headers });
  }
}