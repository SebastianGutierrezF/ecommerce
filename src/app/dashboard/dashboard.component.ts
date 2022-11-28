import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productos: any = [] ;
  productosTodos: any = [] ;
  Categorias: any = [] ;
  Comentarios: any = [] ;
  categoria: any;

  constructor(
    private dataService: DataService
  ) {
    this.ObtenerProductos('todos');
    this.ObtenerCategorias();
    this.ObtenerComentarios();
  }

  ngOnInit(): void {
  }

  ObtenerProductos(nombre_c: any) {
    this.categoria = nombre_c;
    this.dataService.post('articulo', 'obtenerProductos', {}).subscribe((dato: any) => {
      this.productos = dato.reverse();
      this.productosTodos = dato.reverse();
    });
  }

  ObtenerProductosxCategoria(nombre_c: any, categoria: any) {
    this.categoria = nombre_c;
    this.dataService.post('articulo', 'obtenerProductosxCategoria', {'idcat_a': categoria}).subscribe((dato: any) => {
      this.productos = dato.reverse();
    });
  }

  ObtenerCategorias() {
    this.dataService.post('categoria', 'traerCategorias', {}).subscribe((dato: any) => {
      this.Categorias = dato;
    });
  }

  ObtenerComentarios() {
    this.dataService.post('comentario', 'obtenerComentarios', {}).subscribe((dato: any) => {
      this.Comentarios = dato.reverse();
    });
  }

  agregarAlCarrito(data: any) {

    if(localStorage.getItem('carrito')){

      var localComida = JSON.parse(localStorage.getItem('carrito')!);
      localComida.push({ "id_a": data.id_a, "nombre_a": data.nombre_a, "precio": data.precio_a, "img_a": data.img_a});
      
      localStorage.setItem('carrito',JSON.stringify(localComida));

    }else{

      localStorage.setItem('carrito', JSON.stringify([{ "id_a": data.id_a, "nombre_a": data.nombre_a, "precio": data.precio_a, "img_a": data.img_a}]));

    }
  }

}
