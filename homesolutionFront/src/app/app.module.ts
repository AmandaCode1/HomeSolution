import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginRegistroService } from './login-registro.service';
import { UrgenciasComponent } from './urgencias/urgencias.component';
import { ContactoComponent } from './contactos/contactos.component';
import { HomesolutionComponent } from './homesolution/homesolution.component';
import { QuehacemosComponent } from './quehacemos/quehacemos.component';
import { LoginComponent } from './login/login.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { PreloadComponent } from './preload/preload.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { ElectricidadComponent } from './electricidad/electricidad.component';
import { ClimatizacionComponent } from './climatizacion/climatizacion.component';
import { PladurComponent } from './pladur/pladur.component';
import { FontaneriaComponent } from './fontaneria/fontaneria.component';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    UrgenciasComponent,
    ContactoComponent,
    HomesolutionComponent,
    QuehacemosComponent,
    LoginComponent,
    OfertasComponent,
    PreloadComponent,
    AdminComponent,
    FooterComponent,
    ElectricidadComponent,
    ClimatizacionComponent,
    PladurComponent,
    FontaneriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [LoginRegistroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json',);
}