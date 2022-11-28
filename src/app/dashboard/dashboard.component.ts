import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Productos: any = [] ;
  ProductosxCategoria: any = [] ;
  Categorias: any = [] ;
  Comentarios: any = [] ;

  constructor(
    private dataService: DataService
  ) {
    this.ObtenerProductos();
    this.ObtenerCategorias();
    this.ObtenerComentarios();
  }

  ngOnInit(): void {
  }

  ObtenerProductos() {
    this.dataService.post('articulo', 'obtenerProductos', {}).subscribe((dato: any) => {
      this.Productos = dato.reverse();
    });
  }

  ObtenerProductosxCategoria(categoria: any) {
    this.dataService.post('articulo', 'obtenerProductosxCategoria', {'idcat_a': categoria}).subscribe((dato: any) => {
      this.ProductosxCategoria = dato.reverse();
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
      localComida.push({ "id_a": data.id_a, "nombre_a": data.nombre_a, "precio": data.precio, "img_a": data.img_a});
      
      localStorage.setItem('carrito',JSON.stringify(localComida));

    }else{

      localStorage.setItem('carrito', JSON.stringify([{ "id_a": data.id_a, "nombre_a": data.nombre_a, "precio": data.precio, "img_a": data.img_a}]));

    }
  }

}
