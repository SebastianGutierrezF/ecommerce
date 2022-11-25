import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../interfaces/categoria';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class Admin implements OnInit {
  nftForm: FormGroup = this.fb.group({
    id_a: [,],
    nombre_a: [, [Validators.required, Validators.maxLength(254)]],
    precio_a: [, [Validators.required]],
    img_a: [, [Validators.required]],
    idcat_a: [, [Validators.required]],
  })
  catForm: FormGroup = this.fb.group({
    id_c: [,],
    nombre_c: [, [Validators.required, Validators.maxLength(254)]],
    com_c: [, [Validators.required, Validators.maxLength(254)]],
    banner_c: [, Validators.required]
  })
  ofertaForm: FormGroup = this.fb.group({
    id_o: [,],
    desc_o: [, [Validators.required, Validators.maxLength(3)]],
    fechain_o: [, Validators.required],
    fechafin_o: [, Validators.required],
    banner_o: [, Validators.required]
  })
  categorias: Categoria[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient, private ds: DataService) {
    this.traerCategorias();
  }

  ngOnInit(): void { }

  insertarProducto() {
    this.ds.post('articulo', 'insertarProducto', this.nftForm.value).subscribe((data: any) => {
      if (data) {
        alert('NFT agregado exitosamente');
        this.nftForm.reset();
      } else {
        alert('Ocurrio un error al intentar agregar el NFT');
      }
    })
  }

  traerCategorias() {
    this.ds.get('categoria', 'traerCategorias').subscribe((data: any) => {
      if (data) {
        this.categorias = data;
      } else {
        alert('No pudimos obtener las categorías.');
      }
    })

  }

  agregarCategoria() {
    this.ds.post('categoria', 'agregarCategoria', this.catForm.value).subscribe((data: any) => {
      if (data) {
        alert("La categoria ha sido agregada");
        this.catForm.reset();
        this.traerCategorias();
      } else {
        alert("Ocurrio un error al intentar agregar la oferta");
      }
    })
  }

  insertarOferta() {
    this.ds.post('oferta', 'insertarOferta', this.ofertaForm.value).subscribe((data: any) => {
      if (data) {
        alert("La oferta ha sido agregada");
        this.ofertaForm.reset();
      } else {
        alert("Ocurrio un error al intentar agregar la oferta");
      }
    })
  }
  
  subirImagen(event: any, form: string) {    
    let data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('upload_preset', 'enefty');
    data.append('cloud_name', 'duz7dfwse')
    if (event.target.files && event.target.files.length) { 
      this.http.post('https://api.cloudinary.com/v1_1/duz7dfwse/image/upload', data).subscribe((response: any) => {
        if (response.url) {
          switch (form) {
            case "nft":
              this.nftForm.controls['img_a'].setValue(response.url);
              break;
            case "cat":
              this.catForm.controls['banner_c'].setValue(response.url);
              console.log(this.catForm.value);
              break;
            case "oferta":
              this.ofertaForm.controls['banner_o'].setValue(response.url);
              break;
          }       
        } else {
          alert("Ocurrio un error al subir la imagen.");
        }
      });
    }
  }

}
