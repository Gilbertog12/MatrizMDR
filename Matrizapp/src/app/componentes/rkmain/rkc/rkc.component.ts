import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RkcstdjobComponent } from '../rkcstdjob/rkcstdjob.component';
import { RkcequipComponent } from '../rkcequip/rkcequip.component';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkpendComponent } from '../rkpend/rkpend.component';
import { RkpendaprobComponent } from '../rkpendaprob/rkpendaprob.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';
import Swal from 'sweetalert';
import Swal2 from 'sweetalert2';
import swal from 'sweetalert';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CajasdashboardComponent } from '../../../rkmain/cajasdashboard/cajasdashboard.component';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';
import { Checklist } from '../interfaces/checklist.interfaces';
import { ChecklistComponent } from '../../../checklist/checklist.component';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-rkc',
  templateUrl: './rkc.component.html',
  styleUrls: ['./rkc.component.scss']
})

export class RkcComponent implements OnInit {

  public actividadModel: any = {

  };

  public Actualizacion: any[] = [];
  public antes: any[] = [];
  public antesAux: any[] = [];
  public ActivarBoton: boolean = false;

  public tareasList: any[] = [];
  public tareasListLectura: any[] = [];
  public logList: any[] = [];
  public detalleList: any[] = [];
  public stdJobList: any[] = [];
  public DetalleRiesgos: any[] = [];
  public stdJobListLectura: any[] = [];
  public Perfil: any[] = [];
  public checklist: Checklist[] = [];
  public checklist2: Checklist[] = [];
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
  año: any;
  mes: any;
  dia: any;
  fecha: any;
  EnviarHijos: string;
  permisoValidar: boolean;
  percreacion: string;
  loading: boolean = true;
  label: string = 'Mostar Evaluacion';
  show: boolean = true;
  tabDefault: number;
  habilitar: boolean = false;
  masterSelected = false;
  valor: string;
  valorChck: string;
  ChecklisCopiado: any[] = [];
  comentario: string;
  pasteCode: any;
  pasteComments: any;
  checklistEllipse: any[] = [];
  check: boolean;
  habilitarPaste: boolean;
  comments: string;
  activar: boolean = false;
  mostraractualizar: boolean = false;
  valoresCheck: string;
  modificados: number = 0;
  pasteValores: string;
  crear: boolean;
  deshabilitado: boolean;
  valorChckCopiado: boolean;
  rutaImg: string;
  rutaImgAdd: string;
  rutaImgCopy: string;
  rutaImgPaste: string;
  rutaImgPate: string;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private route: ActivatedRoute,
              private Cajas: ServiciocajasService,
              private _Recargarble: ServiciocajasService
    ) {

      // this.aperfil()

      // this.canAdd = localStorage.getItem('canAdd');
      // this.valorChckCopiado = localStorage.getItem('idCheckCopiado');
      
     

      if (this.pasteComments) {
        this.habilitarPaste = true;
      }

      this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.pid = params['pid'];
      this.sid = params['sid'];
      this.cid = params['cid'];
      this.actividadModel = {};
      this.tareasList = [];
      this.logList = [];
      this.detalleList = [];
      this.stdJobList = [];
      this.tabDefault = 0;
      this.ver(this.id, this.pid, this.sid, this.cid);

      this.checklist2 = [{
        table_code: '00026',
        table_desc: 'A.R.T.A. (Adjuntar)',
        check: true,
        comentario: ''
      }, {
        table_code: '00029',
        table_desc: 'Alta y Media Tensión (adjuntar)      ',
        check: false,
        comentario: ''
      }, {
        table_code: '00027',
        table_desc: 'Aplicar Control EPF (indicar cuales) ',
        check: true,
        comentario: ''
      }, {
        table_code: '00031',
        table_desc: 'Cierre de fuentes radioactivas (indique Tag)      ',
        check: true,
        comentario: ''
      }, {
        table_code: '00018',
        table_desc: 'Compromisos Medioambientales         ',
        check: false,
        comentario: ''
      }, {
        table_code: '00022',
        table_desc: 'EPP específicos (indicar)            ',
        check: false,
        comentario: ''
      }, {
        table_code: '00014',
        table_desc: 'Energía origen Biológica',
        check: false,
        comentario: ''
      }, {
        table_code: '00015',
        table_desc: 'Energía origen Biomecánica           ',
        check: false,
        comentario: ''
      }, {
        table_code: '00005',
        table_desc: 'Energía origen Eléctrica',
        check: false,
        comentario: ''
      }, {
        table_code: '00012',
        table_desc: 'Energía origen Eólica   ',
        check: false,
        comentario: ''
      }, {
        table_code: '00008',
        table_desc: 'Energía origen Gravitacional         ',
        check: false,
        comentario: ''
      }, {
        table_code: '00007',
        table_desc: 'Energía origen Hidráulica            ',
        check: false,
        comentario: ''
      }, {
        table_code: '00016',
        table_desc: 'Energía origen Mareomotriz           ',
        check: false,
        comentario: ''
      }, {
        table_code: '00006',
        table_desc: 'Energía origen Mecánica ',
        check: false,
        comentario: ''
      }, {
        table_code: '00010',
        table_desc: 'Energía origen Neumática',
        check: false,
        comentario: ''
      }, {
        table_code: '00017',
        table_desc: 'Energía origen No especificado       ',
        check: false,
        comentario: ''
      }, {
        table_code: '00011',
        table_desc: 'Energía origen Nuclear  ',
        check: false,
        comentario: ''
      }, {
        table_code: '00013',
        table_desc: 'Energía origen Química  ',
        check: false,
        comentario: ''
      }, {
        table_code: '00009',
        table_desc: 'Energía origen Rotatoria',
        check: false,
        comentario: ''
      }, {
        table_code: '00024',
        table_desc: 'Espacios confinados (Gases, O2, etc) ',
        check: false,
        comentario: ''
      }, {
        table_code: '00002',
        table_desc: 'Evaluación de Riesgos (Web\/Documental)            ',
        check: false,
        comentario: ''
      }, {
        table_code: '00028',
        table_desc: 'Excavaciones (adjuntar) ',
        check: false,
        comentario: ''
      }, {
        table_code: '00032',
        table_desc: 'Intervenir Equipos Radioactivos (adjuntar)        ',
        check: false,
        comentario: ''
      }, {
        table_code: '00019',
        table_desc: 'Libro y Puntos de Bloqueo            ',
        check: false,
        comentario: ''
      }, {
        table_code: '00001',
        table_desc: 'Orden de Trabajo y\/o Estándar Trabajo',
        check: false,
        comentario: ''
      }, {
        table_code: '00033',
        table_desc: 'Otro No especificado    ',
        check: false,
        comentario: ''
      }, {
        table_code: '00003',
        table_desc: 'Personal entrenado y capacitado      ',
        check: false,
        comentario: ''
      }, {
        table_code: '00020',
        table_desc: 'Plan de Bloqueo         ',
        check: false,
        comentario: ''
      }, {
        table_code: '00025',
        table_desc: 'Plan de Izaje (Adjuntar)',
        check: false,
        comentario: ''
      }, {
        table_code: '00021',
        table_desc: 'Protección contra Incendios (indique Tag)         ',
        check: false,
        comentario: ''
      }, {
        table_code: '00004',
        table_desc: 'Recursos (Herramienta, Equipos, EPP) ',
        check: false,
        comentario: ''
      }, {
        table_code: '00023',
        table_desc: 'Sectorizar el área (indicar sector)  ',
        check: false,
        comentario: ''
      }, {
        table_code: '00030',
        table_desc: 'Trabajos en Caliente (adjuntar)      ',
        check: false,
        comentario: ''
      }];

    });

  }

  selectedValue: string;

  acciones = [
    {value: 'Agregar' , icon : 'add', disable: false},
  ];
  acciones2 = [
    {value: 'Agregar' , icon : 'add', disable: false},
    {value: 'Copiar' , icon : 'content_copy', disable: false},

  ];
  acciones3 = [
    {value: 'Agregar' , icon : 'add', disable: false},
    {value: 'Pegar' , icon : 'content_paste', disable: false},
  ];

  ejecutar(accion: string) {

    switch (accion) {
      case 'Agregar':
        this.guardarCheckListEllipse();
        break;
      case 'Copiar':
        this.CopiarCheckList();
        break;
      case 'Pegar':
        this.pegarCheck();
        break;
    }
  }

  ngOnInit() {

    // this.cargarRiesgo()
    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'));
    this.percreacion = localStorage.getItem('NoCreador');
    this.actividadModel = {};
    this.tareasList = [];
    this.logList = [];
    this.detalleList = [];
    this.stdJobList = [];
    this.Cajas.RecargarDetalle$.subscribe((resp) => {
        if (resp) {
          this.actividadModel = {};
          this.tareasList = [];
          this.logList = [];
          this.detalleList = [];
          this.stdJobList = [];
          this.ver(this.id, this.pid, this.sid, this.cid);

        }
      });

  }

  limpiarCopiado() {
    localStorage.removeItem('checklistid');
    localStorage.removeItem('CheckCopiado');
    localStorage.removeItem('comentarios');
    this.valorChck = '';
    this.activar = false;
    this.habilitarPaste = false;

  }

  checkUncheckAll() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.checklistEllipse.length; i++) {
      this.checklistEllipse[i].check = this.masterSelected;

      if (this.masterSelected === true) {

        this.checklistEllipse[i].checkValidation = 'Y';

        console.log( this.checklistEllipse.length);
        // console.log( this.checklist[i].check)

      } else {
        this.checklistEllipse[i].checkValidation = 'N';
        console.log( this.checklistEllipse.length);

      }
    }

  }

  ver(areaId: string, procesoId: string, subprocesoId: string, actividadId: string) {

    this.loading = true;

    if (this.actividadModel !== {}) {
      this.actividadModel = {};
    }
    if (this.tareasList !== []) {
      this.tareasList = [];
    }
    if (this.logList !== []) {
      this.logList = [];
    }
    if (this.tareasList !== []) {
      this.tareasList = [];
    }
    if (this.detalleList !== []) {
      this.detalleList = [];
    }
    if (this.stdJobList !== []) {

      this.stdJobList = [];
    }

    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'ACTIVIDAD_READ' });
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'actividadId', value: actividadId });

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

                    this.actividadModel = {
                      offset: element.atts[0].value,
                      areaId: element.atts[1].value,
                      areaDescripcion: element.atts[2].value,
                      procesoId: element.atts[3].value,
                      procesoDescripcion: element.atts[4].value,
                      subprocesoId: element.atts[5].value,
                      subprocesoDescripcion: element.atts[6].value,
                      actividadId: element.atts[7].value,
                      actividadDescripcion: element.atts[8].value,
                      actividadDescripcionExt: element.atts[9].value,
                      actividadIdClasificacion: element.atts[10].value,
                      actividadDescClasificacion: element.atts[11].value,
                      actividadRiesgoPuroDesc: element.atts[12].value,
                      actividadRiesgoResidualDesc: element.atts[13].value,
                      actividadStatus: element.atts[14].value,
                      actividadVersion: element.atts[15].value,
                      actividadNivel: element.atts[16].value,
                      actividadAtributos: element.atts[17].value,
                      actividadStatusId: data.data[0].atts[18].value,
                      key: data.data[0].atts[19].value,
                      actividadFechaApprovedDate: data.data[0].atts[20].value,
                      statusParent: data.data[0].atts[21].value,
                      CanAdd: data.data[0].atts[22].value,
                      CanModify: data.data[0].atts[23].value,
                      Creador: data.data[0].atts[24].value,
                    };

                    console.log(this.actividadModel.actividadStatusId);

                    localStorage.setItem('keySelected', this.actividadModel.key);
                    localStorage.setItem('versionSelected', this.actividadModel.actividadVersion);
                    localStorage.setItem('statusSelected', this.actividadModel.actividadStatusId);

                  }

                }
              });

        this.tareasList.forEach((element) => {
              this.antesAux.push({
                id: element.Id
                });

              });
              // console.log(JSON.stringify(this.antesAux))
        this.cargarRiesgo();
              // this.controlService.closeSpinner(spinner);
        this.loading = false;
            } else {
              if (data.bypass === '1') {

                this.loading = false;

              } else {
                this.controlService.closeSpinner(spinner);
                this.loading = false;
                this.autentication.showMessage(data.success, data.message, this.actividadModel, data.redirect);

              }
            }
            return result;
          },
          (error) => {

            // debugger
          console.log(error);
            // this.controlService.closeSpinner(spinner);
          this.loading = false;
          this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.actividadModel, false);
          });
    });
  }

  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.tareasList, event.previousIndex, event.currentIndex);
    // let array2 = this.tareasList;
    this.ActualizarOrdenTareas();

  }

  ActualizarOrdenTareas() {
    console.log(this.antesAux);
    this.Actualizacion = [];
    this.tareasList.forEach((element) => {
      this.Actualizacion.push({
        id: element.Id
      });

    });

    console.log(JSON.stringify(this.Actualizacion));

    if (this.antesAux !== this.Actualizacion) {

      this.ActivarBoton = true;
     }

  }

  async ReordenarItems() {

    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'REORDENAR_ITEM' });
    _atts.push({ name: 'parentId', value: this.actividadModel.key });
    _atts.push({ name: 'procesoId', value: JSON.stringify(this.antesAux)});
    _atts.push({ name: 'afterItems', value: JSON.stringify(this.Actualizacion) });

    const spinner = this.controlService.openSpinner();
    const obj = await this.autentication.generic(_atts);

    obj.subscribe(
            (data) => {
              if (data.success === true) {
                if (data.data[0].atts[1]) {
                  // this.autentication.showMessage(data.data[0].atts[0].value, data.data[0].atts[1].value, this.tareaModel, data.redirect);
                  this.ActivarBoton = false;

                } else {
                  // this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
                  Swal2.fire({
                    text: data.message,
                    icon: 'error'

                  });

                                    }
              } else {
                this.autentication.showMessage(data.success, data.message, this.actividadModel  , data.redirect);

              }
              this.controlService.closeSpinner(spinner);
            },
            (error) => {
              this.controlService.closeSpinner(spinner);

            });

        }

  async guardarstdjob() {

    const conf = this.confirm.open(RkcstdjobComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Asociar Std Job Activos a Actividad',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
        tareaId: '',
        statusId: this.actividadModel.statusId,
        versionId: this.actividadModel.versionId,
        id: this.actividadModel.key
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.actividadModel = {};
        this.tareasList = [];
        this.logList = [];
        this.detalleList = [];
        this.stdJobList = [];
        // debugger
        this.ver(this.id, this.pid, this.sid, this.cid);
        this._Recargarble.Recargar$.emit(true);

      }
    });

  }
  async guardarCheckListEllipse() {

    const conf = this.confirm.open( ChecklistComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Agregar Lista de Verificación',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cancelar',
        areaId: this.id,
        procesoId: this.pid,
        subprocesoId: this.sid,
        actividadId: this.cid,
      }
    });

    conf.afterClosed().subscribe(async (result) => {
      if (result) {
        this.actividadModel = {};
        this.tareasList = [];
        this.logList = [];
        this.detalleList = [];
        this.stdJobList = [];
        this.checklistEllipse = [];
        // debugger
        this.ver(this.id, this.pid, this.sid, this.cid);
        this.cargarPestañaCheck();
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

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'ACTIVIDAD_STJB_DELETE' });
          _atts.push({ name: 'areaId', value: this.id });
          _atts.push({ name: 'procesoId', value: this.pid });
          _atts.push({ name: 'subprocesoId', value: this.sid });
          _atts.push({ name: 'actividadId', value: this.cid });
          _atts.push({ name: 'stdJobNo1', value: item.stdJobNo });
          _atts.push({ name: 'stdJobTaskNo1', value: item.stdJobTaskNo });
          _atts.push({ name: 'statusId1', value: item.statusId });
          _atts.push({ name: 'versionId1', value: item.versionId });
          _atts.push({ name: 'seqNum', value: item.seqNum });

          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);

          obj.subscribe(
            (data) => {
              if (data.success === true) {
                // //debugger
                if (data.data[0].atts[1]) {
                  // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.actividadModel, data.redirect);

                  Swal2.fire({
                    icon: 'success',
                    text: 'Registro eliminado Correctamente'
                  });
                }
                this.actividadModel = {};
                this.tareasList = [];
                this.logList = [];
                this.detalleList = [];
                this.stdJobList = [];
                this.ver(this.id, this.pid, this.sid, this.cid);
                this._Recargarble.Recargar$.emit(true);
                // this._Recargarble.Recargar$.emit(true)
              } else {
                // this.autentication.showMessage(data.success, data.message, this.actividadModel, data.redirect);

                Swal2.fire({
                  icon: 'error',
                  text: data.message

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

      cargarPestañasLog() {

        this.loading = true;

        this.logList = [];
        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'ACTIVIDAD_READ_LOG' });
        _atts.push({ name: 'areaId', value:  this.id });
        _atts.push({ name: 'procesoId', value:  this.pid });
        _atts.push({ name: 'subprocesoId', value:  this.sid });
        _atts.push({ name: 'actividadId', value:  this.cid });

        const spinner = this.controlService.openSpinner();

        const obj =  this.autentication.generic(_atts);

        obj.subscribe((data) => {

                  if (data.success === true) {

                    console.log(data);

                    data.data.forEach((element) => {

                      this.logList.push({
                            offset: element.atts[0].value,
                            ULTIMAFECHAHORAMODIFICACION: element.atts[1].value,
                            ultimaUsuarioModifico: element.atts[2].value,
                            operacion: element.atts[3].value,
                            item: element.atts[4].value,
                            before: element.atts[5].value,
                            after: element.atts[6].value,
                            version: element.atts[7].value,
                            // ultimaHoraModificacion: element.atts[9].value,
                            // actividad: element.atts[1].value,
                            // consecuencia: element.atts[5].value,
                            // control: element.atts[6].value,
                            // tarea: element.atts[2].value,
                            // dimension: element.atts[3].value,
                          });

                        });
                    this.loading = false;
                    this.habilitar = true;
                    this.controlService.closeSpinner(spinner);
                  } else {

                    this.loading = false;
                    this.controlService.closeSpinner(spinner);
                  }
                });

                // this.loading = false

      }
      cargarPestañasDetalle() {

        this.loading = true;

        this.detalleList = [];
        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'ACTIVIDAD_READ_DETAIL' });
        _atts.push({ name: 'areaId', value:  this.id });
        _atts.push({ name: 'procesoId', value:  this.pid });
        _atts.push({ name: 'subprocesoId', value:  this.sid });
        _atts.push({ name: 'actividadId', value:  this.cid });

        const spinner = this.controlService.openSpinner();
        const obj =  this.autentication.generic(_atts);

        obj.subscribe((data) => {

                  if (data.success === true) {

                    console.log(data);

                    data.data.forEach((element) => {

                      this.detalleList.push({
                        offset: element.atts[0].value,
                        tareaId: element.atts[1].value,
                        tareaDesc: element.atts[2].value,
                        riesgoId: element.atts[3].value,
                        riesgoDesc: element.atts[4].value,
                        consecuenciaId: element.atts[5].value,
                        consecuenciaDesc: element.atts[6].value,
                        probabilidadM: element.atts[7].value,
                        severidadM: element.atts[8].value,
                        criticidadM: element.atts[9].value,
                        probabilidadN: element.atts[10].value,
                        severidadN: element.atts[11].value,
                        criticidadN: element.atts[12].value,
                        probabilidadS: element.atts[13].value,
                        severidadS: element.atts[14].value,
                        criticidadS: element.atts[15].value,
                          });

                    });
                    // console.log(this.detalleList)
                    this.loading = false;
                    this.habilitar = false;
                    this.controlService.closeSpinner(spinner);

                  } else {

                    this.loading = false;
                    this.controlService.closeSpinner(spinner);
                  }
                });

                // this.loading = false

      }
      cargarPestañasStdJob() {

        this.loading = true;

        this.stdJobList = [];
        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'ACTIVIDAD_READ_STDJOB' });
        _atts.push({ name: 'areaId', value:  this.id });
        _atts.push({ name: 'procesoId', value:  this.pid });
        _atts.push({ name: 'subprocesoId', value:  this.sid });
        _atts.push({ name: 'actividadId', value:  this.cid });

        const spinner = this.controlService.openSpinner();

        const obj =  this.autentication.generic(_atts);

        obj.subscribe((data) => {

                  if (data.success === true) {

                    console.log(data);

                    data.data.forEach((element) => {

                      this.stdJobList.push({
                        offset: element.atts[0].value,
                        stdJobNo: element.atts[1].value,
                        stdJobDesc: element.atts[2].value,
                        stdJobTaskNo: element.atts[3].value,
                        stdJobTaskDesc: element.atts[4].value,
                        statusId: element.atts[5].value,
                        versionId: element.atts[6].value,
                        seqNum: element.atts[7].value,
                        pendingDelete: element.atts[8].value,
                        DeleteIcon: element.atts[9].value
                          });

                    });
                    this.loading = false;
                    this.habilitar = false;
                    this.controlService.closeSpinner(spinner);

                  } else {

                    this.loading = false;
                    this.controlService.closeSpinner(spinner);
      }
    });

    // this.loading = false

      }

      cargarPestañaCheck() {

        this.loading = true;

        // debugger;
        console.log( this.actividadModel.CanAdd);
        this.valorChckCopiado = this.canPaste();
        console.log('Constructor', this.valorChckCopiado);

        if (this.actividadModel.actividadStatusId !== '001' || this.actividadModel.actividadStatusId !== '002' || this.actividadModel.actividadStatusId !== '008') {

          if (this.actividadModel.CanAdd === 'false' ) {

            this.crear = false;
            this.deshabilitado = true;
            this.rutaImgAdd = 'assets/images/Add_Disabled.png';
            this.rutaImgCopy = 'assets/images/Add_Disabled.png';
            this.rutaImgPaste = 'assets/images/paste2.png';
          } else {
            this.crear = true;
            this.deshabilitado = false;
            this.rutaImgAdd = 'assets/images/Add.png';
            this.rutaImgCopy = 'assets/images/Add.png';
            this.rutaImgPaste = 'assets/images/paste.png';

          }

        }

        this.checklistEllipse = [];
        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'ACTIVIDAD_READ_CHECK' });
        _atts.push({ name: 'areaId', value:  this.id });
        _atts.push({ name: 'procesoId', value:  this.pid });
        _atts.push({ name: 'subprocesoId', value:  this.sid });
        _atts.push({ name: 'actividadId', value:  this.cid });

        const spinner = this.controlService.openSpinner();

        const obj =  this.autentication.generic(_atts);

        obj.subscribe((data) => {

                if (data.success === true) {

                  console.log(data);

                  data.data.forEach((element) => {

                    if (element.atts[4].value === 'Y') {
                      this.check = true;

                    } else {
                      this.check = false;
                    }

                    this.checklistEllipse.push({
                      offset: element.atts[0].value,
                      checkCode: element.atts[1].value,
                      checkType: element.atts[2].value,
                      checkDescription: element.atts[3].value,
                      checkValidation: element.atts[4].value,
                      checkComment: element.atts[5].value,
                      versionId: element.atts[6].value,
                      statusId : element.atts[7].value,
                      pendingDelete: element.atts[8].value,
                      DeleteIcon: element.atts[9].value,
                      check: this.check,
                      modify : false
                        });

                  });
                  this.loading = false;
                  this.habilitar = false;
                  this.controlService.closeSpinner(spinner);

                } else {

                  this.loading = false;
                  this.controlService.closeSpinner(spinner);
    }
  });

  // this.paste = localStorage.getItem('checklist')

  // console.log(this.paste.length)

      }

      riesgos() {
        this.loading = false;

      }

      test(e: MatTabChangeEvent) {

        console.log(e);

        // console.log(this.tabDefault)

        switch (e.index) {
          case 0:
            if (this.tabDefault !== e.index) {

              this.cargarRiesgo();
            }
            break;
            case 1:
              this.cargarPestañasStdJob();
              break;
            case 2:
                this.cargarPestañaCheck();
                break;
            case 3:
                this.cargarPestañasDetalle();
                break;
            case 4:
                  this.cargarPestañasLog();
                  break;
        }

      }

      mensaje() {
        console.log('Hola desde la consola');
      }

      ocultar() {
        this.show = false;
        this.tareasList = [];

      }
      cargarRiesgo() {

        this.loading = true;
        this.tareasList = [];
        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'ITEM_EVALRISK_DETAIL_READ' });
        _atts.push({ name: 'key', value:  this.id + this.pid + this.sid + this.cid });

        const spinner = this.controlService.openSpinner();
        const obj =  this.autentication.generic(_atts);

        obj.subscribe((data) => {

          if (data.success === true) {

            console.log(data);

            data.data.forEach((element) => {

              this.tareasList.push({
                offset: element.atts[0].value,
                Id: element.atts[1].value.trim(),
                Descripcion: element.atts[2].value,
                tareaRiesgoPuroN: element.atts[3].value,
                tareaRiesgoPuroM: element.atts[4].value,
                tareaRiesgoPuroS: element.atts[5].value,
                tareaRiesgoResidualN: element.atts[6].value,
                tareaRiesgoResidualM: element.atts[7].value,
                tareaRiesgoResidualS: element.atts[8].value,
                estado: element.atts[9].value,
                pendingDelete: element.atts[11].value
              });

            });
            this.loading = false;
            this.tabDefault = -1;
            this.controlService.closeSpinner(spinner);

          } else {

            this.loading = false;
            this.tabDefault = -1;
            this.controlService.closeSpinner(spinner);
          }
        });

        // this.loading = false

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

        console.log(this.actividadModel.key);
        this.key = this.key + ',';
        // console.log(this.key)

        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'ENVIAR_RESTAURAR' });
        _atts.push({ name: 'key', value: this.key});

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
                                this.ver(this.id, this.pid, this.sid, this.cid);
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

          async Caja(key, status) {

            switch (status) {

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

         async VerCajasdashboard(key) {

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

         async VerRkvalidarC(key) {
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
                status

              }

            });

          }

         async VerRkporaprobar(key) {
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
                status

              }

            });

          }

          pegarCheck() {

            this.pasteCode = localStorage.getItem('checklist');
            this.pasteComments = localStorage.getItem('comentarios');
            this.pasteValores = localStorage.getItem('valorescheck');
            // debugger
            console.log(this.pasteCode);
            // console.log(this.paste.length)

            const _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'CHECK_CREATE' });
            _atts.push({ name: 'areaId', value: this.actividadModel.areaId });
            _atts.push({ name: 'procesoId', value: this.actividadModel.procesoId });
            _atts.push({ name: 'subprocesoId', value: this.actividadModel.subprocesoId });
            _atts.push({ name: 'actividadId', value: this.actividadModel.actividadId });
            _atts.push({ name: 'checkNo', value: this.pasteCode });
            _atts.push({ name: 'checkValidation', value: this.pasteValores });
            _atts.push({ name: 'comentario', value: this.pasteComments });

            const spinner = this.controlService.openSpinner();
            const obj =  this.autentication.generic(_atts);
            console.log(_atts);
            obj.subscribe(

              (data) => {
            console.log(data);
            if (data.success === true) {
              console.log('Aqui!!!');
              console.log(data.data[0]);

              if (data.data[0].atts[1]) {

                console.log('Otro');
                console.log(data.data[0].atts[0].value);

                Swal2.fire({

                  title: 'Item Agregado',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000
                }
                );

              }
            } else {
              Swal2.fire({
                icon: 'error',
                text: data.message,
                showConfirmButton: false,
                timer: 2000

              });

            }
            this.controlService.closeSpinner(spinner);
          },
          (error) => {
            this.controlService.closeSpinner(spinner);

          }
        );

            this.habilitarPaste = false;

          }

          actulizarTodo() {

            this.valor = '';
            this.comments = '';
            this.valoresCheck = '';
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.checklistEllipse.length; i++) {

              this.valor = this.valor + ',' + this.checklistEllipse[i].checkCode;
              this.comments = this.comments + '^~|' + this.checklistEllipse[i].checkComment;
              this.valoresCheck = this.valoresCheck + ',' + this.checklistEllipse[i].checkValidation;

            }

            this.valor = this.valor.slice(1);
            this.comments = this.comments.slice(3);
            this.valoresCheck = this.valoresCheck.slice(1);

            console.log(this.valor, this.comments, this.valoresCheck);

            this.actualizarCheck(this.valor, this.comments, this.valoresCheck);
          }

          CopiarCheckList() {

          this.habilitarPaste = true;

          this.valor = '';
          this.comments = '';
          this.valoresCheck = '';

          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.checklistEllipse.length; i++) {

              this.valor = this.valor + ',' + this.checklistEllipse[i].checkCode;
              this.comments = this.comments + '^~|' + this.checklistEllipse[i].checkComment;
              this.valoresCheck = this.valoresCheck + ',' + this.checklistEllipse[i].checkValidation;

              // if(this.checklist[i]["check"] === true){

              //   this.valorChck = this.checklist[i]["check"]  ? 'Y' : 'N'
              //   this.valor = this.valor + ','+ this.checklist[i]["table_code"].trim() + ','+ this.valorChck+','+ this.checklist[i]["comentario"].trim() ;

              //   this.ChecklisCopiado.push(
              //     {
              //       table_code : this.checklist[i]["table_code"],
              //       table_desc : this.checklist[i]["table_desc"],
              //       check: this.checklist[i]["check"],
              //       comentario : this.checklist[i]["comentario"]

              //     }
              //   )
              //   // console.log(this.valor)
              // }else{
              //   // console.log('epale||')
              // }

            }

          this.valor = this.valor.slice(1);
          this.valoresCheck = this.valoresCheck.slice(1);
          this.comments = this.comments.slice(3);
          console.log(this.comments);
          localStorage.setItem('checklist', this.valor);
          localStorage.setItem('comentarios', this.comments);
          localStorage.setItem('valorescheck', this.valoresCheck);
          localStorage.setItem('idCheckCopiado', this.actividadModel.key);

          this.activar = true;

          this.valorChckCopiado = this.canPaste();
            console.log(this.valorChckCopiado)
          const toast = Swal2.mixin({
            position: 'top-end'
          });

          toast.fire({
            icon : 'success',
            title : 'CheckList Copiado',
            text : `Jeraquia Ar:${this.actividadModel.areaId} Pr:${this.actividadModel.procesoId} Sp:${this.actividadModel.subprocesoId} Ac:${this.actividadModel.actividadId}`
          });

          //  let a = this.arrayCollectionToObject(this.ChecklisCopiado)

            // console.log(this.ChecklisCopiado.filter(el => el != "undefined"))

            // this.ChecklisCopiado =this.ChecklisCopiado.filter(el => el != "undefined")

            // console.log(this.ChecklisCopiado)
            // console.log([this.ChecklisCopiado])

            // console.log(JSON.stringify(this.ChecklisCopiado))

          }

          canPaste() {

           return this.actividadModel.key === localStorage.getItem('idCheckCopiado');
          }

          cambiarValidation(indice) {

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.checklistEllipse.length; i++) {

              if (i === indice) {
                this.checklistEllipse[i].checkValidation = this.checklistEllipse[i].check;

                if (this.checklistEllipse[i].checkValidation === false) {
                  this.checklistEllipse[i].checkValidation = 'N';
                  if ( this.checklistEllipse[i].modify === false ) {
                    this.checklistEllipse[i].modify = true;
                    this.modificados += 1;
                  } else {
                    this.checklistEllipse[i].modify = false;
                    this.modificados -= 1;
                  }
                  this.mostraractualizar = true;

                  } else {
                    this.checklistEllipse[i].checkValidation = 'Y';
                    if ( this.checklistEllipse[i].modify !== false ) {
                      this.checklistEllipse[i].modify = false;
                      this.modificados -= 1;
                    } else {
                  this.checklistEllipse[i].modify = true;
                  this.modificados += 1;
                }
                    this.mostraractualizar = false;
              }
            }

            }

          }

          actualizarCheck(item, comentario, checkValidation) {

            const _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'CHECK_MODIFY' });
            _atts.push({ name: 'areaId', value: this.id });
            _atts.push({ name: 'procesoId', value: this.pid });
            _atts.push({ name: 'subprocesoId', value: this.sid });
            _atts.push({ name: 'actividadId', value: this.cid });
            _atts.push({ name: 'checkNo', value: item });
            _atts.push({ name: 'checkValidation', value: checkValidation });
            _atts.push({ name: 'comentario', value: comentario });

            console.log(_atts);

            const spinner = this.controlService.openSpinner();
            const obj =  this.autentication.generic(_atts);

            obj.subscribe(
                      (data) => {
                        if (data.success === true) {
                          // //debugger
                          if (data.data[0].atts[1]) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.actividadModel, data.redirect);
                            console.log(data.data[0].atts[1]);
                            Swal2.fire({
                              icon: 'success',
                              text: 'Registro Actualizado Correctamente'
                            });
                          }
                          this.actividadModel = {};
                          this.tareasList = [];
                          this.logList = [];
                          this.detalleList = [];
                          this.stdJobList = [];
                          this.ver(this.id, this.pid, this.sid, this.cid);
                          this._Recargarble.Recargar$.emit(true);
                          this.modificados = 0;
                          // this._Recargarble.Recargar$.emit(true)
                        } else {
                          // this.autentication.showMessage(data.success, data.message, this.actividadModel, data.redirect);

                          Swal2.fire({
                            icon: 'error',
                            text: data.message

                          });
                        }
                        this.controlService.closeSpinner(spinner);
                      },
                      (error) => {
                        this.controlService.closeSpinner(spinner);
                      });

          }

          eliminarCheck(check: string) {

            Swal2.fire({
              title: '<strong style="color:red">ADVERTENCIA !</strong>',
              text : ' esta seguro que desea eliminar este Item ?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Aceptar',
              cancelButtonText: 'Cancelar',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33'
            }).then(
              (result) => {
                if (result.value) {

                  if (result) {

                    const _atts = [];
                    _atts.push({ name: 'scriptName', value: 'coemdr' });
                    _atts.push({ name: 'action', value: 'CHECK_DELETE' });
                    _atts.push({ name: 'areaId', value: this.id });
                    _atts.push({ name: 'procesoId', value: this.pid });
                    _atts.push({ name: 'subprocesoId', value: this.sid });
                    _atts.push({ name: 'actividadId', value: this.cid });
                    _atts.push({ name: 'checkNo', value: check });

                    const spinner = this.controlService.openSpinner();
                    const obj =  this.autentication.generic(_atts);

                    obj.subscribe(
                      (data) => {
                        if (data.success === true) {
                          // //debugger
                          if (data.data[0].atts[1]) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.actividadModel, data.redirect);

                            Swal2.fire({
                              icon: 'success',
                              text: 'Registro eliminado Correctamente'
                            });
                          }
                          this.actividadModel = {};
                          this.tareasList = [];
                          this.logList = [];
                          this.detalleList = [];
                          this.stdJobList = [];
                          this.ver(this.id, this.pid, this.sid, this.cid);
                          this._Recargarble.Recargar$.emit(true);
                          // this._Recargarble.Recargar$.emit(true)
                        } else {
                          // this.autentication.showMessage(data.success, data.message, this.actividadModel, data.redirect);

                          Swal2.fire({
                            icon: 'error',
                            text: data.message

                          });
                        }
                        this.controlService.closeSpinner(spinner);
                      },
                      (error) => {
                        this.controlService.closeSpinner(spinner);
                      });
                  }

                }
              }
            );

          }

  }

