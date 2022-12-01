import { Component, OnInit } from '@angular/core';
import { Articulo } from '../interfaces/articulo';
import { Venta } from '../interfaces/venta';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  ventas: any[] = [];
  articulos: any[] = [];
  acordeon = false;

  constructor(private ds: DataService) {
    this.ds.get('venta', 'traerVentas').subscribe((data: any) => {
      if (data) {
        this.ventas = data;
      }
    })

  }

  ngOnInit(): void {
  }

  buscarArticulos(id_v: number) {
    this.ds.post('venta', 'traerArticulos', {id_v: id_v}).subscribe((data: any) => {
      if (data) {
        this.articulos = data;
        this.acordeon = true;
      }
    })
  }

}
