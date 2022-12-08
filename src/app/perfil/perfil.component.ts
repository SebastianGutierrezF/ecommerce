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
  conteo = 0;
  showModal = false;

  Formulario: FormGroup = this.fb.group({
    id_u: [,],
    saldo_u: [, [Validators.required]],

  });
  infoVentas: any;

  constructor(private fb: FormBuilder, private ds: DataService, private location: Location) {
    this.traerUsuario();
    this.traerVentas();
  }

  ngOnInit(): void {
    this.Formulario.patchValue({
      id_u: localStorage.getItem('id_u'),
      saldo_u: ''
    });
  }

  traerUsuario() {
    this.ds.post('usuario', 'traerUsuarioxid', { id_u: localStorage.getItem('id_u') }).subscribe((data: any) => {
      if (data) {
        this.info = data;
      } else {
        alert('No pudimos obtener el usuario.');
      }
    })
  }

  traerVentas() {
    this.ds.post('venta', 'traerVentasUsuario', { idu_a: localStorage.getItem('id_u') }).subscribe((data: any) => {
      if (data) {
        this.infoVentas = data;
        this.conteo = data.length;
      } else {
        alert('No pudimos obtener las ventas.');
      }
    })

  }
  
  agregarSaldo() {
    this.ds.post('usuario', 'agregarSaldo', this.Formulario.value).subscribe((dato: any) => {
      if (dato) {
        alert("Saldo agregado");
        this.traerUsuario();
        this.toggleModal();
        location.reload();
      }
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  BackBut() {
    this.location.back();
  }

  isAdmin() {
    return localStorage.getItem('admin') == "1";
  }
}
