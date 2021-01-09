import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkpendComponent } from '../rkpend/rkpend.component';
import { RkpendaprobComponent } from '../rkpendaprob/rkpendaprob.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';

import Swal2 from 'sweetalert2';
import swal from 'sweetalert';
import { MatDialog } from '@angular/material';
import { RkmainComponent } from '../rkmain.component';


@Component({
  selector: 'app-rka',
  templateUrl: './rka.component.html',
  styleUrls: ['./rka.component.scss']
})
export class RkaComponent implements OnInit {

  public areaModel: any = {

  };

  public administrador = 'administrador';
  public creacion = 'creacion' ;
  public lectura = 'lectura' ;
  public creacionvalidacion = 'creacionvalidacion';
  public validacion = 'Validacion';
  public aprobacion = 'aprobacion';
  public validacionaprobacion = 'validacionaprobacion';
  creacionaprobacion ='creacionaprobacion'
  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public cargo: string;
  public btn: string;
  
public key:string
public version : string
public Razon : string

  public procesosList: any[] = [];
  public procesosListLectura: any[] =[]
  private id : string;
  EnviarHijos: string;
  public papa:RkmainComponent;
  permisoValidar: boolean;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private route: ActivatedRoute) {

                this.aperfil()

                this.route.params.subscribe( params => {
                  this.id = params['id'];
                  this.areaModel = {};
                  this.procesosList = [];
                  this.ver(this.id);

                });

              }

  ngOnInit() {
    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', this.id)
    
  }

  

  ver(areaId: string) {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'AREA_READ'});
    _atts.push({ name: 'areaId', value: areaId });

    const spinner = this.controlService.openSpinner();

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(

        (data) => {
          const result = data.success;
          if (result) {
            // console.info('aqui esta el cambio')
            console.log(data)
            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                if ( element.atts[0].value === '0' ) {

                  this.areaModel = {
                    offset: data.data[0].atts[0].value,
                    areaId: data.data[0].atts[1].value,
                    areaDescripcion: data.data[0].atts[2].value,
                    areaDescripcionExt: data.data[0].atts[3].value,
                    areaPosicion: data.data[0].atts[4].value,
                    areaPosicionDesc: data.data[0].atts[5].value,
                    areaIdClasificacion: data.data[0].atts[6].value,
                    areaDescClasificacion: data.data[0].atts[7].value,
                    areaRiesgoPuroDesc: data.data[0].atts[8].value,
                    areaRiesgoResidualDesc: data.data[0].atts[9].value,
                    areaStatus: data.data[0].atts[10].value,
                    areaVersion: data.data[0].atts[11].value,
                    areaNivel: data.data[0].atts[12].value,
                    areaAtributos: data.data[0].atts[13].value,
                    areaStatusId: data.data[0].atts[14].value,
                    key: data.data[0].atts[15].value,
                    statusParent: data.data[0].atts[16].value
                  };
                  
                  if(parseInt(this.areaModel.areaStatusId) == 1 || parseInt(this.areaModel.areaStatusId) == 2 ||parseInt(this.areaModel.areaStatusId) == 6 ){
                    var StatusTemp = 1
                  }else{
                    var StatusTemp = parseInt(this.areaModel.areaStatusId)
                  }
                  if(parseInt(this.areaModel.statusParent) == 1 || parseInt(this.areaModel.statusParent) == 2 ||parseInt(this.areaModel.statusParent) == 6 ){
                    parseInt(element.atts[19].value.trim())
                  }else{
                    var StatusTempP = parseInt(this.areaModel.statusParent)
                  }
                  console.log(StatusTemp)
                  if(StatusTemp <StatusTempP){
                    
                    this.permisoValidar = true
                  }else{
                    this.permisoValidar= false

                  }
                  console.log(this.permisoValidar)

                  localStorage.setItem('keySelected', this.areaModel.key);
                  localStorage.setItem('versionSelected', this.areaModel.areaVersion);
                  localStorage.setItem('statusSelected', this.areaModel.areaStatusId);

                } else {
                  console.log(element.atts[9].value )
                  if( element.atts[9].value === '008' && this.btn === 'lectura'){
                    console.log('aqui')
                    this.procesosListLectura.push({
                    
                    offset: element.atts[0].value,
                    Id: element.atts[1].value.trim(),
                    Descripcion: element.atts[2].value,
                    procesoRiesgoPuroN: element.atts[3].value,
                    procesoRiesgoPuroM: element.atts[4].value,
                    procesoRiesgoPuroS: element.atts[5].value,
                    procesoRiesgoResidualN: element.atts[6].value,
                    procesoRiesgoResidualM: element.atts[7].value,
                    procesoRiesgoResidualS: element.atts[8].value,
                    estado: element.atts[9].value
                  });
                  }else{
                    this.procesosList.push({
                    
                    offset: element.atts[0].value,
                    Id: element.atts[1].value.trim(),
                    Descripcion: element.atts[2].value,
                    procesoRiesgoPuroN: element.atts[3].value,
                    procesoRiesgoPuroM: element.atts[4].value,
                    procesoRiesgoPuroS: element.atts[5].value,
                    procesoRiesgoResidualN: element.atts[6].value,
                    procesoRiesgoResidualM: element.atts[7].value,
                    procesoRiesgoResidualS: element.atts[8].value,
                    estado: element.atts[9].value,
                    pendingDelete: element.atts[11].value

                  });
                  }
                }
              }
            });

            this.controlService.closeSpinner(spinner);
          } else {
            this.controlService.closeSpinner(spinner);
            this.autentication.showMessage(data.success, data.message, this.areaModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.controlService.closeSpinner(spinner);
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.areaModel, false);
      });
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
            // console.log("RES:" + JSON.stringify(data));
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
          this.btn='creacionaprobacion'
          return

      default:
        break;
    }


  }

  consola(accion : string){

    this.key = this.areaModel.key
    this.version = localStorage.getItem('versionSelected')
    
   
   switch(accion){
      
    case 'aprobar':
      this.sendvalidate()
      return;
    
    
      case 'validaraprobar':
      this.ValidarAprobar()
      return;

    case 'rechazar':
        this.Rechazar()
        return;

    case 'archivar':
          this.Archivar()
          return;
    
    case 'restaurar':
          this.RestaurarItem()
          return;
    
   }
   
   
   
    
  
    }

    async ValidarAprobar(){

      let title=''
        let resp= ''
  
        switch (this.areaModel.areaStatus) {
          
          case 'ENVIADO A VALIDACION':
            title= 'Validar'
            resp = 'Validado'
            
            break;
          case 'PENDIENTE DE APROBACION':
            title= 'Aprobar'
            resp = 'Aprobado'

            case 'ENVIADO A APROBACION':
              title= 'Aprobar'
              resp = 'Aprobado'
            break;

            case 'PENDIENTE INACTIVACION':
              title= 'Validar'
              resp = 'Validador'
              
              break;
           
            
          
        
          default:
            break;
        }

        const inputOptions = {
     
          'Y': 'Solo Padre',
          'N': 'Padre e Hijos',
          
      
    }
    
    const { value: color } = await Swal2.fire({
      title: title,
      text: '¿ Está seguro que desea'+' '+ title +' ' + 'este registro ?',
      
      showCancelButton: true,
      
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
      if (!value) {
      return 'Debe Seleccionar una Opcion'
      }
    }
      
      
      
    })
    if(color ){
      // console.log(color)
     
      // if(color == 1){
      //   this.EnviarHijos = 'Y'
      // }else{
      //   this.EnviarHijos = 'N'
      // }
      const _atts = [];
      _atts.push({ name: 'scriptName', value: 'coemdr' });
      _atts.push({ name: 'action', value: 'VALIDATE' });
      _atts.push({ name: 'onlyActualNode', value: color });
      _atts.push({ name: 'approveInd', value: 'A' });
      _atts.push({ name: 'comments', value: '' });
      _atts.push({ name: 'key', value: this.key });

      const spinner = this.controlService.openSpinner();
      const obj = this.autentication.generic(_atts);

      obj.subscribe(
                (data) => {
                  if (data.success === true) {
                    // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                    Swal2.fire('Registro'+' '+ resp,'', 'success' )
                    this.ver(this.id);
                    // console.log('estoy aqui')
                    localStorage.setItem('isSendToValidate', '1');
                    
                    
                  } else {
                    // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                    Swal2.fire('',data.message,'error')
                  }
    
                  this.controlService.closeSpinner(spinner);
    
                },
                (error) => {
                  // if ( error.status === 401 ) { this.autentication.logout(); return; }
                  this.controlService.closeSpinner(spinner);
                });

    }
      



    }

    Rechazar(){
      
      let title=''
      let resp=''
      switch (this.areaModel.areaStatus) {
       
        case 'ENVIADO A VALIDACION':
          title= 'Validacion'
          resp = 'Validado'
          
          break;
        case 'PENDIENTE DE APROBACION':
          title= 'AprobacionS'
          resp = 'Aprobado'
          
        
      
        default:
          break;
      }
      console.log(this.areaModel.areaVersion)
     
      this.key = this.areaModel.key + ','
      this.version = this.areaModel.areaVersion + ','

      localStorage.setItem('Llave', this.key);
      localStorage.setItem('VersionL', this.version);
  
      Swal2.fire({
  
        title:'Rechazar '+title,
        text:'Se procederá a RECHAZAR el(los) Registro(s) seleccionado(s)',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor:'#3085d6',
        cancelButtonColor: '#d33'
  
      }).then((result)=>{
          if(result.value){
  
            const conf1 = this.confirm.open(RkReasonRejectComponent,{
              hasBackdrop: true,
              height: 'auto',
              width: 'auto',
              data: {
                title: 'Razon de Rechazo',
                button_confirm: 'Aceptar',
                button_close: 'Cancelar'
              }
            });
  
           
          }
      })
  
  
    }
      
  
      async sendvalidate() {
  
        let title='Enviar a Validar'
        let resp= 'Enviado a Validar'
  
        switch (this.areaModel.areaStatus) {
          case 'CREADO':
            title= 'Enviar a Validar'
            resp = 'Enviado a Validar'
            
            break;
         
          case 'ENVIADO A VALIDACION':
            title= 'Validar'
            resp = 'Validado'
            
            break;
          case 'PENDIENTE DE APROBACION':
            title= 'Aprobar'
            resp = 'Aprobado'

            case 'ENVIADO A APROBACION':
              title= 'Aprobar'
              resp = 'Aprobado'
            break;

             case 'MODIFICADO':
              title= 'Enviar a Validar'
              resp = 'Enviado a Validar'
              
              break;
            
          
        
          default:
            break;
        }
        

        const inputOptions = {
     
          'Y': 'Solo Padre',
          'N': 'Padre e Hijos',
          
      
    }
    
    const { value: color } = await Swal2.fire({
      title: title,
      text: '¿ Está seguro que desea'+' '+ title +' ' + 'este registro ?',
      
      showCancelButton: true,
      
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
      if (!value) {
      return 'Debe Seleccionar una Opcion'
      }
    }
      
      
      
    })
    if(color ){
      // console.log(color)
     
      // if(color == 1){
      //   this.EnviarHijos = 'Y'
      // }else{
      //   this.EnviarHijos = 'N'
      // }
      const _atts = [];
      _atts.push({ name: 'scriptName', value: 'coemdr' });
      _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
      _atts.push({ name: 'onlyActualNode', value: color });
      _atts.push({ name: 'key', value: this.key });

      const spinner = this.controlService.openSpinner();
      const obj = this.autentication.generic(_atts);

      obj.subscribe(
                (data) => {
                  if (data.success === true) {
                    // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                    Swal2.fire('Registro'+' '+resp,'', 'success' )
                    this.ver(this.id);
                    console.log('estoy aqui')
                    localStorage.setItem('isSendToValidate', '1');
                    
                    
                  } else {
                    // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                    Swal2.fire('',data.message,'error')
                  }
    
                  this.controlService.closeSpinner(spinner);
    
                },
                (error) => {
                  // if ( error.status === 401 ) { this.autentication.logout(); return; }
                  this.controlService.closeSpinner(spinner);
                });

    }
        
       
  
      }
  
  
      async Archivar() {
  
        
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

          console.log(this.areaModel.key)
          this.key =this.key 
          console.log(this.key)
    
          let _atts = [];
              _atts.push({ name: 'scriptName', value: 'coemdr' });
              _atts.push({ name: 'action', value: 'ENVIAR_ARCHIVAR' });
              _atts.push({ name: 'key', value: this.key });
    
    
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
                                      showConfirmButton: false,
                                      timer: 3000
                                    }
                                  )
                                  this.ver(this.id);
                                  localStorage.setItem('isSendToValidate', '1');

                                }


                
                              }else {
                                
                                  Swal2.fire(
                                    {
                                      icon:'error',
                                      text:data.message,
                                      showConfirmButton: false,
                                      timer: 3000
                                    }
                                  )
                                    
                              // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                                
                              }  
                              this.controlService.closeSpinner(spinner);
                                
                              
    
                },(error)=>{
                  this.controlService.closeSpinner(spinner);
                })   
              //  this.cerrar();       
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
    
    async RestaurarItem() {
    
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

        console.log(this.areaModel.key)
          this.key =this.key
          console.log(this.key)
    
        let _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'ENVIAR_RESTAURAR' });
            _atts.push({ name: 'key', value: this.key });
    
    
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
                                    showConfirmButton: false,
                                    timer: 3000
                                  }
                                )

                                this.ver(this.id);
                                localStorage.setItem('isSendToValidate', '1');

                              }
              
                            }else {
                              
                                Swal2.fire(
                                  {
                                    icon:'error',
                                    text:data.message,
                                    showConfirmButton: false,
                                    timer: 3000
                                  }
                                )
                                  
                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                              
                            }  
                            this.controlService.closeSpinner(spinner);
                              
                            
    
              },(error)=>{
                this.controlService.closeSpinner(spinner);
              })   
            //  this.cerrar();       
         
        
      }
    
    
    }
  

}