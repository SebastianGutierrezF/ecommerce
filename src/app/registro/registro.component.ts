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
    usuario_u : [, [Validators.required, Validators.maxLength(40)]],
    nombres_u : [, [Validators.required, Validators.maxLength(40)]],
    apellidos_u : [, [Validators.required, Validators.maxLength(40)]],
    email_u : [, [Validators.required, Validators.maxLength(40)]],
    pass : [, [Validators.required, Validators.maxLength(40)]],
  });

  constructor(private fb: FormBuilder, private data: DataService, private router: Router) {
  }


  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.Registro.controls[campo].errors && this.Registro.controls[campo].touched;
  }

  guardar() {
    this.data.post('usuario', 'agregarusuario', this.Registro.value).subscribe((dato: any) => {
      console.log(dato);
      if (dato['estatus']) {

        // Swal.fire(
        //   'Exito!',
        //   'El usuario ha sido registrado',
        //   'success'
        // )

        this.Registro.reset();
        this.router.navigate(['login']);
      }

    })
  }

}
