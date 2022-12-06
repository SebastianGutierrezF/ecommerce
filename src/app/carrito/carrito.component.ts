import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any;
  nfts: any[] = [];
  total: number = 0;
  subTotal: number = 0;
  desc = 0;
  modal = false;
  saldo_u = "";
  saldoFinal = 0;

  displayedColumns: string[] = ['producto', 'precio', 'acciones'];

  constructor(private location: Location, private ds: DataService) {
    this.getCarrito()
  }

  ngOnInit(): void {
  }

  BackBut() {
    this.location.back();
  }

  getCarrito() {
    this.carrito = JSON.parse(localStorage.getItem("carrito")!);
    this.carrito.forEach((nft: any) => {
      this.nfts.push(nft.id_a);
    });
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
    localStorage.setItem("carrito", JSON.stringify(carritoAux));
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

  abrirModal() {
    this.saldo_u = localStorage.getItem('saldo_u')!;
    this.saldoFinal = Number.parseInt(this.saldo_u) - this.total;
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }

  /* localStorage.getItem('id_u'), */

  pagar() {
    if (this.saldoFinal < 0) {
      alert("No tienes saldo suficiente para realizar esta compra");
      return;
    }
    const venta = {
      idu_v: 1,
      monto_v: this.subTotal,
      desc_v: this.desc,
      mFinal_v: this.total,
      id_a: this.nfts
    }
    this.ds.post('venta', 'comprar', venta).subscribe((data: any) => {
      if (data) {
        console.log(data.DATA.saldo_u);
        alert("Compra realizada con éxito");
        localStorage.setItem("saldo_u", data.DATA.saldo_u);
        this.saldo_u = localStorage.getItem("saldo_u")!;
        this.location.back();
        localStorage.removeItem('carrito');
      } else {
        alert("Ocurrio un error");
      }
    })
    this.modal = false
  }

}
