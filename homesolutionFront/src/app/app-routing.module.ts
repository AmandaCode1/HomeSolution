import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomesolutionComponent } from './homesolution/homesolution.component';
import { ContactoComponent } from './contactos/contactos.component';
import { QuehacemosComponent } from './quehacemos/quehacemos.component';
import { UrgenciasComponent } from './urgencias/urgencias.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

import { OfertasComponent } from './ofertas/ofertas.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { ElectricidadComponent } from './electricidad/electricidad.component';
import { ClimatizacionComponent } from './climatizacion/climatizacion.component';
import { FontaneriaComponent } from './fontaneria/fontaneria.component';
import { PladurComponent } from './pladur/pladur.component';

const routes: Routes = [
  { path: 'homesolution', component: HomesolutionComponent },
  { path: 'contactos', component: ContactoComponent },
  { path: 'quehacemos', component: QuehacemosComponent },
  { path: 'urgencias', component: UrgenciasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'fontaneria', component: FontaneriaComponent },
  { path: 'pladur', component: PladurComponent },
  {path:'climatizacion',component:ClimatizacionComponent},
  { path: 'electricidad', component: ElectricidadComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'Admin' } },
  { path: 'ofertas', component: OfertasComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 'Usuario' } },
  { path: '', redirectTo: '/homesolution', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
