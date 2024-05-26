import { Component, OnInit } from '@angular/core';
import { SesionService } from '../sesion.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  autenticado: boolean = false;
  constructor(private sesionService: SesionService) {}
  isCollapsed: boolean = true;
  ngOnInit(): void {
    this.autenticado = this.sesionService.estaAutenticado();
  }

  aplicarAnimacion(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('animacion-color');
    });

    target.classList.add('animacion-color');

    setTimeout(() => {
      target.classList.remove('animacion-color');
    }, 50000); 
  }

  desactivarAnimacion(event: MouseEvent) {

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('animacion-color');
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}


