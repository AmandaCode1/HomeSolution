import { Component, OnInit } from '@angular/core';
import { SesionService } from '../sesion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  autenticado: boolean = false;
  isCollapsed: boolean = true;
  idiomaActual: string = 'es'; 
  iconoIdioma: string = 'en'; 

  constructor(
    private sesionService: SesionService,
    private translate: TranslateService 
  ) {}

  ngOnInit(): void {
    this.autenticado = this.sesionService.estaAutenticado();
  }

  aplicarAnimacion(event: MouseEvent) {
    const target = event.target as HTMLElement;
  
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('animacion-raya');
    });
  
    target.classList.add('animacion-raya');
  
    setTimeout(() => {
      target.classList.remove('animacion-raya');
    }, 50000); 
  }

  desactivarAnimacion(event: MouseEvent) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('animacion-raya');
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  cambiarIdioma() {
    this.iconoIdioma = this.idiomaActual === 'es' ? 'en' : 'es';
    this.idiomaActual = this.idiomaActual === 'es' ? 'en' : 'es';
    this.translate.use(this.idiomaActual);
  }
}
