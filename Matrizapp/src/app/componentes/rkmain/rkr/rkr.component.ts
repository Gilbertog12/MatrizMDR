import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';
import Swal2 from 'sweetalert2';
import swal from 'sweetalert';

import { CajasdashboardComponent } from '../../../rkmain/cajasdashboard/cajasdashboard.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';

@Component({
  selector: 'app-rkr',
  templateUrl: './rkr.component.html',
  styleUrls: ['./rkr.component.scss']
})
export class RkrComponent implements OnInit {

  public riesgoModel: any = {

  };

  public consecuenciasList: any[] = [];
  public consecuenciasListLectura: any[] = [];
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

  private id : string;
  private pid : string;
  private sid : string;
  private cid : string;
  private tid : string;
  private did : string;
  private rid : string;
  EnviarHijos: any;
  permisoValidar: boolean;
  loading: boolean;
  allow: string;
  boton: string;
  vueltas: number;
  contador2: number;
  uid: string;
  contador1: number;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private Cajas:ServiciocajasService) {
                //this.aperfil()

                this.route.params.subscribe( params => {
                  this.id = params['id'];
                  this.pid = params['pid'];
                  this.sid = params['sid'];
                  this.cid = params['cid'];
                  this.tid = params['tid'];
                  this.did = params['did'];
                  this.rid = params['rid'];
                  this.riesgoModel = {};
                  this.consecuenciasList = [];
                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid);

                });

              }

  ngOnInit() {

    // this.cargarRiesgo()
    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'));
    this.Cajas.RecargarDetalle$.subscribe(resp=>{
      if(resp){
        // this.riesgoModel = {};
        this.consecuenciasList = [];
        // this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid);
        this.cargarRiesgo();
      }
    });

  }

  ver(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string, dimensionId: string, riesgoId: string) {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'RIESGO_READ'});
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'actividadId', value: actividadId });
    _atts.push({ name: 'tareaId', value: tareaId });
    _atts.push({ name: 'dimensionId', value: dimensionId });
    _atts.push({ name: 'riesgoId', value: riesgoId });
    _atts.push({ name: 'versionId', value: '000' });

    const spinner = this.controlService.openSpinner();

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            this.allow = localStorage.getItem('allow');

            data.data.forEach( (element) => {
              console.log(data);
              if ( element.atts.length > 0) {
                if ( element.atts[0].value === '0' ) {
                  this.riesgoModel = {
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
                    dimensionId: element.atts[11].value,
                    dimensionDescripcion: element.atts[12].value,
                    riesgoId: element.atts[13].value,
                    riesgoDescripcion: element.atts[14].value,
                    riesgoDescripcionExt: element.atts[15].value,
                    riesgoIdRama: element.atts[16].value,
                    riesgoDescRama: element.atts[17].value,
                    riesgoIdFamilia: element.atts[18].value,
                    riesgoDescFamilia: element.atts[19].value,
                    riesgoRiesgoPuroDesc: element.atts[20].value,
                    riesgoRiesgoResidualDesc: element.atts[21].value,
                    riesgoStatus: element.atts[22].value,
                    riesgoVersion: element.atts[23].value,
                    riesgoNivel: element.atts[24].value,
                    riesgoAributos: element.atts[25].value,
                    riesgoStatusId: element.atts[26].value,
                    key: element.atts[27].value,
                    statusParent:element.atts[28].value,
                    CanAdd:element.atts[29].value.trim()
                  };

                  if(parseInt(this.riesgoModel.riesgoStatusId) == 1 || parseInt(this.riesgoModel.riesgoStatusId) == 2 ||parseInt(this.riesgoModel.riesgoStatusId) == 6 ){
                    var StatusTemp = 1;
                  }else{
                    var StatusTemp = parseInt(this.riesgoModel.riesgoStatusId);
                  }
                  console.log(StatusTemp);

                  if(parseInt(this.riesgoModel.statusParent) == 1 || parseInt(this.riesgoModel.statusParent) == 2 ||parseInt(this.riesgoModel.statusParent) == 6 ){
                    var StatusTempP = 1;
                  }else{
                    var StatusTempP = parseInt(this.riesgoModel.statusParent);
                  }

                  if(StatusTemp<StatusTempP){
                    this.permisoValidar = true;
                  }else{
                    this.permisoValidar= false;
                  }
                  console.log(this.permisoValidar);

                  localStorage.setItem('keySelected', this.riesgoModel.key);
                  localStorage.setItem('versionSelected', this.riesgoModel.riesgoVersion);
                  localStorage.setItem('statusSelected', this.riesgoModel.riesgoStatusId);

                } else {

                  if( element.atts[9].value === '008' && this.btn==='lectura'){
                    this.consecuenciasListLectura.push({
                      offset: element.atts[0].value,
                      Id: element.atts[1].value.trim(),
                      Descripcion: element.atts[2].value,
                      consecuenciaRiesgoPuroN: element.atts[3].value,
                      consecuenciaRiesgoPuroM: element.atts[4].value,
                      consecuenciaRiesgoPuroS: element.atts[5].value,
                      consecuenciaRiesgoResidualN: element.atts[6].value,
                      consecuenciaRiesgoResidualM: element.atts[7].value,
                      consecuenciaRiesgoResidualS: element.atts[8].value,
                      estado: element.atts[9].value
                    });

                  }else{

                    this.consecuenciasList.push({
                      offset: element.atts[0].value,
                      Id: element.atts[1].value.trim(),
                      Descripcion: element.atts[2].value,
                      consecuenciaRiesgoPuroN: element.atts[3].value,
                      consecuenciaRiesgoPuroM: element.atts[4].value,
                      consecuenciaRiesgoPuroS: element.atts[5].value,
                      consecuenciaRiesgoResidualN: element.atts[6].value,
                      consecuenciaRiesgoResidualM: element.atts[7].value,
                      consecuenciaRiesgoResidualS: element.atts[8].value,
                      estado: element.atts[9].value,
                      pendingDelete: element.atts[11].value
                    });
                  }
                }
              }
            });
            const parameters = [ this.allow , this.riesgoModel.riesgoStatusId , this.riesgoModel.CanAdd ];
            this.boton = this.autentication.botonesFlujoAprobacion(parameters);

            this.cargarRiesgo();
          } else {
            this.controlService.closeSpinner(spinner);
            this.autentication.showMessage(data.success, data.message, this.riesgoModel, data.redirect);
          }

          return result;
        },
        (error) => {
          //debugger
          console.log(error);
          this.controlService.closeSpinner(spinner);
          this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgoModel, false);
        });
      });

  }

  cargarRiesgo(){

    this.loading = true;
    this.consecuenciasList=[];
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'ITEM_EVALRISK_DETAIL_READ' });
    _atts.push({ name: 'key', value:  this.id+this.pid+ this.sid+ this.cid+ this.tid+ this.did+ this.rid });

    const spinner = this.controlService.openSpinner();
    const obj =  this.autentication.generic(_atts);

    obj.subscribe((data)=>{

      if (data.success === true) {

        console.log(data);

        data.data.forEach((element) =>{
          if(element.atts[9].value !== '010'){

            
          this.consecuenciasList.push({


            offset: element.atts[0].value,
                      Id: element.atts[1].value.trim(),
                      Descripcion: element.atts[2].value,
                      consecuenciaRiesgoPuroN: element.atts[3].value,
                      consecuenciaRiesgoPuroM: element.atts[4].value,
                      consecuenciaRiesgoPuroS: element.atts[5].value,
                      consecuenciaRiesgoResidualN: element.atts[6].value,
                      consecuenciaRiesgoResidualM: element.atts[7].value,
                      consecuenciaRiesgoResidualS: element.atts[8].value,
                      estado: element.atts[9].value,
                      pendingDelete: element.atts[11].value
          });

          }


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
          this.btn='creacionaprobacion';
          return;

      default:
        break;
    }

  }

  consola(accion : string){

    this.key = this.riesgoModel.key;
    this.version = localStorage.getItem('versionSelected');

    switch(accion){

    case 'aprobar':
      this.sendvalidate();
      return;

      case 'validaraprobar':
      this.ValidarAprobar();
      return;

    case 'rechazar':
        this.Rechazar();
        return;

    case 'archivar':
          this.Archivar();
          return;

    case 'restaurar':
          this.RestaurarItem();
          return;

    }

  }

  async ValidarAprobar(){

    let title='';
    let resp= '';

    switch (this.riesgoModel.riesgoStatus) {

        case 'ENVIADO A VALIDACION':
          title= 'Validar';
          resp = 'Validado';

          break;
          case 'PENDIENTE INACTIVACION':
            title= 'Validar';
            resp = 'Validado';

            break;

        case 'PENDIENTE DE APROBACION':
          title= 'Aprobar';
          resp = 'Aprobado';
          break;

          case 'ENVIADO A APROBACION':
            title= 'Aprobar';
            resp = 'Aprobado';
            break;

        default:
          break;
      }

    const inputOptions = {

        'Y': 'Solo Padre',
        'N': 'Padre e Hijos',

  };

    const { value: color } = await Swal2.fire({
    title: title,
    text: '¿ Está seguro que desea'+' '+ title +' ' + 'este registro ?',

    showCancelButton: true,

    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor:'#3085d6',
    cancelButtonColor: '#d33',
    input: 'radio',
  //   inputOptions: inputOptions,
  //   inputValidator: (value) => {
  //   if (!value) {
  //   return 'Debe Seleccionar una Opcion'
  //   }
  // }

  });
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

                  Swal2.fire('Registro'+' '+resp,'', 'success' );
                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid);
                //  console.log('estoy aqui')
                  localStorage.setItem('isSendToValidate', '1');

                } else {
                  // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                  Swal2.fire('',data.message,'error');
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

      let title='';
      let resp='';
      switch (this.riesgoModel.riesgoStatus) {

        case 'ENVIADO A VALIDACION':
          title= 'Validacion';
          resp = 'Validado';

          break;
        case 'PENDIENTE DE APROBACION':
          title= 'AprobacionS';
          resp = 'Aprobado';

        default:
          break;
      }
      console.log(this.riesgoModel.riesgoVersion);

      this.key = this.riesgoModel.key + ',';
      this.version = this.riesgoModel.riesgoVersion + ',';

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
      });

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

        let title = '';
        let resp = '';

        switch (this.riesgoModel.riesgoStatus) {
          case 'CREADO':
            title = 'Enviar a Validar';
            resp = 'Enviado a Validar';

            break;

          case 'MODIFICADO':
            title = 'Enviar a Validar';
            resp = 'Enviado a Validar';

            break;

          default:
            break;
        }

        const inputOptions = {

          'Y': 'Solo Padre',
          'N': 'Padre e Hijos',

    };

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

    });
        if(color )
    {

      const _atts = [];
      _atts.push({ name: 'scriptName', value: 'coemdr' });
      _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
      _atts.push({ name: 'onlyActualNode', value: 'Y'});
      _atts.push({ name: 'isValidatingFromTree', value: 'Y' });
      _atts.push({ name: 'key', value: this.key });

      const spinner = this.controlService.openSpinner();
      const obj = this.autentication.generic(_atts);

      obj.subscribe(
                        (data) => {
                          if (data.success === true) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                            Swal2.fire('Registro '+''+resp,'', 'success' );
                            this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid);
                            localStorage.setItem('isSendToValidate', '1');

                          } else {
                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                            Swal2.fire('',data.message,'error');
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
          return !result && 'Debe Aceptar los Terminos';
      }
        });

        if (accept) {

          console.log(this.riesgoModel.key);
          this.key =this.key+ ',';
          console.log(this.key);

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
                                  );
                                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid);
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
                                  );

                              // this.autentication.showMessage(data.success, data.message, {}, data.redirect);

                              }
                  this.controlService.closeSpinner(spinner);

                },(error)=>{
                  this.controlService.closeSpinner(spinner);
                });
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
        return !result && 'Debe Aceptar los Terminos';
    }
      });

      if (accept) {

        console.log(this.riesgoModel.key);
        this.key =this.key+ ',';
        console.log(this.key);

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
                                );
                                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid);
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
                                );

                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);

                            }
                this.controlService.closeSpinner(spinner);

              },(error)=>{
                this.controlService.closeSpinner(spinner);
              });
            //  this.cerrar();

      }

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
    this.autentication.generarReporte(this.riesgoModel.key)
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