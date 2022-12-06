import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  info: any = [];
  modal = false;

  Formulario: FormGroup = this.fb.group({
    id_u: [, ],
    saldo_u: [, [Validators.required]],

  });
  infoVentas: any;

  constructor(private fb: FormBuilder, private ds: DataService, private router: Router, private location: Location) {
     this.traerUsuario();
     this.traerVentas();
     console.log()
   }

  ngOnInit(): void {
    this.Formulario.patchValue({
      id_u: localStorage.getItem('id_u'),
      saldo_u: ''
    });
  }
    traerUsuario() {
      this.ds.post('usuario', 'traerUsuarioxid', {id_u: localStorage.getItem('id_u')}).subscribe((data: any) => {
        if (data) {
          this.info = data;
          console.log(this.info)
        } else {
          alert('No pudimos obtener las categorías.');
        }
      })
  
    }
    traerVentas() {
      this.ds.post('venta', 'traerVentasUsuario', {idu_a: localStorage.getItem('id_u')}).subscribe((data: any) => {
        if (data) {
          this.infoVentas = data;
          console.log(this.infoVentas)
        } else {
          alert('No pudimos obtener las ventas.');
        }
      })
  
    }
  agregarSaldo() {
    this.ds.post('usuario', 'agregarSaldo', this.Formulario.value).subscribe((dato: any) => {
      console.log(dato);
      if (dato['estatus']) {
        this.router.navigate(['perfil']);
      }
    });
  }
  showModal = false;

  toggleModal(){
    this.showModal = !this.showModal;
  }

  BackBut() {
    this.location.back();
  }
}
