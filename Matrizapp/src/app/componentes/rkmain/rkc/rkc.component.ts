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
import { includes } from 'core-js/fn/array';
import { _ } from 'core-js';
import { isNullOrUndefined } from 'util';

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
  public llaves: string[] = [];
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
  showDelete: boolean = false;

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
  comentarioanterior: any;
  textomodificado: boolean = false;
  pegar: boolean;
  type: string;
  valorType: string;
  message: string;
  valorMessage: string;
  contadorNotificaciones: number = 0;
  allow: string;
  boton: string;
  vueltas: number;
  contador2: number;
  contador1: number;
  uid: string;
  indice: number = 1;
  disabledBack: boolean = false;
  disabledNext: boolean = false;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private router : Router,
              private route: ActivatedRoute,
              private Cajas: ServiciocajasService,
              private _Recargarble: ServiciocajasService
    ) {

      // this.aperfil()

      // this.canAdd = localStorage.getItem('canAdd');
      // this.valorChckCopiado = localStorage.getItem('idCheckCopiado');

      this.Cajas.notificaciones$.subscribe((resp) => {
        // this.activarNotificaciones()
         });

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
      this.ver(this.id, this.pid, this.sid, this.cid, true);

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
        this.pegarCheck(false);
        break;
    }
  }

  ngOnInit() {

    // this.cargarRiesgo()
    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', localStorage.getItem('keySelected'));
    this.percreacion = localStorage.getItem('NoCreador');
    // this.actividadModel = {};
    this.tareasList = [];
    this.logList = [];
    this.detalleList = [];
    this.stdJobList = [];
    this.Cajas.RecargarDetalle$.subscribe((resp) => {
        if (resp) {

          this.tareasList = [];
          this.logList = [];
          this.detalleList = [];
          this.stdJobList = [];

          this.cargarRiesgo()

        }
      });

  }

  ejemplo() {
            this.type = localStorage.getItem('type');
            this.valorType = localStorage.getItem('valorType');
            this.message = localStorage.getItem('message');
            this.valorMessage = localStorage.getItem('valorMessage');

            Swal2.fire({
        html : `<b>${this.valorType}</b> ${this.type} </br> <b>${this.valorMessage}</b>${this.message}  `,
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

  ver(areaId: string, procesoId: string, subprocesoId: string, actividadId: string , activarRiesgo: boolean) {

    this.loading = true;

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

        this.allow = localStorage.getItem('allow')
        data.data.forEach((element) => {
                if (element.atts.length > 0) {

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
                    console.log(this.actividadModel.Creador);
                    console.log(this.actividadModel);

                    localStorage.setItem('keySelected', this.actividadModel.key);
                    localStorage.setItem('isCreador', this.actividadModel.Creador);
                    localStorage.setItem('CanAddCheck', this.actividadModel.CanAdd);
                    localStorage.setItem('versionSelected', this.actividadModel.actividadVersion);
                    localStorage.setItem('statusSelected', this.actividadModel.actividadStatusId);

                }
              });

        this.tareasList.forEach((element) => {
              this.antesAux.push({
                id: element.Id
                });

              });
              // console.log(JSON.stringify(this.antesAux))
        const parameters = [ this.allow , this.actividadModel.actividadStatusId , this.actividadModel.CanAdd ];
        this.boton = this.autentication.botonesFlujoAprobacion(parameters);
        if (activarRiesgo) {

                this.cargarRiesgo();
              }
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

    this.contadorNotificaciones = parseInt( localStorage.getItem( 'contadorNotificaciones' ) );
  }

 /* ver(areaId: string, procesoId: string, subprocesoId: string, actividadId: string , activarRiesgo: boolean) {

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
    console.log(_atts);

    this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data);
            const result = data.success;

            if (result) {

        console.log(data);
        data.data.forEach((element) => {

          // debugger
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

              });

        this.tareasList.forEach((element) => {
              this.antesAux.push({
                id: element.Id
                });

              });
              // console.log(JSON.stringify(this.antesAux))

        if (activarRiesgo) {

                this.cargarRiesgo();
              }
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

    });
  }*/

 /**
  * The function is called when the user drags and drops a task from one column to another.
  * @param event - CdkDragDrop<string[]>
  */
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
        this.ver(this.id, this.pid, this.sid, this.cid, false);
        this.cargarPestañasStdJob();
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
        this.ver(this.id, this.pid, this.sid, this.cid, false);
        this.cargarPestañaCheck();
        // this._Recargarble.Recargar$.emit(true);

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
                this.ver(this.id, this.pid, this.sid, this.cid, false);
                this.cargarPestañasLog(1);
                // this._Recargarble.Recargar$.emit(true);
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

 /**
  * I'm trying to pass a value from a table to a modal.
  * @param item - the object that is being passed to the modal
  */
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

      cargarPestañasLog(indice:number) {

        this.loading = true;

        const _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'ACTIVIDAD_READ_LOG' });
        _atts.push({ name: 'areaId', value:  this.id });
        _atts.push({ name: 'procesoId', value:  this.pid });
        _atts.push({ name: 'subprocesoId', value:  this.sid });
        _atts.push({ name: 'actividadId', value:  this.cid });
        _atts.push({ name: 'index', value: this.indice  });

        const spinner = this.controlService.openSpinner();

        const obj =  this.autentication.generic(_atts);

        obj.subscribe((data) => {

                  if (data.success === true) {

                    console.log(data);

                    if(data.data.length > 0){
                      
                      this.logList = []
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
                          this.disabledNext = false
                    }else{
                      this.disabledNext = true
                    }

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

      validarBotones() {
        debugger
        if (localStorage.getItem('CanAddCheck') === 'true') {
          if (localStorage.getItem('isCreador') === 'true') {
            let statusId = localStorage.getItem('statusSelected');
            if (statusId === '001' || statusId === '002' || statusId === '008' ) {

            this.crear = true;
            this.deshabilitado = false;
            this.rutaImgAdd = 'assets/images/Add.png';
            this.rutaImgCopy = 'assets/images/copy.png';
            this.rutaImgPaste = 'assets/images/paste.png';

          } else {

            this.crear = false;
            this.deshabilitado = true;
            this.rutaImgAdd = 'assets/images/Add_Disabled.png';
            this.rutaImgCopy = 'assets/images/copy2.png';
            this.rutaImgPaste = 'assets/images/paste2.png';
          }

        } else {
          this.crear = false;
          this.deshabilitado = true;
          this.rutaImgAdd = 'assets/images/Add_Disabled.png';
          this.rutaImgCopy = 'assets/images/copy2.png';
          this.rutaImgPaste = 'assets/images/paste2.png';
        }
        } else {
          this.crear = false;
          this.deshabilitado = true;
          this.rutaImgAdd = 'assets/images/Add_Disabled.png';
          this.rutaImgCopy = 'assets/images/copy2.png';
          this.rutaImgPaste = 'assets/images/paste2.png';
        }

      }
      cargarPestañaCheck() {

        this.loading = true;

        this.valorChckCopiado = this.canPaste();
        debugger;
        this.validarBotones();

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

                    if (localStorage.getItem('statusSelected') !== '001' || localStorage.getItem('statusSelected') !== '002' || localStorage.getItem('statusSelected') !== '008') {

              this.showDelete = this.mostrarDelete(localStorage.getItem('isCreador'), element.atts[7].value, element.atts[8].value, element.atts[9].value );

            }

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
                      modify : false,
                      mostrarEliminar : this.showDelete
                        });

                  });
                  this.loading = false;
                  this.habilitar = false;
                  this.controlService.closeSpinner(spinner);

                } else {

                  this.loading = false;
                  this.controlService.closeSpinner(spinner);
    }
                console.log(this.checklistEllipse);
  // debugger;
                this.pegar = this.anonimmo(this.checklistEllipse, this.checklistEllipse.length, this.actividadModel.actividadStatusId);
  });

      }

      anonimmo(checklist, longitud: number, status: string) {

        if ( longitud === 0 ) {

          switch (status) {

            case '001':
              return true;

              case '002':
                return true;
                case '008':
                  return true;
                }

              } else if ( longitud > 0 ) {

                      // let permitido = 0;
                      for (let i = 0 ; i < longitud; i++) {
                        // debugger;
                        if ( checklist[i].statusId === '008' || checklist[i].statusId === '007' || checklist[i].statusId === '006' || checklist[i].statusId === '004' )  {
                            return  false;
                    }
                  }

                      return true;

          } else {

            return false;
          }

      }

/**
 * If the statusId is 001, 006, 007, or 008 and the pendingDelete is N and the DeleteIcon is Y, then
 * return true.
 *
 * I'm trying to write a test for this function.
 *
 * Here's what I have so far:
 * @param creador - true or false
 * @param statusId - The status of the record.
 * @param pendingDelete - 'N'
 * @param DeleteIcon - Y or N
 * @returns A boolean value.
 */
      mostrarDelete(creador, statusId, pendingDelete, DeleteIcon ) {

        if (creador === 'true') {

          // if ((statusId === '001' && pendingDelete === 'N' && DeleteIcon === 'Y') || (statusId === '006' && pendingDelete === 'N' && DeleteIcon === 'Y') || (statusId === '006' && pendingDelete === 'N' && DeleteIcon === 'Y') || (statusId === '008' && pendingDelete === 'N' && DeleteIcon === 'Y')) {
          if ((statusId === '001' && pendingDelete === 'N' && DeleteIcon === 'Y') || (statusId === '006' && pendingDelete === 'N' && DeleteIcon === 'Y') || (statusId === '006' && pendingDelete === 'N' && DeleteIcon === 'Y')) {
              return true ;
          }
        }

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
                  this.cargarPestañasLog(1);
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

         /**
          * It's a function that takes two parameters, a key and a status, and depending on the status,
          * it will call a different function.
          * @param key - is the key of the object in the database
          * @param status - is the status of the request
          */
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

          activarNotificaciones() {

            this.type = localStorage.getItem('type');
            this.valorType = localStorage.getItem('valorType');
            this.message = localStorage.getItem('message');
            this.valorMessage = localStorage.getItem('valorMessage');

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

          validarPegadoCheck() {
              if (this.checklistEllipse.length > 0) {

                  Swal2.fire({
                    icon : 'warning',
                    title : '<b style = "color:red"> ADVERTENCIA </b>',
                    text : 'TODOS  los Registros del Checklist serán reemplazados con el nuevo Checklist',
                    confirmButtonText : 'Continuar',
                    confirmButtonColor : '#2196f3',
                    cancelButtonText : 'Cancelar',
                    cancelButtonColor : 'red',
                    showCancelButton : true
                  }).then((respuesta) => {

                        if (respuesta.value) {

                          this.pegarCheck(true);
                        }

                  });

              } else {
                 this.pegarCheck(false);
              }

          }

          pegarCheck(confirmacion: boolean) {

            this.pasteCode = localStorage.getItem('checklist');
            this.pasteComments = localStorage.getItem('comentarios');
            this.pasteValores = localStorage.getItem('valorescheck');
            // debugger
            // console.log(this.pasteCode);
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
            if (confirmacion) {
              _atts.push({ name: 'confirm', value: 'Y' });

            }

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
                this.cargarPestañaCheck();

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
            }

          this.valor = this.valor.slice(1);
          this.valoresCheck = this.valoresCheck.slice(1);
          this.comments = this.comments.slice(3);

          localStorage.setItem('checklist', this.valor);
          localStorage.setItem('comentarios', this.comments);
          localStorage.setItem('valorescheck', this.valoresCheck);
          localStorage.setItem('idCheckCopiado', this.actividadModel.key);

          this.activar = true;

          this.valorChckCopiado = this.canPaste();

          const toast = Swal2.mixin({
            position: 'top-end'
          });

          toast.fire({
            icon : 'success',
            title : 'CheckList Copiado',
            text : `Jeraquia Ar:${this.actividadModel.areaId} Pr:${this.actividadModel.procesoId} Sp:${this.actividadModel.subprocesoId} Ac:${this.actividadModel.actividadId}`
          });

          }

          canPaste() {

           return this.actividadModel.key === localStorage.getItem('idCheckCopiado');
          }

          cambiarValidation(indice) {

            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < this.checklistEllipse.length; i++) {

              if (i === indice) {
                this.checklistEllipse[i].checkValidation = this.checklistEllipse[i].check;

                if (this.textomodificado === false) {

                  if (this.checklistEllipse[i].checkValidation === false  ) {
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

          }

          /**
           * It's a function that enables the save button when the user clicks on the ellipse.
           * @param indice - index of the array
           */
          habilitarSave(indice) {

            for (let i = 0; i < this.checklistEllipse.length; i++) {

              // tslint:disable-next-line: no-empty
              if (i === indice) {
                this.checklistEllipse[i].modify = true;
                this.textomodificado = true;
                this.modificados += 1;
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
                          this.ver(this.id, this.pid, this.sid, this.cid , false);
                          this.cargarPestañaCheck();
                          // this._Recargarble.Recargar$.emit(true);
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
              text : ' Está seguro que desea eliminar este Item ?',
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
                          // this.actividadModel = [];
                          // this.tareasList = [];
                          // this.logList = [];
                          // this.detalleList = [];
                          // this.stdJobList = [];
                          // debugger;
                          this.ver(this.id, this.pid, this.sid, this.cid, false);
                          // this.checklistEllipse = [];
                          this.cargarPestañaCheck();

                          // this._Recargarble.Recargar$.emit(true);
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

          enviarAvalidar(id, status, tipo) {
            const _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'PENDIENTE_VALIDAR_LIST' });
            _atts.push({ name: 'status', value: tipo });
            _atts.push({ name: 'key', value: id });
            _atts.push({ name: 'soloNodos', value: "Y" });
            _atts.push({ name: 'statusItem', value: status });
            _atts.push({ name: 'showCompleted', value: 'Y' });

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

                  if ( element.atts[0].name === 'uuid') {
                    console.log(element);
                    this.uid =  element.atts[0].value;

                  }
                });

                this.sendValidate( status);
                this.controlService.closeSpinner(spinner);
              }
            });

          }

          sendValidate( status) {

            let mnsje = 'Enviar a Validar';
            let titulo = 'Envio a Validacion en Proceso';

            if (status === '007') {
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

          let valores: string = '';

          let mnsje = 'Enviar a Validar';
          let titulo = 'Envio a Validacion en Proceso';

          if (status === '007') {
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

        generarReporte() {


          this.autentication.generarReporte(this.actividadModel.key)
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


        // metodo para paginar el log
        log(pagina:number){
          this.indice = this.indice+pagina
          if(this.indice === 0){
            this.disabledBack = true
            return
          }else{
            this.disabledBack = false

          }
          this.cargarPestañasLog(this.indice)
        }

  }
