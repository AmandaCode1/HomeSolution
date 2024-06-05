import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDto } from '../loginDto.model';
import { LoginRegistroService } from '../login-registro.service';
import { SesionService } from '../sesion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  iniciarSesion: boolean = true;
  ConectarSesion: string = '';
  nombre: string = '';
  errorMessage: string = '';
  errorMessage2: string = '';
  loginErrorMessage: string = '';
  registroDto = {
    nombre: '',
    correoElectronico: '',
    password: '',
    rol: '',
    telefono: '',
    direccion: '',
    repeatPassword: ''
  };
  loginDto: LoginDto = {
    nombre: '',
    password: ''
  };
  autenticado: boolean = false;

  constructor(
    private loginRegistroService: LoginRegistroService,
    private sesionService: SesionService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  ngOnInit(): void {
    this.autenticado = this.sesionService.estaAutenticado();
    this.nombre = localStorage.getItem('nombreUsuario') || '';
  }

  alternarFormulario(): void {
    this.iniciarSesion = !this.iniciarSesion;
  }

  validarCorreoElectronico(): void {
    const correoElectronico = this.registroDto.correoElectronico;
    if (!correoElectronico.includes('@')) {
      this.errorMessage = 'El correo electrónico debe contener "@"';
    } else {
      this.errorMessage = '';
    }
  }

  registro(): void {
    if (!this.registroDto.nombre || !this.registroDto.correoElectronico || !this.registroDto.password || !this.registroDto.repeatPassword || !this.registroDto.telefono || !this.registroDto.direccion) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    this.validarCorreoElectronico();
    if (this.errorMessage) {
      return;
    }
    if (this.registroDto.password !== this.registroDto.repeatPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.loginRegistroService.register(this.registroDto).subscribe(
      response => {
        this.errorMessage = '';
        this.ConectarSesion = 'Usuario registrado correctamente.';
        setTimeout(() => {
          this.ConectarSesion = '';
          location.reload();
        }, 2000);
      },
      error => {
        this.errorMessage2 ='Usuario o contraseña incorrecta'
        console.log('Error al registrar el usuario.');
        console.error(error);
      }
    );
  }

  login(): void {
    this.loginRegistroService.login(this.loginDto).subscribe(
      response => {
        this.sesionService.iniciarSesion(response.token, response.rol);
        this.autenticado = true;
        this.ConectarSesion = 'Sesión iniciada correctamente';
        this.nombre = this.loginDto.nombre;
        localStorage.setItem('nombreUsuario', this.nombre);
        window.location.reload()
      },
      error => {
        this.loginErrorMessage = 'Usuario o contraseña incorrecta';
        console.log('Error al iniciar sesión.');
        console.error(error);
      }
    );
  }

  cerrarSesion(): void {
    this.sesionService.cerrarSesion();
    this.autenticado = false;
    this.nombre = '';
    window.location.reload()
  }

  cambiarIdioma(idioma: string): void {
    this.translate.use(idioma);
  }
}
