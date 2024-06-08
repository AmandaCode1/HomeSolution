// admin.component.ts

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { OfertaDto, } from '../ofertaDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ServicioDto } from '../serviciosDto';
import { UsuarioDto } from '../usuario-dto';
import { AdminEditarUsuarioDto } from '../admin-editar-usuario-dto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  
  usuarioEditado: AdminEditarUsuarioDto = {
    nombreUsuario: '',
    correoElectronico: '',
    password: '',
    rol: '',
    telefono: '',
    direccion: ''
  };
  idUsuarioEditar: number = 0;


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
  
  nuevoServicio: ServicioDto = {
    descripcionServicio: '',
    precio: 0,
    duracion: 0,
    categoriaServicio: ''
  };

  idServicioEliminar: number = 0;
  servicioEditado: ServicioDto = {
    descripcionServicio: '',
    precio: 0,
    duracion: 0,
    categoriaServicio: ''
  };

  nuevoUsuario: UsuarioDto = {
    nombre: '',
    correoElectronico: '',
    password: '',
    rol: '',
    telefono: '',
    direccion: ''
  };

  idUsuarioEliminar: number = 0;
  idServicioEditar: number = 0;

  

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
  crearServicio(): void {
    if (!this.nuevoServicio.descripcionServicio || !this.nuevoServicio.precio || !this.nuevoServicio.duracion || !this.nuevoServicio.categoriaServicio) {
      alert('Por favor, rellene todos los campos');
      return;
    }

    this.adminService.crearServicio(this.nuevoServicio)
      .subscribe(
        respuesta => {
          console.log('Servicio creado exitosamente:', respuesta);
        },
        error => {
          console.error('Error al crear servicio:', error);
        }
      );
  }

  eliminarServicio(): void {
    if (!this.idServicioEliminar) {
      alert('Por favor, introduzca el ID del servicio a eliminar');
      return;
    }

    this.adminService.eliminarServicio(this.idServicioEliminar)
      .subscribe(
        () => {
          console.log(`Servicio con ID ${this.idServicioEliminar} eliminado exitosamente`);
        },
        error => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.log(error.error);
          } else {
            console.error(`Error al eliminar el servicio con ID ${this.idServicioEliminar}:`, error);
          }
        }
      );
  }

  editarServicio(): void {
    if (!this.idServicioEditar || !this.servicioEditado.descripcionServicio || !this.servicioEditado.precio || !this.servicioEditado.duracion || !this.servicioEditado.categoriaServicio) {
      alert('Por favor, rellene todos los campos');
      return;
    }

    this.adminService.editarServicio(this.idServicioEditar, this.servicioEditado)
      .subscribe(
        () => {
          console.log(`Servicio con ID ${this.idServicioEditar} editado exitosamente`);
        },
        error => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.log(error.error);
          } else {
            console.error(`Error al editar el servicio con ID ${this.idServicioEditar}:`, error);
          }
        }
      );
  }

  eliminarUsuario(): void {
    if (!this.idUsuarioEliminar) {
      alert('Por favor, introduzca el ID del usuario a eliminar');
      return;
    }
  
    this.adminService.eliminarUsuario(this.idUsuarioEliminar)
      .subscribe(
        () => {
          console.log(`Usuario con ID ${this.idUsuarioEliminar} eliminado exitosamente`);
          // Aquí puedes agregar lógica adicional si es necesario, como actualizar la lista de usuarios después de eliminar uno
        },
        error => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            console.log(error.error);
          } else {
            console.error(`Error al eliminar el usuario con ID ${this.idUsuarioEliminar}:`, error);
          }
        }
      );
  }

  editarUsuario(): void {
    if (!this.idUsuarioEditar || !this.usuarioEditado.nombreUsuario || !this.usuarioEditado.correoElectronico || !this.usuarioEditado.password) {
      alert('Por favor, rellene todos los campos obligatorios');
      return;
    }

    this.adminService.editarUsuario(this.idUsuarioEditar, this.usuarioEditado)
      .subscribe(
        () => {
          console.log(`Usuario con ID ${this.idUsuarioEditar} editado exitosamente`);
     
        },
        error => {
          console.error(`Error al editar el usuario con ID ${this.idUsuarioEditar}:`, error);
        }
      );
  }

}