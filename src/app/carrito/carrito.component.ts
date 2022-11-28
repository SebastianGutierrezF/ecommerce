import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Articulo } from '../interfaces/articulo';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any;
  nft: any = [];
  total: number = 0;
  subTotal: number = 0;
  desc = 0;

  displayedColumns: string[] = ['producto', 'precio', 'acciones'];

  constructor(private location: Location) {
    this.getCarrito()
    this.desc = 0;

  }

  ngOnInit(): void {
  }

  BackBut() {
    this.location.back();
  }

  getCarrito() {
    this.carrito = JSON.parse(localStorage.getItem("carrito")!);
    this.calcularTotal();
  }

  borrarNFT(id_a: any) {
    //localStorage.removeItem('id_a')
    var carritoAux: any = [];
    var indexAux = 0;
    this.carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let index = 0; index < this.carrito.length; index++) {
      if (this.carrito[index].id_a != id_a) {
        carritoAux[indexAux] = this.carrito[index];
        indexAux++;
      }
    }
    localStorage.setItem("carrito",JSON.stringify(carritoAux));
    this.carrito = carritoAux;
    this.calcularTotal();
  }

  calcularTotal() {
    this.subTotal = 0;
    this.total = 0;
    this.carrito.forEach((articulo: any) => {
      this.subTotal = this.subTotal + Number.parseInt(articulo.precio_a);
    });
    this.total = this.subTotal;

    if (localStorage.getItem('desc_o')) {
      this.desc = Number.parseInt(localStorage.getItem('desc_o')!);
      this.total -= this.subTotal * (this.desc / 100);
    }
  }

}
