import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from '../interfaces/articulo';
import { Comentario } from '../interfaces/comentario';
import { DataService } from '../services/data.service';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedNft?: Articulo;
  comentarios?: Comentario[];
  comInput: FormGroup = this.fb.group({
    com: [, [Validators.required, Validators.maxLength(254)]],
    ida_com: [, Validators.required]
  })
  modal = false;
  Productos: any = [] ;
  ProductosxCategoria: any = [] ;
  Categorias: any = [] ;
  categoria: any;
  productosTodos: any;

  constructor(
    private ds: DataService,
    private fb: FormBuilder
  ) {
    this.ObtenerProductos('todos');
    this.ObtenerCategorias();
    this.obtenerComentarios();
  }

  ngOnInit(): void {
  }

  ObtenerProductos(categoria: any) {
    this.categoria = categoria;
    this.ds.get('articulo', 'obtenerProductos').subscribe((dato: any) => {
      this.Productos = dato.reverse();
      this.productosTodos = dato.reverse();
    });
  }

  ObtenerProductosxCategoria(categoria: any, id: any) {
    this.categoria = categoria;    
    this.ds.post('articulo', 'obtenerProductosxCategoria', {'idcat_a': id}).subscribe((dato: any) => {
      this.Productos = dato.reverse();
    });
  }

  ObtenerCategorias() {
    this.ds.post('categoria', 'traerCategorias', {}).subscribe((dato: any) => {
      this.Categorias = dato;
    });
  }

  obtenerComentarios() {
    this.ds.post('comentario', 'obtenerComentarios', {}).subscribe((dato: any) => {
      this.comentarios = dato.reverse();
    });
  }

  agregarAlCarrito(data: any) {

    if(localStorage.getItem('carrito')){

      var localComida = JSON.parse(localStorage.getItem('carrito')!);
      localComida.push({ "id_a": data.id_a, "nombre_a": data.nombre_a, "precio_a": data.precio_a, "img_a": data.img_a});
      
      localStorage.setItem('carrito',JSON.stringify(localComida));

    }else{

      localStorage.setItem('carrito', JSON.stringify([{ "id_a": data.id_a, "nombre_a": data.nombre_a, "precio_a": data.precio_a, "img_a": data.img_a}]));

    }
  }

  abrirModal(nft: Articulo) {
    this.selectedNft = nft;
    this.obtenerComentarios();
    this.comInput.patchValue({
      ida_com: this.selectedNft.id_a
    })
    this.modal = true;
  }

  insertarComentario() {
    this.ds.post('comentario', 'insertarComentario', this.comInput.value).subscribe((data: any) => {
      if (data) {
        this.obtenerComentarios();
      } else {
        alert("Ocurrio un error al agregar el comentario");
      }
    })
  }


}
