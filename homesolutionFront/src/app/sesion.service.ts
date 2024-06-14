import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  constructor(private router: Router) { }

  iniciarSesion(token: string, rol: string, userId:string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
  localStorage.setItem('userId',userId);
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');

  }
  obtenerIdUsuario(): number {
    return parseInt(localStorage.getItem('userId') || '0', 10); 
  }
}
