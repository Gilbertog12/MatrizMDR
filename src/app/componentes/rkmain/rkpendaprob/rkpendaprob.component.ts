import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { Router } from '@angular/router';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';
import { FreshPipe } from '../../../fresh.pipe';
import Swal2 from 'sweetalert2';


@Component({
  selector: 'app-rkpendaprob',
  templateUrl: './rkpendaprob.component.html',
  styleUrls: ['./rkpendaprob.component.scss']
})
export class RkpendaprobComponent implements OnInit {

  public pendModel: any = {

  };

  filtro1= ''

  public pendList: any[] = [];
  public pendList1: any[] = [];
  valor: string;
  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public cargo: string;
  public btn: string;
  //
  public administrador = 'administrador';
  public creacion = 'creacion' ;
  public lectura = 'lectura' ;
  public creacionvalidacion = 'creacionvalidacion';
  public validacion = 'Validacion';
  public aprobacion = 'aprobacion';
  public validacionaprobacion = 'validacionaprobacion';
  creacionaprobacion = 'creacionaprobacion'

  FechaDesde= ''
  FechaDesdeServicio= ''
  FechaHastaServicio= ''
  FechaHasta= ''
  public jerarquia:any
  permi: boolean;
  complete: boolean=false;
  rutaJerarquia: any;
  controles: string;
  soloControles: boolean;

  constructor(public dialogRef: MatDialogRef<RkpendaprobComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.recargar();
    this.aperfil()
  }


  ngOnInit() {
  }
  masterSelected = false;

  async recargar() {

    this.pendList=[]

    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'PENDIENTE_VALIDAR_LIST' });
    _atts.push({ name: 'status', value: 'RE' });
    // if(this.complete == true){
    //   _atts.push({ name: 'showCompleted', value: 'N' });
      
    // }else{
    //         _atts.push({ name: 'showCompleted', value: 'Y' });
      
    // }
    const spinner = this.controlService.openSpinner();
    

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data);
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {

                  let rutaLongitud = element.atts[16].value.trim().length
                  let ruta = element.atts[16].value.trim()
                  // console.log(ruta)
                  console.group()
                  console.log(rutaLongitud.toString())
                  console.groupEnd()
                  switch(rutaLongitud.toString()) {

                    case '2':
                      this.rutaJerarquia = ruta
                      console.log(this.rutaJerarquia)
                      break;
                    case '6':
                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6)
                      break;
                    case '10':
                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10);
                      break;                      
                      case '14':  
                        
                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14);
                       break;
                      case '18':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18);
                        break;
                      case '19':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19);
                        break;
                      case '23':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23);
                        break;
                      case '27':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23)+ '-' + ruta.substring(23, 27);
                        break;
                      case '31':
                        
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23)+ '-' + ruta.substring(23, 27) + '-' +element.atts[21].value.trim()+ruta.substring(28, 31);
                        break;
                    }

                  

                  this.pendList.push({
                    Accion: element.atts[1].value.trim(),
                    Entidad: element.atts[2].value.trim(),
                    Id: element.atts[3].value.trim(),
                    Descripcion: element.atts[4].value.trim(),
                    Area: element.atts[5].value.trim(),
                    Proceso: element.atts[6].value.trim(),
                    Subproceso: element.atts[7].value.trim(),
                    Actividad: element.atts[8].value.trim(),
                    Tarea: element.atts[9].value.trim(),
                    Dimension: element.atts[10].value.trim(),
                    Riesgo: element.atts[11].value.trim(),
                    Consecuencia: element.atts[12].value.trim(),
                    Controles : element.atts[13].value.trim(),
                    Fecha: element.atts[15].value.trim(),
                    key: element.atts[16].value.trim(),
                    version : element.atts[17].value.trim(),
                    Comentarios : element.atts[18].value.trim(),
                    // permiso: this.permi,
                    check: false,
                    status:element.atts[19].value.trim(),
                    TipoControl:element.atts[21].value,
                    rutaJerarquia:this.rutaJerarquia 
                    
                    
                  });
                  
                }

                
              
              }

              
              );

              // this.comprobarPadre()
              console.log([this.pendList])
              

              this.controlService.closeSpinner(spinner);
            } else {
              this.controlService.snackbarError(data.message);
            }
            return result;
          },
          (error) => {
            this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
          });
    });
    
  }

  MarcarJerarquia(Value,status?){

    let key = Value
    let Istatus = status;

    // console.log(Istatus)
    // let entidadActual
    // console.log(key)
    
    // console.error('Entro al For')
    for(let i = 0; i < this.pendList.length; i++){
      // console.log(key)
      

      if(this.pendList[i]['key'].startsWith(key)){

        console.error('Aqui')
        // key =this.pendList[i]['key']

        

        if(this.pendList[i]['key'] !== key){
          
          if(this.pendList[i]['check'] == false){
             console.log('aqui estoy')
             this.pendList[i]['check'] = true
            //  this.pendList[i]['permiso'] = true
             
           }else{
             this.pendList[i]['check'] = false
            //  this.pendList[i]['permiso'] = false
   
           }
        }
        
        
          // if(key.length == 31){
          
          // break;
          //  key = key.substring(0,27)
          //  console.log(key)
          //  console.log(key.length)
          // }

      }
      
     /* if(this.pendList[i]['key'].startsWith(key)){
        
        // console.error()
        // if(this.pendList[i]['check'] == false){
        //   break;
        // }
        // key =this.pendList[i]['key']
        
        this.pendList[i]['check'] = true
            
          // if(this.pendList[i]['check'] == false){
          //   console.log('aqui estoy')
          //   this.pendList[i]['check'] = true
          //   this.pendList[i]['permiso'] = true
            
          // }else{
          //   this.pendList[i]['check'] = false
          //   this.pendList[i]['permiso'] = false
  
          // }
        
        // this.pendList[i]['permiso'] = true}
        
          // if(key.length == 31){
          
          // break;
          //  key = key.substring(0,27)
          //  console.log(key)
          //  console.log(key.length)
          // }

      }*/
    }

  }

  imprime(){
    

    let a = this.FechaDesde.substring(0,4);
    let b = this.FechaDesde.substring(7,5);
    let c = this.FechaDesde.substring(8,10);
    let d = this.FechaHasta.substring(0,4);
    let e = this.FechaHasta.substring(7,5);
    let f = this.FechaHasta.substring(8,10);
    let total=a+b+c
    
    
    this.FechaDesdeServicio =total
    this.FechaHastaServicio = d+e+f

    

  }

  Filtrar(){
    this.pendList=[]
    this.imprime()

    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'PENDIENTE_VALIDAR_LIST' });
    _atts.push({ name: 'status', value: 'RE' });
    if(this.complete == true){
      _atts.push({ name: 'showCompleted', value: 'N' });
      
    }else{
            _atts.push({ name: 'showCompleted', value: 'Y' });
      
    }
    _atts.push({ name: 'startDate', value: this.FechaDesdeServicio });
    _atts.push({ name: 'endDate', value: this.FechaHastaServicio });
    
    const spinner = this.controlService.openSpinner();
    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            // console.log("RES:" + JSON.stringify(data));
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  let rutaLongitud = element.atts[16].value.trim().length
                  let ruta = element.atts[16].value.trim()
                  // console.log(ruta)
                  console.group()
                  console.log(rutaLongitud.toString())
                  console.groupEnd()
                  switch(rutaLongitud.toString()) {

                    case '2':
                      this.rutaJerarquia = ruta
                      console.log(this.rutaJerarquia)
                      break;
                    case '6':
                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6)
                      break;
                    case '10':
                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10);
                      break;                      
                      case '14':  
                        
                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14);
                       break;
                      case '18':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18);
                        break;
                      case '19':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19);
                        break;
                      case '23':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23);
                        break;
                      case '27':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23)+ '-' + ruta.substring(23, 27);
                        break;
                      case '31':
                        
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' +ruta.substring(6, 10)+ '-' + ruta.substring(10, 14)+ '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23)+ '-' + ruta.substring(23, 27) + '-' +element.atts[21].value.trim()+ruta.substring(28, 31);
                        break;
                    }

                  

                  this.pendList.push({
                    Accion: element.atts[1].value.trim(),
                    Entidad: element.atts[2].value.trim(),
                    Id: element.atts[3].value.trim(),
                    Descripcion: element.atts[4].value.trim(),
                    Area: element.atts[5].value.trim(),
                    Proceso: element.atts[6].value.trim(),
                    Subproceso: element.atts[7].value.trim(),
                    Actividad: element.atts[8].value.trim(),
                    Tarea: element.atts[9].value.trim(),
                    Dimension: element.atts[10].value.trim(),
                    Riesgo: element.atts[11].value.trim(),
                    Consecuencia: element.atts[12].value.trim(),
                    Controles : element.atts[13].value.trim(),
                    Fecha: element.atts[15].value.trim(),
                    key: element.atts[16].value.trim(),
                    version : element.atts[17].value.trim(),
                    Comentarios : element.atts[18].value.trim(),
                    // permiso: this.permi,
                    check: false,
                    status:element.atts[19].value.trim(),
                    TipoControl:element.atts[21].value,
                    rutaJerarquia:this.rutaJerarquia 
                    
                    
                  });
                  
                }

                
              
              }

              
              );

              // this.comprobarPadre()
              console.log([this.pendList])
              

              this.controlService.closeSpinner(spinner);
            } else {
              this.controlService.snackbarError(data.message);
            }
            return result;
          },
          (error) => {
            this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
          });
    });
    
  }
    
    

  cerrar(mensaje:any) {
    console.log(mensaje)

    if(mensaje !==''){

      this.dialogRef.close(mensaje);
    }else{

      this.dialogRef.close(false);
    }

  }

  checkUncheckAll() {
    for (var i = 0; i < this.pendList.length; i++) {
      this.pendList[i].check = this.masterSelected;
    }

  }

  async sendvalidate() {

    if (this.valor === '' || this.valor === 'undefined') {
      // this.autentication.showMessage(false, 'Debe Seleccionaar al menos 1 item', {}, false);
      Swal2.fire({
        icon: 'info',
        text: 'Debe Seleccionaar al menos 1 item',
        
      })
      
      return;
    }

    if (this.soloControles) {
      const { value: accept } = await Swal2.fire({

        title:'Enviar a Archivar',
        text: 'ESTA MODIFICANDO UN CONTROL',
        icon:'question',
        input:'checkbox',
        inputValue:'',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        inputPlaceholder:'Acepto',
        confirmButtonText:'Archivar',
        inputValidator: (result) => {
        return !result && 'Debe Aceptar los Terminos'
    }
      })
  
      if (accept) {
  
        let _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'ENVIAR_ARCHIVAR' });
            _atts.push({ name: 'key', value: this.valor });
  
  
            const spinner = this.controlService.openSpinner();
            const obj = await this.autentication.generic(_atts);
  
              obj.subscribe((data)=>{
  
                if (data.success === true) {
                              if (data.data[0].atts[1]) {
                                // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
  
                                Swal2.fire(
                                  {
                                    icon:'success',
                                    text:'Registro Archivado ',
                                    // showConfirmButton: false,
                                    // timer: 3000
                                  }
                                )
                              }
              
                            }else {
                              
                                Swal2.fire(
                                  {
                                    icon:'error',
                                    text:data.message,
                                    // showConfirmButton: false,
                                    // timer: 3000
                                  }
                                )
                                  
                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                              
                            }  
                            this.controlService.closeSpinner(spinner);
                              
                            
  
              },(error)=>{
                this.controlService.closeSpinner(spinner);
              })   
             this.cerrar('falso');       
      //       obj.subscribe(
      //         (data) => {
      //           if (data.success === true) {
      //             if (data.data[0].atts[1]) {
      //               this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
      //             }
  
      //           } else {
      //             this.autentication.showMessage(data.success, data.message, {}, data.redirect);
      //           }
      //           this.controlService.closeSpinner(spinner);
  
      //         },
      //         (error) => {
      //           // if ( error.status === 401 ) { this.autentication.logout(); return; }
      //           this.controlService.closeSpinner(spinner);
      //         });
      //     }
      //     this.cerrar();
      //   });
  
        
  
        
      }  
    } else {
    
      const { value: accept } = await Swal2.fire({

        title:'Enviar a Archivar',
        text: 'Tenga en cuenta que una vez archivado no podrá visualizar ni utilizar más éste Registro',
        icon:'question',
        input:'checkbox',
        inputValue:'',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        inputPlaceholder:'Acepto',
        confirmButtonText:'Archivar',
        inputValidator: (result) => {
        return !result && 'Debe Aceptar los Terminos'
    }
      })
  
      if (accept) {
  
        let _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'ENVIAR_ARCHIVAR' });
            _atts.push({ name: 'key', value: this.valor });
  
  
            const spinner = this.controlService.openSpinner();
            const obj = await this.autentication.generic(_atts);
  
              obj.subscribe((data)=>{
  
                if (data.success === true) {
                              if (data.data[0].atts[1]) {
                                // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
  
                                Swal2.fire(
                                  {
                                    icon:'success',
                                    text:'Registro Archivado ',
                                    // showConfirmButton: false,
                                    // timer: 3000
                                  }
                                )
                              }
              
                            }else {
                              
                                Swal2.fire(
                                  {
                                    icon:'error',
                                    text:data.message,
                                    // showConfirmButton: false,
                                    // timer: 3000
                                  }
                                )
                                  
                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                              
                            }  
                            this.controlService.closeSpinner(spinner);
                              
                            
  
              },(error)=>{
                this.controlService.closeSpinner(spinner);
              })   
             this.cerrar('falso');       
      //       obj.subscribe(
      //         (data) => {
      //           if (data.success === true) {
      //             if (data.data[0].atts[1]) {
      //               this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
      //             }
  
      //           } else {
      //             this.autentication.showMessage(data.success, data.message, {}, data.redirect);
      //           }
      //           this.controlService.closeSpinner(spinner);
  
      //         },
      //         (error) => {
      //           // if ( error.status === 401 ) { this.autentication.logout(); return; }
      //           this.controlService.closeSpinner(spinner);
      //         });
      //     }
      //     this.cerrar();
      //   });
  
        
  
        
      }
    }

    



  
}

async RestaurarItem() {

  if (this.valor === '' || this.valor === 'undefined') {
    // this.autentication.showMessage(false, 'Debe Seleccionaar al menos 1 item', {}, false);
    Swal2.fire({
      icon: 'info',
      text: 'Debe Seleccionaar al menos 1 item',
      
    })
    
    return;
  }

  if (this.soloControles) {
    const { value: accept } = await Swal2.fire({

      title:'Restaurar Registro',
      text: 'ESTA MODIFICANDO UN CONTROL',
      icon:'question',
      input:'checkbox',
      inputValue:'',
      inputPlaceholder:'Acepto',
      showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      confirmButtonText:'Restaurar',
      inputValidator: (result) => {
      return !result && 'Debe Aceptar los Terminos'
  }
    })
  
    if (accept) {
  
      let _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'ENVIAR_RESTAURAR' });
          _atts.push({ name: 'key', value: this.valor });
          _atts.push({ name: 'accion', value: 'Mod' });
  
  
          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);
  
            obj.subscribe((data)=>{
  
              if (data.success === true) {
                            if (data.data[0].atts[1]) {
                              // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
  
                              Swal2.fire(
                                {
                                  icon:'success',
                                  text:'Registro Restaurado ',
                                 
                                }
                              )
                            }
            
                          }else {
                            
                              Swal2.fire(
                                {
                                  icon:'error',
                                  text:data.message,
                                 
                                }
                              )
                                
                          // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                            
                          }  
                          this.controlService.closeSpinner(spinner);
                            
                          
  
            },(error)=>{
              this.controlService.closeSpinner(spinner);
            })   
           this.cerrar('falso');       
       
      
    } 
  } else {
      
    const { value: accept } = await Swal2.fire({
  
      title:'Restaurar Registro',
      text: '¿Desea Restaurar este Item ?',
      icon:'question',
      input:'checkbox',
      inputValue:'',
      inputPlaceholder:'Acepto',
      showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
      confirmButtonText:'Restaurar',
      inputValidator: (result) => {
      return !result && 'Debe Aceptar los Terminos'
  }
    })
  
    if (accept) {
  
      let _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'ENVIAR_RESTAURAR' });
          _atts.push({ name: 'key', value: this.valor });
          _atts.push({ name: 'accion', value: 'Mod' });
  
  
          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);
  
            obj.subscribe((data)=>{
  
              if (data.success === true) {
                            if (data.data[0].atts[1]) {
                              // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
  
                              Swal2.fire(
                                {
                                  icon:'success',
                                  text:'Registro Restaurado ',
                                 
                                }
                              )
                            }
            
                          }else {
                            
                              Swal2.fire(
                                {
                                  icon:'error',
                                  text:data.message,
                                 
                                }
                              )
                                
                          // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                            
                          }  
                          this.controlService.closeSpinner(spinner);
                            
                          
  
            },(error)=>{
              this.controlService.closeSpinner(spinner);
            })   
           this.cerrar('falso');       
       
      
    }
  }


  


}
  CargarFechas(){

    this.pendList.forEach((element) => {
       this.pendList1.push({
         fecha:element.pendList
       })
    })
   let aux =[]
   let arr =[]
    this.pendList1.forEach(el => {
     // comprobamos si el valor existe en el objeto
     if (!(el in aux)) {
       // si no existe creamos ese valor y lo añadimos al array final, y si sí existe no lo añadimos
       aux[el] = true
       arr.push(el)
     }

   })
   this.pendList1=arr;

   console.log(this.pendList1)

   
 }
  async VerEnviarAprobar() {

    this.confirm.open(RkpendaprobComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data:
      {
        title: 'Items Rechazados',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar'
      }

    });

  }
  aperfil() {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'SESSION' });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log("RES:" + JSON.stringify(data));
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  this.Perfil.push({
                    adm: element.atts[1].value,
                    apr: element.atts[2].value,
                    con: element.atts[3].value,
                    cre: element.atts[4].value,
                    val: element.atts[5].value,
                  });
                }


              });

              this.Perfil.forEach((element, index, array) => {

                this.consulta = element.con;
                this.admin = element.adm;
                this.aprobador = element.apr;
                this.creador = element.cre;
                this.validador = element.val;

                if(this.admin === 'Y'){
                  this.aprobador = 'Y';
                  this.creador = 'Y';
                  this.validador = 'Y';
                  this.consulta = 'Y';


                }

                this.cargo = this.admin + this.aprobador + this.consulta + this.creador + this.validador;
                // if (this.cargo === 'NNYNN') {
                //   this.propiedad = 'none';
                // }
                this.mostrar();

              });

            } else {
              this.controlService.snackbarError(data.message);
            }
            return result;
          },
          (error) => {
            this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
          });
    });


  }

  async mostrar()  {

    switch (this.cargo) {
      case 'NNYNN': //SOLO LECTURA

        this.btn = 'lectura';
        return;

      case 'NNYYN'://LECTURA Y CREACION 
        this.btn = 'creacion';
        return;
      case 'NNYNY'://LECTURA Y VALIDACION 
        this.btn = 'Validacion';
        return;
      case 'NYYNN'://LECTURA Y APROBACION
        this.btn = 'aprobacion';
        return;
      case 'NNYYY'://LECTURA , CREACION , VALIDACION
        this.btn = 'creacionvalidacion';

        return;
        
        case 'YYYYY'://Administrador
        this.btn = 'administrador';

        return;

        case 'NYYYY'://Administrador
        this.btn = 'administrador';

        return;

        case 'NYYNY':
        this.btn = 'validacionaprobacion';
        return;

        case 'NYYYN':
        this.btn = 'creacionaprobacion'

      default:
        break;
    }


  }

  isOnlyControl(arreglo)
      {
        console.log(arreglo=arreglo.split(','))
        


        for(let i =0 ; i < arreglo.length; i++)
        {

          console.log(arreglo)
          if(arreglo[i].includes('CONTROLES')){
            // console.log('soy solo controles')

            return true
          }else{
            return false
          }

        }
        
      }
  
  
  consola(opcion) {
    this.valor = "";
    this.controles ='';
    for (let i = 0; i < this.pendList.length; i++) {

      if (this.pendList[i]["check"] === true) {
        this.valor = this.valor + ','+ this.pendList[i]['key']+','+'Y';
        this.controles = this.controles + ','+ this.pendList[i]['Entidad']
        this.soloControles = this.isOnlyControl(this.controles.slice(1))

        
      }else{
        this.valor = this.valor + ','+ this.pendList[i]['key']+','+'N'  ;
      }

    }
    console.log(this.valor = this.valor.slice(1));

    
    //AQUI COLOCA EL LLAMADO EL SRVICIIO
    if(opcion ==='archivar'){

      this.sendvalidate()
    }else if(opcion === 'restaurar'){
      
      this.RestaurarItem()
    }

  }

  ActivarFuncion(){
      
    setTimeout(function(){ location.reload(); }, 500);
       
  
}



verTable(item: any) {
  //alert(item.ruta.trim().length.toString());
  console.log(item)
  // for (let i = 0; i < this.pendList.length; i++) {

  //   if (this.pendList[i]['key'] === item.key) {
  //     this.jerarquia  = this.pendList[i]['key'] 
      
  //   }

  // }
  
  this.pendList.forEach((element)=>{
      if(element.key === item){
        
        this.jerarquia = element.key
      }
  })
 
  console.log(this.jerarquia)
  switch (this.jerarquia.trim().length.toString()) {
    

    case '2':
    this.router.navigate(['/rkmain/rka/' + this.jerarquia]);
    this.cerrar(this.jerarquia) 

    
    break;
  case '6':
    console.log('aqui')
    this.router.navigate(['/rkmain/rkp/' + this.jerarquia.substring(0, 2) + '/' + this.jerarquia.substring(2, 6)]);
    this.cerrar(this.jerarquia) 
    break;
  case '10':
    this.router.navigate(['/rkmain/rks/' +this.jerarquia.substring(0, 2) + '/' +this.jerarquia.substring(2, 6) + '/' +this.jerarquia.substring(6, 10)]);
    this.cerrar(this.jerarquia) 
    break;
 
    
    case '14':
      
        
      
      
      this.router.navigate(['/rkmain/rkc/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14)]);
      
      this.cerrar(this.jerarquia) 
      // 
      
      // window.location.reload()
      
             
      break;
    case '18':
      this.router.navigate(['/rkmain/rkt/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18)]);
      this.cerrar( this.jerarquia) 
      
      break;
    case '19':
      this.router.navigate(['/rkmain/rkd/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18) + '/' + item.substring(18, 19)]);
      this.cerrar( this.jerarquia) 
      
      
      break;
    case '23':
      this.router.navigate(['/rkmain/rkr/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18) + '/' + item.substring(18, 19) + '/' + item.substring(19, 23)]);
      this.cerrar( this.jerarquia) 
      
      break;
    case '27':
      this.router.navigate(['/rkmain/rky/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18) + '/' + item.substring(18, 19) + '/' + item.substring(19, 23) + '/' + item.substring(23, 27)]);
      this.cerrar( this.jerarquia) 
      
      break;
    case '31':
      this.router.navigate(['/rkmain/rky/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18) + '/' + item.substring(18, 19) + '/' + item.substring(19, 23) + '/' + item.substring(23, 27)]);
      this.cerrar( this.jerarquia.substring(0,27)) 
      
      break;
  }
}

}
