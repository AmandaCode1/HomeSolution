// admin.component.ts

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { OfertaDto } from '../ofertaDto';

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

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  crearOferta(): void {
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
}