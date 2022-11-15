import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-entidad',
  templateUrl: './nueva-entidad.component.html',
  styleUrls: ['./nueva-entidad.component.scss']
})
export class NuevaEntidadComponent implements OnInit {


  miFormulario: FormGroup = this.fb.group({

    Descripcion: ['test1@gmail.com', [Validators.required, Validators.email]],
    TextoExtendido: ['123456789', [Validators.required, Validators.minLength(6)]],
    Razon: ['123456789', [Validators.required, Validators.minLength(6)]],
  });

  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
  }

  login(){
      // TODO : aplicar logica para creacion de entidadd dependiendo su tabla 
  }

}
