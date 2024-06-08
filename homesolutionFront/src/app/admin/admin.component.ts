// admin.component.ts

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { OfertaDto, } from '../ofertaDto';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  nuevaOferta: OfertaDto = {
    descripcionOferta: '',
    categoriaServicio: '',
    servicioId: 0
  };

  OfertaId: number = 0; 
  ofertaEditada: OfertaDto = {
    descripcionOferta: '',
    categoriaServicio: '',
    servicioId: 0,
  };

  ofertaId: number = 0;   
  constructor(private adminService: AdminService) { }

  ngOnInit(): void { }

  crearOferta(): void {
    if (!this.nuevaOferta.descripcionOferta || !this.nuevaOferta.categoriaServicio || !this.nuevaOferta.servicioId) {
      alert('Por favor, rellene todos los campos');
      return;
    }

    this.adminService.crearOferta(this.nuevaOferta)
      .subscribe(
        respuesta => {
          console.log('Oferta creada exitosamente:', respuesta);
        },
        error => {
          console.error('Error al crear oferta:', error);
        }
      );
  }

  eliminarOferta(idOferta: number): void {
    if (!idOferta) {
      alert('Por favor, introduzca el ID de la oferta a eliminar');
      return;
    }

    this.adminService.eliminarOferta(idOferta)
      .subscribe(
        () => {
          console.log(`Oferta con ID ${idOferta} eliminada exitosamente`);
        },
        error => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.log(error.error);
          } else {
            console.error(`Error al eliminar la oferta con ID ${idOferta}:`, error);
          }
        }
      );
  }

  editarOferta(idOferta: number): void {
    if (!idOferta) {
      alert('Por favor, introduzca el ID de la oferta a editar');
      return;
    }

    this.adminService.obtenerOferta(idOferta)
      .subscribe(
        oferta => {
          this.ofertaEditada = oferta;
        },
        error => {
          console.error(`Error al obtener la oferta con ID ${idOferta} para editar:`, error);
        }
      );
  }

  guardarCambios(): void {
    if (!this.ofertaId || !this.ofertaEditada.descripcionOferta || !this.ofertaEditada.categoriaServicio || !this.ofertaEditada.servicioId) {
      alert('Por favor, rellene todos los campos');
      return;
    }

    this.adminService.editarOferta(this.ofertaId, this.ofertaEditada)
      .subscribe(
        () => {
          console.log(`Oferta con ID ${this.ofertaId} editada exitosamente`);
        },
        error => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.log(error.error);
          } else {
            console.error(`Error al editar la oferta con ID ${this.ofertaId}:`, error);
          }
        }
      );
  }
}