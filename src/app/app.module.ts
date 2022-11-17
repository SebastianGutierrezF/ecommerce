import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarritoComponent } from './carrito/carrito.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { AddOfertaComponent } from './add-oferta/add-oferta.component';
import { RegistroComponent } from './registro/registro.component';
import { AddNFTComponent } from './add-nft/add-nft.component';
import { VentasComponent } from './ventas/ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CarritoComponent,
    PerfilComponent,
    LoginComponent,
    AddOfertaComponent,
    RegistroComponent,
    AddNFTComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
