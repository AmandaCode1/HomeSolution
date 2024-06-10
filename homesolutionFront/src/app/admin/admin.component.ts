// admin.component.ts

import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { AdminEditarOfertaDto, EnlazarOfertaUsuarioDto, OfertaDto, } from '../ofertaDto';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  oferta: AdminEditarOfertaDto = {
    descripcionOferta: '',
    categoriaServicio: '',
    servicioId: 0,

  };
  ofertaId: number = 0;
  nuevaOferta: OfertaDto = {
    descripcionOferta: '',
    categoriaServicio: '',
    servicioId: 0
  };

  Verferta: any;

  servicioId!: number;
  servicio: any;

  nuevoServicio: any = {
    descripcionServicio: '',
    precio: 0,
    duracion: 0,
    categoriaServicio: ''
  };

  editarServicioDto: any = {
    descripcionServicio: '',
    precio: null,
    duracion: null,
    categoriaServicio: ''
  };

  listaUsuarios: any[] | undefined;

  crearUsuarioDto: any = {
    nombreUsuario: '',
    correoElectronico: '',
    password: '',
    rol: '',
    telefono: '',
    direccion: ''
  };

  idUsuario!: number;
  AdminEditarUsuarioDto: any = {
    nombreUsuario: '',
    password: '',
    rol: '',
    correoElectronico: '',
    direccion: '',  
    telefono: ''
  };

 
  message: string | undefined;

  usuariosOfertas: any;
  EnlazarOfertaUsuarioDto:any={
    usuarioId: 0,
    ofertaId: 0,
  }
usuarioId: any;
  mensaje: string | undefined;
  mensaje2: string | undefined;

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerListaUsuarios();
    this.obtenerUsuariosOfertas();
  }
  crearOferta(crearOfertaDto: any): void {
    this.adminService.crearOferta(crearOfertaDto).subscribe(
      (data) => {

        console.log('Oferta creada correctamente:', data);
      },
      (error) => {

        console.error('Error al crear oferta:', error);
      }
    );
  }
  verOferta() {
    this.adminService.verOferta(this.ofertaId).subscribe(
      (data) => {
        this.oferta = data;
      },
      (error) => {
        console.error('Error al obtener la oferta:', error);
      }
    );
  }
  editarOferta() {
    this.adminService.editarOferta(this.ofertaId, this.oferta).subscribe(
      (data) => {
        console.log('Oferta editada correctamente:', data);

      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log(error.error);
        } else {
          console.error('Error al editar la oferta:', error);

        }
      })

  }
  borrarOferta(): void {
    this.adminService.borrarOferta(this.ofertaId).subscribe(
      (data) => {
        console.log('Oferta eliminada correctamente:', data);

      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log(error.error);
        } else {
          console.error(`Error al eliminar la oferta con ID ${this.ofertaId}:`, error);
        }

      })
  }

  verServicio(): void {
    this.adminService.verServicio(this.servicioId).subscribe(
      (data) => {
        this.servicio = data;
        console.log('Servicio encontrado:', this.servicio);
      },
      (error) => {
        console.error('Error al obtener el servicio:', error);
      }
    );
  }
  crearServicio(): void {
    this.adminService.crearServicio(this.nuevoServicio).subscribe(
      (data) => {
        console.log('Servicio creado correctamente:', data);

      },
      (error) => {
        console.error('Error al crear el servicio:', error);

      }
    );
  }
  editarServicio(): void {
    this.adminService.editarServicio(this.servicioId, this.editarServicioDto).subscribe(
      (data) => {
        console.log('Servicio editado correctamente:', data);

      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log(error.error);
        } else {
          console.error(`Error al editar el servicio con ID ${this.servicioId}:`, error);
        }
      }
    );
  }
  borrarServicio(): void {
    this.adminService.borrarServicio(this.servicioId).subscribe(
      (data) => {
        console.log('Servicio eliminado correctamente:', data);

      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log(error.error);
        } else {
          console.error('Error al eliminar el servicio:', error);

        }
      }
    );
  }
  obtenerListaUsuarios(): void {
    this.adminService.obtenerListaUsuarios().subscribe(
      (data) => {
        this.listaUsuarios = data;
        console.log('Lista de usuarios obtenida correctamente:', this.listaUsuarios);
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }
  crearUsuario(): void {
    this.adminService.crearUsuario(this.crearUsuarioDto).subscribe(
      (data) => {
        console.log('Usuario creado correctamente:', data);

      },
      (error) => {
        console.error('Error al crear el usuario:', error);

      }
    );
  }
  editarUsuario(): void {
    this.adminService.editarUsuario(this.idUsuario, this.AdminEditarUsuarioDto).subscribe(
      (data) => {
        console.log('Usuario editado correctamente:', data);

      },
      (error) => {
        console.error('Error al editar el usuario:', error);

      }
    );
  }
  borrarUsuario(): void {
    this.adminService.borrarUsuario(this.idUsuario).subscribe(
      (data) => {
        console.log('Usuario eliminado correctamente:', data);

      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log(error.error);
        } else {
          console.error('Error al eliminar el servicio:', error);

        }
      }
    );
  }
  obtenerUsuariosOfertas(): void {
    this.adminService.obtenerUsuariosOfertas().subscribe(
      data => {
        this.usuariosOfertas = data;
      },
      error => {
        console.error('Error al obtener usuarios ofertas:', error);
      }
    );
  }
  
enlazarOfertaUsuario(): void {
  this.adminService.enlazarOfertaUsuario(this.usuarioId, this.ofertaId).subscribe(
    response => {
      this.mensaje2 = 'Oferta enlazada exitosamente';
    },
    error => {
      console.error('Error del servidor:', error);
      this.message = 'Error al enlazar oferta con usuario: ' + (error.error?.message || error.message);
    }
  );
}
borrarOfertaUsuario(): void {
  this.adminService.borrarOfertaUsuario(this.usuarioId, this.ofertaId).subscribe(
    response => {
      this.mensaje = response.message;
    },
    error => {
      this.mensaje = `Error al borrar la oferta del usuario: ${error.message}`;
    }
  );
}
}

