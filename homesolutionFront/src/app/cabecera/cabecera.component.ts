import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  constructor() { }

  aplicarAnimacion(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('animacion-color');
    });

    target.classList.add('animacion-color');

    setTimeout(() => {
      target.classList.remove('animacion-color');
    }, 50000); // el timepo qie dura la animiaciom
  }

  desactivarAnimacion(event: MouseEvent) {

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('animacion-color');
    });
  }
}


