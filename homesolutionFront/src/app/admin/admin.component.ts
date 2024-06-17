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

  Veroferta: any[] | undefined;
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
  listaServicios: any[] = [];


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
  EnlazarOfertaUsuarioDto: any = {
    usuarioId: 0,
    ofertaId: 0,
  }
  usuarioId: any;
  mensaje: string | undefined;
  mensaje2: string | undefined;
  ofertaCreada = false;
  servicioCreado = false;
  usuarioCreado = false;
  enlazarOferta = false;
  ofertausuarioBorrada = false;
  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerListaUsuarios();
    this.obtenerUsuariosOfertas();
    this.llenarOfertas();
    this.llenarServicios();
  }
  crearOferta(crearOfertaDto: any): void {
    if (!crearOfertaDto.descripcionOferta || !crearOfertaDto.categoriaServicio || !crearOfertaDto.servicioId) {
      alert('Todos los campos de la nueva oferta deben estar rellenados');
      return;
    }
    this.adminService.crearOferta(crearOfertaDto).subscribe(
      (data) => {

        console.log('Oferta creada correctamente:', data);
        this.ofertaCreada = true;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {

        console.error('Error al crear oferta:', error);
      }
    );
  }

  llenarOfertas(): void {
    this.adminService.getOfertas().subscribe(
      oferta => {
        this.Veroferta = oferta;
        console.log('Lista de ofertas obtenida correctamente:', this.Veroferta);
      },
      error => {
        console.error('Error al obtener las ofertas', error);
      }
    );
  }
  verOferta() {
    if (!this.ofertaId) {
      alert('El ID de la oferta debe estar relleno');
      return;
    }
    this.adminService.verOferta(this.ofertaId).subscribe(
      (data) => {
        this.oferta = data;
      },
      (error) => {
        alert('Error al obtener la oferta o La oferta no existe')
        console.error('Error al obtener la oferta:', error);
      }
    );
  }
  editarOferta() {
    if (!this.ofertaId || !this.oferta.descripcionOferta || !this.oferta.categoriaServicio || !this.oferta.servicioId) {
      alert('Todos los campos de la oferta deben estar rellenados para editar');
      return;
    }
    this.adminService.editarOferta(this.ofertaId, this.oferta).subscribe(
      (data) => {
        console.log('Oferta editada correctamente:', data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log(error.error);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error('Error al editar la oferta:', error);

        }
      })

  }
  borrarOferta(): void {
    if (!this.ofertaId) {
      alert('El ID de la oferta debe estar relleno para eliminar');
      return;
    }
    this.adminService.borrarOferta(this.ofertaId).subscribe(
      (data) => {
        console.log('Oferta eliminada correctamente:', data);

      },

      error => {

        if (error instanceof HttpErrorResponse && error.status === 200) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log(error.error);
        } else {

          console.error(`Error al eliminar la oferta con ID ${this.ofertaId}:`, error);
        }

      })
  }


  llenarServicios(): void {
    this.adminService.getData().subscribe(
      data => {
        this.listaServicios = data;
        console.log('Lista de servicios obtenida correctamente:', this.listaServicios);
      },
      error => {
        console.error('Error al obtener las servicios', error);
      }
    );
  }

  verServicio(): void {
    if (!this.servicioId) {
      alert('El ID del servicio debe estar relleno');
      return;
    }
    this.adminService.verServicio(this.servicioId).subscribe(
      (data) => {
        this.servicio = data;
        console.log('Servicio encontrado:', this.servicio);
      },
      (error) => {
        alert('Error al obtener el servicio o el servicio no existe')
        console.error('Error al obtener el servicio:', error);
      }
    );
  }
  crearServicio(): void {

    if (!this.nuevoServicio.descripcionServicio || !this.nuevoServicio.precio || !this.nuevoServicio.duracion || !this.nuevoServicio.categoriaServicio) {
      alert('Todos los campos del nuevo servicio deben estar rellenados');
      return;
    }
    this.adminService.crearServicio(this.nuevoServicio).subscribe(
      (data) => {
        this.servicioCreado = true;
        console.log('Servicio creado correctamente:', data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.error('Error al crear el servicio:', error);

      }
    );
  }
  editarServicio(): void {

    if (!this.servicioId || !this.editarServicioDto.descripcionServicio || !this.editarServicioDto.precio || !this.editarServicioDto.duracion || !this.editarServicioDto.categoriaServicio) {
      alert('Todos los campos del servicio deben estar rellenados para editar');
      return;
    }
    this.adminService.editarServicio(this.servicioId, this.editarServicioDto).subscribe(
      (data) => {
        console.log('Servicio editado correctamente:', data);

      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          console.log(error.error);
        } else {
          console.error(`Error al editar el servicio con ID ${this.servicioId}:`, error);
        }
      }
    );
  }
  borrarServicio(): void {
    if (!this.servicioId) {
      alert('El ID del servicio debe estar relleno para eliminar');
      return;
    }
    this.adminService.borrarServicio(this.servicioId).subscribe(
      (data) => {
        console.log('Servicio eliminado correctamente:', data);

      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log(error.error);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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
    if (!this.crearUsuarioDto.nombreUsuario || !this.crearUsuarioDto.correoElectronico || !this.crearUsuarioDto.password || !this.crearUsuarioDto.rol || !this.crearUsuarioDto.telefono || !this.crearUsuarioDto.direccion) {
      alert('Todos los campos del nuevo usuario deben estar rellenados');
      return;
    }
    this.adminService.crearUsuario(this.crearUsuarioDto).subscribe(
      (data) => {
        console.log('Usuario creado correctamente:', data);
        this.usuarioCreado = true;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.error('Error al crear el usuario:', error);

      }
    );
  }
  editarUsuario(): void {
    if (!this.idUsuario ||
      !this.AdminEditarUsuarioDto.nombreUsuario ||
      !this.AdminEditarUsuarioDto.correoElectronico ||
      !this.AdminEditarUsuarioDto.password ||
      !this.AdminEditarUsuarioDto.rol ||
      !this.AdminEditarUsuarioDto.telefono ||
      !this.AdminEditarUsuarioDto.direccion) {

      alert('Todos los campos del usuario deben estar rellenados para editar');
      return;
    }

    this.adminService.editarUsuario(this.idUsuario, this.AdminEditarUsuarioDto).subscribe(
      (data) => {
        console.log('Usuario editado correctamente:', data);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.error('Error al editar el usuario:', error);
        if (error.status === 500) {
          alert('Error interno del servidor al editar el usuario. Por favor, intenta nuevamente más tarde.');
        } else {
          alert('Ocurrió un error al editar el usuario. Por favor, intenta nuevamente.');
        }
      }
    );
  }

  borrarUsuario(): void {
    if (!this.idUsuario) {
      alert('El ID del usuario debe estar relleno para eliminar');
      return;
    }
    this.adminService.borrarUsuario(this.idUsuario).subscribe(
      (data) => {
        console.log('Usuario eliminado correctamente:', data);

      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          console.log(error.error);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          alert('Error al borrar el usuario o el usuario no existe')
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
    if (!this.usuarioId || !this.ofertaId) {
      alert('ID del Usuario y ID de la Oferta deben estar rellenados');
      return;
    }
    this.adminService.enlazarOfertaUsuario(this.usuarioId, this.ofertaId).subscribe(
      data => {
        this.enlazarOferta = true;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error => {
        console.error('Error del servidor:', error);
        this.message = 'Error al enlazar oferta con usuario: ' + (error.error?.message || error.message);
      }
    );
  }

  borrarOfertaUsuario(): void {
    if (!this.usuarioId || !this.ofertaId) {
      alert('ID del Usuario y ID de la Oferta deben estar rellenados');
      return;
    }
    this.adminService.borrarOfertaUsuario(this.usuarioId, this.ofertaId).subscribe(
      () => {
        console.log('Oferta de usuario eliminada correctamente.');
        setTimeout(() => {
          window.location.reload();
        }, 1000); 
      },
      (error) => {
        if (error.status === 404) {
        
        } else {
          console.log('Oferta de usuario eliminada correctamente.');
       
        }
      }
    );
  }
}