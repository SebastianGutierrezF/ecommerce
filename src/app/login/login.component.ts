import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formulario:  FormGroup = this.fb.group({
  usuario_u: [,Validators.required],
  pass: [, Validators.required]
});
  constructor(  private fb: FormBuilder,
    private router: Router, private ds: DataService) {
   }

  ngOnInit(): void {
  }

  campoEsValido(campo: string) {
    return this.formulario.controls[campo].errors && this.formulario.controls[campo].touched;
  }

  Login(){
    this.ds.post('usuario', 'login', this.formulario.value).subscribe((data: any) => {
      if (data.id_u != 0) {
        localStorage.setItem('id_u', data.id_u);
        localStorage.setItem('saldo_u', data.saldo_u);
        if (data.id_u == 1) {
          localStorage.setItem('admin', "1");
        } else {
          localStorage.setItem('admin', "0");
        }
        this.router.navigate(['dashboard']);
      } else {
        alert("Usuario o contraseña incorrectos")
      }
    })
   
  }
}