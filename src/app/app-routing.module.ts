import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNFTComponent } from './add-nft/add-nft.component';
import { AddOfertaComponent } from './add-oferta/add-oferta.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'ventas', component: VentasComponent, canActivate: [AuthGuard]},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard]},
  {path: 'agregar-nft', component: AddNFTComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'agregar-oferta', component: AddOfertaComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
