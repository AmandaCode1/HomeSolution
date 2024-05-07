import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl:  './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  constructor() { }

  aplicarAnimacion(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Elimina la clase de animación de todos los elementos
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('animacion-color');
    });
     // Agrega la clase de animación al elemento seleccionado
    target.classList.add('animacion-color');

    // Elimina la clase de animación después de cierto tiempo
    setTimeout(() => {
      target.classList.remove('animacion-color');
    }, 50000); // Cambia 5000 por el tiempo deseado en milisegundos
  }

  desactivarAnimacion(event: MouseEvent) {
    // Elimina la clase de animación de todos los elementos
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('animacion-color');
    });
  }
}

 
