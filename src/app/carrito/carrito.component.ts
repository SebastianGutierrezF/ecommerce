import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';


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
  conteo = 0;

  displayedColumns: string[] = ['producto', 'precio', 'acciones'];

  constructor(private location: Location, private ds: DataService, private router: Router) {
    this.getCarrito();
    this.traerUsuario();
  }

  traerUsuario() {
    this.ds.post('usuario', 'traerUsuarioxid', { id_u: localStorage.getItem('id_u') }).subscribe((data: any) => {
      if (data) {
        this.saldo_u = data[0].saldo_u;
      } else {
        alert('No pudimos obtener el usuario.');
      }
    })
  }

  ngOnInit(): void {
  }

  BackBut() {
    this.location.back();
  }

  getCarrito() {
    this.carrito = JSON.parse(localStorage.getItem("carrito")!);
    if (this.carrito) {
      this.nfts.splice(0);
      this.carrito.forEach((nft: any) => {
        this.nfts.push(nft.id_a);
      });
      this.conteo = this.carrito.length;
    }
    this.calcularTotal();
  }

  borrarNFT(id_a: any) {
    var carritoAux: any = [];
    var indexAux = 0;
    this.carrito = JSON.parse(localStorage.getItem("carrito")!);
    for (let index = 0; index < this.carrito.length; index++) {
      if (this.carrito[index].id_a != id_a) {
        carritoAux[indexAux] = this.carrito[index];
        indexAux++;
        this.conteo--;
      }
    }
    localStorage.removeItem("carrito");
    localStorage.setItem("carrito", JSON.stringify(carritoAux));
    this.carrito = carritoAux;
    this.getCarrito();
    this.calcularTotal();
  }

  calcularTotal() {
    this.subTotal = 0;
    this.total = 0;
    if (this.carrito) {
      this.carrito.forEach((articulo: any) => {
        this.subTotal = this.subTotal + Number.parseFloat(articulo.precio_a);
      });
      this.total = this.subTotal;
    }
    if (localStorage.getItem('desc_o')) {
      this.desc = Number.parseInt(localStorage.getItem('desc_o')!);
      this.total -= this.subTotal * (this.desc / 100);
    }

  }

  abrirModal() {
    this.traerUsuario();
    this.saldoFinal = Number.parseFloat(this.saldo_u) - this.total;
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }

  pagar() {
    if (this.saldoFinal < 0) {
      alert("No tienes saldo suficiente para realizar esta compra");
    } else {
      const venta = {
        idu_v: localStorage.getItem('id_u'),
        monto_v: this.subTotal,
        desc_v: this.desc,
        mFinal_v: this.total,
        id_a: this.nfts
      }
      this.ds.post('venta', 'comprar', venta).subscribe((data: any) => {
        location.reload();
        if (data) {
          alert("Compra realizada con éxito");
          this.saldo_u = data.DATA.saldo_u;
          localStorage.removeItem('carrito');
        } else {
          alert("Ocurrio un error");
        }
      })
      this.modal = false
      this.router.navigate(['/dashboard']);
    }
  }

}
