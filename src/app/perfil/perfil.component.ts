import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  info: any = [];
  modal = false;
  id_u = 1;

  Formulario: FormGroup = this.fb.group({
    id_u: [, ],
    saldo_u: [, [Validators.required]],
 
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private ds: DataService,   private router: Router,) {
     this.traerUsuario()
     console.log()
   }

  ngOnInit(): void {
    this.Formulario.patchValue({
      id_u: 1,
      saldo_u: '',
     
   


    });
  }
  traerUsuario() {
    this.ds.get('usuario', 'traerUsuarioxid').subscribe((data: any) => {
      if (data) {
        this.info = data;
        console.log(this.info)
      } else {
        alert('No pudimos obtener las categorías.');
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
}
