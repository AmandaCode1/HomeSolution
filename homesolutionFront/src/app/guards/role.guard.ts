import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SesionService } from '../sesion.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private sesionService: SesionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const userRole = this.sesionService.obtenerRol();

    if (userRole === expectedRole) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
