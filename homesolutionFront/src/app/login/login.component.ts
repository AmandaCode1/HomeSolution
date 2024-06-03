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
  errorMessage: string = '';  // Variable para almacenar el mensaje de error
  errorMessage2: string = '';
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
    this.nombre = localStorage.getItem('nombreUsuario') || '';  // Recuperar nombre del usuario del almacenamiento local
  }

  alternarFormulario(): void {
    this.iniciarSesion = !this.iniciarSesion;
  }

  validarCorreoElectronico(): void {
    // Validar el correo electrónico antes de enviar el formulario
 
    const correoElectronico = this.registroDto.correoElectronico;
    if (!correoElectronico.includes('@')) {
      this.errorMessage = 'El correo electrónico debe contener "@"';
    } else {
      this.errorMessage = ''; // Limpiar el mensaje de error si el correo es válido
    }
  }

  registro(): void {
    this.validarCorreoElectronico(); // Validar el correo electrónico antes de continuar
    if (this.errorMessage) {
      return; // Detener el registro si hay un error de validación en el correo electrónico
    }
    if (this.registroDto.password !== this.registroDto.repeatPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    if (this.registroDto.telefono && this.registroDto.telefono.length !== 9) {
      this.errorMessage = 'El teléfono debe contener 9 números.';
      return;
    }
    this.loginRegistroService.registro(this.registroDto).subscribe(
      response => {
        console.log('Usuario registrado correctamente.');
        this.errorMessage = '';  // Limpiar el mensaje de error después del registro exitoso
        // Mostrar mensaje de registro exitoso
        this.ConectarSesion = 'Usuario registrado correctamente.';
        // Redirigir a la página de inicio después de un breve retraso
        setTimeout(() => {
          this.ConectarSesion = ''; // Limpiar el mensaje después de 2 segundos
          this.router.navigate(['/homesolution']); // Redirigir a la página de inicio
        }, 2000); // Redirigir después de 2 segundos (2000 milisegundos)
      },
      error => {
        console.log('Error al registrar el usuario.');
        console.error(error);
      }
    );
  }
  

  login(): void {
    this.loginRegistroService.login(this.loginDto).subscribe(
      response => {
        this.sesionService.iniciarSesion(response);  // Almacenar token en el servicio de sesión
        this.autenticado = true;
        this.ConectarSesion = 'Sesión iniciada correctamente';
        this.nombre = this.loginDto.nombre;  // Asignar el nombre del usuario desde el formulario de login
        localStorage.setItem('nombreUsuario', this.nombre);  // Guardar nombre del usuario en almacenamiento local
        console.log('Nombre del usuario:', this.nombre);
      },
      error => {
        console.log('Error al iniciar sesión.');
        console.error(error);
      }
    );
  }

  cerrarSesion(): void {
    this.sesionService.cerrarSesion();
    this.autenticado = false;
    this.ConectarSesion = 'Sesión cerrada correctamente.';
    localStorage.removeItem('nombreUsuario');  // Eliminar el nombre del usuario del almacenamiento local
  }
}
