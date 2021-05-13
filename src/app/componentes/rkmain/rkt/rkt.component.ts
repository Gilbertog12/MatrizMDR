import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { RkcstdjobComponent } from '../rkcstdjob/rkcstdjob.component';
import { RkcequipComponent } from '../rkcequip/rkcequip.component';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';
import Swal2 from 'sweetalert2';
import swal from 'sweetalert';
import { CajasdashboardComponent } from '../../../rkmain/cajasdashboard/cajasdashboard.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';





@Component({
  selector: 'app-rkt',
  templateUrl: './rkt.component.html',
  styleUrls: ['./rkt.component.scss']
})
export class RktComponent implements OnInit {
  

  public tareaModel: any = {
    
  };
  public link:string;
  public dimensionesList: any[] = [];
  public dimensionesListLectura: any[] = [];
  public detalleList: any[] = [];
  public stdJobList: any[] = [];
  public stdJobListLectura: any[] = [];
  public modificar:boolean =false;
  public data: any
  public anterior:any;

  public tareasList: any[] = [];
  public logList: any[] = [];
  
 
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
public canAdd : string
  
  private id : string;
  private pid : string;
  private sid : string;
  private cid : string;
  private tid : string;
  EnviarHijos: string;
  permisoValidar: boolean;
  percreacion: string;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private route: ActivatedRoute,
              private Cajas:ServiciocajasService,
              private _Recargarble:ServiciocajasService
              ) {

                this.aperfil()

                this.canAdd=localStorage.getItem('canAdd')

                this.route.params.subscribe( params => {
                  this.id = params['id'];
                  this.pid = params['pid'];
                  this.sid = params['sid'];
                  this.cid = params['cid'];
                  this.tid = params['tid'];
                  this.tareaModel = {};
                  this.dimensionesList = [];
                  this.detalleList = [];
                  this.stdJobList = [];
                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid);
                });

              }

  ngOnInit() {
  
    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'))
    this.percreacion = localStorage.getItem('NoCreador')

    // this.Cajas.Recargar$.subscribe(resp=>{
    //   if(resp){       
    //     this.tareaModel = {};
    //     this.dimensionesList = [];
    //     this.detalleList = [];
    //     this.stdJobList = [];
    //     this.ver(this.id, this.pid, this.sid, this.cid, this.tid);     
        
    //   }
    // })

    
  }


  ver(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string) {
    
    debugger
    if(this.tareaModel !== {}){
      this.tareaModel = {}
    };
    if(this.dimensionesList !== []){
      this.dimensionesList = []
    }
    if(this.detalleList !== []){
      this.detalleList = []
    }
    if(this.stdJobList !== []){
      this.stdJobList = []
    }
    if(this.detalleList !== []){
      this.detalleList = []
    }
    

    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'TAREA_READ' });
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'actividadId', value: actividadId });
    _atts.push({ name: 'tareaId', value: tareaId });
    _atts.push({ name: 'versionId', value: '000' });

    const spinner = this.controlService.openSpinner();

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {
            console.log(data)
            data.data.forEach( (element) => {
              console.log(data)
              if ( element.atts.length > 0) {
                if ( element.atts[0].value === '0' ) {
                  this.tareaModel = {
                    offset: element.atts[0].value,
                    areaId: element.atts[1].value,
                    areaDescripcion: element.atts[2].value,
                    procesoId: element.atts[3].value,
                    procesoDescripcion: element.atts[4].value,
                    subprocesoId: element.atts[5].value,
                    subprocesoDescripcion: element.atts[6].value,
                    actividadId: element.atts[7].value,
                    actividadDescripcion: element.atts[8].value,
                    tareaId: element.atts[9].value,
                    tareaDescripcion: element.atts[10].value,
                    tareaDescripcionExt: element.atts[11].value,
                    tareaIdOcupacion: element.atts[12].value,
                    tareaDescOcupacion: element.atts[13].value,
                    tareaIdTipo: element.atts[14].value,
                    tareaDescTipo: element.atts[15].value,
                    tareaRiesgoPuroDesc: element.atts[16].value,
                    tareaRiesgoResidualDesc: element.atts[17].value,
                    key: data.data[0].atts[18].value,
                    statusParent: data.data[0].atts[19].value,
                    CanAdd:data.data[0].atts[20].value,
                    CanModifydata:data.data[0].atts[21].value,
                    Creador:data.data[0].atts[22].value,
                    tareaStatus: data.data[0].atts[23].value,
                    tareaStatusId :data.data[0].atts[27].value,
                  };
                  console.log(this.tareaModel.tareaStatusId)
                  if(parseInt(this.tareaModel.tareaStatusId) == 1 || parseInt(this.tareaModel.tareaStatusId) == 2 ||parseInt(this.tareaModel.tareaStatusId) == 6 ){
                    var StatusTemp = 1
                  }else{
                    var StatusTemp = parseInt(this.tareaModel.tareaStatusId)
                  }
                  console.log(StatusTemp)

                  if(parseInt(this.tareaModel.statusParent) == 1 || parseInt(this.tareaModel.statusParent) == 2 ||parseInt(this.tareaModel.statusParent) == 6 ){
                    var StatusTempP = 1
                  }else{
                    var StatusTempP = parseInt(this.tareaModel.statusParent)
                  }


                  if(StatusTemp <StatusTempP){
                    this.permisoValidar = true
                  }else{
                    this.permisoValidar= false
                  }
                  console.log(this.permisoValidar)

                  localStorage.setItem('keySelected', this.tareaModel.key);
                  localStorage.setItem('versionSelected', this.tareaModel.tareaVersion);
                  localStorage.setItem('statusSelected', this.tareaModel.tareaStatusId);
                  this.anterior = this.tareaModel.tareaDescripcionExt;

                } else {
                  let _s : string;
                  _s = element.atts[0].value;

                  if (_s.includes('detail')) {
                    this.detalleList.push({
                      offset: element.atts[0].value,
                      dimensionId: element.atts[1].value,
                      dimensionDesc: element.atts[2].value,
                      riesgoId: element.atts[3].value,
                      riesgoDesc: element.atts[4].value,
                      consecuenciaId: element.atts[5].value,
                      consecuenciaDesc: element.atts[6].value,
                      probabilidad: element.atts[7].value,
                      severidad: element.atts[8].value,
                      criticidad: element.atts[9].value
                    });
                  } else if (_s.includes('stdjob')) {

                    if(element.atts[5].value ==='008' && this.btn==='lectura'){
                      this.stdJobListLectura.push({
                        offset: element.atts[0].value,
                        stdJobNo: element.atts[1].value.trim(),
                        stdJobDesc: element.atts[2].value,
                        stdJobTaskNo: element.atts[3].value,
                        stdJobTaskDesc: element.atts[4].value,
                        statusId: element.atts[5].value,
                        versionId: element.atts[6].value,
                        seqNum: element.atts[7].value,
                        pendingDelete: element.atts[8].value,
                        displayDeleteIcon: element.atts[9].value
                      });
                    }else{

                      this.stdJobList.push({
                        offset: element.atts[0].value,
                        stdJobNo: element.atts[1].value.trim(),
                        stdJobDesc: element.atts[2].value,
                        stdJobTaskNo: element.atts[3].value,
                        stdJobTaskDesc: element.atts[4].value,
                        statusId: element.atts[5].value,
                        versionId: element.atts[6].value,
                        seqNum: element.atts[7].value,
                        pendingDelete: element.atts[8].value,
                        displayDeleteIcon: element.atts[9].value
                      });
                    }
                    } else {

                      if(element.atts[5].value === '008' && this.btn==='lectura'){

                        this.dimensionesListLectura.push({
                          offset: element.atts[0].value,
                          Id: element.atts[1].value.trim(),
                          Descripcion: element.atts[2].value,
                          dimensionRiesgoPuro: element.atts[3].value,
                          dimensionRiesgoResidual: element.atts[4].value,
                          estado: element.atts[5].value
                        });
                      }else{

                        this.dimensionesList.push({
                          offset: element.atts[0].value,
                          Id: element.atts[1].value.trim(),
                          Descripcion: element.atts[2].value,
                          dimensionRiesgoPuro: element.atts[3].value,
                          dimensionRiesgoResidual: element.atts[4].value,
                          estado: element.atts[5].value,
                          pendingDelete: element.atts[7].value
                        });
                      }
                  }
                }
              }
            });

            this.controlService.closeSpinner(spinner);
          } else {
            this.controlService.closeSpinner(spinner);
            this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.controlService.closeSpinner(spinner);
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.tareaModel, false);
      });
    });
  }

  ActivarBoton(){
    
    
    
    console.log(this.anterior.length)
    
    if( this.anterior.trimEnd() != this.tareaModel.tareaDescripcionExt.trimEnd()){
      this.modificar = true
    }
    
    
  }

  async AgregarDescripcion(){
      
        
    let _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'TAREA_TE_CREATE' });
            _atts.push({ name: 'areaId', value: this.tareaModel.areaId });
            _atts.push({ name: 'procesoId', value: this.tareaModel.procesoId });
            _atts.push({ name: 'subprocesoId', value: this.tareaModel.subprocesoId });
            _atts.push({ name: 'actividadId', value: this.tareaModel.actividadId });
            _atts.push({ name: 'tareaId', value: this.tareaModel.tareaId });
            _atts.push({ name: 'text', value: this.tareaModel.tareaDescripcionExt});

            const spinner = this.controlService.openSpinner();
            const obj = await this.autentication.generic(_atts);

            obj.subscribe(
              (data) => {
                if (data.success === true) {
                  if (data.data[0].atts[1]) {
                    // this.autentication.showMessage(data.data[0].atts[0].value, data.data[0].atts[1].value, this.tareaModel, data.redirect);
                    Swal2.fire({
                      text: 'Descripcion Extendida',
                      icon: 'success'

                    })
                      
                  }
                  else {
                    // this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
                    Swal2.fire({
                      text: data.message,
                      icon: 'error'
                      
                    })
                      
                                      }
                }
                else {
                  this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
                  this.tareaModel.tareaId = '';
                }
                this.controlService.closeSpinner(spinner);
              },
              (error) => {
                this.controlService.closeSpinner(spinner);
                
              });

              console.log(this.tareaModel.tareaDescripcionExt)


    
  }

  async guardarstdjob() {

    let conf = this.confirm.open(RkcstdjobComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Asociar Std Job Activos a Tareas',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        statusId: this.tareaModel.statusId,
        versionId: this.tareaModel.versionId,
        id: this.tareaModel.key
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.tareaModel = {};
        this.dimensionesList = [];
        this.detalleList = [];
        this.stdJobList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid);
        this._Recargarble.Recargar$.emit(true)

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
          this.btn='creacionaprobacion'
          return

      default:
        break;
    }


  }

  consola(accion : string){

    this.key = this.tareaModel.key 
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
  
      switch (this.tareaModel.tareaStatus) {
        
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
  //   input: 'radio',
  //   inputOptions: inputOptions,
  //   inputValidator: (value) => {
  //   if (!value) {
  //   return 'Debe Seleccionar una Opcion'
  //   }
  // }
    
    
    
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
    _atts.push({ name: 'onlyActualNode', value: 'Y' });
    _atts.push({ name: 'isValidatingFromTree', value: 'Y' });
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
                  this.ver(this.id, this.pid,this.sid,this.cid,this.tid);
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
      switch (this.tareaModel.tareaStatus) {
       
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
      console.log(this.tareaModel.tareaVersion)
     
      this.key = this.tareaModel.key + ','
      this.version = this.tareaModel.tareaVersion + ','

      localStorage.setItem('Llave', this.key);
      localStorage.setItem('VersionL', this.version);
      localStorage.setItem('isValidatingFromTree', 'Y');

  
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
  
  //     const conf = this.confirm.open(ConfirmationComponent, {
  //       hasBackdrop: true,
  //       height: 'auto',
  //       width: 'auto',
  //       data: {
  //         title: 'Rechazar Aprobacion',
  //         message: `Se procederá a RECHAZAR el (los) item (s) seleccionados
  // `,
  //         button_confirm: 'Aceptar',
  //         button_close: 'Cancelar'
  //       }
  //     });
  
  //     conf.afterClosed()
  //       .subscribe(async (result) => {
    //       if (result) {
  
    //         const conf1 = this.confirm.open(RkReasonRejectComponent,{
    //           hasBackdrop: true,
    //           height: 'auto',
    //           width: 'auto',
    //           data: {
    //             title: 'Razon de Rechazo',
    //             button_confirm: 'Aceptar',
    //             button_close: 'Cancelar'
    //           }
    //         });
  
    //         conf1.afterClosed().subscribe
    //         (async ( result1) =>{
    //           console.log( result1)
  
    //          if(result1){
  
    //             this.Razon = localStorage.getItem('RazonRechazo')
    //                let _atts = [];
    //         _atts.push({ name: 'scriptName', value: 'coemdr'});
    //         _atts.push({ name: 'action', value: 'VALIDATE'});
    //         _atts.push({ name: 'key', value: this.valor });
    //         _atts.push({ name: 'version', value: this.version});
    //         _atts.push({ name: 'approveInd', value: 'U' });
    //         _atts.push({ name: 'comments', value: this.Razon });
  
    //         const spinner = this.controlService.openSpinner();
    //         const obj = await this.autentication.generic(_atts);
  
    //         obj.subscribe(
    //           (data) => {
    //             if (data.success === true) {
    //               if (data.data[0].atts[1]) {
    //                 this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
    //                 localStorage.removeItem('RazonRechazo')
    
    //               }
  
    //             } else {
    //               this.autentication.showMessage(data.success, data.message, {}, data.redirect);
    //             }
    //             this.controlService.closeSpinner(spinner);
  
    //           },
    //           (error) => {
    //             // if ( error.status === 401 ) { this.autentication.logout(); return; }
    //             this.controlService.closeSpinner(spinner);
    //           });
  
    //           }
    //         } )
  
         
    //       //   console.log('Aqui Estoy..!')
    //       }
          // this.cerrar();
            
          
    //     });
    }
      
  
      async sendvalidate() {
  
        let title=''
        let resp= ''
  
        switch (this.tareaModel.tareaStatus) {
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
    //   input: 'radio',
    //   inputOptions: inputOptions,
    //   inputValidator: (value) => {
    //   if (!value) {
    //   return 'Debe Seleccionar una Opcion'
    //   }
    // }
      
      
      
    })
    if(color )
    
    {
     
      const _atts = [];
              _atts.push({ name: 'scriptName', value: 'coemdr' });
              _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
              _atts.push({ name: 'onlyActualNode', value: 'Y' });
              _atts.push({ name: 'isValidatingFromTree', value: 'Y' });
              _atts.push({ name: 'key', value: this.key });
    
              const spinner = this.controlService.openSpinner();
              const obj = this.autentication.generic(_atts);
    
              obj.subscribe(
                        (data) => {
                          if (data.success === true) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
    
                            Swal2.fire('Registro '+''+resp,'', 'success' )
                            this.ver(this.tareaModel.areaId,this.tareaModel.procesoId,this.tareaModel.subprocesoId,this.tareaModel.actividadId,this.tareaModel.tareaId);
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

          console.log(this.tareaModel.key)
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
                                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid);
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
        console.log(this.tareaModel.key)
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
                                this.ver(this.id, this.pid, this.sid, this.cid, this.tid);
                                // this.ver(this.tareaModel.areaid)

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
   
  
  /*ObtenerLink() {
    this.methodService.getJSON().subscribe(
      (data) => {
        // console.log(data);
        this.methodService.getAPI().subscribe(
          (data2) => {
            switch (data2[0]) {

              case 'http://ellipse-elldeve.elldeve.collahuasi.cl/ews/services/':
                this.link = 'http://ellipse-elldeve.elldeve.collahuasi.cl/ria/ui.html?application=MSO010&TABLE_TYPE1I=+RKT&OPTION1I=2&redirect=true&TABLE_CODE1I=' 
              
                return;

              case 'http://ellipse-elltest.elldeve.collahuasi.cl/ews/services/':
                this.link = ' http://ellipse-elldeve.elldeve.collahuasi.cl/ria/ui.html?application=MSO010&TABLE_TYPE1I=+RKT&OPTION1I=2&redirect=true&TABLE_CODE1I='  
                return

              case 'http://ellipse-ellprod.ellprod.collahuasi.cl/ews/services/':
                this.link = 'http://ellipse-ellprod.ellprod.collahuasi.cl/ria/ui.html?application=MSO010&TABLE_TYPE1I=+RKT&OPTION1I=2&redirect=true&TABLE_CODE1I=' 
                return;

              default:
                break;
            }
          });
      });
  }*/

  async eliminarstdjob(item: any) {

    const conf = this.confirm.open(ConfirmationComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Eliminar Std Job',
        message: `¿Desea eliminar este registro?`,
        button_confirm: 'Si',
        button_close: 'No'
      }
    });

    conf.afterClosed()
    .subscribe(async (result) => {
    if (result) {

    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'TAREA_STJB_DELETE'});
    _atts.push({ name: 'areaId', value: this.id });
    _atts.push({ name: 'procesoId', value: this.pid });
    _atts.push({ name: 'subprocesoId', value: this.sid });
    _atts.push({ name: 'actividadId', value: this.cid });
    _atts.push({ name: 'tareaId', value: this.tid });
    _atts.push({ name: 'stdJobNo1', value: item.stdJobNo});
    _atts.push({ name: 'stdJobTaskNo1', value: item.stdJobTaskNo});
    _atts.push({ name: 'statusId1', value: item.statusId});
    _atts.push({ name: 'versionId1', value: item.versionId});
    _atts.push({ name: 'seqNum', value: item.seqNum});

    const spinner = this.controlService.openSpinner();
    const obj = await this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.tareaModel, data.redirect);
        this._Recargarble.Recargar$.emit(true)
        Swal2.fire({
          icon:'success',
          text:data.data[0].atts[1].value
        })
      }
      this.tareaModel = {};
      this.dimensionesList = [];
      this.detalleList = [];
      this.stdJobList = [];
      this.ver(this.id, this.pid, this.sid, this.cid, this.tid);

    } else {
      // this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
      Swal2.fire({
        icon:'error',
        text:data.message
      })
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
    this.controlService.closeSpinner(spinner);
    });
    }

    });

  }

  async cargarequipo(item) {

    this.confirm.open(RkcequipComponent, {
      hasBackdrop: true,
      height: '600px',
      width: '500px',
      data: {
        title: 'Equipos asociados al Std Job',
        message: ``,
        button_confirm: 'Cerrar',
        button_close: 'Cerrar',
        stdJobNo: item.stdJobNo
      }
    });

  }
  async Caja(key,status){

      
    switch(status){
      
      case  '000' :
          this.VerCajasdashboard(key)
                  
      break;
     case  '001' :

      this.VerCajasdashboard(key)
          

      break;
     case  '002' :

      this.VerCajasdashboard(key)
          
      break;
     case  '003' :

      this.VerCajasdashboard(key)
     case  '006' :

      this.VerCajasdashboard(key)
         
      break;

      case '004':
        
            this.VerRkvalidarC(key)
        break;
        
      case '007':
        this.VerRkporaprobar(key)
       
        break;
      

    }
   
    
  }

 async VerCajasdashboard(key){

    const conf = this.confirm.open(CajasdashboardComponent,
      {
        hasBackdrop: true,
        id: 'drag',
        height: 'auto',
        width: 'auto',
        data:
        {
          title: 'Items en fase de creacion, modificacion o eliminacion',
          message: '',
          button_confirm: 'Cerrar',
          button_close: 'Cerrar',
          id: key,
          status: '001'

        },
        // panelClass : 'tabla'
        

      });
     
  }

 async VerRkvalidarC(key){
    const conf5 = this.confirm.open(RkvalidarComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data:
      {
        title: 'Items pendientes de validación',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar',
        id: key,
        status: status

      }

    });
   
  }
  
 async VerRkporaprobar(key){
    const conf6 = this.confirm.open(RkporaprobarComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',

      data:
      {
        title: 'Items Pendientes por Aprobar',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar',
        id: key,
        status: status

      }

    });
   
  }

}