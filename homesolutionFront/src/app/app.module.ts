import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';

import { UrgenciasComponent } from './urgencias/urgencias.component';
import { ContactosComponent } from './contactos/contactos.component';
import { HomesolutionComponent } from './homesolution/homesolution.component';
import { QuehacemosComponent } from './quehacemos/quehacemos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OfertasComponent } from './ofertas/ofertas.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    UrgenciasComponent,
    ContactosComponent,
    HomesolutionComponent,
    QuehacemosComponent,
    LoginComponent,
    RegisterComponent,
    OfertasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
