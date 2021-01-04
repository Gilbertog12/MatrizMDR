import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkpendComponent } from '../rkpend/rkpend.component';
import { RkpendaprobComponent } from '../rkpendaprob/rkpendaprob.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';
import Swal2 from 'sweetalert2';
import swal from 'sweetalert';


@Component({
selector: 'app-rkp',
templateUrl: './rkp.component.html',
styleUrls: ['./rkp.component.scss']
})
export class RkpComponent implements OnInit {

public procesoModel: any = {

};

public subprocesosList: any[] = [];
subprocesosListLectura: any[] = [];

public tareasList: any[] = [];
public logList: any[] = [];
public detalleList: any[] = [];
public stdJobList: any[] = [];
public Perfil: any[] = [];
public consulta: string;
public admin: string;
public aprobador: string;
public creador: string;
public validador: string;
public cargo: string;
public btn: string;

public administrador = 'administrador';
public creacion = 'creacion' ;
public lectura = 'lectura' ;
public creacionvalidacion = 'creacionvalidacion';
public validacion = 'Validacion';
public aprobacion = 'aprobacion';
public validacionaprobacion = 'validacionaprobacion';
creacionaprobacion ='creacionaprobacion'

public key:string
public version : string
public Razon : string

private id : string;
private pid : string;
EnviarHijos: string;
  permisoValidar: boolean;

constructor(private autentication: AuthenticationService,
            private methodService: HttpMethodService,
            private controlService: ControlsService,
            private confirm: MatDialog,
            private route: ActivatedRoute) {

              this.aperfil()
              this.route.params.subscribe( params => {
                this.id = params['id'];
                this.pid = params['pid'];
                this.procesoModel = {};
                this.subprocesosList = [];
                this.ver(this.id, this.pid);
              });

            }

ngOnInit() {
  localStorage.setItem('isSendToValidate', '0');
  localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'))
}

ver(areaId: string, procesoId: string) {
  let _atts = [];
  _atts.push({name: 'scriptName', value: 'coemdr'});
  _atts.push({name: 'action', value: 'PROCESO_READ'});
  _atts.push({ name: 'areaId', value: areaId });
  _atts.push({ name: 'procesoId', value: procesoId });

  const spinner = this.controlService.openSpinner();

  const promiseView = new Promise((resolve, reject) => {
    this.autentication.generic(_atts)
    .subscribe(
      (data) => {
        const result = data.success;
        console.log(data)
        if (result) {

          data.data.forEach( (element) => {
            if ( element.atts.length > 0) {
              if ( element.atts[0].value === '0' ) {
                this.procesoModel = {
                  offset: element.atts[0].value,
                  areaId: element.atts[1].value,
                  areaDescripcion: element.atts[2].value,
                  procesoId: element.atts[3].value,
                  procesoDescripcion: element.atts[4].value,
                  procesoDescripcionExt: element.atts[5].value,
                  procesoIdClasificacion: element.atts[6].value,
                  procesoDescClasificacion: element.atts[7].value,
                  procesoRiesgoPuro: element.atts[8].value,
                  procesoRiesgoResidual: element.atts[9].value,
                  procesoStatus: element.atts[10].value,
                  procesoVersion: element.atts[11].value,
                  procesoNivel: element.atts[12].value,
                  procesoAtributos: element.atts[13].value,
                  procesoStatusId: data.data[0].atts[14].value,
                  key: data.data[0].atts[15].value,
                  statusParent: data.data[0].atts[16].value

                };

                if(parseInt(this.procesoModel.procesoStatusId)<parseInt(this.procesoModel.statusParent)){
                  this.permisoValidar = true
                }else{
                  this.permisoValidar= false
                }
                console.log(this.permisoValidar)

                localStorage.setItem('keySelected', this.procesoModel.key);
                localStorage.setItem('versionSelected', this.procesoModel.procesoVersion);
                localStorage.setItem('statusSelected', this.procesoModel.procesoStatusId);

              } else {
                if(element.atts[9].value === '008' && this.btn === 'lectura'){

                this.subprocesosListLectura.push({
                  offset: element.atts[0].value,
                  Id: element.atts[1].value.trim(),
                  Descripcion: element.atts[2].value,
                  subprocesoRiesgoPuroN: element.atts[3].value,
                  subprocesoRiesgoPuroM: element.atts[4].value,
                  subprocesoRiesgoPuroS: element.atts[5].value,
                  subprocesoRiesgoResidualN: element.atts[6].value,
                  subprocesoRiesgoResidualM: element.atts[7].value,
                  subprocesoRiesgoResidualS: element.atts[8].value,
                  estado: element.atts[9].value
                });
                }else{
                  this.subprocesosList.push({
                  offset: element.atts[0].value,
                  Id: element.atts[1].value.trim(),
                  Descripcion: element.atts[2].value,
                  subprocesoRiesgoPuroN: element.atts[3].value,
                  subprocesoRiesgoPuroM: element.atts[4].value,
                  subprocesoRiesgoPuroS: element.atts[5].value,
                  subprocesoRiesgoResidualN: element.atts[6].value,
                  subprocesoRiesgoResidualM: element.atts[7].value,
                  subprocesoRiesgoResidualS: element.atts[8].value,
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
          this.autentication.showMessage(data.success, data.message, this.procesoModel, data.redirect);
        }
        return result;
    },
    (error) => {
      this.controlService.closeSpinner(spinner);
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.procesoModel, false);
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
        this.btn='creacionaprobacion'
        return

    default:
      break;
  }


}

consola(accion : string){

  this.key = localStorage.getItem('keySelected')
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

    switch (this.procesoModel.procesoStatus) {
      
      case 'ENVIADO A VALIDACION':
        title= 'Validar'
        resp = 'Validado'
        
        break;

         case 'PENDIENTE INACTIVACION':
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

                Swal2.fire('Registro'+' '+resp,'', 'success' )
                this.ver(this.id, this.pid);
              //  console.log('estoy aqui')
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
    switch (this.procesoModel.procesoStatus) {
      
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
    console.log(this.procesoModel.procesoVersion)
    
    this.key = this.procesoModel.key + ','
    this.version = this.procesoModel.procesoVersion + ','

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

      let title=''
      let resp= ''

      switch (this.procesoModel.procesoStatus) {
        case 'CREADO':
          title= 'Enviar a Validar'
          resp = 'Enviado a Validar'
          
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
                          this.ver(this.id, this.pid);
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

        console.log(this.procesoModel.key)
        this.key =this.key+ ','
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
                                this.ver(this.id, this.pid);
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
      
      console.log(this.procesoModel.key)
        this.key =this.key+ ','
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
                              this.ver(this.id, this.pid);
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