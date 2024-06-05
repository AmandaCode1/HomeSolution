import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionService } from '../sesion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sesionService: SesionService, private router: Router) {}

  canActivate(): boolean {
    if (this.sesionService.estaAutenticado()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
