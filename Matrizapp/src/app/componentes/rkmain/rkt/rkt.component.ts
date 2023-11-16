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
  public data: any;
  public anterior:any;

  public tareasList: any[] = [];
  public logList: any[] = [];
  public llaves: string[] = [];


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
  creacionaprobacion ='creacionaprobacion';

public key:string;
public version : string;
public Razon : string;
public canAdd : string;

  private id : string;
  private pid : string;
  private sid : string;
  private cid : string;
  private tid : string;
  EnviarHijos: string;
  permisoValidar: boolean;
  percreacion: string;
  loading: boolean = true;
  tabDefault: number;
  allow: string;
  boton: string;
  contador2: any;
  contador1: number;
  uid: string;
  vueltas: any;


  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private Cajas:ServiciocajasService,
              private _Recargarble:ServiciocajasService
              ) {

                //this.aperfil()

                this.canAdd=localStorage.getItem('canAdd');

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
                  
                  this.tabDefault = 0;
                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid);
                  

                });

              }

  ngOnInit() {

    // this.cargarRiesgo()

    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'));
    this.percreacion = localStorage.getItem('NoCreador');

    // this.Cajas.Recargar$.subscribe(resp=>{
    //   if(resp){
    //     this.tareaModel = {};
    //     this.dimensionesList = [];
    //     this.detalleList = [];
    //     this.stdJobList = [];
    //     this.ver(this.id, this.pid, this.sid, this.cid, this.tid);

    //   }
    // })

    this.Cajas.RecargarDetalle$.subscribe(resp=>{
      if(resp){
        // this.tareaModel = {};
            this.dimensionesList = [];
            this.detalleList = [];
            this.stdJobList = [];
            // this.ver(this.id, this.pid, this.sid, this.cid, this.tid);
            this.cargarRiesgo();        


      }
    });


  }


  ver(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string) {

    


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

            this.allow = localStorage.getItem('allow');
            console.log(data);
            data.data.forEach( (element) => {
              console.log(data);
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
                  console.log(this.tareaModel.tareaStatusId);
                  if(parseInt(this.tareaModel.tareaStatusId) == 1 || parseInt(this.tareaModel.tareaStatusId) == 2 ||parseInt(this.tareaModel.tareaStatusId) == 6 ){
                    var StatusTemp = 1;
                  }else{
                    var StatusTemp = parseInt(this.tareaModel.tareaStatusId);
                  }
                  console.log(StatusTemp);

                  if(parseInt(this.tareaModel.statusParent) == 1 || parseInt(this.tareaModel.statusParent) == 2 ||parseInt(this.tareaModel.statusParent) == 6 ){
                    var StatusTempP = 1;
                  }else{
                    var StatusTempP = parseInt(this.tareaModel.statusParent);
                  }


                  if(StatusTemp <StatusTempP){
                    this.permisoValidar = true;
                  }else{
                    this.permisoValidar= false;
                  }
                  console.log(this.permisoValidar);

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
            const parameters = [ this.allow , this.tareaModel.tareaStatusId , this.tareaModel.CanAdd ];
            this.boton = this.autentication.botonesFlujoAprobacion(parameters);
            this.cargarRiesgo();
          } else {
            this.controlService.closeSpinner(spinner);
            this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
          }

            
          return result;
      },
      (error) => {
        debugger;
          console.log(error);
        this.controlService.closeSpinner(spinner);
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.tareaModel, false);
      });
    });
  }

  ActivarBoton(){



    console.log(this.anterior.length);

    if( this.anterior.trimEnd() != this.tareaModel.tareaDescripcionExt.trimEnd()){
      this.modificar = true;
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

                    });

                  }
                  else {
                    // this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
                    Swal2.fire({
                      text: data.message,
                      icon: 'error'

                    });

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

              this.controlService.closeSpinner(spinner);
              console.log(this.tareaModel.tareaDescripcionExt);



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
        this._Recargarble.Recargar$.emit(true);

      }
    });

  }



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
        this._Recargarble.Recargar$.emit(true);
        Swal2.fire({
          icon:'success',
          text:data.data[0].atts[1].value
        });
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
      });
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
          this.VerCajasdashboard(key);

      break;
     case  '001' :

      this.VerCajasdashboard(key);


      break;
     case  '002' :

      this.VerCajasdashboard(key);

      break;
     case  '003' :

      this.VerCajasdashboard(key);
     case  '006' :

      this.VerCajasdashboard(key);

      break;

      case '004':

            this.VerRkvalidarC(key);
        break;

      case '007':
        this.VerRkporaprobar(key);

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

  cargarRiesgo(){

    this.loading = true;
    this.dimensionesList=[];
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'ITEM_EVALRISK_DETAIL_READ' });
    _atts.push({ name: 'key', value:  this.id+this.pid+this.sid+this.cid+this.tid });


    const spinner = this.controlService.openSpinner();
    const obj =  this.autentication.generic(_atts);


    obj.subscribe((data)=>{

      if (data.success === true) {

        console.log(data);



        data.data.forEach((element) =>{


          if(element.atts[5].value !== '010'){

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

          

        });

        this.loading = false;
        this.tabDefault = -1;
        this.controlService.closeSpinner(spinner);
        
      }else{
        
        this.loading = false;
        this.tabDefault = -1;
        this.controlService.closeSpinner(spinner);
        }
      });

      // this.loading = false

  }


  cargarPestañasDetalle(){

    this.loading = true;

      this.detalleList=[];
      let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'TAREA_READ_DETAIL' });
    _atts.push({ name: 'areaId', value:  this.id });
    _atts.push({ name: 'procesoId', value:  this.pid });
    _atts.push({ name: 'subprocesoId', value:  this.sid });
    _atts.push({ name: 'actividadId', value:  this.cid });
    _atts.push({ name: 'tareaId', value:  this.tid });


    const spinner = this.controlService.openSpinner();

    const obj =  this.autentication.generic(_atts);

          obj.subscribe((data)=>{

              if (data.success === true) {

                console.log(data);



                data.data.forEach((element) =>{

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

                });
                this.loading = false;

                this.controlService.closeSpinner(spinner);
                
              }else{
                
                this.loading = false;
                this.controlService.closeSpinner(spinner);
        }
      });

      // this.loading = false

  }
  cargarPestañasStdJob(){

    this.loading = true;

      this.stdJobList=[];
      let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'TAREA_READ_STDJOB' });
    _atts.push({ name: 'areaId', value:  this.id });
    _atts.push({ name: 'procesoId', value:  this.pid });
    _atts.push({ name: 'subprocesoId', value:  this.sid });
    _atts.push({ name: 'actividadId', value:  this.cid });
    _atts.push({ name: 'tareaId', value:  this.tid });

    const spinner = this.controlService.openSpinner();

    const obj =  this.autentication.generic(_atts);

          obj.subscribe((data)=>{

              if (data.success === true) {

                console.log(data);



                data.data.forEach((element) =>{

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

                });
                this.loading = false;
                this.controlService.closeSpinner(spinner);
                
              }else{
                
                this.loading = false;
                this.controlService.closeSpinner(spinner);
              }
            });

            // this.loading = false

  }

  test(e){

    console.log(e);
    // debugger
    switch(e.index){
      case 0:
        if(this.tabDefault !== e.index){

          this.cargarRiesgo();
        }
        break;
        case 1:
          this.cargarPestañasStdJob();
          break;
          case 2:
          this.cargarPestañasDetalle();
        break;

    }



  }
  enviarAvalidar(id, status , rechazo?) {

    let tipo = ''
    if(status === '004'){
       tipo = 'IV'
    }else {
       tipo = 'IA'
    }
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'PENDIENTE_VALIDAR_LIST' });
    _atts.push({ name: 'status', value: tipo });
    _atts.push({ name: 'key', value: id });
    _atts.push({ name: 'soloNodos', value: "Y" });
    _atts.push({ name: 'statusItem', value: status });
    _atts.push({ name: 'showCompleted', value: 'Y' });
    _atts.push({ name: 'empezarDesde', value: '0' });

    const spinner = this.controlService.openSpinner();
    //
    // debugger
    this.autentication.generic(_atts)
    .subscribe( datos => {


      if (datos.data[0].atts[0].name === 'TIMEOUT') {
        // debugger
        this.controlService.closeSpinner(spinner);

        Swal2.fire({
          icon: 'info',
          text: `Numero de items en Validación/Construcción excedido: ${datos.data[0].atts[0].value.trim()} ,bajar de nivel en la jerarquía`

        }).then((resultado) => {
          
        });

        return;

      }
      
        console.log( datos);
        if ( datos.success) {

        datos.data.forEach((element) => {

          if ( element.atts[0].name === 'uuid'){
            console.log(element);
            this.uid =  element.atts[0].value;

          }
        });
        if(rechazo == true){

          // this.rechazar(status)
          this.razonderechazo(status)

        }else{
          this.sendValidate( status);

        }
        this.controlService.closeSpinner(spinner);
      }
    });

  }

  sendValidate( status) {

    let mnsje = 'Enviar a Validar';
    let titulo = 'Envio a Validacion en Proceso';

    if(status === '007') {
      mnsje = 'Aprobar';
      titulo = 'Aprobacion en Proceso';
    }

    Swal2.fire({
      html: `<h3><strong>${mnsje}</strong></h3>`,

      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'VALIDATE' });
        _atts.push({ name: 'onlyActualNode', value: 'Y' });
        _atts.push({ name: 'uuid', value: this.uid });
            // _atts.push({ name: 'key', value: llaves });

        const obj = this.autentication.generic(_atts);
        const spinner = this.controlService.openSpinner();

        obj.subscribe(
                    (data) => {
                      if (data.success === true) {

                        // this.mostrarMensaje();
                      this.autentication.mensajeFlujoAprobacion(titulo);

                      this.Cajas.notificaciones$.emit(true);

                      } else {

                        Swal2.fire('', data.message, 'error');
                      }

                      this.controlService.closeSpinner(spinner);

                    },
                    (error) => {

                      this.controlService.closeSpinner(spinner);
                    });
                  }

                });

  }

  async razonderechazo(status){

    

    const conf = this.confirm.open(RkReasonRejectComponent,
      {
        hasBackdrop: true,
        // id: 'drag',
        height: 'auto',
        width: 'auto',
        data:
        {
         title : 'Razon de Rechazo'
          

        },
        // panelClass : 'tabla'

      });

      conf.afterClosed().subscribe( (resultado) =>{
        

          if(resultado.enviar){

            this.rechazar(status,resultado.mensaje)
          }
        
      })
 

  }
  rechazar( status,razon? ) {

    let mnsje = 'Rechazar Validacion';
    let titulo = 'Rechazo en Proceso';

    if(status === '007') {
      mnsje = 'Rechazar Aprobacion';
      titulo = 'Rechazo en Proceso';
    }

   

    Swal2.fire({
      html: `<h3><strong>${mnsje}</strong></h3>`,
      text: 'Se procederá a RECHAZAR el(los) Registro(s) seleccionado(s)',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {

        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'VALIDATE' });
        _atts.push({ name: 'onlyActualNode', value: 'Y' });
        _atts.push({ name: 'uuid', value: this.uid });
        _atts.push({ name: 'approveInd', value: 'U' });
        _atts.push({ name: 'comments', value: razon });


        console.log(_atts)
            // _atts.push({ name: 'key', value: llaves });

        const obj = this.autentication.generic(_atts);
        const spinner = this.controlService.openSpinner();

        obj.subscribe(
                    (data) => {
                      if (data.success === true) {

                        // this.mostrarMensaje();
                      this.autentication.mensajeFlujoAprobacion(titulo);

                      this.Cajas.notificaciones$.emit(true);

                      } else {

                        Swal2.fire('', data.message, 'error');
                      }

                      this.controlService.closeSpinner(spinner);

                    },
                    (error) => {

                      this.controlService.closeSpinner(spinner);
                    });
                  }

                });

  }


  obtenerVueltas(llaves) {
    this.vueltas = Math.ceil(llaves.length / 1000 );
    this.dividirLlaves(llaves);
  }

  async dividirLlaves(llaves?) {

    // const vueltas = Math.ceil(llaves.length / 1000 )
    if (llaves.length > 1000 ) {

      if (this.contador2 < this.vueltas) {

        let llavesp = this.obtenerPorcion(llaves);
        this.autentication.envioPorLotes(llavesp, this.uid)
        .subscribe( (uuid) => {

          uuid.data.forEach( (uid) => {
              this.uid = uid.atts[1].value.trim();
          });
          this.contador1 = this.contador1 + 1000;
          this.contador2++;
          this.dividirLlaves(llaves);

        });

      } else {

        this.envioAEllipse(llaves.slice(this.contador1, llaves.length), 'T' );
      }

    } else {
       this.envioAEllipse(llaves, 'T' );

    }

  }

obtenerPorcion(llaves: any) {

  const valores = llaves.slice(this.contador1 , (this.contador2 * 1000));

  return valores.toString();
}
async envioAEllipse(keys: any[], envio: string ) {

  let valores:string = '';

  let mnsje = 'Enviar a Validar';
  let titulo = 'Envio a Validacion en Proceso';

  if(status === '007') {
      mnsje = 'Aprobar';
      titulo = 'Aprobacion en Proceso';
    }

  const _atts = [];
  _atts.push({ name: 'scriptName', value: 'coemdr' });
  _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
  _atts.push({ name: 'onlyActualNode', value: 'Y' });

  _atts.push({ name: 'key', value: keys.toString() });
  _atts.push({ name: 'envio', value: envio });
  _atts.push({ name: 'uuid', value: this.uid });

  console.log(_atts);

  const obj = await this.autentication.generic(_atts);
  const spinner = this.controlService.openSpinner();

  obj.subscribe(
                (data) => {
                    if (data.success === true) {

                      if (this.uid === '') {

                        this.uid = data[1]['atts'][1].value;

                        // this.dividirLlaves();
                      }

                      this.autentication.mensajeFlujoAprobacion(titulo);
                      // this.dialogRef.close(false);
                      this.Cajas.notificaciones$.emit(true);

                } else {

                  Swal2.fire('', data.message, 'error');
                }

                    this.controlService.closeSpinner(spinner);

              },
              (error) => {
                this.controlService.closeSpinner(spinner);
                console.log(error);
                // this.controlService.closeSpinner(spinner);
              });
}

generarReporte(){
  this.autentication.generarReporte(this.tareaModel.key)
  .subscribe(
    (resp:any) => {

      Swal2.fire({
        text : resp.data[0].atts[1].value,
        icon : 'info'

      }
      );
    }
  )
}
}