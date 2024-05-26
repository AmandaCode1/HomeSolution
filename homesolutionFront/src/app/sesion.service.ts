import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SesionService {


  constructor(private router: Router,) { }

  iniciarSesion(token: string): void {
    localStorage.setItem('token', token);
    setTimeout(() => {
      
      this.router.navigate(['/homesolution']); 
          }, 1000);
         
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }
}
