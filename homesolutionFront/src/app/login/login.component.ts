import { Component, NgModule } from '@angular/core';
import { RegistroDto } from '../registroDto.model';
import { LoginDto } from '../loginDto.model';
import { LoginRegistroService } from '../login-registro.service';
import { FormsModule, NgModel } from '@angular/forms';
import { SesionService } from '../sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  iniciarSesion: boolean = true;
  ConectarSesion: string = '';
  CerrarSesion: string = '';

  registroDto: RegistroDto = {
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
  autenticado: boolean;
  constructor(
    private loginRegistroService: LoginRegistroService,
    private sesionService: SesionService
  ) {
    this.autenticado = this.sesionService.estaAutenticado();
  }
  alternarFormulario(): void {
    this.iniciarSesion = !this.iniciarSesion;
  }
  registro(): void {
    if (this.registroDto.password !== this.registroDto.repeatPassword) {
      console.log('Las contraseñas no coinciden.');
      return;
    }
  
    this.loginRegistroService.registro(this.registroDto).subscribe(
      response => {
        console.log('Usuario registrado correctamente.');
      },
      error => {
        console.log('Error al registrar el usuario.');
        console.error(error);
      }
    );
  }
  
  login(): void {
    
    this.loginRegistroService.login(this.loginDto).subscribe(
      token => {
        this.sesionService.iniciarSesion(token);
        this.autenticado = true;
        this.ConectarSesion = `Sesion Iniciada Correctamente`;
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
    this.ConectarSesion = `Sesión cerrada correctamente.`;
  }
}