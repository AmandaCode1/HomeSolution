import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomesolutionComponent } from './homesolution/homesolution.component';
import { ContactoComponent } from './contactos/contactos.component';
import { QuehacemosComponent } from './quehacemos/quehacemos.component';
import { UrgenciasComponent } from './urgencias/urgencias.component';
import { LoginComponent } from './login/login.component';

import { OfertasComponent } from './ofertas/ofertas.component';

const routes: Routes = [
  { path: 'homesolution', component: HomesolutionComponent },
  { path: 'contactos', component: ContactoComponent },
  { path: 'quehacemos', component: QuehacemosComponent },
  { path: 'urgencias', component: UrgenciasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ofertas', component: OfertasComponent },
  {path: '', redirectTo: '/homesolution', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
