import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from '../interfaces/articulo';
import { Comentario } from '../interfaces/comentario';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedNft?: Articulo;
  comentarios?: Comentario;
  comInput: FormGroup = this.fb.group({
    com: [, [Validators.required, Validators.maxLength(254)]],
    ida_com: [, Validators.required]
  })
  modal = false;

  constructor(private ds: DataService, private fb: FormBuilder) {
  }

  obtenerComentarios() {
    this.ds.post('comentario', 'obtenerComentarios', {'ida_com': this.selectedNft?.id_a}).subscribe((data: any) => {
      if (data) {
        this.comentarios = data;
      }
    })
  }

  ngOnInit(): void {
  }

  abrirModal(nft: Articulo) {
    this.selectedNft = nft;
    this.obtenerComentarios();
    this.comInput.patchValue({
      ida_com: this.selectedNft.id_a
    })
    this.modal = true;
  }

  insertarComentario() {
    this.ds.post('comentario', 'insertarComentario', this.comInput.value).subscribe((data: any) => {
      if (data) {
        this.obtenerComentarios();
      } else {
        alert("Ocurrio un error al agregar el comentario");
      }
    })
  }

}
