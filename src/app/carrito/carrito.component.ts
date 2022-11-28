import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

export interface PeriodicElement {
  imagen: string;
  producto: string;
  precio: number;
  acciones: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {imagen: '../../assets/img1.png', producto: 'Mistral', precio: 50, acciones: []},
  {imagen: '../../assets/img2.png', producto: 'Rational', precio: 50, acciones: []},
  {imagen: '../../assets/img1.png', producto: 'Reality Check', precio: 50, acciones: []},

];

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  displayedColumns: string[] = ['producto', 'precio', 'acciones'];
  dataSource = ELEMENT_DATA;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  BackBut() {
  this.location.back();
  }

}
