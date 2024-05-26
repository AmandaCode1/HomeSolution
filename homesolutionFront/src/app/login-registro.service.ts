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

  registro(registroDto: RegistroDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Registro`, registroDto);
  }

  login(loginDto: LoginDto): Observable<string> {
    return this.http.post(`${this.apiUrl}/Login`, loginDto, { responseType: 'text' });
  }
}