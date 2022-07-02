
import { Component, Injectable, OnInit, ElementRef, ViewChildren, Renderer2, ViewChild, HostListener, OnChanges, Input, AfterViewInit } from '@angular/core';
import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNode } from '@angular/material/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { expand, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../shared';
import { MatDialog } from '@angular/material/dialog';
import { LeyendaComponent } from '../../leyenda/leyenda.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as $ from 'jquery';
import Swal from 'sweetalert';
// import Swal2 from

import Swal2 from 'sweetalert2';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Colors, Color } from 'ng2-charts';

// import 'jqueryui';
import { RkhelpComponent } from '../../rkhelp/rkhelp.component';
import 'rxjs/add/observable/interval';
import { NgClass } from '@angular/common';
// import { class } from '../../../../angular_material_schematics-OK9cjk/address-form/files/__path__/__name@dasherize@if-flat__/__name@dasherize__.component';
import { ServiciocajasService } from '../../shared/services/serviciocajas.service';
import { AutologoutService } from '../../shared/services/autologout.service';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { AddrkaComponent } from '../../AddPages/addrka/addrka.component';
import { AddrkyComponent } from '../../AddPages/addrky/addrky.component';

@Injectable({
  providedIn: 'root',
})

export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false, public key: string, public route: string,
              public version: string, public status: string, public sp: any[] = [],
              public hijo: string, public canAdd: string, public permiso: string,
              public perfiles: string, public pendingDelete: string ,
              public StatusPadre: boolean, public displayDeleteIcon: string) { }

  }

  // tslint:disable-next-line:max-classes-per-file
@Injectable()
  export class DynamicDataSource {

    dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

    get data(): DynamicFlatNode[] { return this.dataChange.value; }
    set data(value: DynamicFlatNode[]) {
      this._treeControl.dataNodes = value;
      this.dataChange.next(value);
    }

    public comparador: any;
    public response: any;
    public SL: string;
    public notificacionesList: any = {
      notificaciones: '',
    };

  constructor(
    public _treeControl: FlatTreeControl<DynamicFlatNode>,
    private autentication: AuthenticationService,
    private ControlsService: ControlsService) { }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {

      // console.log(this.data.indexOf(node))
      const index = this.data.indexOf(node);
      if (!expand) {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++ , count++) {
            // console.log(this.data[i].level)
          }
        this.data.splice(index + 1, count);
        this.dataChange.next(this.data);
        } else {
          node.isLoading = true;

        // console.log(node);
          const params = [];
          params.push({ name: 'scriptName', value: 'coemdr' });
          params.push({ name: 'action', value: 'SEARCH_NODE' });
          params.push({ name: 'level', value: node.level + 1 });
          params.push({ name: 'id', value: node.key });
          const response = [];

          const espacios = [];
          for (let _i = 0; _i < node.level + 1; _i++) {
          if (node.level == 8) {

            espacios.push(_i + 9);
          } else {
            espacios.push(_i + 2);

          }
        }

          const spinner = this.ControlsService.openSpinner();

          this.autentication.generic(params)
        .subscribe(data => {
          // console.log(data)
          const jsonObject: JSON = data as JSON;

          if (data['success'] === true) {

            data['data'].forEach(function(value) {
              const name = value['atts'][1]['value'] + ' - ' + value['atts'][2]['value'];
              const key = value['atts'][7]['value'];
              const status = value['atts'][3]['value'];
              const version = value['atts'][4]['value'];
              const hijo = value['atts'][9]['value'];
              let route = '';
              const canAdd = value['atts'][12]['value'];

              const perfiles = value['atts'][15]['value'] + value['atts'][16]['value'] + value['atts'][17]['value'] + value['atts'][18]['value'] + value['atts'][19]['value'];
              const pendingDelete = value['atts'][20]['value'];

              const statusParent = value['atts'][22]['value'];
              const displayDeleteIcon = value['atts'][23]['value'];
              let flag;
              if (parseInt(status) < parseInt(statusParent)) {
                var StatusPadre = true;

              } else {
                var StatusPadre = false;
              }

              if (value['atts'][18]['value'] === 'Y') {
              var lectura = 'N';

            } else {
              var lectura = 'Y';
            }
              const BloqueoDesdePadre = StatusPadre;
              localStorage.setItem('StatusPadre', BloqueoDesdePadre.toString());
              const permiso = canAdd + lectura;
            //  let permiso = lectura
              localStorage.setItem('sololectura', permiso);

              localStorage.setItem('canAdd', canAdd);

              switch (node.level + 1) {
                case 1:
                  route = 'rka/' + key;
                  break;
                  case 2:
                    route = 'rkp/' + key.substring(0, 2) + '/' + key.substring(2, 6);
                    break;
                    case 3:
                      route = 'rks/' + key.substring(0, 2) + '/' + key.substring(2, 6) + '/' + key.substring(6, 10);
                      break;
                      case 4:
                    route = 'rkc/' + key.substring(0, 2) + '/' + key.substring(2, 6) + '/' + key.substring(6, 10) + '/' + key.substring(10, 14);
                    break;
                  case 5:
                    route = 'rkt/' + key.substring(0, 2) + '/' + key.substring(2, 6) + '/' + key.substring(6, 10) + '/' + key.substring(10, 14) + '/' + key.substring(14, 18);
                    break;
                  case 6:
                    route = 'rkd/' + key.substring(0, 2) + '/' + key.substring(2, 6) + '/' + key.substring(6, 10) + '/' + key.substring(10, 14) + '/' + key.substring(14, 18) + '/' + key.substring(18, 19);
                    break;
                  case 7:
                    route = 'rkr/' + key.substring(0, 2) + '/' + key.substring(2, 6) + '/' + key.substring(6, 10) + '/' + key.substring(10, 14) + '/' + key.substring(14, 18) + '/' + key.substring(18, 19) + '/' + key.substring(19, 23);
                    break;
                    case 8:
                    route = 'rky/' + key.substring(0, 2) + '/' + key.substring(2, 6) + '/' + key.substring(6, 10) + '/' + key.substring(10, 14) + '/' + key.substring(14, 18) + '/' + key.substring(18, 19) + '/' + key.substring(19, 23) + '/' + key.substring(23, 27);
                    break;
                }
              response.push(new DynamicFlatNode(name, node.level + 1, true, false, key, route, version, status, espacios, hijo, canAdd, permiso, perfiles, pendingDelete, StatusPadre, displayDeleteIcon));
              });

            localStorage.setItem('comparar', JSON.stringify(response));

            this.data.splice(index + 1, 0, ...response);

              // console.log(this.data)
            node.isLoading = false;
              // notify the change
            this.dataChange.next(this.data);

            this.ControlsService.closeSpinner(spinner);

            } else {
              this.ControlsService.closeSpinner(spinner);

              this.autentication.showMessage(data.success, data.message, data['data'], data.redirect);
            }

          },
          error => {
            this.ControlsService.closeSpinner(spinner);
            if ( error.status === 401 || error.status === 0 ) {  this.autentication.showMessage(false, 'Su sesión ha expirado', { }, true);  } else { this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet1', {}, false); }
            console.log(error);
          });
        }
      }

      addSubNode(index: number, name: string, isExpandable: boolean , ) {
        const node = this.data[index];
        const espacios = [];
        for (let _i = 0; _i < node.level + 1; _i++) {
          espacios.push(_i);
        }
        const dfn = {
      item: name,
      level: node.level + 1,
      expandable: isExpandable,
      matTreeNodeToggleRecursive: true,
      isLoading: false,
      key: '',
      route: '',
      version: '',
      status: '',
      sp: espacios,
      hijo: '',
      canAdd: '',
      permiso: '',
      perfiles: '',
      pendingDelete: '',
      StatusPadre: false,
      displayDeleteIcon: ''

    };
        this.data.splice(index + 1, 0, ...[dfn]);
        this.dataChange.next(this.data);
  }

  addNode(index: number, name: string, isExpandable: boolean) {
    const node = this.data[index];
    const espacios = [];
    for (let _i = 0; _i < node.level + 1; _i++) {
      espacios.push(_i);
    }
    const dfn = {
      item: name,
      level: node.level,
      expandable: isExpandable,
      isLoading: false,
      key: '',
      route: '',
      version: '',
      status: '',
      sp: espacios,
      hijo: '',
      canAdd: '',
      permiso: '',
      perfiles: '',
      pendingDelete: '',
      StatusPadre: false,
      displayDeleteIcon: ''

    };
    this.data.splice(index + 1, 0, ...[dfn]);
    this.data = [...this.data];
    // this.dataChange.next(this.data);
  }

  changeNode(index: number, name: string) {
    this.data[index].item = name;
  }

  getParent(node: DynamicFlatNode) {
    const currentLevel = this._treeControl.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this._treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this._treeControl.dataNodes[i];

      if (this._treeControl.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
  }

}

// tslint:disable-next-line:max-classes-per-file
@Component({
  selector: 'app-rkmain',
  templateUrl: './rkmain.component.html',
  styleUrls: ['./rkmain.component.scss']
})

export class RkmainComponent implements OnInit {

  public cambio: DynamicDataSource;
  date = new Date().getFullYear();

  public href: any = '';
  public showDashboard: boolean = false;
  public color = 'accent';
  public checked = false;
  public tittle = 'Validar/Aprobar';
  public aprobacionesList: any[] = [];
  public isLoading = false;
  public getSelection = null;
  public CopyPaste = null;
  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public refrescrar: string;
  public havechild: string;
  //
  public sw: string;
  public Activo = '';
  public enviar: string;
  public AgregarArea: string;
  public AgregarNodo: string;
  public EliminarNodo: string;
  public titulo: string;
  public dashboard: string;
  public creado: string;
  public PendientesValidacion: string;
  public Validados: string;
  public PendientesAprobar: string;
  public centrado: string;
  public cargo: string;
  public respuesta: string;
  public ruta: string;

  public posicion: string;
  public distrito: string;
  public usuario: string;
  public refresh: string;
  public informacion: string;
  public areaId: string;
  public busqueda: string;
  public isHideReceipt;
  public arraycomparar: any;
  public nivel2;
  public nivel3;
  public nivel4;
  public nivel5;
  public nivel6;
  public nivel7;
  public nivel8;
  public EnviarHijos: string;
  public nodoseleccionado: string;
  public sub: any;
  public fix: string;
  message: string;
  public dashboardvisible: string;

  public notificacionesList: any = {
    notificaciones: '',
  };
  public dashboardData: any = {
    ENVIAR_A_VALIDAR: 0,
    POR_VALIDAR: 0,
    Rechazados: 0,
    POR_APROBAR: 0,
    En_Construccion: 0
  };
 public PendientesNodo: any = {
    TOTAL: 0,
    TOTAL_EV: 0,
    TOTAL_EA: 0,

  };
  public pendientes: any = {
    AREA: '',
    PROCESO: '',
    SUBPROCESO: '',
    ACTIVIDAD: '',
  };

  sololectura: boolean = false;
  keys: any;
  percreacion: string;
  listo: any;
  bandera = false;
  StatusPadre: string;
  Vcompilacion: string;
  rutaCjas: any;
  cj: any;
  minutos: number = 4;
  segundos: number = 59;

  t: any;
  PosicionAMover: any;
  accion: { name: string; value: string; };
  mensajeCopiado: string;

  rutaimagen: boolean = true;
  nodocopiar: any;
  mostrarLimpiar: boolean = false;
  nivelpermitido: any;
  nodoPadreBloqueo: string;
  nodocopiarkey: any;
  cambiarColor: boolean = false;
  accionElmininar: string;
  nivelEliminar: string;
  mostrarnoficaion: boolean = false;
  claseNotificacion: string;
  bloqueado: boolean = false;
  estadoPositivo: boolean = false;
  icon: string;
  estadosNodo: any;
  prefijo: string;
  item: string;
  botones: any[] = [];
  notificacionesContador: any;
  visible: boolean = true;

  // mmetodos para hacer logout automatico

  constructor(
    private autentication: AuthenticationService,
    private methodService: HttpMethodService,
    private controlService: ControlsService,
    private confirm: MatDialog,
    private router: Router,
    private renderer: Renderer2,
    public dialog: MatDialog,
    public Cajas: ServiciocajasService,
    public rutas: ActivatedRoute,
    public logout: AutologoutService) {
      // consola.log(this.comparador)

      this.rutas.params.subscribe( (parametros) => {
        // console.log(parametros)
        this.cj = parametros;
      });

      this.Cajas.notificaciones$.subscribe ( (recarga) => {
        this.notificacionesPendientes();
      }
      );

      this.Cajas.arbol$.subscribe ( (acciones) => {
        if (acciones[0]) {

          this.encontrarNodoStatusCambiado(acciones[1]);

        }
      }
      );
    // this.aperfil()

  }

    ngOnInit() {
      // this.showDashboard = true
      this.href = this.router.url;
      var $: any;

      const a =  this.router.events.subscribe((val) => {
          // console.log(val)
          // //////debugger;
        if (val['url'] !== undefined) {
          this.href = val['url'];
          if (this.href === '/rkmain' && this.showDashboard === false) {
            this.showDashboard = true;

          } else {
            this.showDashboard = false;
          }

        }
      });

      // this.notificacionesPendientes();

      // this.cargarDashboard()
      this.Vcompilacion = '4.2.2';
      var  mensaje =
    `    ======================================
              Version ${this.Vcompilacion}
    ======================================`;

    // var mensaje  = '======================================'+'\n'+
    //                '=  Version :'+this.Vcompilacion+' '+'='+'\n'+
    //                '======================================'
      const colorM = 'Green';
      console.log(`%c${mensaje}`, `color:${colorM}`);

      this.recargarArbol();

      this.Cajas.Recargar$.subscribe((resp) => {
      if (resp) {

      this.refrescoItemModificado();

      }
    });

      this.usuario = localStorage.getItem('Usuario');
      this.posicion = localStorage.getItem('Posicion');
      this.distrito = localStorage.getItem('Distrito');

      this.informacion = this.usuario + ' ' + this.distrito + ' ' + this.posicion;

      this.sub = Observable.interval(3000)
    .subscribe((val) => {
      if (localStorage.getItem('isSendToValidate') === '1') {
        localStorage.setItem('isSendToValidate', '0');
        const key = localStorage.getItem('keySelected');

        this.recargarPadre();

      }
    });
  }
  resetear() {
    console.log('limpie');
 }

  reloj(rset?: boolean) {

    const t  = setInterval(() => {

      if (--this.segundos < 0) {
        this.segundos = 59;
        if (--this.minutos < 0) {

          clearInterval(t);
          this.autentication.logout();
        }
      }

    }, 1000);
    console.log(`${this.minutos} : ${this.segundos}`);

  }

  SinPermisos() {

    Swal2.fire({
      icon: 'error',
      html: 'Posicion ' + this.posicion.bold() + ' no tiene Priveligios'

    });
  }

  switchToTree() {
    this.recargarArbol();
  }

  abrirNodo(recarga?) {

    if (recarga) {

      this.recargarArbol(true);
    } else {
      this.treeControl.collapse(this.getSelection);
      this.treeControl.expand(this.getSelection);
      this.getSelection = this.getSelection;
    }

  }

  mostrarNivelesSuperiores() {

    for (let i = 0 ; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i]['level'] === this.getSelection.level && this.dataSource.data[i]['key'] === this.getSelection.key ) {
        console.log('soy igual que el seleccionado');
      }

    }
  }

  abrirNodoYSeleccionar() {

    const key = localStorage.getItem('UltimoEnviado');

    if (key.length === 2) {

      this.recargarArbol();
      document.getElementById(key).style.backgroundColor = '#cff5e9';
    } else {

      // console.log('estoy aqui')
      // console.log(key)
      // console.log(this.getSelection)
      this.treeControl.collapse(JSON.parse(localStorage.getItem('comparar')));
      this.treeControl.expand(JSON.parse(localStorage.getItem('comparar')));

    }

  }

  recargarPadre(ruta?) {
    console.log(this.getSelection);
    let getParent;
    // //////debugger;
    console.log(ruta);
    // console.log(this.getSelection)
    // this.getSelection = getParent;
    if (typeof (this.getSelection) === 'undefined') {
      this.recargarArbol();
    } else {
      this.abrirNodo(ruta);
    }
  }

  recargarArbol(arbol?: boolean) {
    ////// debugger
    this.notificacionesPendientes();
    // this.notificacionesList.notificaciones ='0'
    this.isLoading = true;
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);

    this.dataSource = new DynamicDataSource(this.treeControl, this.autentication, this.controlService);

    const params = [];
    params.push({ name: 'scriptName', value: 'coemdr' });
    params.push({ name: 'action', value: 'SEARCH_NODE' });
    params.push({ name: 'level', value: '1' });
    params.push({ name: 'id', value: '' });

    const response = [];
    const prueba = [];

    this.autentication.generic(params)
      .subscribe(data => {
        // console.log(data)
        const jsonObject: JSON = data as JSON;

        if (data['success'] === true) {
              // console.log(data)

          data['data'].forEach( (value) => {
            const key: string = value['atts'][7]['value'];
            const name: string = value['atts'][1]['value'] + ' - ' + value['atts'][2]['value'];
            const status = value['atts'][3]['value'];
            const version = value['atts'][4]['value'];
            const hijo = value['atts'][9]['value'];

            const canAdd = value['atts'][12]['value'];

            var perfiles = value['atts'][15]['value'] + value['atts'][16]['value'] + value['atts'][17]['value'] + value['atts'][18]['value'] + value['atts'][19]['value'];
            const pendingDelete = value['atts'][20]['value'];
            const statusParent = value['atts'][22]['value'];
            const displayDeleteIcon = value['atts'][23]['value'];
            // this.cargo = perfil

            if (parseInt(status) < parseInt(statusParent)) {
              var StatusPadre = true;

            } else {
              var StatusPadre = false;
            }

            switch (perfiles) {
                case 'NNYNN':
                  var NoCreador = 'Y';
                  break;
                case 'NYYNY': // APROBADORVALIDADOR
                   NoCreador = 'Y';
                   break;

                case 'NNYNY': // VALIDADOR
                   NoCreador = 'Y';
                   break;

                case 'NYYNN': // APROBADOR
                   NoCreador = 'Y';
                   break;

                  case 'YYYNY': // Administrador
                   NoCreador = 'Y';
                   break;

                  case 'YNYNY': //
                   NoCreador = 'Y';
                   break;

                  case 'YNYNN': //
                   NoCreador = 'Y';
                   break;

                  default:
                     NoCreador  = 'N';
                     break;

            }

            localStorage.setItem('noCreador', NoCreador);

            if (perfiles === 'NNYNN') {
              var lectura = 'Y';
            } else {
              var lectura = 'N';
            }

            const BloqueoDesdePadre = StatusPadre;
            const permiso = canAdd + lectura;
            const Pcreador = NoCreador;
            // console.log(canAdd+lectura)

            localStorage.setItem('sololectura', permiso);
            localStorage.setItem('NoCreador', Pcreador);
            localStorage.setItem('StatusPadre', BloqueoDesdePadre.toString());

            localStorage.setItem('canAdd', canAdd);

            response.push(new DynamicFlatNode(name, 1, true, false, key, 'rka/' + key, version, status, [], hijo, canAdd, permiso, perfiles, pendingDelete, StatusPadre, displayDeleteIcon));

          });

          this.dataSource.data = response;
          console.log(this.dataSource.data);
          this.Cajas.permiso = this.dataSource.data[0].perfiles;
          console.log(this.Cajas.permiso);

          localStorage.setItem('PerfilRkj', this.Cajas.permiso);
          localStorage.setItem('isSelectedNode', 'false');
          localStorage.setItem('keySelected', '');
          localStorage.setItem('versionSelected', '');
          localStorage.setItem('statusSelected', '');
          this.fix = localStorage.getItem('sololectura');
          this.StatusPadre = localStorage.getItem('StatusPadre');
          this.percreacion = localStorage.getItem('NoCreador');
          this.notificacionesList.notificaciones = localStorage.getItem('notificaciones');
          // console.log(this.fix )

        } else {
          // data.success = 'I'
          this.autentication.showMessage(data.success, data.message, data['data'], data.redirect);
        }
        this.isLoading = false;

      },
        error => {
          console.log(error);

          if ( error.status === 401 || error.status === 0 ) {  this.autentication.showMessage(false, 'Su sesión ha expirado', { }, true);  } else { this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet3', {}, false); }
        });

  }

  addNode() {
    this.dataSource.addNode(0, 'New Node', true);
  }
  addSubNode() {
    this.dataSource.addSubNode(0, 'New Child', false);
  }
  changeNode() {
    this.dataSource.changeNode(0, 'New Name');
  }
  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;
  // dataprueba: DynamicFlatNode;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) =>  _nodeData.expandable;

  nuevo(nodo: any) {

    this.getSelection = nodo;

    switch (nodo.level) {
      case 1:
        this.nuevoProceso(nodo.key);
        break;
      case 2:
        this.nuevoSubproceso(nodo.key.substring(0, 2), nodo.key.substring(2, 6));

        break;
      case 3:
        this.nuevaActividad(nodo.key.substring(0, 2), nodo.key.substring(2, 6), nodo.key.substring(6, 10));
        break;
      case 4:
        this.nuevaTarea(nodo.key.substring(0, 2), nodo.key.substring(2, 6), nodo.key.substring(6, 10), nodo.key.substring(10, 14));
        break;
      case 5:
        this.nuevaDimension(nodo.key.substring(0, 2), nodo.key.substring(2, 6), nodo.key.substring(6, 10), nodo.key.substring(10, 14), nodo.key.substring(14, 18));
        break;
      case 6:
        this.nuevoRiesgo(nodo.key.substring(0, 2), nodo.key.substring(2, 6), nodo.key.substring(6, 10), nodo.key.substring(10, 14), nodo.key.substring(14, 18), nodo.key.substring(18, 19));
        break;
      case 7:
        this.nuevaConsecuencia(nodo.key.substring(0, 2), nodo.key.substring(2, 6), nodo.key.substring(6, 10), nodo.key.substring(10, 14), nodo.key.substring(14, 18), nodo.key.substring(18, 19), nodo.key.substring(19, 23));
        break;
      case 8:

        Swal2.fire({

          title: 'No hay mas niveles',
          icon: 'info',
          showConfirmButton: false,
          timer: 2000
        }
        );

        break;
    }
  }

  ver(nodo) {

    // localStorage.setItem('nodo',JSON.stringify(nodo))

    this.getSelection = nodo;

    this.router.navigate(['/rkmain/' + nodo.route]);
    localStorage.setItem('isSelectedNode', 'true');
    localStorage.setItem('keySelected', '');
    localStorage.setItem('versionSelected', '');
    localStorage.setItem('statusSelected', '');
    localStorage.setItem('keySelected', nodo.key.trim());
    localStorage.setItem('versionSelected', nodo.version.trim());
    localStorage.setItem('statusSelected', nodo.status.trim());
    localStorage.setItem('itemseleccionado', nodo.route );
    localStorage.setItem('seleccionado', nodo );
    localStorage.setItem('allow', nodo.permiso );

    this.nodoseleccionado = localStorage.getItem('itemseleccionado');

    

    this.HabilitarEnvioValidacion();
    
  }

  HabilitarEnvioValidacion() {

    this.Activo = localStorage.getItem('statusSelected');
    this.StatusPadre = localStorage.getItem('StatusPadre');

  }

  
  verTable(item: any) {
    // alert(item.ruta.trim().length.toString());
    switch (item.key.trim().length.toString()) {
      case '2':
        this.router.navigate(['/rka/' + item.key]);
        // console.log(item.key + 'hola')

        break;
      case '6':
        this.router.navigate(['/rkmain/rkp/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6)]);
        break;
      case '10':
        this.router.navigate(['/rkmain/rks/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10)]);
        break;
      case '14':
        this.router.navigate(['/rkmain/rkc/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14)]);
        break;
      case '18':
        this.router.navigate(['/rkmain/rkt/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18)]);
        break;
      case '19':
        this.router.navigate(['/rkmain/rkd/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18) + '/' + item.key.substring(18, 19)]);
        break;
      case '23':
        this.router.navigate(['/rkmain/rkr/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18) + '/' + item.key.substring(18, 19) + '/' + item.key.substring(19, 23)]);
        break;
      case '27':
        this.router.navigate(['/rkmain/rky/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18) + '/' + item.key.substring(18, 19) + '/' + item.key.substring(19, 23) + '/' + item.key.substring(23, 27)]);
        break;

      default:
        this.rutaCjas = '/rkmain/rkapprovals/' + this.cj;
        this.router.navigate([this.rutaCjas]);

    }
  }

  @ViewChildren(MatTreeNode, { read: ElementRef }) treeNodes: ElementRef[];

  clase = 'background-highlight';
  hasListener: any[] = [];
  oldHighlight: ElementRef;

  updateHighlight = (newHighlight: ElementRef) => {
    this.oldHighlight && this.renderer.removeClass(this.oldHighlight.nativeElement, this.clase);

    this.renderer.addClass(newHighlight.nativeElement, this.clase);
    this.oldHighlight = newHighlight;
  }

  ngAfterViewChecked() {
    this.treeNodes.forEach((reference) => {
      if (!this.hasListener.includes(reference.nativeElement)) {
        // console.log('* tick');

        this.renderer.listen(reference.nativeElement, 'click', () => {
          this.updateHighlight(reference);
        });
        this.renderer.listen(reference.nativeElement.children.item(0), 'click', () => {
          this.updateHighlight(reference);
        });

        this.hasListener = this.hasListener.concat([ reference.nativeElement ]);
      }
    });

    this.hasListener = this.hasListener.filter((element) => document.contains(element));
    // console.log('*', this.hasListener.length);
  }

	 mensajes(status?: string ) {

    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'key', value: status });
    _atts.push({ name: 'action', value: 'RESUMEN_NODO' });
// PendientesNodo
    const spinner = this.controlService.openSpinner();
    const obj =  this.autentication.generic(_atts);

    obj.subscribe(((data) => {
      if (data.success === true) {

        data.data.forEach((element) => {

          this.PendientesNodo = {
                  TOTAL: element.atts[1].value.trim(),
                  TOTAL_EV: element.atts[2].value.trim(),
                  TOTAL_EA: element.atts[3].value.trim(),

                };

        });

        
        }

    }));
    this.controlService.closeSpinner(spinner);

  }

  refrescoItemModificado() {

    //// debugger;
    for (let i = 0 ; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i] === this.getSelection) {

        if (this.dataSource.data[i].level === 1) {

          this.recargarArbol();

        } else {

          console.log(this.dataSource.data[i]);
          const i2 = i - 1;
          this.getSelection = this.dataSource.data[i2];
          this.recargarPadre();
        }
      }

    }
  }

  nivelSuperior(level, key) {

    switch (level) {
      case 1:
        this.nivelEliminar = 'areaId';
        this.accionElmininar = 'AREA_DELETE';
        return '';
      case 2:
        this.nivelEliminar = 'procesoId';

        this.accionElmininar = 'PROCESO_DELETE';
        return key.substring(0, 2);
        case 3:
        this.nivelEliminar = 'subprocesoId';

        this.accionElmininar = 'SUBPROCESO_DELETE';
        return key.substring(0, 6);
        case 4:
        this.nivelEliminar = 'actividadId';

        this.accionElmininar = 'ACTIVIDAD_DELETE';
        return key.substring(0, 10);
        case 5:
        this.nivelEliminar = 'tareaId';

        this.accionElmininar = 'TAREA_DELETE';
        return key.substring(0, 14);
        case 6:
        this.nivelEliminar = 'dimensionId';

        this.accionElmininar = 'DIMENSION_DELETE';
        return key.substring(0, 18);
        case 7:
        this.nivelEliminar = 'riesgoId';

        this.accionElmininar = 'RIESGO_DELETE';
        return key.substring(0, 19);
        case 8:
        this.nivelEliminar = 'consecuenciaId';

        this.accionElmininar = 'CONSECUENCIA_DELETE';
        return key.substring(0, 23);

      }

  }

  async eliminarn(node) {
    for (let i = 0 ; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i] === node) {

        const levelUp = this.nivelSuperior(node.level, node.key);

        if (levelUp !== '') {

          for (let i = 0 ; i < this.dataSource.data.length; i++) {
            if (this.dataSource.data[i].key === levelUp) {

              console.log(this.dataSource.data[i]);
              this.getSelection = this.dataSource.data[i];

            }
          }
        } else {
          this.getSelection = undefined;
        }

        if (node.status === '008') {

          Swal2.fire({
            title: '<strong style="color:red">ADVERTENCIA !</strong>',
            html:
                'Al eliminar este Registro,se eliminarán todos sus HIJOS <br> aún estando <strong style="color:#5672C4">Aprobados</strong>. ' +
                '</br> <b style="color:#5672C4">¿ Desea continuar?</b>',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33'
          }).then(result => {

            if (result.value) {

              const _atts = [];
              let _ids = [];
              _ids = node.route.substring(4, node.route.length).split('/');

              _atts.push({ name: 'scriptName', value: 'coemdr' });
              _atts.push({ name: 'action', value: this.accionElmininar });
              if (_ids[0]) {
                _atts.push({ name: 'areaId', value: _ids[0] });
              }
              if (_ids[1]) {
                _atts.push({ name: 'procesoId', value: _ids[1] });
              }
              if (_ids[2]) {
                _atts.push({ name: 'subprocesoId', value: _ids[2] });
              }
              if (_ids[3]) {
                _atts.push({ name: 'actividadId', value: _ids[3] });
              }
              if (_ids[4]) {
                _atts.push({ name: 'tareaId', value: _ids[4] });
              }
              if (_ids[5]) {
                _atts.push({ name: 'dimensionId', value: _ids[5] });
              }
              if (_ids[6]) {
                _atts.push({ name: 'riesgoId', value: _ids[6] });
              }
              if (_ids[7]) {
                _atts.push({ name: 'consecuenciaId', value: _ids[7] });
              }
              _atts.push({ name: 'versionId', value: node.version });
              _atts.push({ name: 'statusId', value: node.status });

              const spinner = this.controlService.openSpinner();

              this.autentication.generic(_atts).subscribe(
                (data) => {
                  if (data.succes === true) {
                    if (data.data[0].atts[0].value === 'I' ) {

                    this.controlService.closeSpinner(spinner);
                    this.mostrarResponsables(data.data[0].atts[1].value, data.data[0].atts[2].value, _atts);
                  } else {
                    // this.mostrarResponsables(data.data[0].atts[1].value,data.data[0].atts[2].value,_atts)
                  }
                } else {
                  Swal2.fire({
                    icon: 'error',
                    text: data.message
                  });
                  this.controlService.closeSpinner(spinner);
                  }
                }
              );
            }

          });
        }

      }

    }
  }

  mostrarResponsables(mensaje, responsablesa, jerarquia) {

    Swal2.fire({
      html: mensaje,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
      // timer: 3500

    }).then(result => {
        if (result.value) {
          const re = '/\,/gi';
          var Responsables = responsablesa;
          var responsables = Responsables.split(',');
          var texto = '';
          for (let i = 0 ; i < responsables.length ; i++) {
                         texto = texto + `${responsables[i]}<br>`;
                      }
          Swal2.fire({
                        title : '<b>Los siguientes son los usuarios a quienes notificará</b>',

                        html:  texto,
                        showCancelButton: true,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33'

                      }).then(result => {
                        if (result.value) {
                          const spinner = this.controlService.openSpinner();
                          jerarquia.push({ name: 'warning', value: 'Y' });

                          const obj =  this.autentication.generic(jerarquia);

                          obj.subscribe(
                            (data) => {
                              if (data.success === true) {

                                Swal2.fire({
                                  html: 'Notificaciones Enviadas',
                                  icon: 'success',
                                  // timer: 3500

                                });
                                this.controlService.closeSpinner(spinner);

                              } else {

                                Swal2.fire({
                                  icon: 'error',
                                  text: data.message
                                });
                                this.controlService.closeSpinner(spinner);

                              }
                            }
                          );
                        }
                      });

        }
      });
  }

  async eliminar(node) {

    // console.log(node);
    // this.mensajes(node.key)
    // this.getSelection = node;

    for (let i = 0 ; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i] === node) {
        console.log(this.dataSource.data[i]);
        const i2 = i - 1;
        this.getSelection = this.dataSource.data[i2];
        this.recargarPadre();
      }

    }

    // console.log(this.getSelection)

    if (node.status === '008') {

      Swal2.fire({
        title: '<strong style="color:red">ADVERTENCIA !</strong>',
        html:
            'Al eliminar este Registro,se eliminarán todos sus HIJOS <br> aún estando <strong style="color:#5672C4">Aprobados</strong>. ' +
            '</br> <b style="color:#5672C4">¿ Desea continuar?</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {

          const recargable = localStorage.getItem('keySelected');

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });

          let _ids = [];
          _ids = node.route.substring(4, node.route.length).split('/');

          switch (_ids.length) {
              case 1:
                _atts.push({ name: 'action', value: 'AREA_DELETE' });
                break;
              case 2:
                _atts.push({ name: 'action', value: 'PROCESO_DELETE' });
                break;
              case 3:
                _atts.push({ name: 'action', value: 'SUBPROCESO_DELETE' });
                break;
              case 4:
                _atts.push({ name: 'action', value: 'ACTIVIDAD_DELETE' });
                break;
              case 5:
                _atts.push({ name: 'action', value: 'TAREA_DELETE' });
                break;
              case 6:
                _atts.push({ name: 'action', value: 'DIMENSION_DELETE' });
                break;
              case 7:
                _atts.push({ name: 'action', value: 'RIESGO_DELETE' });
                break;
              case 8:
                _atts.push({ name: 'action', value: 'CONSECUENCIA_DELETE' });
                break;
            }

          if (_ids[0]) {
              _atts.push({ name: 'areaId', value: _ids[0] });
            }
          if (_ids[1]) {
              _atts.push({ name: 'procesoId', value: _ids[1] });
            }
          if (_ids[2]) {
              _atts.push({ name: 'subprocesoId', value: _ids[2] });
            }
          if (_ids[3]) {
              _atts.push({ name: 'actividadId', value: _ids[3] });
            }
          if (_ids[4]) {
              _atts.push({ name: 'tareaId', value: _ids[4] });
            }
          if (_ids[5]) {
              _atts.push({ name: 'dimensionId', value: _ids[5] });
            }
          if (_ids[6]) {
              _atts.push({ name: 'riesgoId', value: _ids[6] });
            }
          if (_ids[7]) {
              _atts.push({ name: 'consecuenciaId', value: _ids[7] });
            }

          _atts.push({ name: 'versionId', value: node.version });
          _atts.push({ name: 'statusId', value: node.status });

          const spinner = this.controlService.openSpinner();
          const obj =  this.autentication.generic(_atts);

          obj.subscribe(
              (data) => {
                if (data.success === true) {
                  if (data.data[0].atts[0].value === 'I' ) {

                    // console.log(data.data[0].atts[1])
                    // this.autentication.showMessage(data.success, data.data[0].atts[1].value, node, data.redirect);
                    Swal2.fire({
                      html: 'Registro Eliminado',
                      icon: 'success',
                      // timer: 3500

                    });
                    const recargable = localStorage.getItem('keySelected');

                    if (recargable !== '') {

                      this.router.navigate(['/rkmain/cargando']);
                      // console.log('main');
                      setTimeout( () => {
                        // console.log('nodo');
                        this.recargarPadre();

                        this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                        // this.ver(this.nodoseleccionado);
                      }, 1000 );

                    } else {

                      this.recargarPadre();

                    }

                  } else {

                    // console.log(data.data[0].atts[0])
                    // console.log(data.data[0].atts[1])
                  Swal2.fire({
                    html: data.data[0].atts[1].value,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33'
                    // timer: 3500

                  }).then((result) => {
                    if (result.value) {
                      const re = '/\,/gi';
                      var Responsables = data.data[0].atts[2].value;
                      var responsables = Responsables.split(',');
                      var texto = '';
                      for (let i = 0 ; i < responsables.length ; i++) {
                         texto = texto + `${responsables[i]}<br>`;
                      }

                      Swal2.fire({
                        title : '<b>Los siguientes son los usuarios a quienes notificará</b>',

                        html:  texto,
                        showCancelButton: true,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33'

                      }).then((result) => {
                        if (result.value) {

                          const _atts = [];
                          _atts.push({ name: 'scriptName', value: 'coemdr' });

                          let _ids = [];
                          _ids = node.route.substring(4, node.route.length).split('/');

                          switch (_ids.length) {
              case 1:
                _atts.push({ name: 'action', value: 'AREA_DELETE' });
                break;
              case 2:
                _atts.push({ name: 'action', value: 'PROCESO_DELETE' });
                break;
              case 3:
                _atts.push({ name: 'action', value: 'SUBPROCESO_DELETE' });
                break;
              case 4:
                _atts.push({ name: 'action', value: 'ACTIVIDAD_DELETE' });
                break;
              case 5:
                _atts.push({ name: 'action', value: 'TAREA_DELETE' });
                break;
              case 6:
                _atts.push({ name: 'action', value: 'DIMENSION_DELETE' });
                break;
              case 7:
                _atts.push({ name: 'action', value: 'RIESGO_DELETE' });
                break;
              case 8:
                _atts.push({ name: 'action', value: 'CONSECUENCIA_DELETE' });
                break;
            }

                          if (_ids[0]) {
              _atts.push({ name: 'areaId', value: _ids[0] });
            }
                          if (_ids[1]) {
              _atts.push({ name: 'procesoId', value: _ids[1] });
            }
                          if (_ids[2]) {
              _atts.push({ name: 'subprocesoId', value: _ids[2] });
            }
                          if (_ids[3]) {
              _atts.push({ name: 'actividadId', value: _ids[3] });
            }
                          if (_ids[4]) {
              _atts.push({ name: 'tareaId', value: _ids[4] });
            }
                          if (_ids[5]) {
              _atts.push({ name: 'dimensionId', value: _ids[5] });
            }
                          if (_ids[6]) {
              _atts.push({ name: 'riesgoId', value: _ids[6] });
            }
                          if (_ids[7]) {
              _atts.push({ name: 'consecuenciaId', value: _ids[7] });
            }

                          _atts.push({ name: 'versionId', value: node.version });
                          _atts.push({ name: 'statusId', value: node.status });
                          _atts.push({ name: 'warning', value: 'Y' });

                          const spinner = this.controlService.openSpinner();
                          const obj =  this.autentication.generic(_atts);

                          obj.subscribe((data) => {

              if (data.success === true) {

                Swal2.fire({
                  html: 'Notificaciones Enviadas',
                  icon: 'success',
                  // timer: 3500

                });
                this.controlService.closeSpinner(spinner);

                // this.recargarPadre();

                const recargable = localStorage.getItem('keySelected');

                if (recargable !== '') {

                      this.router.navigate(['/rkmain/cargando']);
                      // console.log('main');
                      setTimeout( () => {
                        // console.log('nodo');
                        this.recargarPadre();

                        this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                        // this.ver(this.nodoseleccionado);
                      }, 1000 );

                    } else {
                      this.controlService.closeSpinner(spinner);

                      this.recargarPadre();

                    }

              } else {

                Swal2.fire({
                  icon: 'error',
                  text: data.message
                });
                this.controlService.closeSpinner(spinner);

              }
              this.controlService.closeSpinner(spinner);

            });

                        }
                      });
                    }
                  });

                  }
                } else {
                  // this.autentication.showMessage(data.success, data.message, node, data.redirect);
                  Swal2.fire({
                    icon: 'error',
                    text: data.message
                  });
                  this.controlService.closeSpinner(spinner);

                }
                this.controlService.closeSpinner(spinner);
              },
              (error) => {
                // if ( error.status === 401 ) { this.autentication.logout(); return; }
                this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet4', node, false);
                this.controlService.closeSpinner(spinner);
              });
        }

      });

    } else {

      const mensajeEliminacion = `Se Eliminará  un componente de la Matriz que posee </br>
      __ ítems relacionados </br>
      y __ de ellos en proceso de Validación o Aprobación.</br>
      No se podrá deshacer la eliminación. `;

      Swal2.fire({
        title: 'Eliminar Registro',
        text: '¿Desea eliminar este registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {

          const recargable = localStorage.getItem('keySelected');

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });

          let _ids = [];
          _ids = node.route.substring(4, node.route.length).split('/');

          switch (_ids.length) {
              case 1:
                _atts.push({ name: 'action', value: 'AREA_DELETE' });
                break;
              case 2:
                _atts.push({ name: 'action', value: 'PROCESO_DELETE' });
                break;
              case 3:
                _atts.push({ name: 'action', value: 'SUBPROCESO_DELETE' });
                break;
              case 4:
                _atts.push({ name: 'action', value: 'ACTIVIDAD_DELETE' });
                break;
              case 5:
                _atts.push({ name: 'action', value: 'TAREA_DELETE' });
                break;
              case 6:
                _atts.push({ name: 'action', value: 'DIMENSION_DELETE' });
                break;
              case 7:
                _atts.push({ name: 'action', value: 'RIESGO_DELETE' });
                break;
              case 8:
                _atts.push({ name: 'action', value: 'CONSECUENCIA_DELETE' });
                break;
            }

          if (_ids[0]) {
              _atts.push({ name: 'areaId', value: _ids[0] });
            }
          if (_ids[1]) {
              _atts.push({ name: 'procesoId', value: _ids[1] });
            }
          if (_ids[2]) {
              _atts.push({ name: 'subprocesoId', value: _ids[2] });
            }
          if (_ids[3]) {
              _atts.push({ name: 'actividadId', value: _ids[3] });
            }
          if (_ids[4]) {
              _atts.push({ name: 'tareaId', value: _ids[4] });
            }
          if (_ids[5]) {
              _atts.push({ name: 'dimensionId', value: _ids[5] });
            }
          if (_ids[6]) {
              _atts.push({ name: 'riesgoId', value: _ids[6] });
            }
          if (_ids[7]) {
              _atts.push({ name: 'consecuenciaId', value: _ids[7] });
            }

          _atts.push({ name: 'versionId', value: node.version });
          _atts.push({ name: 'statusId', value: node.status });

          const spinner = this.controlService.openSpinner();
          const obj =  this.autentication.generic(_atts);

          obj.subscribe(
              (data) => {
                ////// debugger;
                if (data.success === true) {
                  if (data.data[0].atts[0].value === 'I' ) {

                    console.log(data.data[0].atts[1]);
                    // this.autentication.showMessage(data.success, data.data[0].atts[1].value, node, data.redirect);
                    Swal2.fire({
                      html: 'Registro Eliminado',
                      icon: 'success',
                      // timer: 3500

                    });
                    this.controlService.closeSpinner(spinner);

                    // this.recargarPadre();
                    const recargable = localStorage.getItem('keySelected');

                    if (recargable !== '') {

                      this.router.navigate(['/rkmain/cargando']);
                      // console.log('main');
                      setTimeout( () => {
                        // console.log('nodo');
                        this.recargarPadre();

                        this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                        // this.ver(this.nodoseleccionado);
                      }, 1000 );

                    } else {
                      this.controlService.closeSpinner(spinner);

                      this.recargarPadre();

                    }

                  } else {

                    // console.log(data.data[0].atts[0])
                    // console.log(data.data[0].atts[1])
                  Swal2.fire({
                    html: data.data[0].atts[1].value,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33'
                    // timer: 3500

                  }).then((result) => {
                    if (result.value) {
                      const re = '/\,/gi';
                      var Responsables = data.data[0].atts[2].value;
                      var responsables = Responsables.split(',');
                      var texto = '';
                      for (let i = 0 ; i < responsables.length ; i++) {
                         texto = texto + `${responsables[i]}<br>`;
                      }

                      Swal2.fire({
                        title : '<b>Los siguientes son los usuarios a quienes notificará</b>',

                        html:  texto,
                        showCancelButton: true,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33'

                      }).then((result) => {
                        if (result.value) {

                          const _atts = [];
                          _atts.push({ name: 'scriptName', value: 'coemdr' });

                          let _ids = [];
                          _ids = node.route.substring(4, node.route.length).split('/');

                          switch (_ids.length) {
              case 1:
                _atts.push({ name: 'action', value: 'AREA_DELETE' });
                break;
              case 2:
                _atts.push({ name: 'action', value: 'PROCESO_DELETE' });
                break;
              case 3:
                _atts.push({ name: 'action', value: 'SUBPROCESO_DELETE' });
                break;
              case 4:
                _atts.push({ name: 'action', value: 'ACTIVIDAD_DELETE' });
                break;
              case 5:
                _atts.push({ name: 'action', value: 'TAREA_DELETE' });
                break;
              case 6:
                _atts.push({ name: 'action', value: 'DIMENSION_DELETE' });
                break;
              case 7:
                _atts.push({ name: 'action', value: 'RIESGO_DELETE' });
                break;
              case 8:
                _atts.push({ name: 'action', value: 'CONSECUENCIA_DELETE' });
                break;
            }

                          if (_ids[0]) {
              _atts.push({ name: 'areaId', value: _ids[0] });
            }
                          if (_ids[1]) {
              _atts.push({ name: 'procesoId', value: _ids[1] });
            }
                          if (_ids[2]) {
              _atts.push({ name: 'subprocesoId', value: _ids[2] });
            }
                          if (_ids[3]) {
              _atts.push({ name: 'actividadId', value: _ids[3] });
            }
                          if (_ids[4]) {
              _atts.push({ name: 'tareaId', value: _ids[4] });
            }
                          if (_ids[5]) {
              _atts.push({ name: 'dimensionId', value: _ids[5] });
            }
                          if (_ids[6]) {
              _atts.push({ name: 'riesgoId', value: _ids[6] });
            }
                          if (_ids[7]) {
              _atts.push({ name: 'consecuenciaId', value: _ids[7] });
            }

                          _atts.push({ name: 'versionId', value: node.version });
                          _atts.push({ name: 'statusId', value: node.status });
                          _atts.push({ name: 'warning', value: 'Y' });

                          const spinner = this.controlService.openSpinner();
                          const obj =  this.autentication.generic(_atts);

                          obj.subscribe((data) => {

              if (data.success === true) {

                Swal2.fire({
                  html: 'Notificaciones Enviadas',
                  icon: 'success',
                  // timer: 3500

                });
                this.controlService.closeSpinner(spinner);

                // this.recargarPadre();
                const recargable = localStorage.getItem('keySelected');

                if (recargable !== '') {

                      this.router.navigate(['/rkmain/cargando']);
                      // console.log('main');
                      setTimeout( () => {
                        // console.log('nodo');
                        this.recargarPadre();

                        this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                        // this.ver(this.nodoseleccionado);
                      }, 1000 );

                    } else {

                      this.recargarPadre();

                    }

              } else {

                Swal2.fire({
                  icon: 'error',
                  text: data.message
                });
                this.controlService.closeSpinner(spinner);

              }
              this.controlService.closeSpinner(spinner);

            });

                        }
                      });
                    }
                  });

                  }
                } else {
                  // this.autentication.showMessage(data.success, data.message, node, data.redirect);
                  Swal2.fire({
                    icon: 'error',
                    text: data.message
                  });
                  this.controlService.closeSpinner(spinner);

                }
                this.controlService.closeSpinner(spinner);
              },
              (error) => {
              console.log(error);
                ////// debugger
                // if ( error.status === 401 ) { this.autentication.logout(); return; }
              this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet5', node, false);
              this.controlService.closeSpinner(spinner);
              });
        }

      });
    }

  }
  RefrescarPantalla() {
    const currentRoute = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate([currentRoute]); // navigate to same route
              });
  }

  async nuevaArea() {

    Swal2.fire({
      title: 'Agregar Area',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.value) {

        const conf = this.confirm.open(AddrkaComponent, {
          hasBackdrop: true,
          height: '600px',
          width: '950px',
          data: {
            title: 'Agregar Area',
            message: ``,
            accion: 'AREA_LIST',
            crear : 'AREA_CREATE',
            ok : 'Area Agregada',
            button_confirm: 'Guardar',
            button_close: 'Cancelar'
          }
        });

        conf.afterClosed()
          .subscribe(async (result) => {

              this.recargarArbol();

          });
      }

    });

  }

  async nuevoProceso(_areaId: string) {

    Swal2.fire({
      title: 'Agregar Proceso',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.value) {

        const conf = this.confirm.open(AddrkaComponent, {
          hasBackdrop: true,
          height: '600px',
          width: '950px',
            data: {
              title: 'Agregar Proceso',
              message: ``,
              accion: 'PROCESO_LIST',
              crear : 'PROCESO_CREATE',
              ok : 'Proceso Agregado',
              button_confirm: 'Guardar',
              button_close: 'Cancelar',
              areaId: _areaId
            }
          });

        conf.afterClosed()
          .subscribe(async (result) => {

            // console.log(result)

            if (!result) {

                const recargable = localStorage.getItem('keySelected');

                if (recargable !== '') {

                // this.router.navigate(['/rkmain/cargando']);
                // console.log('main');
                // setTimeout( () => {
                  // console.log('nodo');
                  // this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                  // this.ver(this.nodoseleccionado);
                  // }, 1000 );

                  if ( recargable === _areaId) {

                    this.abrirNodo();
                    this.Cajas.RecargarDetalle$.emit(true);
                  } else {
                    this.abrirNodo();

                    this.router.navigate(['/rkmain']);
                  }

              } else {

                this.abrirNodo();

              }
            }

          });
      }

    });

  }

  async nuevoSubproceso(_areaId: string, _procesoId: string) {

   const key = _areaId + _procesoId;

   Swal2.fire({
      title: 'Agregar Subproceso',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.value) {

        const conf = this.confirm.open(AddrkaComponent, {
            hasBackdrop: true,
            height: '600px',
          width: '950px',
            data: {
              title: 'Agregar Subproceso',
              message: ``,
              button_confirm: 'Guardar',
              button_close: 'Cancelar',
              accion: 'SUBPROCESO_LIST',
              crear : 'SUBPROCESO_CREATE',
              ok: 'Subproceso Agregado',
              areaId: _areaId,
              procesoId: _procesoId
            }
          });

        conf.afterClosed()
          .subscribe(async (result) => {
            if (!result) {
              const recargable = localStorage.getItem('keySelected');

              if (recargable !== '') {

              // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
                // this.abrirNodo();

                if ( recargable === key) {

                  this.abrirNodo();
                  this.Cajas.RecargarDetalle$.emit(true);
                } else {
                  this.abrirNodo();

                  this.router.navigate(['/rkmain']);
                }

              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // }, 6000);

            } else {

              this.abrirNodo();

            }

            }

          });
      }

    });

  }

  async nuevaActividad(_areaId: string, _procesoId: string, _subprocesoId: string) {

    const key = _areaId + _procesoId + _subprocesoId;

    Swal2.fire({
      title: 'Agregar Actividad',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.value) {

        const conf = this.confirm.open(AddrkaComponent, {
          hasBackdrop: true,
          height: '600px',
          width: '950px',
          data: {
            title: 'Agregar Actividad',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
            accion: 'ACTIVIDAD_LIST',
            crear : 'ACTIVIDAD_CREATE',
            ok : 'Actividad Agregada',
            areaId: _areaId,
            procesoId: _procesoId,
            subprocesoId: _subprocesoId
          }
        });

        conf.afterClosed()
          .subscribe(async (result) => {

            if (!result) {
              const recargable = localStorage.getItem('keySelected');

              if (recargable !== '') {

              // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
                // this.abrirNodo();

                if ( recargable === key) {

                  this.abrirNodo();
                  this.Cajas.RecargarDetalle$.emit(true);
                } else {
                  this.abrirNodo();

                  this.router.navigate(['/rkmain']);
                }

              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // },7000);

            } else {

              this.abrirNodo();

            }

            }

          });
      }

    });

  }

  async nuevaTarea(_areaId: string, _procesoId: string, _subprocesoId: string, _actividadId: string) {

    const key = _areaId + _procesoId + _subprocesoId + _actividadId;

    Swal2.fire({
      title: 'Agregar Tarea',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.value) {

        const conf = this.confirm.open(AddrkaComponent, {

          hasBackdrop: true,
          height: '600px',
          width: '950px',
          data: {
            title: 'Agregar Tarea',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
            accion: 'TAREA_LIST',
            crear : 'TAREA_CREATE',
            ok : 'Tarea Agregada',
            areaId: _areaId,
            procesoId: _procesoId,
            subprocesoId: _subprocesoId,
            actividadId: _actividadId
          }
        });
        conf.afterClosed()
        .subscribe(async (result) => {
          if (!result) {
            const recargable = localStorage.getItem('keySelected');

            if (recargable !== '') {

            // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
            // this.abrirNodo();

            // console.log(recargable);
            // this.ver(recargable);

            if ( recargable === key) {

              this.abrirNodo();
              this.Cajas.RecargarDetalle$.emit(true);
            } else {
              this.abrirNodo();

              this.router.navigate(['/rkmain']);
            }

            // // this.RefrescarPantalla()
            // setTimeout(() => {

            //   this.ExpandirNodos(this.nodoseleccionado)
            // }, 8000);

          } else {

            this.abrirNodo();

          }

          }

        });
      }

    });

  }

  async nuevaDimension(_areaId: string, _procesoId: string, _subprocesoId: string, _actividadId: string, _tareaId: string) {

    const key = _areaId + _procesoId + _subprocesoId + _actividadId + _tareaId;

    Swal2.fire({
      title: 'Agregar Dimension',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.value) {

        const conf = this.confirm.open(AddrkaComponent, {
          hasBackdrop: true,
          height: '600px',
          width: '950px',
          data: {
            title: 'Agregar Dimensión',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
            accion: 'DIMENSION_LIST',
            crear : 'DIMENSION_CREATE',
            ok : 'Dimension Agregada',
            areaId: _areaId,
            procesoId: _procesoId,
            subprocesoId: _subprocesoId,
            actividadId: _actividadId,
            tareaId: _tareaId
          }
        });
        conf.afterClosed()
          .subscribe(async (result) => {

            if (!result) {
              const recargable = localStorage.getItem('keySelected');

              if (recargable !== '') {

              // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
                // this.abrirNodo();

                if ( recargable === key) {

                  this.abrirNodo();
                  this.Cajas.RecargarDetalle$.emit(true);
                } else {
                  this.abrirNodo();

                  this.router.navigate(['/rkmain']);
                }

              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // }, 9000);

            } else {
                  this.abrirNodo();

                  // this.abrirNodo();

            }

            }

          });
      }

    });

  }

  async nuevoRiesgo(_areaId: string, _procesoId: string, _subprocesoId: string, _actividadId: string, _tareaId: string, _dimensionId: string) {

    const key = _areaId + _procesoId + _subprocesoId + _actividadId + _tareaId + _dimensionId;

    Swal2.fire({
      title: 'Agregar Riesgo',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.value) {

        const conf = this.confirm.open(AddrkaComponent, {
          hasBackdrop: true,
          height: '600px',
          width: '950px',
          data: {
            title: 'Agregar Riesgo',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
            accion: 'RIESGO_LIST',
            crear : 'RIESGO_CREATE',
            ok : 'Riesgo Agregado',
            areaId: _areaId,
            procesoId: _procesoId,
            subprocesoId: _subprocesoId,
            actividadId: _actividadId,
            tareaId: _tareaId,
            dimensionId: _dimensionId
          }
        });
        conf.afterClosed()
          .subscribe(async (result) => {

            // console.log(result)
            if (!result) {
              const recargable = localStorage.getItem('keySelected');

              if (recargable !== '') {

              // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
                // this.abrirNodo();

                if ( recargable === key) {

                  this.abrirNodo();
                  this.Cajas.RecargarDetalle$.emit(true);
                } else {
                  this.abrirNodo();

                  this.router.navigate(['/rkmain']);
                }

              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // }, 10000);

            } else {

              this.abrirNodo();

            }

            }
          });
      }

    });

  }

  async nuevaConsecuencia(_areaId: string, _procesoId: string, _subprocesoId: string, _actividadId: string, _tareaId: string, _dimensionId: string, _riesgoId: string) {

    const key = _areaId + _procesoId + _subprocesoId + _actividadId + _tareaId + _dimensionId + _riesgoId;

    Swal2.fire({
      title: 'Agregar Consecuencia',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

      if (result.value) {

        const conf = this.confirm.open(AddrkyComponent, {
          hasBackdrop: true,
          height: '600px',
          width: '950px',
          data: {
            title: 'Agregar Consecuencia',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
            areaId: _areaId,
            procesoId: _procesoId,
            subprocesoId: _subprocesoId,
            actividadId: _actividadId,
            tareaId: _tareaId,
            dimensionId: _dimensionId,
            riesgoId: _riesgoId
          }
        });
        conf.afterClosed()
          .subscribe(async (result) => {
            console.log('entro');
            if (!result) {
              const recargable = localStorage.getItem('keySelected');

              // console.log(recargable);

              if (recargable !== '') {

                // aqui*
                if ( recargable === key) {

                  this.abrirNodo();
                  this.Cajas.RecargarDetalle$.emit(true);
                } else {
                  this.abrirNodo();

                  this.router.navigate(['/rkmain']);
                }
              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // }, 11000);

            } else {

              this.abrirNodo();

            }

            }

          });
      }

    });

  }

 ExpandirNodos(key: any) {

  console.log(key);
  // const spinner = this.controlService.openSpinner()
  // this.PosicionAMover

  const area = key.substring(0, 2);
  const proceso = key.substring(0, 6);
  const subproceso = key.substring(0, 10);
  const actividad = key.substring(0, 14);
  const tarea = key.substring(0, 18);
  const dimension = key.substring(0, 19);
  const riesgo = key.substring(0, 23);
  const consecuencia = key.substring(0, 27);

  let desplegable = [];

  // console.log(this.dataSource.data)

  for (let i = 0 ; this.dataSource.data.length; i++) {
    const spinner = this.controlService.openSpinner();

    if (this.dataSource.data[i]['key'] === area) {
      const level = this.dataSource.data[i];

      const spinner = this.controlService.openSpinner();
      console.log('area');

      const padre = this.dataSource.data.indexOf(level);
      console.log(padre);
      console.log(level.key);
      this.treeControl.expand(level);
      const band = true;
                  // this.ver(level)
      if (key.length == area.length ) {
                    document.getElementById(area).click();

                    document.getElementById(area).focus();

                    // this.ver(this.nivel2)
                    this.controlService.closeSpinner(spinner);

                  }

      setTimeout(() => {

                    console.log('proceso');

                    desplegable = JSON.parse(localStorage.getItem('comparar'));

                    for (let i = 0 ; desplegable.length; i++) {

                          if (desplegable[i]['key']  === proceso) {

                            console.log(desplegable[i]);
                            this.nivel2 = padre + i + 1;
                            console.log(this.nivel2);
                            this.treeControl.expand(this.treeControl.dataNodes[this.nivel2]);
                            if (key.length == proceso.length ) {
                              // let pos = document.getElementById(proceso)
                              // pos.scrollIntoView()
                              document.getElementById(proceso).click();

                              document.getElementById(proceso).focus();
                              // document.getElementById(proceso).scrollTo(pos.bottom,pos.left)

                              // this.ver(this.nivel2)
                              this.controlService.closeSpinner(spinner);

                            }

                          }

                      }
                      // console.log( desplegable)

                  }, 2000);

      setTimeout(() => {

                    console.log('subproceso');

                    desplegable = JSON.parse(localStorage.getItem('comparar'));

                    for (let i = 0 ; desplegable.length; i++) {

                      if (desplegable[i]['key']  === subproceso) {

                        console.log(desplegable[i]);
                        this.nivel3 = this.nivel2 + i + 1;
                        // console.log(this.nivel3)
                        this.treeControl.expand(this.treeControl.dataNodes[this.nivel3]);
                        if (key.length == subproceso.length ) {
                          // let pos = document.getElementById(subproceso)
                          //       pos.scrollIntoView()
                          document.getElementById(subproceso).click();
                          // this.ver(this.nivel3)
                          this.controlService.closeSpinner(spinner);
                        }

                      }
                      }

                  }, 4000);

      setTimeout(() => {

                    console.log('actividad');

                    desplegable = JSON.parse(localStorage.getItem('comparar'));

                    for (let i = 0 ; desplegable.length; i++) {

                    if (desplegable[i]['key']  === actividad) {

                      console.log(desplegable[i]);
                      this.nivel4 = this.nivel3 + i + 1;
                      // console.log(this.nivel4)
                      this.treeControl.expand(this.treeControl.dataNodes[this.nivel4]);
                      if (key.length == actividad.length ) {
                        // let pos = document.getElementById(actividad)
                        // pos.scrollIntoView()
                        // this.router.navigate(['/rkmain/cargando']);
                        document.getElementById(actividad).click();

                        // this.ver(this.nivel4)
                        this.controlService.closeSpinner(spinner);

                      }

                    }
                    }

                  }, 6000);

      setTimeout(() => {

                    console.log('tarea');

                    desplegable = JSON.parse(localStorage.getItem('comparar'));

                    for (let i = 0 ; desplegable.length; i++) {

                      if (desplegable[i]['key']  === tarea) {

                        console.log(desplegable[i]);
                        this.nivel5 = this.nivel4 + i + 1;
                        // console.log(this.nivel5)
                        this.treeControl.expand(this.treeControl.dataNodes[this.nivel5]);
                        if (key.length == tarea.length ) {
                          // let pos = document.getElementById(tarea)
                          // pos.scrollIntoView();
                          document.getElementById(tarea).click();
                          document.getElementById(tarea).focus();
                          // this.ver(this.nivel5)
                          this.controlService.closeSpinner(spinner);

                        }

                      }
                      }

                  }, 8500);
      setTimeout(() => {

                    console.log('dimension');

                    desplegable = JSON.parse(localStorage.getItem('comparar'));

                    for (let i = 0 ; desplegable.length; i++) {

                        if (desplegable[i]['key']  === dimension) {

                          console.log(desplegable[i]);
                          this.nivel6 = this.nivel5 + i + 1;
                          // console.log(this.nivel6)
                          this.treeControl.expand(this.treeControl.dataNodes[this.nivel6]);
                          if (key.length == dimension.length ) {
                            // let pos = document.getElementById(dimension)
                            // pos.scrollIntoView();
                            document.getElementById(dimension).click();

                            // this.ver(this.nivel6)
                            this.controlService.closeSpinner(spinner);

                          }

                        }
                        }

                  }, 10000);

      setTimeout(() => {

                    console.log('dimension');

                    desplegable = JSON.parse(localStorage.getItem('comparar'));

                    for (let i = 0 ; desplegable.length; i++) {

                      if (desplegable[i]['key']  === riesgo) {

                        console.log(desplegable[i]);
                        this.nivel7 = this.nivel6 + i + 1;
                        // console.log(this.nivel6)
                        this.treeControl.expand(this.treeControl.dataNodes[this.nivel7]);
                        if (key.length == riesgo.length ) {
                          // let pos = document.getElementById(riesgo)
                          // pos.scrollIntoView();

                          document.getElementById(riesgo).click();
                          document.getElementById(riesgo).focus();
                          // this.ver(this.nivel6)
                          this.controlService.closeSpinner(spinner);

                        }

                      }
                      }

                  }, 12000);

      setTimeout(() => {

                    console.log('consecuencia');

                    desplegable = JSON.parse(localStorage.getItem('comparar'));

                    for (let i = 0 ; desplegable.length; i++) {

                      if (desplegable[i]['key']  === consecuencia) {

                        console.log(desplegable[i]);
                        this.nivel8 = this.nivel7 + i + 1;
                        // console.log(this.nivel8)
                        // this.treeControl.expand(this.treeControl.dataNodes[this.nivel8])
                        // let pos = document.getElementById(consecuencia)
                        // pos.scrollIntoView()
                        document.getElementById(consecuencia).click();
                        document.getElementById(consecuencia).focus();
                        // this.ver(this.nivel8)
                        this.controlService.closeSpinner(spinner);

                      }
                      }

                  }, 14000);

                  // this.treeControl.expand(this.treeControl.dataNodes[level])
                // this.controlService.closeSpinner(spinner);
            }

    const pos = document.getElementById(key);
    pos.scrollIntoView();

    this.controlService.closeSpinner(spinner);
          }

          // console.log("entre despues de la bandera")s

 }
  aperfil() {
    // let _atts = [];
    // _atts.push({ name: 'scriptName', value: 'coemdr' });
    // _atts.push({ name: 'action', value: 'SESSION' });

    // const promiseView = new Promise((resolve, reject) => {
    //   this.autentication.generic(_atts)
    //     .subscribe(
    //       (data) => {
    //         // console.log("RES:" + JSON.stringify(data));
    //         const result = data.success;
    //         if (result) {

    //           data.data.forEach((element) => {
    //             if (element.atts.length > 0) {
    //               this.Perfil.push({
    //                 adm: element.atts[1].value,
    //                 apr: element.atts[2].value,
    //                 con: element.atts[3].value,
    //                 cre: element.atts[4].value,
    //                 val: element.atts[5].value,
    //               });
    //             }

    //           });
    //           //////debugger
    //           this.Perfil.forEach((element, index, array) => {

    //             this.consulta = element.con;
    //             this.admin = element.adm;
    //             this.aprobador = element.apr;
    //             this.creador = element.cre;
    //             this.validador = element.val;

    //             this.cargo = this.admin + this.aprobador + this.consulta + this.creador + this.validador;
    //             // if (this.cargo === 'NNYNN') {
    //             //   this.propiedad = 'none';
    //             // }

    //           });

    //         } else {
    //           this.controlService.snackbarError(data.message);
    //         }
    //         return result;
    //       },
    //       (error) => {
    //         //////debugger
    //         console.log(error)
    //         this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet6');
    //       });
    //     });

        this.mostrar();

      }

      async mostrar() {

    switch (this.cargo) {
      case 'NNYNN': // SOLO LECTURA
        this.sololectura = true;

        return;

      default:
        break;
    }

  }

  async VerLeyenda() {

    this.confirm.open(LeyendaComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '500px',
      data:
      {
        title: 'Notificaciones',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar'

      }
    });
  }

  statusPadreCopy(statusP, level) {

    // ////debugger

    switch (statusP) {
        case '004':
          if (level == 4 ) {
            return true;
          } else {

            return false;
          }
        case '006':
          if (level == 4 ) {
            return true;
          } else {

            return false;
          }
        case '007':
          if (level == 4 ) {
            return true;
          } else {

            return false;
          }
        case '008':
        return true;
        case '001':
        return true;
        case '002':
        return true;
    }

  }
  compararNiveles(nodeto, nodefrom) {

    if (nodeto == 1 && nodefrom == 2) {
      return true;
    } else if (nodeto == 2 && nodefrom == 3) {
      return true;
    } else if (nodeto == 3 && nodefrom == 4) {
      return true;

    } else if (nodeto == 4 && nodefrom == 5) {
      return true;

    } else if (nodeto == 5 && nodefrom == 6) {
      return true;

    } else if (nodeto == 6 && nodefrom == 7) {
      return true;

    } else if (nodeto == 7 && nodefrom == 8) {
      return true;

    } else {
      return false;
    }
  }

  limpiarCopiado() {
    this.rutaimagen = true;
    this.nodocopiar = '';
    this.nodoPadreBloqueo = '';
    this.mostrarLimpiar = false;
  }

  copy(node) {

    switch (node.level) {

      case 2:
          this.nodoPadreBloqueo = node.key.substring(0, 2);

          break;
      case 3:
        this.nodoPadreBloqueo = node.key.substring(0, 6);
        break;
      case 4:
        this.nodoPadreBloqueo = node.key.substring(0, 10);
        break;
      case 5:
        this.nodoPadreBloqueo = node.key.substring(0, 14);
        break;
        case 6:
          this.nodoPadreBloqueo = node.key.substring(0, 18);
          break;
      case 7:
        this.nodoPadreBloqueo = node.key.substring(0, 19);
        break;
        case 8:
          this.nodoPadreBloqueo = node.key.substring(0, 23);
          break;

        }

    console.log(this.nodoPadreBloqueo);

    this.rutaimagen = true;
    this.mostrarLimpiar = true;
        // document.getElementById(this.nodocopiarkey).style.backgroundColor = '#d1f312'

    if (node) {
      this.nodocopiar = node;
      this.nodocopiarkey = node.key;
      this.nivelpermitido = node.level - 1;
      this.rutaimagen = false;
      this.cambiarColor = true;
      const a = document.getElementById(this.nodocopiarkey);

      // console.log(a.getAttribute('color'))

      this.controlService.snackbarSucces('Jerarquia Copiada');
    }

  }

  paste(node) {

    console.log(node);
    console.log(this.nodocopiar);

    const canI = this.compararNiveles(node.level, this.nodocopiar.level);
    const stutuspermitido = this.statusPadreCopy(node.status, node.level);
    this.CopyPaste = node;

    if (!canI ) {

      Swal2.fire({
        icon: 'error',
        title: 'Accion No Valida',
        text: 'Asegurese que esta intentanto pegar el item en su nivel correspondiente'
      });

    } else {
      if (stutuspermitido) {
        Swal2.fire({
          title: 'Copiar/Pegar',
          text: '¿ Seguro que desea Copiar este item ?',
          icon: 'question',
          cancelButtonColor: 'red',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',

        }).then((result) => {

          if (result.value) {

            this.copiadoJerarquia(node.key, this.nodocopiar.key);

          }
        });

      } else {

        Swal2.fire({
          icon: 'error',
          title: 'Accion No Valida',
          text: 'No se perimten adicionar elementos a items en estatus diferentes a creacion o aprobacion'
        });

      }

    }
  }

  drop(event: CdkDragDrop<string[]>) {

    console.log(event);

    const dad = this.dataSource.data[event.currentIndex].key;
    const levelto = this.dataSource.data[event.currentIndex].level;
    const statusto = this.dataSource.data[event.currentIndex].status;
    this.CopyPaste = this.dataSource.data[event.currentIndex];

    const key = event.item.data.key;
    const levelfrom = event.item.data.level;
    console.log(dad);
    console.log(key);
    console.log(levelto);
    console.log(levelfrom);

    const canI = this.compararNiveles(levelto, levelfrom);
    const stutuspermitido = this.statusPadreCopy(statusto, levelto);

    //// debugger;
    if (!canI ) {

      Swal2.fire({
        icon: 'error',
        title: 'Accion No Valida',
        text: 'Asegurese que esta intentanto pegar el item en su nivel correspondiente'
      });

    } else {
      if (stutuspermitido) {
        Swal2.fire({
          title: 'Copiar/Pegar',
          text: '¿ Seguro que desea Copiar este item ?',
          icon: 'question',
          cancelButtonColor: 'red',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',

        }).then((result) => {

          if (result.value) {

            this.copiadoJerarquia(dad, key);

          }
        });

      } else {

        Swal2.fire({
          icon: 'error',
          title: 'Accion No Valida',
          text: 'No se perimten adicionar elementos a items en estatus diferentes a creacion o aprobacion'
        });

      }

    }

  }

  copiadoJerarquia(nodeto: string, nodefrom: string, ) {

    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'COPIAR_NODO' });
    _atts.push({ name: 'nodoTo', value: nodeto });
    _atts.push({ name: 'nodoFrom', value: nodefrom });

    const spinner = this.controlService.openSpinner();

    const obj =  this.autentication.generic(_atts);

    obj.subscribe((data) => {

      if (data.success === true) {
        console.log(data);

        if (data.data[0].atts[1]) {
          Swal2.fire({
            text: data.data[0].atts[1].value,
            title: '',
            icon: 'success'});
          this.controlService.closeSpinner(spinner);
          // this.autentication.showMessages( data.data[0].atts[0].value, data.data[0].atts[1].value, this.procesoModel, data.redirect);
          this.rutaimagen = true;
          this.mostrarLimpiar = false;
          this.nivelpermitido = '';
          this.nodoPadreBloqueo = '';
          this.cambiarColor = false;

          this.treeControl.collapse(this.CopyPaste);
          this.treeControl.expand(this.CopyPaste);
        }

      } else {
        // data.success = 'I'
        // this.autentication.showMessage(data.success, data.message, this.procesoModel, data.redirect);
        Swal2.fire( '', data.message, 'error');

        this.controlService.closeSpinner(spinner);

      }
      this.controlService.closeSpinner(spinner);

    }), (error) => {
      this.controlService.closeSpinner(spinner);

    };
  }

  // cerrar Session al cerrar pestaña

  @HostListener('window:beforeunload', ['$event'])
beforeunloadHandler(event) {
  // //////debugger
    this.showDashboard = false;
    // localStorage.clear();
    this.autentication.BorrarStorage();
}

mostrarNotificaciones() {

  this.confirm.open(NotificacionesComponent, {
    hasBackdrop: true,
    height: 'auto',
    width: 'auto',
    data:
    {
      title: 'Informacion',
      message: '',
      button_confirm: 'Ok',
      button_close: 'Cerrar'

    }
  }).afterClosed().subscribe( (valoresEliminar) => {
      if ( valoresEliminar !== false ) {

        const _atts = [];
        _atts.push( { name: 'scriptName', value: 'coemdr' } );
        _atts.push( { name: 'action', value: 'NOTIFICATION_DELETE' } );
        _atts.push( { name: 'keyValue', value: valoresEliminar } );

        console.log(_atts);
        this.autentication.generic(_atts)
        .subscribe( ( data ) => {
          console.log(data);
          const result = data.success;
          if (result) {
              console.log('eliminados');
              this.notificacionesPendientes(true);
            } else {
              // this.controlService.closeSpinner(spinner);

              console.log(data.error);
            }
          return result;
        });
      }
      // this.cambiarColorNotificacion();
      // this.notificacionesContador = 0;
  });
}

notificacionesPendientes(borradoNotificacion?: boolean) {
  const _atts = [];
  _atts.push({ name: 'scriptName', value: 'coemdr' });
  _atts.push({ name: 'action', value: 'NOTIFICACION_STATUS' });
  this.autentication.generic(_atts)
  .subscribe(
    (data) => {
      console.log(data);
      const result = data.success;
      debugger
      if (result) {

              this.notificacionesList = {
                notificaciones: data.data[0].atts[0].value.trim(),

              };
              //// debugger;
              if (data.data[0].atts[0].value.trim() === '1') {

                // debugger
                this.contadorNotificaciones();
                this.getClass(false);
                this.bloqueado = false ;

                this.claseNotificacion = 'img-circle material-icons-outlined';
                this.icon = 'notifications';
                this.visible = false;
                // this.cambiarColorNotificacion()

              } else {
                this.claseNotificacion = 'img-circle material-icons-outlined';
                this.bloqueado = true ;
                this.icon = 'notifications';
                this.visible = false;
                this.notificacionesContador = 0
                // this.cambiarColorNotificacion()

              }

            } else {
              // this.controlService.closeSpinner(spinner);

              this.autentication.showMessage(data.success, data.message, this.aprobacionesList, data.redirect);
            }
      return result;
          });

}

getClass(notificacion:boolean) {
  return 'img-circle material-icons-outlined';
}

contadorNotificaciones() {

  // debugger
  let aux = this.notificacionesContador;
  this.notificacionesContador = 0;
  const _atts = [];

  _atts.push({ name: 'scriptName', value: 'coemdr' });
  _atts.push({ name: 'action', value: 'NOTIFICACION_LIST' });

  this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data.length);
            const result = data.success;
            if (result) {

              console.log( data.data.length);
              this.notificacionesContador = data.data.length;
              if(aux === this.contadorNotificaciones){
                this.visible = true;
              }
              if (this.notificacionesContador >= 100) {
                this.notificacionesContador = '99+';
              }
              if(this.notificacionesContador > 0 || this.notificacionesContador ==='99+'){

                this.visible = false;
              }else{
                this.visible = true;
              }
              } else {

              // this.autentication.showMessage(data.success, data.message, this.aprobacionesList, data.redirect);
            }
            return result;
          });
}

cambiarColorNotificacion() {
  this.claseNotificacion = 'img-circle';
  this.bloqueado = true ;
  this.icon = 'notifications';
  this.visible = true;
}

  encontrarNodoStatusCambiado(key) {

  this.dataSource.data.forEach((id, index) => {

    if (id.key === key.substring(0, 2)) {

       switch (id.key.length) {

          case 2 :
              this.recargarArbol();
              break;
            case 6 :
            this.expandirStatusNodoCambiado(id.key.substring(0, 4));
            break;
          case 10 :
            this.expandirStatusNodoCambiado(id.key.substring(0, 6));
            break;
          case 14 :
            this.expandirStatusNodoCambiado(id.key.substring(0, 10));
            break;
          case 18 :
            this.expandirStatusNodoCambiado(id.key.substring(0, 14));
            break;
          case 19:
            this.expandirStatusNodoCambiado(id.key.substring(0, 18));
            break;
          case 23 :
            this.expandirStatusNodoCambiado(id.key.substring(0, 19));
            break;
          case 27 :
            this.expandirStatusNodoCambiado(id.key.substring(0, 23));
            break;
          case 31 :
            this.expandirStatusNodoCambiado(id.key.substring(0, 27));
            break;

        }

    }
  });

}

/**
 * If the id of the node that was clicked is the same as the id of the node in the dataSource, then
 * collapse the node.
 * @param id - the id of the node that was clicked
 */
expandirStatusNodoCambiado(id) {
  this.dataSource.data.forEach( (key, indice) => {

    if ( id === key.key) {

      this.treeControl.collapse(this.dataSource.data[indice]);
    }

  });
}

/**
 * It returns a string based on the value of the item.status property.
 * @param {DynamicFlatNode} item - DynamicFlatNode =&gt; this is the node that I'm trying to get the
 * status from.
 * @returns a string.
 */
obtenerEstado( item: DynamicFlatNode ) {

  this.estadosNodo = [];

  switch (item.status) {

    case '008':
  return 'Aprobado';

  break;
    case '006':
  return 'Pendiente Inactivacion (Eliminacion).';

  break;

    case '004':
  if ( item.pendingDelete === 'N' ) {
        return 'Ítem pendiente de validar.';

      } else {
        return 'Pendiente Inactivacion (Eliminacion).';

      }
  break;
    case '007':
  if ( item.pendingDelete === 'N' ) {
        return 'Ítem pendiente por Aprobar.';

      } else {
        return 'Pendiente Inactivacion (Eliminacion).';

      }
  break;

  default:
      if (item.status === '001' || item.status === '002') {
        return 'Ítem pendiente por enviar a validar.';

      }

  }

}

/**
 * If the status is 008, return an empty string. Otherwise, if the status is 006, return '(*)'.
 * Otherwise, if the status is 004, return '(**)'. Otherwise, if the status is 007, return '(***)'.
 * Otherwise, if the status is 001 or 002, return '(*)'. Otherwise, return an empty string.
 * @param item - the current item in the ng-repeat
 * @returns a string.
 */
valoreAsterisco(item) {

  return item.status === '008' ? '' :
          item.status === '006' ? '(*)' :
           item.status === '004' ? '(**)' :
            item.status === '007' ? '(***)' :
           item.status === '001' || item.status === '002' ? '(*)' :
            '';

}
/**
 * It's a function that takes a parameter of type DynamicFlatNode and returns nothing.
 * @param {DynamicFlatNode} item - DynamicFlatNode
 */
obtenerNIvel(item: DynamicFlatNode) {

  // debugger;

  switch (item.level) {
    case 1 :
          this.prefijo = 'AR-';
          this.item = 'Area';
          break;
    case 2 :
          this.prefijo = 'PR-';
          this.item = 'Proceso';
          break;
    case 3 :
          this.prefijo = 'SP-';
          this.item = 'Subproceso';
          break;
    case 4 :
          this.prefijo = 'AC-';
          this.item = 'Actividad';
          break;
    case 5 :
          this.prefijo = 'TA-';
          this.item = 'Tarea';
          break;
    case 6 :
          this.prefijo = 'DM-';
          this.item = 'Dimension';
          break;
    case 7 :
          this.prefijo = 'RG-';
          this.item = 'Riesgo';
          break;
    case 8 :
          this.prefijo = 'CS-';
          this.item = 'Consecuencia';
          break;

  }

}

desplegarJerarquia(nodo: DynamicFlatNode) {

  if (this.treeControl.isExpanded(nodo)) {

    if (nodo.level === 8) {
      return 'remove';
    }

    if (nodo.hijo === 'Y') {
      if (nodo.level === 8) {
        return 'remove';
      } else {
        return 'expand_more';
      }

    } else {
      return 'remove';
    }
  } else {

    if (nodo.level === 8) {
      return 'remove';
    }
    if ( nodo.hijo === 'N' ) {
      return 'remove';
    } else {
      return 'chevron_right';

    }
  }

}

BotonCopiado( nodo: DynamicFlatNode ) {

  if (this.rutaimagen && nodo.level === 1) {
      return true ;
  } else {
     return false;
  }

}

BotonesAccion(node: DynamicFlatNode) {

  if (node.permiso === 'YN') {

    switch ( node.status) {

      case '004':
        if (node.pendingDelete === 'Y' ) {
          if (node.level !== 8) {

            if (node.level === 4) {

              if (this.percreacion === 'N') {

                return this.botones = ['assets/images/Add.png', 'assets/images/Delete_Disabled.png', false , true , 'img-circle botonHabilitado'  , ' img-circle botonDeshabilitado'];

              }

            } else {
              return this.botones =  ['assets/images/botn_blanco.jpg', 'assets/images/Add_Disabled.png' , true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];

            }
          } else {
            return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
          }

      } else {
        if (node.level !== 8) {
          return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
        } else {
        return this.botones =  ['assets/images/botn_blanco.jpg', 'assets/images/Add_Disabled.png' , true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
      }
      }

      case '006' :
          if (node.pendingDelete === 'Y' ) {
              if (node.level !== 8) {
                  return this.botones =  ['assets/images/botn_blanco.jpg', 'assets/images/Add_Disabled.png' , true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
              } else {
                return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
              }

          } else {
            if (node.level !== 8) {
              return this.botones =  ['assets/images/botn_blanco.jpg', 'assets/images/Add_Disabled.png' , true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
          } else {
            return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
          }
          }
      case '007':
        if (node.pendingDelete === 'Y' ) {
          if (node.level !== 8) {

            if (node.level === 4) {

              if (this.percreacion === 'N') {

                return this.botones = ['assets/images/Add.png', 'assets/images/Delete_Disabled.png', false , true , 'img-circle botonHabilitado'  , ' img-circle botonDeshabilitado'];

              }

            } else {
              return this.botones =  ['assets/images/botn_blanco.jpg', 'assets/images/Add_Disabled.png' , true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];

            }
          } else {
            return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
          }

      } else {
        if (node.level !== 8) {
          return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
        } else {
        return this.botones =  ['assets/images/botn_blanco.jpg', 'assets/images/Add_Disabled.png' , true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
      }
      }

      default:
        if (node.level !== 8) {
          // return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
          return this.botones = ['assets/images/Add.png', 'assets/images/Delete.png', false , false , 'img-circle botonHabilitado'  , ' img-circle botonDeshabilitado'];
        } else {
          debugger
          return this.botones =  ['assets/images/botn_blanco.jpg', 'assets/images/Delete.png' , true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
      }

    }
} else {
    // return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
    if (node.level !== 8) {
      // return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
      return this.botones = ['assets/images/Add_Disabled.png', 'assets/images/Delete_Disabled.png', true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
    } else {

    return this.botones =  ['assets/images/botn_blanco.jpg', 'assets/images/Delete_Disabled.png' , true, true, 'img-circle botonDeshabilitado' , 'img-circle botonDeshabilitado'];
  }

  }
}
}
