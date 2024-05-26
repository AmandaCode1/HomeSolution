  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';
  import {HttpClientModule} from '@angular/common/http'
  import { AppRoutingModule } from './app-routing.module';
  import { AppComponent } from './app.component';
  import { CabeceraComponent } from './cabecera/cabecera.component';
  import { FormsModule } from '@angular/forms';
  import { LoginRegistroService } from './login-registro.service';
  import { UrgenciasComponent } from './urgencias/urgencias.component';
  import { ContactosComponent } from './contactos/contactos.component';
  import { HomesolutionComponent } from './homesolution/homesolution.component';
  import { QuehacemosComponent } from './quehacemos/quehacemos.component';
  import { LoginComponent } from './login/login.component';

  import { OfertasComponent } from './ofertas/ofertas.component';
  import { PreloadComponent } from './preload/preload.component';

  @NgModule({
    declarations: [
      AppComponent,
      CabeceraComponent,
      UrgenciasComponent,
      ContactosComponent,
      HomesolutionComponent,
      QuehacemosComponent,
      LoginComponent,
      OfertasComponent,
      PreloadComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule
    ],
    providers: [LoginRegistroService],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
