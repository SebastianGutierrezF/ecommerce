import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  saldo_u: string = "";

  constructor(private router: Router, private ds: DataService) {
    // if (localStorage.getItem('saldo_u')) {
    //   this.saldo_u = localStorage.getItem('saldo_u')!;    
    // }
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

  logout() {
    localStorage.clear();
    this.saldo_u = "";
    this.router.navigate(['login']);
  }
  
  isAdmin() {
    return localStorage.getItem('admin') == "1";
  }

}
