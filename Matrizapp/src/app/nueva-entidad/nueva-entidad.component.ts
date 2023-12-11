import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { push } from 'core-js/core/array';
import { AuthenticationService } from '../shared/services/authentication.service';
import Swal2 from 'sweetalert2';
import { ControlsService } from '../shared';
import { NuevaEntidad } from '../componentes/rkmain/interfaces/nuevaEntidad.interfaces';
import { time } from 'console';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-nueva-entidad',
  templateUrl: './nueva-entidad.component.html',
  styleUrls: ['./nueva-entidad.component.scss']
})
export class  NuevaEntidadComponent implements OnInit {

  miFormulario: FormGroup;
  solicitudes: any[] = [];
  isLoading:boolean = false
  solicitudesResponse: NuevaEntidad[] = [];
  bloquearBotones: boolean = false;
  constructor( private fb: FormBuilder, private autentication: AuthenticationService,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public MatDialogRef: MatDialogRef<NuevaEntidadComponent>,
               private controlService: ControlsService) {

                
               }

  ngOnInit() {

    this.obtenerFormulario();
  }

  obtenerFormulario() {

    switch (this.data.tabla) {
      case '+RKC' :
        this.miFormulario = this.fb.group({

          type : '+RKC',
          // code: ['', [Validators.required, Validators.maxLength(4) ]],
          description: ['', [Validators.required,Validators.maxLength(50) ]],
          extendedText: ['', ],
          // clasification: ['', [Validators.required]],
          // Comentario: ['', [Validators.required]],
        });
        break;
      case '+RKT' :
        // debugger;
        this.miFormulario = this.fb.group({

          type : '+RKT',
          // code: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4) ]],
          description: ['', [Validators.required,Validators.maxLength(50) ]],
          extendedText: ['', ],
          // ocupation: ['', [Validators.required , Validators.maxLength(2), Validators.minLength(2)]],
          // taskType: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
          // Comentario: ['', [Validators.required]],
        });
        break;
      case '+RKY' :
        this.miFormulario = this.fb.group({

          type : '+RKY',
          // code: ['', [Validators.required, Validators.maxLength(4) ]],
          description: ['', [Validators.required,Validators.maxLength(50) ]],
          extendedText: ['', ],
          // Comentario: ['', [Validators.required]],
        });
        break;
      case '+RKR' :
        this.miFormulario = this.fb.group({

          type : '+RKR',
          // code: ['', [Validators.required, Validators.maxLength(4) ]],
          description: ['', [Validators.required,Validators.maxLength(50) ]],
          extendedText: ['', ],
          // branch: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
          // family: ['', [Validators.required , Validators.maxLength(2), Validators.minLength(2)]],
          // clasification: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
          // Comentario: ['', [Validators.required]],
        });
        break;
      case '+RKB' :
        this.miFormulario = this.fb.group({

          type : '+RKB',
          // code: ['', [Validators.required, Validators.maxLength(4) ]],
          description: ['', [Validators.required,Validators.maxLength(50) ]],
          extendedText: ['', ],
          // family: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
          // Comentario: ['', [Validators.required]],
        });
        break;
      case '+RKF' :
        this.miFormulario = this.fb.group({

          type : '+RKF',
          code: ['', [Validators.required, Validators.maxLength(4) ]],
          description: ['', [Validators.required,Validators.maxLength(50) ]],
          extendedText: ['', ],
          // Comentario: ['', [Validators.required]],
        });
        break;
    }
  }

  add() {
    const spinner = this.controlService.openSpinner();
    this.solicitudes.push(this.miFormulario.value);
    // console.log(this.solicitudes);
    this.obtenerFormulario();

    this.controlService.closeSpinner(spinner)
  }

  delete(elem) {

    const aux = this.solicitudes.filter((item) => item !== elem);
    this.solicitudes = aux;
  }

 async crear() {

    if(this.solicitudes.length === 0){
      Swal2.fire({
        icon:'info',
        text : `Debe haber al menos una ${this.data.titulo}`
      })

      return 
    }

    this.isLoading = true;
    this.bloquearBotones = true
    let _atts = [];
    let  spinner = this.controlService.openSpinner();
     switch (this.data.tabla) {
      
      case '+RKT' :

          for( let i = 0 ; i < this.solicitudes.length ; i++){

            _atts = []
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'CREATE_DEFINITION' });
            _atts.push({ name: 'type', value: this.solicitudes[i].type });
            // _atts.push({ name: 'code', value: this.solicitudes[i].code });
            _atts.push({ name: 'description', value: this.solicitudes[i].description });
            _atts.push({ name: 'extendedText', value: this.solicitudes[i].extendedText });

            let data = await  this.autentication.generic(_atts).toPromise()
          
            let respuesta = data.data[0].atts[1].value;
            this.formato(this.solicitudes[i], respuesta);
             this.reformar();
             
             
            }
            this.controlService.closeSpinner(spinner);
            this.isLoading = false
            
          
          /*this.solicitudes.map(async (item,index) => {
            _atts = []
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'CREATE_DEFINITION' });
          _atts.push({ name: 'type', value: item.type });
          // _atts.push({ name: 'code', value: item.code });
          _atts.push({ name: 'description', value: item.description });
          _atts.push({ name: 'extendedText', value: item.extendedText });

         
       _atts = [];

          })*/
       /* this.solicitudes.forEach( async (item, index) => {

          _atts = []
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'CREATE_DEFINITION' });
          _atts.push({ name: 'type', value: item.type });
          // _atts.push({ name: 'code', value: item.code });
          _atts.push({ name: 'description', value: item.description });
          _atts.push({ name: 'extendedText', value: item.extendedText });
          // _atts.push({ name: 'occupation', value: item.ocupation });
          // _atts.push({ name: 'taskType', value: item.taskType });
          // _atts.push({ name: 'requestComment', value: item.Comentario });
          console.log(index);
           let data = await  this.autentication.generic(_atts).toPromise()
           console.log(data.success)
           let respuesta = ''
           if(data.success === true){

            respuesta = data.data[0].atts[1].value;
                this.formato(this.solicitudes[index], respuesta);
                 this.reformar();
                 this.controlService.closeSpinner(spinner);
                 this.isLoading = false

             _atts = [];
           }
          // console.log(_atts, 'HABLA CHONCA')
          
        }

        );*/
        

        break;
      case '+RKY' :

      for( let i = 0 ; i < this.solicitudes.length ; i++){

        _atts = []
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'CREATE_DEFINITION' });
        _atts.push({ name: 'type', value: this.solicitudes[i].type });
        // _atts.push({ name: 'code', value: this.solicitudes[i].code });
        _atts.push({ name: 'description', value: this.solicitudes[i].description });
        _atts.push({ name: 'extendedText', value: this.solicitudes[i].extendedText });

        let data = await  this.autentication.generic(_atts).toPromise()
      
        let respuesta = data.data[0].atts[1].value;
        this.formato(this.solicitudes[i], respuesta);
         this.reformar();
         
         
        }
        this.controlService.closeSpinner(spinner);
        this.isLoading = false
      
       

        break;
      case '+RKR' :
        
      for( let i = 0 ; i < this.solicitudes.length ; i++){

        _atts = []
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'CREATE_DEFINITION' });
        _atts.push({ name: 'type', value: this.solicitudes[i].type });
        // _atts.push({ name: 'code', value: this.solicitudes[i].code });
        _atts.push({ name: 'description', value: this.solicitudes[i].description });
        _atts.push({ name: 'extendedText', value: this.solicitudes[i].extendedText });

        let data = await  this.autentication.generic(_atts).toPromise()
      
        let respuesta = data.data[0].atts[1].value;
        this.formato(this.solicitudes[i], respuesta);
         this.reformar();
         
         
        }
        this.controlService.closeSpinner(spinner);
        this.isLoading = false

       

        

        break;
      case '+RKB' :


      for( let i = 0 ; i < this.solicitudes.length ; i++){

        _atts = []
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'CREATE_DEFINITION' });
        _atts.push({ name: 'type', value: this.solicitudes[i].type });
        // _atts.push({ name: 'code', value: this.solicitudes[i].code });
        _atts.push({ name: 'description', value: this.solicitudes[i].description });
        _atts.push({ name: 'extendedText', value: this.solicitudes[i].extendedText });
        _atts.push({ name: 'family', value:this.solicitudes[i].family });
        let data = await  this.autentication.generic(_atts).toPromise()
      
        let respuesta = data.data[0].atts[1].value;
        this.formato(this.solicitudes[i], respuesta);
         this.reformar();
         
         
        }
        this.controlService.closeSpinner(spinner);
        this.isLoading = false


       

        break;
      case '+RKF' :

      for( let i = 0 ; i < this.solicitudes.length ; i++){

        _atts = []
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'CREATE_DEFINITION' });
        _atts.push({ name: 'type', value: this.solicitudes[i].type });
        // _atts.push({ name: 'code', value: this.solicitudes[i].code });
        _atts.push({ name: 'description', value: this.solicitudes[i].description });
        _atts.push({ name: 'extendedText', value: this.solicitudes[i].extendedText });
  
        let data = await  this.autentication.generic(_atts).toPromise()
      
        let respuesta = data.data[0].atts[1].value;
        this.formato(this.solicitudes[i], respuesta);
         this.reformar();
         
         
        }
        this.controlService.closeSpinner(spinner);
        this.isLoading = false

      

        break;
    }

    // Swal2.fire({

    //   text : 'Proceso Realizado',
    //   icon : 'info'
    // });

    // this.solicitudes = [];
    // this.autentication.generic(_atts)
    // .subscribe(console.log)
    this.controlService.closeSpinner(spinner);
  }

  

  cerrar() {
    this.MatDialogRef.close();
  }

  formato(llave: any, mensaje) {
    // debugger
    switch (llave.type) {

      case '+RKT' :
        if (llave.extendedText) {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            code: llave.code,
            description: llave.description,
            extendedText: llave.extendedText,
            // ocupation: llave.ocupation,
            // taskType: llave.taskType,
            // Comentario: llave.Comentario,
            mensaje,

          });
        } else {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            // code: llave.code,
            description: llave.description,
            // ocupation: llave.ocupation,
            // taskType: llave.taskType,
            // Comentario: llave.Comentario,
            mensaje,

          });
        }

        break;
      case '+RKY' :

        if (llave.extendedText) {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            // code: llave.code,
            description: llave.description,
            extendedText: llave.extendedText,
            // Comentario: llave.Comentario,
            mensaje,

          });
        } else {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            // code: llave.code,
            description: llave.description,
            // Comentario: llave.Comentario,
            mensaje,

          });
        }

        break;
      case '+RKR' :
        if (llave.extendedText) {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            // code: llave.code,
            description: llave.description,
            extendedText: llave.extendedText,
            // branch : llave.branch,
            // family : llave.family,
            /*  */
            // clasification : llave.clasification,
            // Comentario: llave.Comentario,
            mensaje,

          });
        } else {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            // code: llave.code,
            description: llave.description,
            // branch: llave.branch,
            // family : llave.family,
            // clasification : llave.clasification,
            // Comentario: llave.Comentario,
            mensaje,

          });
        }

        break;
      case '+RKB' :

        if (llave.extendedText) {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            code: llave.code,
            description: llave.description,
            extendedText: llave.extendedText,
            family : llave.family,
            // Comentario: llave.Comentario,
            mensaje,

          });
        } else {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            code: llave.code,
            description: llave.description,
            family : llave.family,
            // Comentario: llave.Comentario,
            mensaje,

          });
        }

        break;
      case '+RKF' :

        if (llave.extendedText) {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            code: llave.code,
            description: llave.description,
            extendedText: llave.extendedText,
            // Comentario: llave.Comentario,
            mensaje,

          });
        } else {
          console.log(this.solicitudesResponse);
          this.solicitudesResponse.push({
            type: llave.type,
            code: llave.code,
            description: llave.description,
            // Comentario: llave.Comentario,
            mensaje,

          });
        }
        break;
    }

    console.log(this.solicitudesResponse.length);
  }

  esvalido(campo: string) {

    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }
  reformar() {
    if (this.solicitudesResponse.length === this.solicitudes.length) {

      this.solicitudes = [];
      console.log(this.solicitudesResponse);
      this.solicitudes = this.solicitudesResponse;
      this.solicitudesResponse = [];
      this.controlService.closeSpinner(true);
    }
  }

}
