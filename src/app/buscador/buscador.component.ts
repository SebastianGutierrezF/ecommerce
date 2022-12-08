import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  saldo_u: string = "";

  constructor(private router: Router) {
    if (localStorage.getItem('saldo_u')) {
      this.saldo_u = localStorage.getItem('saldo_u')!;    
    }
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
