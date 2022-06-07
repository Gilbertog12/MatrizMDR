import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RkycblandoComponent } from '../rkycblando/rkycblando.component';
import { RkycduroComponent } from '../rkycduro/rkycduro.component';
import { RkyepfComponent } from '../rkyepf/rkyepf.component';
import { RkydocComponent } from '../rkydoc/rkydoc.component';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkyriesgopuroComponent } from '../rkyriesgopuro/rkyriesgopuro.component';
import { RkyriesgopurotableComponent } from '../rkyriesgopurotable/rkyriesgopurotable.component';
import { RkyriesgopurotablerComponent } from '../rkyriesgopurotabler/rkyriesgopurotabler.component';
import { RkyriesgoresidualComponent } from '../rkyriesgoresidual/rkyriesgoresidual.component';
import { RkyriesgoresidualtableComponent } from '../rkyriesgoresidualtable/rkyriesgoresidualtable.component';
import { RkyriesgoresidualtablerComponent } from '../rkyriesgoresidualtabler/rkyriesgoresidualtabler.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';

import Swal2 from 'sweetalert2';
import swal from 'sweetalert';
import { CajasdashboardComponent } from '../../../rkmain/cajasdashboard/cajasdashboard.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';

@Component({
  selector: 'app-rky',
  templateUrl: './rky.component.html',
  styleUrls: ['./rky.component.scss']
})

export class RkyComponent implements OnInit {

  public consecuenciaModel: any = {

  };
  public epfList: any[] = [];
  public llaves: string[] = [];
  public epfListLectura: any[] = [];
  public cBlandosList: any[] = [];
  public cBlandosListLectura: any[] = [];
  public cDurosList: any[] = [];
  public cDurosListLectura: any[] = [];
  public docsList: any[] = [];
  public docsListLectura: any[] = [];

  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public cargo: string;
  public btn: string;
  public canAdd: string;

  public administrador = 'administrador';
  public creacion = 'creacion' ;
  public lectura = 'lectura' ;
  public creacionvalidacion = 'creacionvalidacion';
  public validacion = 'Validacion';
  public aprobacion = 'aprobacion';
  public validacionaprobacion = 'validacionaprobacion';
  creacionaprobacion = 'creacionaprobacion';

public key: string;
public version: string;
public Razon: string;
  private id: string;
  private pid: string;
  private sid: string;
  private cid: string;
  private tid: string;
  private did: string;
  private rid: string;
  private yid: string;
  EnviarHijos: string;
  permisoValidar: boolean;
  percreacion: string;
  dialogRef: any;
  controlesstatus: any = '';
  statusc: any = '';
  controlesstatusa: boolean;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private Cajas: ServiciocajasService) {

      // this.aperfil();
      this.canAdd = localStorage.getItem('canAdd');
      this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.pid = params['pid'];
      this.sid = params['sid'];
      this.cid = params['cid'];
      this.tid = params['tid'];
      this.did = params['did'];
      this.rid = params['rid'];
      this.yid = params['yid'];
      this.consecuenciaModel = {};
      this.epfList = [];
      this.cBlandosList = [];
      this.cDurosList = [];
      this.docsList = [];
      this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);

    });

  }

  ngOnInit() {
    // this.mostrar()
    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'));
    this.percreacion = localStorage.getItem('NoCreador');
    // console.log(this.controlesstatus)
    this.controlesstatus = '';
    this.Cajas.RecargarDetalle$.subscribe((resp)=> {
      if (resp) {

        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);

      }
    });

  }

  ver(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string, dimensionId: string, riesgoId: string, consecuenciaId: string) {
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'CONSECUENCIA_READ' });
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'actividadId', value: actividadId });
    _atts.push({ name: 'tareaId', value: tareaId });
    _atts.push({ name: 'dimensionId', value: dimensionId });
    _atts.push({ name: 'riesgoId', value: riesgoId });
    _atts.push({ name: 'consecuenciaId', value: consecuenciaId });
    // _atts.push({ name: 'versionId', value: '000' });

    const spinner = this.controlService.openSpinner();

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data);
            const result = data.success;
            if (result) {
              console.log(data);
              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  if (element.atts[0].value === '0') {
                    this.consecuenciaModel = {
                      offset: element.atts[0],
                      areaId: element.atts[1].value.trim(),
                      areaDescripcion: element.atts[2].value.trim(),
                      procesoId: element.atts[3].value.trim(),
                      procesoDescripcion: element.atts[4].value.trim(),
                      subprocesoId: element.atts[5].value.trim(),
                      subprocesoDescripcion: element.atts[6].value.trim(),
                      actividadId: element.atts[7].value.trim(),
                      actividadDescripcion: element.atts[8].value.trim(),
                      tareaId: element.atts[9].value.trim(),
                      tareaDescripcion: element.atts[10].value.trim(),
                      dimensionId: element.atts[11].value.trim(),
                      dimensionDescripcion: element.atts[12].value.trim(),
                      riesgoId: element.atts[13].value.trim(),
                      riesgoDescripcion: element.atts[14].value.trim(),
                      consecuenciaId: element.atts[15].value.trim(),
                      consecuenciaDescripcion: element.atts[16].value.trim(),
                      consecuenciaDescripcionExt: element.atts[17].value.trim(),
                      consecuenciaIdProbRP: element.atts[18].value.trim(),
                      consecuenciaDescPrbRP: element.atts[19].value.trim(),
                      consecuenciaIdSevRP: element.atts[20].value.trim(),
                      consecuenciaDescSevRP: element.atts[21].value.trim(),
                      consecuenciaIdNivelRP: element.atts[22].value.trim(),
                      consecuenciaDescNivelRP: element.atts[23].value.trim(),
                      consecuenciaIdProbRR: element.atts[24].value.trim(),
                      consecuenciaDescPrbRR: element.atts[25].value.trim(),
                      consecuenciaIdSevRR: element.atts[26].value.trim(),
                      consecuenciaDescSevRR: element.atts[27].value.trim(),
                      consecuenciaIdNivelRR: element.atts[28].value.trim(),
                      consecuenciaDescNivelRR: element.atts[29].value.trim(),
                      consecuenciaRiesgoPuro: element.atts[30].value.trim(),
                      consecuenciaRiesgoResidual: element.atts[31].value.trim(),
                      consecuenciaStatus: element.atts[32].value.trim(),
                      consecuenciaVersion: element.atts[33].value.trim(),
                      consecuenciaNivel: element.atts[34].value.trim(),
                      consecuenciaAtributos: element.atts[35].value.trim(),
                      consecuenciaStatusId: element.atts[36].value.trim(),
                      consecuenciaIdRMRP: element.atts[37].value.trim(),
                      consecuenciaDescRMRP: element.atts[38].value.trim(),
                      consecuenciaIdRMRR: element.atts[39].value.trim(),
                      consecuenciaDescRMRR: element.atts[40].value.trim(),
                      key: element.atts[41].value.trim(),
                      statusParent: element.atts[42].value.trim(),
                      CanAdd: element.atts[43].value.trim(),
                      CanModify: element.atts[44].value.trim(),
                      Creador: element.atts[45].value.trim()

                    };
                   
                    // alert(this.consecuenciaModel.key);
                    localStorage.setItem('keySelected', this.consecuenciaModel.key);
                    localStorage.setItem('versionSelected', this.consecuenciaModel.consecuenciaVersion);
                    localStorage.setItem('statusSelected', this.consecuenciaModel.consecuenciaStatusId);

                  } else {
                    let _s: string;
                    _s = element.atts[0].value;

                    if (_s.includes('epf')) {

                      // console.log(element.atts[2].value.trim().toString().bold())

                      if (element.atts[5].value === '008' && this.btn === 'lectura') {
                        this.epfListLectura.push({

                          offset: element.atts[0].value,
                          controlId: element.atts[1].value.trim(),
                          controlDesc:  element.atts[2].value.trim(),
                          epfId: element.atts[3].value.trim(),
                          epfDesc: element.atts[4].value.trim(),
                          epfStatus: element.atts[5].value.trim(),
                          epfversion: element.atts[6].value.trim(),
                          seqNum: element.atts[7].value.trim(),
                          pendingDelete: element.atts[8].value.trim(),
                          displayDeleteIcon: element.atts[9].value.trim(),
                          controlDescExt: element.atts[10].value.trim()

                        });

                        console.log(this.epfListLectura);

                      } else {

                        const a = element.atts[2].value.trim();

                        this.epfList.push({

                          offset: element.atts[0].value,
                          controlId: element.atts[1].value.trim(),
                          controlDesc:  element.atts[2].value.trim(),
                          epfId: element.atts[3].value.trim(),
                          epfDesc: element.atts[4].value.trim(),
                          epfStatus: element.atts[5].value.trim(),
                          epfversion: element.atts[6].value.trim(),
                          seqNum: element.atts[7].value.trim(),
                          pendingDelete: element.atts[8].value.trim(),
                          displayDeleteIcon: element.atts[9].value.trim(),
                          controlDescExt: element.atts[10].value.trim()

                        });

                        // if(element.atts[5].value.trim() !== '008'){

                        //     this.statusc = element.atts[5].value.trim()

                        // }
                        if (element.atts[5].value.trim() !== '008') {

                          // if(this.controlesstatus !== ''){
                          //   this.controlesstatus = ''
                          // }

                          this.controlesstatus = this.controlesstatus +' '+ element.atts[5].value.trim();

                        }
                        // this.controlesstatusa = this.validarcontroles(this.controlesstatus)

                        // this.controlesstatusa = this.validarcontroles(this.controlesstatus)

                      }

                      // console.log(this.epfList)
                    } else if (_s.includes('cblando')) {

                      if (element.atts[5].value === '008' && this.btn === 'lectura') {

                        this.cBlandosListLectura.push({
                          offset: element.atts[0].value,
                          cblandoId: element.atts[1].value.trim(),
                          cblandoDescripcion: element.atts[2].value.trim(),
                          cblandoFamiliaId: element.atts[3].value.trim(),
                          cblandoFamiliaDesc: element.atts[4].value.trim(),
                          cblandoStatus: element.atts[5].value.trim(),
                          cblandoVersion: element.atts[6].value.trim(),
                          pendingDelete: element.atts[7].value.trim(),
                          displayDeleteIcon: element.atts[8].value.trim(),
                          cblandoDescripcionExt: element.atts[9].value.trim()

                        });

                      } else {
                        this.cBlandosList.push({
                          offset: element.atts[0].value,
                          cblandoId: element.atts[1].value.trim(),
                          cblandoDescripcion: element.atts[2].value.trim(),
                          cblandoFamiliaId: element.atts[3].value.trim(),
                          cblandoFamiliaDesc: element.atts[4].value.trim(),
                          cblandoStatus: element.atts[5].value.trim(),
                          cblandoVersion: element.atts[6].value.trim(),
                          pendingDelete: element.atts[7].value.trim(),
                          displayDeleteIcon: element.atts[8].value.trim(),
                          cblandoDescripcionExt: element.atts[9].value.trim()

                        });
                        // if(element.atts[5].value.trim() !== '008'){
                        //   this.statusc = element.atts[5].value.trim()
                        // }
                        if (element.atts[5].value.trim() !== '008') {

                          this.controlesstatus = this.controlesstatus +' '+ element.atts[5].value.trim();
                        }
                        // this.controlesstatusa = this.validarcontroles(this.controlesstatus)

                        console.log(this.controlesstatus);
                      }

                    } else if (_s.includes('cduro')) {

                      if (  element.atts[7].value === '008' && this.btn === 'lectura') {
                        this.cDurosListLectura.push({
                          offset: element.atts[0].value,
                          cduroId: element.atts[1].value.trim(),
                          controlDuroDesc: element.atts[2].value.trim(),
                          cduroClasificacionDesc: element.atts[3].value.trim(),
                          cduroTipo1Desc: element.atts[4].value.trim(),
                          cduroTipo2Desc: element.atts[5].value.trim(),
                          cduroEfectividad: element.atts[6].value.trim(),
                          cduroStatus: element.atts[7].value.trim(),
                          cduroVersion: element.atts[8].value.trim(),
                          pendingDelete: element.atts[9].value.trim(),
                          displayDeleteIcon: element.atts[10].value.trim()

                        });

                      } else {
                      this.cDurosList.push({
                        offset: element.atts[0].value,
                        cduroId: element.atts[1].value.trim(),
                        controlDuroDesc: element.atts[2].value.trim(),
                        cduroClasificacionDesc: element.atts[3].value.trim(),
                        cduroTipo1Desc: element.atts[4].value.trim(),
                        cduroTipo2Desc: element.atts[5].value.trim(),
                        cduroEfectividad: element.atts[6].value.trim(),
                        cduroStatus: element.atts[7].value.trim(),
                        cduroVersion: element.atts[8].value.trim(),
                        pendingDelete: element.atts[9].value.trim(),
                          displayDeleteIcon: element.atts[10].value.trim()

                      });
                      // if(element.atts[5].value.trim() !== '008'){
                      //   if(this.statusc !== '006'){

                      //     this.statusc = element.atts[5].value.trim()
                      //   }
                      // }
                      if (element.atts[7].value.trim() !== '008') {

                        this.controlesstatus = this.controlesstatus +' '+ element.atts[7].value.trim();
                      }
                        // this.controlesstatusa = this.validarcontroles(this.controlesstatus)

                      console.log(this.controlesstatus);
                    }
                    } else if (_s.includes('doc')) {

                      if (element.atts[6].value === '008' && this.btn === 'lectura') {

                        this.docsListLectura.push({
                          offset: element.atts[0].value.trim(),
                          documentNo: element.atts[1].value.trim(),
                          documentType: element.atts[2].value.trim(),
                          documentName: element.atts[3].value.trim(),
                          documentUrl: element.atts[4].value.trim(),
                          documentVersion: element.atts[5].value.trim(),
                          docStatus: element.atts[6].value.trim(),
                          docVersion: element.atts[7].value.trim(),
                          seqNum: element.atts[8].value.trim(),
                          displayDeleteIcon: element.atts[9].value.trim(),
                          pendingDelete: element.atts[10].value.trim(),

                        });

                      } else {

                        this.docsList.push({
                          offset: element.atts[0].value.trim(),
                          documentNo: element.atts[1].value.trim(),
                          documentType: element.atts[2].value.trim(),
                          documentName: element.atts[3].value.trim(),
                          documentUrl: element.atts[4].value.trim(),
                          documentVersion: element.atts[5].value.trim(),
                          docStatus: element.atts[6].value.trim(),
                          docVersion: element.atts[7].value.trim(),
                          seqNum: element.atts[8].value.trim(),
                          displayDeleteIcon: element.atts[9].value.trim()

                        });
                        // if(element.atts[5].value.trim() !== '008'){
                        //   if(this.statusc !== '006'){

                        //     this.statusc = element.atts[5].value.trim()
                        //   }
                        // }
                        if (element.atts[6].value.trim() !== '008') {

                          this.controlesstatus = this.controlesstatus +' '+ element.atts[6].value.trim();
                        }
                        console.log(this.controlesstatus);
                      }
                    }
                  }
                }
              });

              this.controlesstatusa = this.validarcontroles(this.controlesstatus);
              this.controlesstatus = '';
              this.controlService.closeSpinner(spinner);
            } else {

              this.controlService.closeSpinner(spinner);
              this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
            }
            // this.controlService.closeSpinner(spinner);
            return result;
          },
          (error) => {
            // debugger
          console.log(error);
          this.controlService.closeSpinner(spinner);
          this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
          });
        });

        // this.controlesstatus = !this.controlesstatus.includes('008')
        // console.log(this.controlesstatus)

        // this.validarcontroles(this.controlesstatus)
        // this.controlService.closeSpinner(spinner);
      }

      validarcontroles(string: string) {

    if (string !== '') {
      let arry = string.split(' ');

      debugger
      this.mostrar(localStorage.getItem('PerfilRkj'))
      switch (this.btn) {

        case 'creacion': // LECTURA Y CREACION

        arry = arry.sort();
        arry.filter((status) => {

          if (this.statusc === '') {

            if (status === '000' || status === '001' || status === '002' || status === '003' || status === '006') {

              this.statusc = status;

        } else if (status === '004') {
              this.statusc = status;

        } else {

          if (status === '007') {
            this.statusc = status;

          }

        } }

        }
          );

        break;
        case 'Validacion': // LECTURA Y VALIDACION

        // var arry = string.split(' ')
        arry = arry.sort();
        arry.filter((status) => {

          if (this.statusc === '000' && status === '004' || this.statusc === '001' &&  status === '004' || this.statusc === '002' && status === '004' || this.statusc === '003' && status === '004' || this.statusc === '006' && status === '004') {
            this.statusc = status;

          }
          if (this.statusc === '000' && status === '007' || this.statusc === '001' &&  status === '007' || this.statusc === '002' && status === '007' || this.statusc === '003' && status === '007' || this.statusc === '006' && status === '007') {
            this.statusc = status;

          }

          if (this.statusc === '') {

            if (status === '004') {

              this.statusc = status;

              } else {
                if (status === '007') {

                  this.statusc = status;
                } else {
                  if (status === '000' || status === '001' || status === '002' || status === '003' || status === '006') {
                    this.statusc = status;

                  }
              }
            }
          }

      }
      );

        break;

    /*  case 'validacionaprobacion'://LECTURA Y VALIDACION

      var arry = string.split(' ')
      arry.filter(status => {

        if(status === '004'){

          this.statusc = status

        }else{
          if(status === '007'){

            this.statusc = status
          }else{
            if(status === '000' || status === '001' || status === '002'||status === '003'||status === '006'){
              this.statusc = status

            }
          }
        }
      }
      )

      return !string.includes('008');*/

     /* case 'creacionvalidacion'://LECTURA Y VALIDACION

      var arry = string.split(' ')
      arry.filter(status => {

        if(status === '004'){

          this.statusc = status

        }else{
          if(status === '007'){

            this.statusc = status
          }else{
            if(status === '000' || status === '001' || status === '002'||status === '003'||status === '006'){
              this.statusc = status

          }
        }
    }
  }
        )

      return !string.includes('008');*/

      case 'aprobacion': // LECTURA Y APROBACION

      // var arry = string.split(' ')
      arry = arry.sort().reverse();
      arry.filter((status) => {

        if (this.statusc === '004' && status === '000' || this.statusc === '004' &&  status === '001' || this.statusc === '004' && status === '002' || this.statusc === '004' && status === '003' || this.statusc === '004' && status === '006') {
          this.statusc = status;

        }

        if (this.statusc === '' ) {

          if (status === '007') {

            this.statusc = '007';

          } else {

            if (status === '000' || status === '001' || status === '002' || status === '003' || status === '006') {
              this.statusc = status;

          } else {

            if (status === '004') {
              this.statusc = '004';
            }
          }

          }
        }

      }
      );
      break;
      case 'administrador': // LECTURA Y APROBACION

      // var arry = string.split(' ')
      arry = arry.sort().reverse();
      arry.filter((status) => {

        if (this.statusc === '004' && status === '000' || this.statusc === '004' &&  status === '001' || this.statusc === '004' && status === '002' || this.statusc === '004' && status === '003' || this.statusc === '004' && status === '006') {
          this.statusc = status;

        }

        if (this.statusc === '' ) {

          if (status === '007') {

            this.statusc = '007';

          } else {

            if (status === '000' || status === '001' || status === '002' || status === '003' || status === '006') {
              this.statusc = status;

          } else {

            if (status === '004') {
              this.statusc = '004';
            }
          }

          }
        }

      }
      );
      break;

      default:
        break;

      }
      return !string.includes('008');

  }

    // return !string.includes('008')

  }

  async guardarcblando() {

    const conf = this.confirm.open(RkycblandoComponent, {
      hasBackdrop: true,
      height: '600px',
      width: '950px',
      data: {
        title: 'Asociar Control Blando a una Consecuencia',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  async eliminarcblando(item) {

    const conf = this.confirm.open(ConfirmationComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Eliminar Control Blando',
        message: `¿Desea eliminar este registro?`,
        button_confirm: 'Si',
        button_close: 'No'
      }
    });

    conf.afterClosed()
      .subscribe(async (result) => {
        if (result) {

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'CBLANDO_DELETE' });

          _atts.push({ name: 'areaId', value: this.id });
          _atts.push({ name: 'procesoId', value: this.pid });
          _atts.push({ name: 'subprocesoId', value: this.sid });
          _atts.push({ name: 'actividadId', value: this.cid });
          _atts.push({ name: 'tareaId', value: this.tid });
          _atts.push({ name: 'dimensionId', value: this.did });
          _atts.push({ name: 'riesgoId', value: this.rid });
          _atts.push({ name: 'consecuenciaId', value: this.yid });
          _atts.push({ name: 'cblandoId', value: item.cblandoId });
          _atts.push({ name: 'versionId', value: item.cblandoVersion });
          _atts.push({ name: 'statusId', value: item.cblandoStatus });

          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);

          obj.subscribe(
            (data) => {
              if (data.success === true) {
                if (data.data[0].atts[1]) {
                  // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.consecuenciaModel, data.redirect);
                  Swal2.fire({
                    icon: 'success',
                    text: 'Control Blando Eliminado'
                  });
                }
                this.consecuenciaModel = {};
                this.epfList = [];
                this.cBlandosList = [];
                this.cDurosList = [];
                this.docsList = [];
                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
              } else {
                // this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
                Swal2.fire({
                  icon: 'error',
                  text: data.message
                });
              }
              this.controlService.closeSpinner(spinner);

            },
            (error) => {
              this.controlService.closeSpinner(spinner);
              this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
            });
        }

      });

  }

  async guardarcduro() {

    const conf = this.confirm.open(RkycduroComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '500px',
      data: {
        title: 'Asociar Control Duro a una Consecuencia',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  async eliminarcduro(item: any) {

    const conf = this.confirm.open(ConfirmationComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Eliminar Control Duro',
        message: `¿Desea eliminar este registro?`,
        button_confirm: 'Si',
        button_close: 'No'
      }
    });

    conf.afterClosed()
      .subscribe(async (result) => {
        if (result) {

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'CDURO_DELETE' });
          _atts.push({ name: 'areaId', value: this.id });
          _atts.push({ name: 'procesoId', value: this.pid });
          _atts.push({ name: 'subprocesoId', value: this.sid });
          _atts.push({ name: 'actividadId', value: this.cid });
          _atts.push({ name: 'tareaId', value: this.tid });
          _atts.push({ name: 'dimensionId', value: this.did });
          _atts.push({ name: 'riesgoId', value: this.rid });
          _atts.push({ name: 'consecuenciaId', value: this.yid });
          _atts.push({ name: 'cduroId', value: item.cduroId });
          _atts.push({ name: 'versionId', value: item.cduroStatus });
          _atts.push({ name: 'statusId', value: item.cduroVersion });

          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);

          obj.subscribe(
            (data) => {
              if (data.success === true) {
                if (data.data[0].atts[1]) {
                  // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.consecuenciaModel, data.redirect);
                  Swal2.fire({
                    icon: 'success',
                    text: 'Control Duro Eliminado'
                  });
                }
                this.consecuenciaModel = {};
                this.epfList = [];
                this.cBlandosList = [];
                this.cDurosList = [];
                this.docsList = [];
                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
              } else {
                // this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
                Swal2.fire({
                    icon: 'error',
                    text: data.message
                  });
              }
              this.controlService.closeSpinner(spinner);
            },
            (error) => {
              this.controlService.closeSpinner(spinner);
              this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
            });
        }

      });

  }

  async guardarepf() {

    const conf = this.confirm.open(RkyepfComponent, {
      hasBackdrop: true,
      height: '600px',
      width: '950px',
      data: {
        title: 'Asociar un EPF a Consecuencia',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);

      } else {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
        this.dialogRef.close(true);
      }
    });

  }

  async eliminarepf(item: any) {

    const conf = this.confirm.open(ConfirmationComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Eliminar EPF',
        message: `¿Desea eliminar este registro?`,
        button_confirm: 'Si',
        button_close: 'No'
      }
    });

    conf.afterClosed()
      .subscribe(async (result) => {
        if (result) {

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'EPF_DELETE' });
          _atts.push({ name: 'areaId', value: this.id });
          _atts.push({ name: 'procesoId', value: this.pid });
          _atts.push({ name: 'subprocesoId', value: this.sid });
          _atts.push({ name: 'actividadId', value: this.cid });
          _atts.push({ name: 'tareaId', value: this.tid });
          _atts.push({ name: 'dimensionId', value: this.did });
          _atts.push({ name: 'riesgoId', value: this.rid });
          _atts.push({ name: 'consecuenciaId', value: this.yid });
          _atts.push({ name: 'controlEpfId', value: item.controlId });
          _atts.push({ name: 'versionId', value: item.epfVersion });
          _atts.push({ name: 'statusId', value: item.epfStatus });
          _atts.push({ name: 'seqNum', value: item.seqNum });

          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);

          obj.subscribe(
            (data) => {
              if (data.success === true) {
                if (data.data[0].atts[1]) {
                Swal2.fire('', 'Registro eliminado', 'success');

                }
                this.consecuenciaModel = {};
                this.epfList = [];
                this.cBlandosList = [];
                this.cDurosList = [];
                this.docsList = [];
                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
              } else {
                // this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
                Swal2.fire('', data.message, 'error');
                this.consecuenciaModel = {};
                this.epfList = [];
                this.cBlandosList = [];
                this.cDurosList = [];
                this.docsList = [];
                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);

              }
              this.controlService.closeSpinner(spinner);
            },
            (error) => {
              this.controlService.closeSpinner(spinner);
              this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
            });
        }

      });

  }

  async guardardoc() {

    const conf = this.confirm.open(RkydocComponent, {
      hasBackdrop: true,
      height: '600px',
      width: '950px',
      data: {
        title: 'Asociar Documento',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cerrar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      } else {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  async eliminardoc(item: any) {

    const conf = this.confirm.open(ConfirmationComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Eliminar Documento',
        message: `¿Desea eliminar este registro?`,
        button_confirm: 'Si',
        button_close: 'No'
      }
    });

    conf.afterClosed()
      .subscribe(async (result) => {
        if (result) {

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'DOCUMENTO_DELETE' });
          _atts.push({ name: 'areaId', value: this.id });
          _atts.push({ name: 'procesoId', value: this.pid });
          _atts.push({ name: 'subprocesoId', value: this.sid });
          _atts.push({ name: 'actividadId', value: this.cid });
          _atts.push({ name: 'tareaId', value: this.tid });
          _atts.push({ name: 'dimensionId', value: this.did });
          _atts.push({ name: 'riesgoId', value: this.rid });
          _atts.push({ name: 'consecuenciaId', value: this.yid });
          _atts.push({ name: 'documentoId', value: item.documentNo });
          _atts.push({ name: 'versionId', value: item.docVersion });

          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);

          obj.subscribe(
            (data) => {
              if (data.success === true) {
                if (data.data[0].atts[1]) {
                  this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.consecuenciaModel, data.redirect);
                }
                this.consecuenciaModel = {};
                this.epfList = [];
                this.cBlandosList = [];
                this.cDurosList = [];
                this.docsList = [];
                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
              } else {
                this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
              }
              this.controlService.closeSpinner(spinner);
            },
            (error) => {
              this.controlService.closeSpinner(spinner);
              this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
            });
        }

      });

  }

  async guardarriesgopuro() {

    const conf = this.confirm.open(RkyriesgopuroComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '500px',
      data: {
        title: 'Modificar Riesgo Puro',
        message: ``,
        button_confirm: 'Modificar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid,
        versionId: this.consecuenciaModel.consecuenciaVersion,
        probabilidad: this.consecuenciaModel.consecuenciaIdProbRP,
        severidad: this.consecuenciaModel.consecuenciaIdSevRP,
        criticidad: this.consecuenciaModel.consecuenciaIdNivelRP
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  async guardarriesgoresidual() {

    const conf = this.confirm.open(RkyriesgoresidualComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '500px',
      data: {
        title: 'Modificar Riesgo Residual',
        message: ``,
        button_confirm: 'Modificar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid,
        versionId: this.consecuenciaModel.consecuenciaVersion,
        probabilidad: this.consecuenciaModel.consecuenciaIdProbRR,
        severidad: this.consecuenciaModel.consecuenciaIdSevRR,
        criticidad: this.consecuenciaModel.consecuenciaIdNivelRR
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  async guardarriesgopurotable() {

    const conf = this.confirm.open(RkyriesgopurotableComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '900px',
      data: {
        title: 'Probabilidad Riesgo Puro',
        message: ``,
        button_confirm: 'Modificar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid,
        versionId: this.consecuenciaModel.consecuenciaVersion,
        probabilidad: this.consecuenciaModel.consecuenciaIdProbRP,
        severidad: this.consecuenciaModel.consecuenciaIdSevRP,
        criticidad: this.consecuenciaModel.consecuenciaIdNivelRP
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  async guardarriesgopurotabler() {

    const conf = this.confirm.open(RkyriesgopurotablerComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '900px',
      data: {
        title: 'Severidad Riesgo Puro',
        message: ``,
        button_confirm: 'Modificar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid,
        versionId: this.consecuenciaModel.consecuenciaVersion,
        probabilidad: this.consecuenciaModel.consecuenciaIdProbRP,
        severidad: this.consecuenciaModel.consecuenciaIdSevRP,
        criticidad: this.consecuenciaModel.consecuenciaIdNivelRP
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  async guardarriesgoresidualtable() {

    const conf = this.confirm.open(RkyriesgoresidualtableComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '900px',
      data: {
        title: 'Probabilidad Riesgo Residual',
        message: ``,
        button_confirm: 'Modificar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid,
        versionId: this.consecuenciaModel.consecuenciaVersion,
        probabilidad: this.consecuenciaModel.consecuenciaIdProbRR,
        severidad: this.consecuenciaModel.consecuenciaIdSevRR,
        criticidad: this.consecuenciaModel.consecuenciaIdNivelRR
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  async guardarriesgoresidualtabler() {

    const conf = this.confirm.open(RkyriesgoresidualtablerComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '900px',
      data: {
        title: 'Severidad Riesgo Residual',
        message: ``,
        button_confirm: 'Modificar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: this.tid,
        dimensionId: this.did,
        riesgoId: this.rid,
        consecuenciaId: this.yid,
        versionId: this.consecuenciaModel.consecuenciaVersion,
        probabilidad: this.consecuenciaModel.consecuenciaIdProbRR,
        severidad: this.consecuenciaModel.consecuenciaIdSevRR,
        criticidad: this.consecuenciaModel.consecuenciaIdNivelRR
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.consecuenciaModel = {};
        this.epfList = [];
        this.cBlandosList = [];
        this.cDurosList = [];
        this.docsList = [];
        this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
      }
    });

  }

  

   mostrar(perfil)  {

    switch (perfil) {
      case 'NNYNN': // SOLO LECTURA

        this.btn = 'lectura';
        return;

      case 'NNYYN': // LECTURA Y CREACION
        this.btn = 'creacion';
        return;
      case 'NNYNY': // LECTURA Y VALIDACION
        this.btn = 'Validacion';
        return;
      case 'NYYNN': // LECTURA Y APROBACION
        this.btn = 'aprobacion';
        return;
      case 'NNYYY': // LECTURA , CREACION , VALIDACION
        this.btn = 'creacionvalidacion';

        return;

        case 'YYYYY': // Administrador
        this.btn = 'administrador';

        return;

        case 'NYYYY': // Administrador
        this.btn = 'administrador';

        return;

        case 'NYYNY':
        this.btn = 'validacionaprobacion';

        return;

        case 'NYYYN':
          this.btn = 'creacionaprobacion';
          return;

      default:
        break;
    }

  }

  consola(accion: string) {

    this.key = this.consecuenciaModel.key;
    this.version = localStorage.getItem('versionSelected');

    switch (accion) {

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

  async ValidarAprobar() {

    let title = '';
    let resp = '';

    switch (this.consecuenciaModel.areaStatus) {

        case 'ENVIADO A VALIDACION':
          title = 'Validar';
          resp = 'Validado';

          break;
        case 'PENDIENTE DE APROBACION':
          title = 'Aprobar';
          resp = 'Aprobado';

          break;

          case 'PENDIENTE INACTIVACION':
            title = 'Validar';
            resp = 'Validado';

            break;

          case 'ENVIADO A APROBACION':
            title = 'Aprobar';
            resp = 'Aprobado';
            break;

        default:
          break;
      }

    const inputOptions = {

        Y: 'Solo Padre',
        N: 'Padre e Hijos',

  };

    const { value: color } = await Swal2.fire({
    title,
    text: '¿ Está seguro que desea' + ' ' + title + ' ' + 'este registro ?',

    showCancelButton: true,

    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  //   input: 'radio',
  //   inputOptions: inputOptions,
  //   inputValidator: (value) => {
  //   if (!value) {
  //   return 'Debe Seleccionar una Opcion'
  //   }
  // }

  });
    if (color ) {
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
    _atts.push({ name: 'approveInd', value: 'A' });
    _atts.push({ name: 'isValidatingFromTree', value: 'Y' });

    _atts.push({ name: 'comments', value: '' });
    _atts.push({ name: 'key', value: this.key });

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
              (data) => {
                if (data.success === true) {
                  // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                  Swal2.fire('Registro' + ' ' + resp, '', 'success' );
                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
                                  //  console.log('estoy aqui')
                  localStorage.setItem('isSendToValidate', '1');

                } else {
                  // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                  Swal2.fire('', data.message, 'error');
                }

                this.controlService.closeSpinner(spinner);

              },
              (error) => {
                // if ( error.status === 401 ) { this.autentication.logout(); return; }
                this.controlService.closeSpinner(spinner);
              });

  }

    }

    Rechazar() {

      let title = '';
      let resp = '';
      switch (this.consecuenciaModel.consecuenciaStatus) {

        case 'ENVIADO A VALIDACION':
          title = 'Validacion';
          resp = 'Validado';

          break;
        case 'PENDIENTE DE APROBACION':
          title = 'AprobacionS';
          resp = 'Aprobado';

        default:
          break;
      }
      console.log(this.consecuenciaModel.consecuenciaVersion);

      this.key = this.consecuenciaModel.key + ',';
      this.version = this.consecuenciaModel.consecuenciaVersion + ',';

      localStorage.setItem('Llave', this.key);
      localStorage.setItem('VersionL', this.version);
      localStorage.setItem('isValidatingFromTree', 'Y');

      Swal2.fire({

        title: 'Rechazar ' + title,
        text: 'Se procederá a RECHAZAR el(los) Registro(s) seleccionado(s)',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'

      }).then((result) => {
          if (result.value) {

            const conf1 = this.confirm.open(RkReasonRejectComponent, {
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

        switch (this.consecuenciaModel.consecuenciaStatus) {
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

          Y: 'Solo Padre',
          N: 'Padre e Hijos',

    };

        const { value: color } = await Swal2.fire({
      title,
      text: '¿ Está seguro que desea' + ' ' + title + ' ' + 'este registro ?',

      showCancelButton: true,

      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    //   input: 'radio',
    //   inputOptions: inputOptions,
    //   inputValidator: (value) => {
    //   if (!value) {
    //   return 'Debe Seleccionar una Opcion'
    //   }
    // }

    });
        if (color ) {

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

                            Swal2.fire('Registro' + ' ' + resp, '', 'success' );
                            this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
                            localStorage.setItem('isSendToValidate', '1');
                            // recargar arbol

                          } else {
                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                            Swal2.fire('', data.message, 'error');
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

          title: 'Enviar a Archivar',
          text: 'Tenga en cuenta que una vez archivado no podrá visualizar ni utilizar más éste Registro',
          icon: 'question',
          input: 'checkbox',
          inputValue: '',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          inputPlaceholder: 'Acepto',
          confirmButtonText: 'Archivar',
          inputValidator: (result) => {
          return !result && 'Debe Aceptar los Terminos';
      }
        });

        if (accept) {

          console.log(this.consecuenciaModel.key);
          this.key = this.key + ',';
          console.log(this.key);

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'ENVIAR_ARCHIVAR' });
          _atts.push({ name: 'key', value: this.key });

          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);

          obj.subscribe((data) => {

                  if (data.success === true) {
                                if (data.data[0].atts[1]) {
                                  // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                                  Swal2.fire(
                                    {
                                      icon: 'success',
                                      text: 'Registro Archivado ',
                                      showConfirmButton: false,
                                      timer: 3000
                                    }
                                  );
                                  this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
                                  localStorage.setItem('isSendToValidate', '1');

                                }

                              } else {

                                  Swal2.fire(
                                    {
                                      icon: 'error',
                                      text: data.message,
                                      showConfirmButton: false,
                                      timer: 3000
                                    }
                                  );

                              // this.autentication.showMessage(data.success, data.message, {}, data.redirect);

                              }
                  this.controlService.closeSpinner(spinner);

                }, (error) => {
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

        title: 'Restaurar Registro',
        text: '¿Desea Restaurar este Item ?',
        icon: 'question',
        input: 'checkbox',
        inputValue: '',
        inputPlaceholder: 'Acepto',
        showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
        confirmButtonText: 'Restaurar',
        inputValidator: (result) => {
        return !result && 'Debe Aceptar los Terminos';
    }
      });

      if (accept) {

        console.log(this.consecuenciaModel.key);
        this.key = this.key + ',';
        console.log(this.key);

        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'ENVIAR_RESTAURAR' });
        _atts.push({ name: 'key', value: this.key });

        const spinner = this.controlService.openSpinner();
        const obj = await this.autentication.generic(_atts);

        obj.subscribe((data) => {

                if (data.success === true) {
                              if (data.data[0].atts[1]) {
                                // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                                Swal2.fire(
                                  {
                                    icon: 'success',
                                    text: 'Registro Restaurado ',
                                    showConfirmButton: false,
                                    timer: 3000
                                  }
                                );
                                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.did, this.rid, this.yid);
                                localStorage.setItem('isSendToValidate', '1');

                              }

                            } else {

                                Swal2.fire(
                                  {
                                    icon: 'error',
                                    text: data.message,
                                    showConfirmButton: false,
                                    timer: 3000
                                  }
                                );

                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);

                            }
                this.controlService.closeSpinner(spinner);

              }, (error) => {
                this.controlService.closeSpinner(spinner);
              });
            //  this.cerrar();

      }

    }

    Caja(key, status, statusc?) {
      // //debugger

      let conf;

      if (status === '008') {
        status = statusc;
      }

      switch (status) {
       case  '001' :

        conf = this.confirm.open(CajasdashboardComponent,
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
                status

              },
              // panelClass : 'tabla'

            });
        conf.afterClosed().suscribe(async (result) => {

              if (result === 'undefined' || result === 'falso') {

                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.rid, this.rid, this.yid);
              }
            });
        break;
       case  '000' :

        conf = this.confirm.open(CajasdashboardComponent,
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
        conf.afterClosed().suscribe(async (result) => {

              if (result === 'undefined' || result === 'falso') {

                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.rid, this.rid, this.yid);
              }
            });
        break;
       case  '002' :

        conf = this.confirm.open(CajasdashboardComponent,
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
                status

              },
              // panelClass : 'tabla'

            });
        conf.afterClosed().suscribe(async (result) => {

              if (result === 'undefined' || result === 'falso') {

                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.rid, this.rid, this.yid);
              }
            });
        break;
       case  '003' :

        conf = this.confirm.open(CajasdashboardComponent,
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
                status

              },
              // panelClass : 'tabla'

            });
        conf.afterClosed().suscribe(async (result) => {

              if (result === 'undefined' || result === 'falso') {

                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.rid, this.rid, this.yid);
              }
            });
        break;
       case  '006' :

        conf =  this.confirm.open(CajasdashboardComponent,
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
                status

              },
              // panelClass : 'tabla'

            });
        conf.afterClosed().suscribe(async (result) => {

              if (result === 'undefined' || result === 'falso') {

                this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.rid, this.rid, this.yid);
              }
            });
        break;

        case '004':
          conf = this.confirm.open(RkvalidarComponent, {
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
              status

            }

          });
          conf.afterClosed().suscribe(async (result) => {

            if (result === 'undefined' || result === 'falso') {

              this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.rid, this.rid, this.yid);
            }
          });

          break;

        case '007':
          conf = this.confirm.open(RkporaprobarComponent, {
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
              status

            }

          });

          conf.afterClosed().suscribe(async (result) => {

            if (result === 'undefined' || result === 'falso') {

              this.ver(this.id, this.pid, this.sid, this.cid, this.tid, this.rid, this.rid, this.yid);
            }
          });
          break;

      }

    }
    enviarAvalidar(id,status,tipo){
      const _atts = [];
      _atts.push({ name: 'scriptName', value: 'coemdr' });
      _atts.push({ name: 'action', value: 'PENDIENTE_VALIDAR_LIST' });
      _atts.push({ name: 'status', value: tipo });
      _atts.push({ name: 'key', value: id });
      _atts.push({ name: 'statusItem', value: status });
      _atts.push({ name: 'showCompleted', value: 'Y' });
  
      const spinner = this.controlService.openSpinner();
      
      debugger
      this.autentication.generic(_atts)
      .subscribe( datos => {
          console.log( datos)
        if( datos.success){
          datos.data.forEach(element => {
  
            if (element.atts.length > 0){
              
              this.llaves.push( element.atts[16].value.trim(),'Y',)
            }
          })
  
          console.log(this.llaves.toString())
          this.sendValidate(this.llaves.toString(),status)
          this.controlService.closeSpinner(spinner);
        }
      })
  
    }
  
    sendValidate(llaves,status){
  
      let mnsje = 'Enviar a Validar'
  
      if(status === '007'){
        mnsje = 'Aprobar'
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
              _atts.push({ name: 'key', value: llaves });
  
              const obj = this.autentication.generic(_atts);
              const spinner = this.controlService.openSpinner();        
  
          obj.subscribe(
                      (data) => {
                        if (data.success === true) {
  
  
                          this.mostrarMensaje();
                          
                          
                          this.Cajas.notificaciones$.emit(true);
                          
                        ;
  
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
    mostrarMensaje() {
      Swal2.fire({
      
        title: 'Envio a Validacion en Proceso',
        text: 'Verifique en el icono de notificaciones, que la solicitud ha sido ejecutada exitosamente',
        imageUrl: 'assets/images/notificacion.png',
        imageWidth: 150,
      imageHeight: 150,
        imageAlt: 'Notificacion',
      })
    
      this.router.navigate(['/rkmain']);
    }

}
