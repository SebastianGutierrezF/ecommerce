import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  Registro: FormGroup = this.fb.group({
    usuario_u : [, Validators.required],
    nombres_u : [, Validators.required],
    apellidos_u : [, Validators.required],
    email_u : [, Validators.required],
    pass : [, Validators.required],
  });

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
  }


  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.Registro.controls[campo].errors && this.Registro.controls[campo].touched;
  }

  guardar() {
    this.data.post('usuario', 'agregarUsuario', this.Registro.value).subscribe((dato: any) => {
      console.log(dato);
      if (['estatus']) {

        // Swal.fire(
        //   'Exito!',
        //   'El usuario ha sido registrado',
        //   'success'
        // )
        console.log("Exito");

        this.Registro.reset();
        this.router.navigate(['login']);
      }

    })
  }

}
