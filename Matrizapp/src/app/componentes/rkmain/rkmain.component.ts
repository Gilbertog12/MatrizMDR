
import { Component, Injectable, OnInit, ElementRef, ViewChildren, Renderer2, ViewChild,HostListener, OnChanges, Input, AfterViewInit } from '@angular/core';
import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeNode } from '@angular/material/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { expand, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../shared';

import { ConfirmationComponent } from '../../controls/confirmation/confirmation.component';
import { AddrkaComponent } from './addrka/addrka.component';
import { AddrkpComponent } from './addrkp/addrkp.component';
import { AddrksComponent } from './addrks/addrks.component';
import { AddrkcComponent } from './addrkc/addrkc.component';
import { AddrktComponent } from './addrkt/addrkt.component';
import { AddrkdComponent } from './addrkd/addrkd.component';
import { AddrkrComponent } from './addrkr/addrkr.component';
import { AddrkyComponent } from './addrky/addrky.component';
import { MatDialog } from '@angular/material/dialog';
import { RkpendComponent } from './rkpend/rkpend.component';
import { RkpendaprobComponent } from './rkpendaprob/rkpendaprob.component';
import { RkporaprobarComponent } from './rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from './rkvalidar/rkvalidar.component';
import { LeyendaComponent } from '../../leyenda/leyenda.component';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

import * as $ from 'jquery';

import Swal from 'sweetalert'
// import Swal2 from

import Swal2 from 'sweetalert2'
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Colors, Color } from 'ng2-charts';

// import 'jqueryui';
import { RkhelpComponent } from '../../rkhelp/rkhelp.component';
import 'rxjs/add/observable/interval';
import { NgClass } from '@angular/common';
// import { class } from '../../../../angular_material_schematics-OK9cjk/address-form/files/__path__/__name@dasherize@if-flat__/__name@dasherize__.component';
import { ServiciocajasService } from '../../shared/services/serviciocajas.service';
import { AutologoutService } from '../../shared/services/autologout.service';
import { state } from '@angular/animations';
import { includes } from 'core-js/fn/array';

@Injectable({
  providedIn: 'root',
})



export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
    public isLoading = false, public key: string, public route: string, public version: string, public status: string, public sp: any[] = [],public hijo:string,public canAdd:string, public permiso:string, public perfiles:string,public pendingDelete:string ,public StatusPadre:boolean, public displayDeleteIcon:string) { }




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

    public comparador:any
    public response:any
    public SL:string



  constructor(
    public _treeControl: FlatTreeControl<DynamicFlatNode>,
    private autentication: AuthenticationService) { }






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
  toggleNode(node: DynamicFlatNode, expand: boolean)
  {

    
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
        }
        else {
          node.isLoading = true;
        //console.log(node);

        let params = [];
        params.push({ name: 'scriptName', value: 'coemdr' });
        params.push({ name: 'action', value: 'SEARCH_NODE' });
        params.push({ name: 'level', value: node.level + 1 });
        params.push({ name: 'id', value: node.key });
        let response = [];

        let espacios = [];
        for (let _i = 0; _i < node.level + 1; _i++) {
          if(node.level == 8){

            espacios.push(_i+9);
          }else{
            espacios.push(_i+2);

          }
        }

        this.autentication.generic(params)
        .subscribe(data => {
          // console.log(data)
          let jsonObject: JSON = data as JSON;

          if (data['success'] === true) {



            data['data'].forEach(function (value) {
              let name = value['atts'][1]['value'] + ' - ' + value['atts'][2]['value'];
              let key = value['atts'][7]['value'];
              let status = value['atts'][3]['value'];
              let version = value['atts'][4]['value'];
              let hijo = value['atts'][9]['value'];
              let route = '';
              let canAdd = value['atts'][12]['value'];

              let perfiles = value['atts'][15]['value']+value['atts'][16]['value']+value['atts'][17]['value']+value['atts'][18]['value']+value['atts'][19]['value']
              let pendingDelete = value['atts'][20]['value'];

              let statusParent = value['atts'][22]['value'];
              let displayDeleteIcon = value['atts'][23]['value'];
              let flag
              if(parseInt(status)< parseInt(statusParent)){
                var StatusPadre = true

              }else{
                var StatusPadre = false
              }

            if(value['atts'][18]['value'] === 'Y'){
              var lectura = 'N'

            }else{
              var lectura = 'Y'
            }
            let BloqueoDesdePadre = StatusPadre
            localStorage.setItem('StatusPadre',BloqueoDesdePadre.toString())
            let permiso = canAdd+lectura
            //  let permiso = lectura
            localStorage.setItem('sololectura',permiso)

              localStorage.setItem('canAdd',canAdd)

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
              response.push(new DynamicFlatNode(name, node.level + 1, true, false, key, route, version, status, espacios,hijo,canAdd,permiso,perfiles,pendingDelete,StatusPadre,displayDeleteIcon));
              });




              localStorage.setItem('comparar', JSON.stringify(response))


              this.data.splice(index + 1, 0, ...response);

              // console.log(this.data)
              node.isLoading = false;
              // notify the change
              this.dataChange.next(this.data);

            

            } else {
              this.autentication.showMessage(data.success, data.message, data['data'], data.redirect);
            }

          },
          error => {
            if ( error.status === 401 || error.status === 0 ) {  this.autentication.showMessage(false, 'Su sesión ha expirado', { }, true);  } else { this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet1', {}, false); }
            console.log(error);
          });
        }
      }



      addSubNode(index: number, name: string, isExpandable: boolean ,) {
        const node = this.data[index];
        let espacios = [];
        for (let _i = 0; _i < node.level + 1; _i++) {
          espacios.push(_i);
        }
        const dfn = {
      item: name,
      level: node.level + 1,
      expandable: isExpandable,
      matTreeNodeToggleRecursive:true,
      isLoading: false,
      key: '',
      route: '',
      version: '',
      status: '',
      sp: espacios,
      hijo:'',
      canAdd:'',
      permiso: '',
      perfiles:'',
      pendingDelete: '',
      StatusPadre: false,
      displayDeleteIcon: ''


    }
    this.data.splice(index + 1, 0, ...[dfn]);
    this.dataChange.next(this.data);
  }

  addNode(index: number, name: string, isExpandable: boolean) {
    const node = this.data[index];
    let espacios = [];
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
      canAdd:'',
      permiso: '',
      perfiles: '',
      pendingDelete: '',
      StatusPadre: false,
      displayDeleteIcon: ''

    }
    this.data.splice(index + 1, 0, ...[dfn]);
    this.data = [...this.data];
    //this.dataChange.next(this.data);
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

export class RkmainComponent implements OnInit,OnChanges {



  @ViewChild(RkpendComponent) child;

  public cambio:DynamicDataSource;
  date = new Date().getFullYear();


  public href: any = '';
  public showDashboard: Boolean = false;
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
  public refrescrar : string
  public havechild: string;
  //
  public sw: string;
  public Activo = ''
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
  public respuesta:string
  public ruta:string

  public posicion:string
  public distrito:string
  public usuario:string
  public refresh:string
  public informacion:string
  public areaId: string
  public busqueda: string
  public isHideReceipt
  public arraycomparar:any
  public nivel2
  public nivel3
  public nivel4
  public nivel5
  public nivel6
  public nivel7
  public nivel8
  public EnviarHijos:string
  public nodoseleccionado: string;
  public sub: any;
  public fix:string
  message:string;
  public dashboardvisible:string

  public dashboardData: any = {
    ENVIAR_A_VALIDAR: 0,
    POR_VALIDAR: 0,
    Rechazados: 0,
    POR_APROBAR: 0,
    En_Construccion:0
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
  }
  public lista: any[] = [
    {
      'nombre' : ' ',
      'value' : ' '
    },

    {
      'nombre' : 'Area',
      'value' : 'A'
    },

    {
      'nombre' : 'Proceso',
      'value' : 'P'
    },
    {
      'nombre' : 'SubProceso',
      'value' : 'S'
    },
    {
      'nombre' : 'Actividad',
      'value' : 'AC'
    },
    {
      'nombre' : 'Tarea',
      'value' : 'T'
    }
  ]
  sololectura: boolean = false;
  keys: any;
  percreacion: string;
  listo: any;
  bandera= false;
  StatusPadre: string;
  Vcompilacion: string;
  rutaCjas: any;
  cj: any;
  minutos: number = 4;
  segundos: number = 59;

   // PolarArea

   public barChartData: ChartDataSets[] = [
    { data: [300, 100, 40, 120] }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,

    tooltips: {
      enabled: false
   },

    title: {
      display: true,
      text: "Transacciones Pendientes",
      fontSize: 30
    },

    animation: {
      onComplete: function () {
        var ctx = this.chart.ctx;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var chart = this;
        var datasets = this.config.data.datasets;

        datasets.forEach(function (dataset: Array<any>, i: number) {
          ctx.font = "10px Arial";


          ctx.fillStyle = "Black";
          chart.getDatasetMeta(i).data.forEach(function (p: any, j: any) {
            ctx.fillText(datasets[i].data[j], p._model.x, p._model.y -5);
          });

        });
      }
    },

    legend: {
  display: false,
 }
  };

  public barChartLabels: Label[] = ['ITEMS PENDIENTES DE VALIDAR',
                                    'ITEMS PENDIENTES DE VALIDAR',
                                     'ITEMS RECHAZADOS',
                                     'ITEMS PENDIENTES POR APROBAR'];


   public chartColors: Array<any> = [
    {
      backgroundColor: [
        "rgba(233, 217, 11, 0.8)",
        // "rgba(145, 145, 145, 0.8)",
        "rgba(235, 104, 100, 0.8)",
        "rgba(28, 146, 62, 0.8)",
        "rgba(59, 133, 205, 0.8)"
      ]
    },

  ];




   public barChartType: ChartType = 'bar';
  t:any;
  PosicionAMover: any;
  accion: { name: string; value: string; };
  mensajeCopiado: string;

  rutaimagen: boolean = true;
  nodocopiar: any;
  mostrarLimpiar: boolean = false;
  nivelpermitido: any;
  nodoPadreBloqueo: string;

  //mmetodos para hacer logout automatico



  constructor(
    private autentication: AuthenticationService,
    private methodService: HttpMethodService,
    private controlService: ControlsService,
    private confirm: MatDialog,
    private router: Router,
    private renderer: Renderer2,
    public dialog: MatDialog,
    public Cajas:ServiciocajasService,
    public rutas:ActivatedRoute,
    public logout:AutologoutService) {
      // consola.log(this.comparador)


      this.rutas.params.subscribe( parametros => {
        // console.log(parametros)
        this.cj = parametros
      })



    // this.aperfil()

  }



    ngOnInit() {
      // this.showDashboard = true
      this.href = this.router.url;
    var $: any;

      const a =  this.router.events.subscribe((val) => {
          // console.log(val)
          // //debugger;
        if (val['url'] !== undefined) {
          this.href = val['url'];
          if (this.href === '/rkmain' && this.showDashboard === false) {
            this.showDashboard = true;

          }
          else {
            this.showDashboard = false;
          }

        }
      });



      // this.cargarDashboard()
      this.Vcompilacion = '4.2.2'
    var  mensaje =
    `    ======================================
              Version ${this.Vcompilacion}
    ======================================`

    // var mensaje  = '======================================'+'\n'+
    //                '=  Version :'+this.Vcompilacion+' '+'='+'\n'+
    //                '======================================'
    let colorM = 'Green'
    console.log(`%c${mensaje}`, `color:${colorM}`)
    // localStorage.setItem('recargarAprobaciones', 'false');
    // this.refresh = localStorage.getItem('recargarAprobaciones');
    this.recargarArbol();
    // this.aperfil()
    // this.verSinAprobar();
    // this.idleLogout();
    // window.addEventListener('mousemove', this.resetear, true);


    // this.cargarDashboardData();

    // console.log(this.SL)



    this.Cajas.Recargar$.subscribe(resp=>{
      if(resp){
      debugger
      // this.abrirNodo()
      this.refrescoItemModificado()

      }
    })




    this.usuario = localStorage.getItem('Usuario')
    this.posicion = localStorage.getItem('Posicion')
    this.distrito = localStorage.getItem('Distrito')

    this.informacion = this.usuario+' '+this.distrito+' '+this.posicion

    // if (this.href === '/rkmain') {
    //   this.cargarDashboard();
    // }
    //observable que mantiene escuchando cambios para el tema del refresh
    this.sub = Observable.interval(3000)
    .subscribe((val) => {
      if(localStorage.getItem('isSendToValidate')==='1'){
        localStorage.setItem('isSendToValidate', '0');
        let key = localStorage.getItem('keySelected');
        // console.log(key)
        // console.log('ejecuto');


        // this.abrirNodoYSeleccionar();
        this.recargarPadre();
        // this.router.navigate(['/rkmain/']);


      }
    });
  }
  resetear(){
    console.log('limpie')
 }


  reloj(rset?:boolean){

    let t  = setInterval(() =>{

      if(--this.segundos<0){
        this.segundos = 59;
        if(--this.minutos < 0){
          //debugger
          clearInterval(t)
          this.autentication.logout()
        }
      }

    },1000)
     console.log(`${this.minutos} : ${this.segundos}`)



  }

  SinPermisos(){
    //Esta funcion se ejecuta cuando la posicion no tiene permisos de creacion o Elimninacion , despliega un mensaje de error!

    Swal2.fire({
      icon:'error',
      html:'Posicion '+this.posicion.bold()+' no tiene Priveligios'
      // background:'#A8A4A3',

    })
  }

  ngOnChanges(){



  }




  public cargarDashboardData() {
        let t;
    const parentThis = this;
    function reloj(rset?:boolean){
      if(rset){
        this.minutos = 4;
        this.segundos = 59;
      }

      // window.addEventListener('mousemove',this.t)
      if(--this.segundos<0){
        this.segundos = 59;
        if(--this.minutos < 0){
          //debugger
          clearInterval(this.t)
          this.autentication.logout()
        }
      }

    }

    window.onload = resetTimer;
    window.addEventListener('mousemove', resetTimer, true);

    function resetTimer() {

      clearInterval(t);

      t = setTimeout(() => {
        //console.log(localStorage.getItem('recargarAprobaciones'));
        reloj(true)

      }, 1000);

    }

  }





  cargarDashboard() {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    // _atts.push({ name: 'stdJobNo1', value: '' });
    _atts.push({ name: 'action', value: 'TABLERO_LIST' });

    // window.addEventListener('mousemove')

    // const spinner = this.controlService.openSpinner()
    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            // console.log(data)
            const result = data.success;
            if (result) {
              this.Cajas.caja1 = data.data[0].atts[1].value.trim()
              this.dashboardData = {
                ENVIAR_A_VALIDAR: data.data[0].atts[1].value.trim(),
                POR_VALIDAR: data.data[0].atts[2].value.trim(),
                Rechazados: data.data[0].atts[3].value.trim(),
                POR_APROBAR: data.data[0].atts[4].value.trim(),
                En_Construccion: data.data[0].atts[5].value.trim()
              };
            } else {
              // this.controlService.closeSpinner(spinner);

              this.autentication.showMessage(data.success, data.message, this.aprobacionesList, data.redirect);
            }
            return result;
          });
    });
  }

  pruebs(){
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    // _atts.push({ name: 'stdJobNo1', value: '' });
    _atts.push({ name: 'action', value: 'TABLERO_LIST' });

    this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data)
            const result = data.success;
            if (result) {
              this.Cajas.caja1 = data.data[0].atts[1].value.trim()
              this.dashboardData = {
                ENVIAR_A_VALIDAR: data.data[0].atts[1].value.trim(),
                POR_VALIDAR: data.data[0].atts[2].value.trim(),
                Rechazados: data.data[0].atts[3].value.trim(),
                POR_APROBAR: data.data[0].atts[4].value.trim(),
                En_Construccion: data.data[0].atts[5].value.trim()
              };
            } else {
              // this.controlService.closeSpinner(spinner);

              this.autentication.showMessage(data.success, data.message, this.aprobacionesList, data.redirect);
            }
            return result;
          });

  }


  switchToTree() {
    this.recargarArbol();
  }

  switchToTable() {
    this.verSinAprobar();
  }

  public idleLogout() {
    let t;
    const parentThis = this;

    window.onload = resetTimer;

    window.addEventListener('mousemove', resetTimer, true);

    function resetTimer() {

      clearTimeout(t);
      t = setTimeout(() => {
        //console.log(localStorage.getItem('recargarAprobaciones'));

        if (localStorage.getItem('recargarAprobaciones') === 'true') {
          parentThis.verSinAprobar();
          localStorage.setItem('recargarAprobaciones', 'false');
        }

      }, 2000);

    }

  }

  Buscar(){

    console.info( this.areaId +' '+ this.busqueda)


  }

  verSinAprobar() {
    this.isLoading = true;
    this.aprobacionesList = [];
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'LIST_APPROVE' });

    const spinner = this.controlService.openSpinner();

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {

                if (element.atts.length > 0) {
                  this.aprobacionesList.push({
                    offset: element.atts[0].value,
                    ruta: element.atts[1].value,
                    id: element.atts[2].value,
                    descripcion: element.atts[3].value,
                    version: element.atts[4].value,
                    status: element.atts[5].value,
                    key: element.atts[6].value

                  });
                  // console.log(element.atts[0].value);

                }
              });

              localStorage.setItem('isSelectedNode', 'false');
              localStorage.setItem('keySelected', '');
              localStorage.setItem('versionSelected', '');
              localStorage.setItem('statusSelected', '');
              this.controlService.closeSpinner(spinner);
            } else {
              this.controlService.closeSpinner(spinner);
              this.autentication.showMessage(data.success, data.message, this.aprobacionesList, data.redirect);
            }
            this.isLoading = false;
            this.controlService.closeSpinner(spinner);
            return result;
          },
          (error) => {
            this.controlService.closeSpinner(spinner);
            if ( error.status === 401 || error.status === 0 ) {  this.autentication.showMessage(false, 'Su sesión ha expirado', this.aprobacionesList, true);  } else { this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet2', this.aprobacionesList, false); }
          });
    });
  }

  abrirNodo(recarga?) {

    // this.treeControl.collapseAll()

    // this.treeControl.expandAll()

    //debugger
    if(recarga){

      this.recargarArbol(true);
    }else{
      this.treeControl.collapse(this.getSelection);
    this.treeControl.expand(this.getSelection);
    this.getSelection= this.getSelection
    }



    // console.log(this.getSelection)
    // localStorage.setItem('seleccion',this.getSelection)
    // this.mostrarNivelesSuperiores()

  };

  mostrarNivelesSuperiores(){

    for(let i = 0 ;i<this.dataSource.data.length; i++){

      if(this.dataSource.data[i]['level'] === this.getSelection.level && this.dataSource.data[i]['key'] === this.getSelection.key ){
        console.log("soy igual que el seleccionado")
      }

    }
  }


  superMetodo(){
    this.treeControl.collapse(this.getSelection);
    this.treeControl.expand(this.getSelection);
    this.treeControl.getDescendants(this.getSelection)
    // console.log(this.getSelection)
  }

  //tema del refresh/
  abrirNodoYSeleccionar() {
    // console.log(this.getSelection);
    let key = localStorage.getItem('UltimoEnviado')
    // console.log(key)

    if(key.length == 2){

      this.recargarArbol()
        document.getElementById(key).style.backgroundColor= '#cff5e9';
    }else{

      // console.log('estoy aqui')
      // console.log(key)
      // console.log(this.getSelection)
      this.treeControl.collapse(JSON.parse(localStorage.getItem('comparar')));
      this.treeControl.expand(JSON.parse(localStorage.getItem('comparar')));
      // console.log(JSON.parse(localStorage.getItem('comparar')))

    }
    // this.abrirNodo()

    // this.treeControl.collapse(this.treeControl.dataNodes[key])
    // this.treeControl.expand(this.treeControl.dataNodes[key])

    // if(key.length == 2){
    //     this.recargarArbol();

    // }else{
    //   document.getElementById(key).style.backgroundColor= '#cff5e9';

    // }


      // console.log(document.getElementById(key))


    // this.ver(localStorage.getItem('keySelected'))
  };

  recargarPadre(ruta?) {
    console.log(this.getSelection)
    let getParent
    // //debugger;
    console.log(ruta)
    // console.log(this.getSelection)
    // this.getSelection = getParent;
    if (typeof (this.getSelection) === 'undefined') {
      this.recargarArbol();
    }
    else {
      this.abrirNodo(ruta);
    }
  }



  recargarArbol(arbol?:boolean) {
    //debugger

    this.isLoading = true;
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);

    this.dataSource = new DynamicDataSource(this.treeControl, this.autentication);

    let params = [];
    params.push({ name: 'scriptName', value: 'coemdr' });
    params.push({ name: 'action', value: 'SEARCH_NODE' });
    params.push({ name: 'level', value: '1' });
    params.push({ name: 'id', value: '' });



    let response = [];
    let prueba=[]

    this.autentication.generic(params)
      .subscribe(data => {
        // console.log(data)
        let jsonObject: JSON = data as JSON;

        if (data['success'] === true) {
              // console.log(data)



          data['data'].forEach(function (value) {
            let key: string = value['atts'][7]['value'];
            let name: string = value['atts'][1]['value'] + ' - ' + value['atts'][2]['value'];
            let status = value['atts'][3]['value'];
            let version = value['atts'][4]['value'];
            let hijo = value['atts'][9]['value'];

            let canAdd = value['atts'][12]['value']

            var perfiles = value['atts'][15]['value']+value['atts'][16]['value']+value['atts'][17]['value']+value['atts'][18]['value']+value['atts'][19]['value']
            let pendingDelete = value['atts'][20]['value'];
            let statusParent = value['atts'][22]['value'];
            let displayDeleteIcon = value['atts'][23]['value'];
            // this.cargo = perfil


            if(parseInt(status)< parseInt(statusParent)){
              var StatusPadre = true

            }else{
              var StatusPadre = false
            }

            switch(perfiles){
                case 'NNYNN':
                  var NoCreador = 'Y'
                  break;
                case 'NYYNY'://APROBADORVALIDADOR
                   NoCreador = 'Y'
                  break;

                case 'NNYNY'://VALIDADOR
                   NoCreador = 'Y'
                  break;

                case 'NYYNN'://APROBADOR
                   NoCreador = 'Y'
                  break;

                  case 'YYYNY'://Administrador
                   NoCreador = 'Y'
                  break;

                  case 'YNYNY'://
                   NoCreador = 'Y'
                  break;

                  case 'YNYNN'://
                   NoCreador = 'Y'
                  break;





                  default:
                     NoCreador  = 'N'
                    break;

            }

            localStorage.setItem('noCreador',NoCreador)

            if(perfiles === 'NNYNN'){
              var lectura = 'Y'
            }else{
              var lectura = 'N'
            }


            let BloqueoDesdePadre = StatusPadre
            let permiso = canAdd+lectura
            let Pcreador = NoCreador
            // console.log(canAdd+lectura)

            localStorage.setItem('sololectura',permiso)
            localStorage.setItem('NoCreador',Pcreador)
            localStorage.setItem('StatusPadre',BloqueoDesdePadre.toString())


            localStorage.setItem('canAdd',canAdd)

            // console.log(localStorage.getItem('canAdd'))


            response.push(new DynamicFlatNode(name, 1, true, false, key, 'rka/' + key, version, status, [],hijo,canAdd,permiso,perfiles,pendingDelete,StatusPadre,displayDeleteIcon));

          });


          // console.log(prueba);
          // console.log(response);

          this.dataSource.data = response;
          console.log(this.dataSource.data)
          this.Cajas.permiso = this.dataSource.data[0].perfiles
          console.log(this.Cajas.permiso)

          localStorage.setItem('PerfilRkj', this.Cajas.permiso);
          localStorage.setItem('isSelectedNode', 'false');
          localStorage.setItem('keySelected', '');
          localStorage.setItem('versionSelected', '');
          localStorage.setItem('statusSelected', '');
          this.fix=localStorage.getItem('sololectura')
          this.StatusPadre=localStorage.getItem('StatusPadre')
          this.percreacion = localStorage.getItem('NoCreador')
          // console.log(this.fix )


        } else {
          // data.success = 'I'
          this.autentication.showMessage(data.success, data.message, data['data'], data.redirect);
        }
        this.isLoading = false;
       // if(arbol){
          //debugger

         // this.ExpandirNodos(this.getSelection.key)
        //}
        // this.bandera = true;
      },
        error => {
          console.log(error);

          if ( error.status === 401 || error.status === 0 ) {  this.autentication.showMessage(false, 'Su sesión ha expirado', { }, true);  } else { this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet3', {}, false); }
        });


        // let key = localStorage.getItem('UltimoEnviado')
        // if(key != ''){

        //   console.log(key)


        // // console.log(document.getElementById(key))
        // document.getElementById(key).style.backgroundColor= '#cff5e9';
        // // document.getElementById(key).className= 'background-highlight';
        // }


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

  hasChild = (_: number, _nodeData: DynamicFlatNode) => { return _nodeData.expandable; };


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

          title:'No hay mas niveles',
          icon:'info',
          showConfirmButton: false,
          timer: 2000
        }
        )

        break;
    }
  }

  ver(nodo: any) {

    // localStorage.setItem('nodo',JSON.stringify(nodo))

    this.getSelection= nodo



    this.router.navigate(['/rkmain/' + nodo.route]);
    localStorage.setItem('isSelectedNode', 'true');
    localStorage.setItem('keySelected', '');
    localStorage.setItem('versionSelected', '');
    localStorage.setItem('statusSelected', '');
    localStorage.setItem('keySelected', nodo.key.trim());
    localStorage.setItem('versionSelected', nodo.version.trim());
    localStorage.setItem('statusSelected', nodo.status.trim());
    localStorage.setItem('itemseleccionado', nodo.route )
    localStorage.setItem('seleccionado', nodo )

    this.nodoseleccionado = localStorage.getItem('itemseleccionado')

    /*let a:any = localStorage.getItem('itemseleccionado')


    a= a.slice(4,nodo.route.length)
    // a = a.split('/')

    if (a[0]) {
      this.nodoseleccionado =a[0];
    }
    if (a[1]) {
      this.nodoseleccionado =a[0]+a[1];
    }
    if (a[2]) {
      this.nodoseleccionado = a[0]+a[1]+a[2]
    }
    if (a[3]) {
      this.nodoseleccionado = a[0]+a[1]+a[2]+a[3]
    }
    if (a[4]) {
      this.nodoseleccionado = a[0]+a[1]+a[2]+a[3]+a[4]
    }
    if (a[5]) {
      this.nodoseleccionado =a[0]+a[1]+a[2]+a[3]+a[4]+a[5]
    }
    if (a[6]) {
      this.nodoseleccionado = a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6]
    }
    if (a[7]) {
      this.nodoseleccionado = a[0]+a[1]+a[2]+a[3]+a[4]+a[5]+a[6]+a[7]
    }*/

    // console.log(this.nodoseleccionado)



    this.HabilitarEnvioValidacion();
    // this.ruta = localStorage.getItem('keySelected');

    //console.log(nodo);
  }


  HabilitarEnvioValidacion(){

    this.Activo = localStorage.getItem('statusSelected')
    this.StatusPadre = localStorage.getItem('StatusPadre')


  }

  // //debugger;
  verTable(item: any) {
    //alert(item.ruta.trim().length.toString());
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
        this.rutaCjas = '/rkmain/rkapprovals/'+this.cj
        this.router.navigate([this.rutaCjas])

    }
  }




  @ViewChildren(MatTreeNode, { read: ElementRef }) treeNodes: ElementRef[];
  hasListener: any[] = [];
  oldHighlight: ElementRef;

  updateHighlight = (newHighlight: ElementRef) => {
    this.oldHighlight && this.renderer.removeClass(this.oldHighlight.nativeElement, 'background-highlight');

    this.renderer.addClass(newHighlight.nativeElement, 'background-highlight');
    this.oldHighlight = newHighlight;
  }

  ngAfterViewChecked() {
    this.treeNodes.forEach((reference) => {
      if (!this.hasListener.includes(reference.nativeElement)) {
        //console.log('* tick');

        this.renderer.listen(reference.nativeElement, 'click', () => {
          this.updateHighlight(reference);
        });
        this.renderer.listen(reference.nativeElement.children.item(0), 'click', () => {
          this.updateHighlight(reference);
        });

        this.hasListener = this.hasListener.concat([reference.nativeElement]);
      }
    });

    //console.log(this.hasListener);
    this.hasListener = this.hasListener.filter((element) => document.contains(element));
    //console.log('*', this.hasListener.length);
  }

	 mensajes(status?:string ){

    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'key', value: status });
    _atts.push({ name: 'action', value: 'RESUMEN_NODO' });
//PendientesNodo
    const spinner = this.controlService.openSpinner();
    const obj =  this.autentication.generic(_atts);

    obj.subscribe((data =>{
      if (data.success === true){

        data.data.forEach(element => {

          this.PendientesNodo ={
                  TOTAL: element.atts[1].value.trim(),
                  TOTAL_EV: element.atts[2].value.trim(),
                  TOTAL_EA: element.atts[3].value.trim(),

                }

        });

        // data.data.forEach((element) => {
        //   if (element.atts.length > 0) {
        //     this.PendientesNodo.push({
        //       TOTAL: element.atts[1].value.trim(),
        //       TOTAL_EV: element.atts[2].value.trim(),
        //       TOTAL_EA: element.atts[3].value.trim(),

        //     });
        //   }
        // this.PendientesNodo ={
        //   TOTAL: data.data[0].atts[1].value.trim(),
        //   TOTAL_EV: data.data[0].atts[2].value.trim(),
        //   TOTAL_EA: data.data[0].atts[3].value.trim(),

        // }
        // return this.PendientesNodo
      // }

          // console.log(this.PendientesNodo)
        }


    }))
    this.controlService.closeSpinner(spinner);





  }

  refrescoItemModificado(){

    debugger
    for (let i =0 ;i<this.dataSource.data.length; i++){



      if(this.dataSource.data[i] === this.getSelection){

        if(this.dataSource.data[i].level === 1){

          this.recargarArbol()

        }else{

          console.log(this.dataSource.data[i])
            let i2 = i-1
          this.getSelection = this.dataSource.data[i2]
          this.recargarPadre()
        }
      }

    }
  }


  async eliminar(node) {

    //console.log(node);
    // this.mensajes(node.key)
    // this.getSelection = node;

    for (let i =0 ;i<this.dataSource.data.length; i++){

      if(this.dataSource.data[i] === node){
        console.log(this.dataSource.data[i])
          let i2 = i-1
        this.getSelection = this.dataSource.data[i2]
        this.recargarPadre()
      }


    }

    // console.log(this.getSelection)

    if(node.status === '008'){

      Swal2.fire({
        title: '<strong style="color:red">ADVERTENCIA !</strong>',
        html:
            'Al eliminar este Registro,se eliminarán todos sus HIJOS <br> aún estando <strong style="color:#5672C4">Aprobados</strong>. ' +
            '</br> <b style="color:#5672C4">¿ Desea continuar?</b>',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor:'#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {

          let recargable = localStorage.getItem('keySelected')

          let _atts = [];
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
                      html:'Registro Eliminado',
                      icon: 'success',
                      // timer: 3500

                    })
                    let recargable = localStorage.getItem('keySelected')

                    if(recargable !==''){

                      this.router.navigate(['/rkmain/cargando']);
                      // console.log('main');
                      setTimeout( () => {
                        // console.log('nodo');
                        this.recargarPadre();

                        this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                        //this.ver(this.nodoseleccionado);
                      }, 1000 );



                    }else{

                      this.recargarPadre();

                    }





                  }else{


                    // console.log(data.data[0].atts[0])
                    // console.log(data.data[0].atts[1])
                  Swal2.fire({
                    html: data.data[0].atts[1].value,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor:'#3085d6',
                    cancelButtonColor: '#d33'
                    // timer: 3500

                  }).then((result)=>{
                    if(result.value){
                      let re = '/\,/gi'
                      var Responsables = data.data[0].atts[2].value
                      var responsables = Responsables.split(',')
                      var texto = '';
                      for(let i =0 ; i < responsables.length ; i++){
                         texto = texto + `${responsables[i]}<br>`
                      }


                      Swal2.fire({
                        title : '<b>Los siguientes son los usuarios a quienes notificará</b>',

                        html:  texto,
                        showCancelButton: true,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                        confirmButtonColor:'#3085d6',
                        cancelButtonColor: '#d33'

                      }).then((result)=>{
                        if(result.value){

                          let _atts = [];
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

              if(data.success === true){

                Swal2.fire({
                  html:'Notificaciones Enviadas',
                  icon: 'success',
                  // timer: 3500

                })
                // this.recargarPadre();

                let recargable = localStorage.getItem('keySelected')

                    if(recargable !==''){

                      this.router.navigate(['/rkmain/cargando']);
                      // console.log('main');
                      setTimeout( () => {
                        // console.log('nodo');
                        this.recargarPadre();

                        this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                        //this.ver(this.nodoseleccionado);
                      }, 1000 );



                    }else{

                      this.recargarPadre();

                    }

              }else{

                Swal2.fire({
                  icon:'error',
                  text: data.message
                })

              }
              this.controlService.closeSpinner(spinner);

            })

                        }
                      })
                    }
                  })

                  }
                }
                else {
                  // this.autentication.showMessage(data.success, data.message, node, data.redirect);
                  Swal2.fire({
                    icon:'error',
                    text: data.message
                  })


                }
                this.controlService.closeSpinner(spinner);
              },
              (error) => {
                // if ( error.status === 401 ) { this.autentication.logout(); return; }
                this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet4', node, false);
                this.controlService.closeSpinner(spinner);
              });
        }


      })


    }else{

      let mensajeEliminacion = `Se Eliminará  un componente de la Matriz que posee </br>
      __ ítems relacionados </br>
      y __ de ellos en proceso de Validación o Aprobación.</br>
      No se podrá deshacer la eliminación. `

      Swal2.fire({
        title: 'Eliminar Registro',
        text: '¿Desea eliminar este registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor:'#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.value) {

          let recargable = localStorage.getItem('keySelected')

          let _atts = [];
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
                //debugger;
                if (data.success === true) {
                  if (data.data[0].atts[0].value === 'I' ) {

                    console.log(data.data[0].atts[1])
                    // this.autentication.showMessage(data.success, data.data[0].atts[1].value, node, data.redirect);
                    Swal2.fire({
                      html:'Registro Eliminado',
                      icon: 'success',
                      // timer: 3500

                    })
                    // this.recargarPadre();
                    let recargable = localStorage.getItem('keySelected')

                    if(recargable !==''){

                      this.router.navigate(['/rkmain/cargando']);
                      // console.log('main');
                      setTimeout( () => {
                        // console.log('nodo');
                        this.recargarPadre();

                        this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                        //this.ver(this.nodoseleccionado);
                      }, 1000 );



                    }else{

                      this.recargarPadre();

                    }





                  }else{


                    // console.log(data.data[0].atts[0])
                    // console.log(data.data[0].atts[1])
                  Swal2.fire({
                    html: data.data[0].atts[1].value,
                    icon: 'error',
                    showCancelButton: true,
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor:'#3085d6',
                    cancelButtonColor: '#d33'
                    // timer: 3500

                  }).then((result)=>{
                    if(result.value){
                      let re = '/\,/gi'
                      var Responsables = data.data[0].atts[2].value
                      var responsables = Responsables.split(',')
                      var texto = '';
                      for(let i =0 ; i < responsables.length ; i++){
                         texto = texto + `${responsables[i]}<br>`
                      }


                      Swal2.fire({
                        title : '<b>Los siguientes son los usuarios a quienes notificará</b>',

                        html:  texto,
                        showCancelButton: true,
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                        confirmButtonColor:'#3085d6',
                        cancelButtonColor: '#d33'

                      }).then((result)=>{
                        if(result.value){

                          let _atts = [];
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

              if(data.success === true){

                Swal2.fire({
                  html:'Notificaciones Enviadas',
                  icon: 'success',
                  // timer: 3500

                })
                // this.recargarPadre();
                let recargable = localStorage.getItem('keySelected')

                    if(recargable !==''){

                      this.router.navigate(['/rkmain/cargando']);
                      // console.log('main');
                      setTimeout( () => {
                        // console.log('nodo');
                        this.recargarPadre();

                        this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                        //this.ver(this.nodoseleccionado);
                      }, 1000 );



                    }else{

                      this.recargarPadre();

                    }

              }else{

                Swal2.fire({
                  icon:'error',
                  text: data.message
                })

              }
              this.controlService.closeSpinner(spinner);

            })

                        }
                      })
                    }
                  })

                  }
                }
                else {
                  // this.autentication.showMessage(data.success, data.message, node, data.redirect);
                  Swal2.fire({
                    icon:'error',
                    text: data.message
                  })

                }
                this.controlService.closeSpinner(spinner);
              },
              (error) => {
              console.log(error)
                //debugger
                // if ( error.status === 401 ) { this.autentication.logout(); return; }
                this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet5', node, false);
                this.controlService.closeSpinner(spinner);
              });
        }


      })
    }


  }
  async nuevaArea() {

    Swal2.fire({
      title: 'Agregar Area',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

      if(result.value){

        let conf = this.confirm.open(AddrkaComponent, {
          hasBackdrop: true,
          height: 'auto',
          width: '500px',
          data: {
            title: 'Agregar Area',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar'
          }
        });

        conf.afterClosed()
          .subscribe(async (result) => {

              this.recargarArbol();

          });
      }

    })




  }

  RefrescarPantalla(){
    const currentRoute = this.router.url;

              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate([currentRoute]); // navigate to same route
              });
  }

  async nuevoProceso(_areaId: string) {

    Swal2.fire({
      title: 'Agregar Proceso',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

      if(result.value){

        let conf = this.confirm.open(AddrkpComponent, {
          hasBackdrop: true,
            height: 'auto',
            width: '500px',
            data: {
              title: 'Agregar Proceso',
              message: ``,
              button_confirm: 'Guardar',
              button_close: 'Cancelar',
              areaId: _areaId
            }
          });

          conf.afterClosed()
          .subscribe(async (result) => {

            // console.log(result)

            if(!result){


                let recargable = localStorage.getItem('keySelected')

              if(recargable !==''){

                this.router.navigate(['/rkmain/cargando']);
                // console.log('main');
                setTimeout( () => {
                  // console.log('nodo');
                  this.abrirNodo();
                  this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                  //this.ver(this.nodoseleccionado);
                }, 1000 );



              }else{

                this.abrirNodo();

              }
            }




          });
      }

    })




  }

  async nuevoSubproceso(_areaId: string, _procesoId: string) {

    Swal2.fire({
      title: 'Agregar Subproceso',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

      if(result.value){

        let conf = this.confirm.open(AddrksComponent, {
            hasBackdrop: true,
            height: 'auto',
            width: '500px',
            data: {
              title: 'Agregar Subproceso',
              message: ``,
              button_confirm: 'Guardar',
              button_close: 'Cancelar',
              areaId: _areaId,
              procesoId: _procesoId
            }
          });

        conf.afterClosed()
          .subscribe(async (result) => {
            if(!result){
              let recargable = localStorage.getItem('keySelected')

            if(recargable !==''){

              // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
                // this.abrirNodo();

                this.router.navigate(['/rkmain/cargando']);
                // console.log('main');
                setTimeout( () => {
                  // console.log('nodo');
                  this.abrirNodo();
                  this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                  //this.ver(this.nodoseleccionado);
                }, 1000 );


              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // }, 6000);


            }else{

              this.abrirNodo();


            }

            }


          });
      }

    })

    // let conf = this.confirm.open(AddrksComponent, {
    //   hasBackdrop: true,
    //   height: 'auto',
    //   width: '500px',
    //   data: {
    //     title: 'Agregar Subproceso',
    //     message: ``,
    //     button_confirm: 'Guardar',
    //     button_close: 'Cancelar',
    //     areaId: _areaId,
    //     procesoId: _procesoId
    //   }
    // });

    // conf.afterClosed()
    //   .subscribe(async (result) => {
    //     if (result) {
    //       this.abrirNodo();
    //     }
    //   });

  }

  async nuevaActividad(_areaId: string, _procesoId: string, _subprocesoId: string) {

    Swal2.fire({
      title: 'Agregar Actividad',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

      if(result.value){

        let conf = this.confirm.open(AddrkcComponent, {
          hasBackdrop: true,
          height: 'auto',
          width: '500px',
          data: {
            title: 'Agregar Actividad',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
            areaId: _areaId,
            procesoId: _procesoId,
            subprocesoId: _subprocesoId
          }
        });

        conf.afterClosed()
          .subscribe(async (result) => {

            if(!result){
              let recargable = localStorage.getItem('keySelected')

            if(recargable !==''){


              // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
                // this.abrirNodo();

                this.router.navigate(['/rkmain/cargando']);
                // console.log('main');
                setTimeout( () => {
                  console.log('nodo');
                  this.abrirNodo();
                  this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                  //this.ver(this.nodoseleccionado);
                }, 1000 );


              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // },7000);

            }else{

              this.abrirNodo();


            }

            }

          });
      }

    })

  }

  async nuevaTarea(_areaId: string, _procesoId: string, _subprocesoId: string, _actividadId: string) {

    Swal2.fire({
      title: 'Agregar Tarea',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

      if(result.value){

        let conf = this.confirm.open(AddrktComponent, {



          hasBackdrop: true,
          height: 'auto',
          width: '500px',
          data: {
            title: 'Agregar Tarea',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
            areaId: _areaId,
            procesoId: _procesoId,
            subprocesoId: _subprocesoId,
            actividadId: _actividadId
          }
        });
        conf.afterClosed()
        .subscribe(async (result) => {
          if(!result){
            let recargable = localStorage.getItem('keySelected')

          if(recargable !==''){


            // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
            // this.abrirNodo();

            // console.log(recargable);
            // this.ver(recargable);

            this.router.navigate(['/rkmain/cargando']);
            // console.log('main');
            setTimeout( () => {
              // console.log('nodo');
              this.abrirNodo();
              this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
              //this.ver(this.nodoseleccionado);
            }, 1000 );

            // // this.RefrescarPantalla()
            // setTimeout(() => {

            //   this.ExpandirNodos(this.nodoseleccionado)
            // }, 8000);


          }else{

            this.abrirNodo();


          }

          }

        });
      }

    })



  }

  async nuevaDimension(_areaId: string, _procesoId: string, _subprocesoId: string, _actividadId: string, _tareaId: string) {


    Swal2.fire({
      title: 'Agregar Dimension',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

      if(result.value){

        let conf = this.confirm.open(AddrkdComponent, {
          hasBackdrop: true,
          height: 'auto',
          width: '500px',
          data: {
            title: 'Agregar Dimensión',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
            areaId: _areaId,
            procesoId: _procesoId,
            subprocesoId: _subprocesoId,
            actividadId: _actividadId,
            tareaId: _tareaId
          }
        });
        conf.afterClosed()
          .subscribe(async (result) => {

            if(!result){
              let recargable = localStorage.getItem('keySelected')

            if(recargable !==''){


              // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
                // this.abrirNodo();

                this.router.navigate(['/rkmain/cargando']);
                // console.log('main');
                setTimeout( () => {
                  // console.log('nodo');
                  this.abrirNodo();
                  this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                  //this.ver(this.nodoseleccionado);
                }, 1000 );


              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // }, 9000);

            }else{

              this.abrirNodo();


            }

            }

          });
      }

    })

  }

  async nuevoRiesgo(_areaId: string, _procesoId: string, _subprocesoId: string, _actividadId: string, _tareaId: string, _dimensionId: string) {

    Swal2.fire({
      title: 'Agregar Riesgo',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

      if(result.value){

        let conf = this.confirm.open(AddrkrComponent, {
          hasBackdrop: true,
          height: 'auto',
          width: '500px',
          data: {
            title: 'Agregar Riesgo',
            message: ``,
            button_confirm: 'Guardar',
            button_close: 'Cancelar',
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
            if(!result){
              let recargable = localStorage.getItem('keySelected')

            if(recargable !==''){


              // this.router.navigate(['/rkmain/' +this.nodoseleccionado]);
                // this.abrirNodo();

                this.router.navigate(['/rkmain/cargando']);
                // console.log('main');
                setTimeout( () => {
                  // console.log('nodo');
                  this.abrirNodo();
                  this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                  //this.ver(this.nodoseleccionado);
                }, 1000 );


              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // }, 10000);


            }else{

              this.abrirNodo();


            }

            }
          });
      }

    })



  }

  async nuevaConsecuencia(_areaId: string, _procesoId: string, _subprocesoId: string, _actividadId: string, _tareaId: string, _dimensionId: string, _riesgoId: string) {

    Swal2.fire({
      title: 'Agregar Consecuencia',
      // text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

      if(result.value){

        let conf = this.confirm.open(AddrkyComponent, {
          hasBackdrop: true,
          height: 'auto',
          width: '500px',
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
            if(!result){
              let recargable = localStorage.getItem('keySelected')

              // console.log(recargable);

            if(recargable !==''){

                //aqui*
                this.router.navigate(['/rkmain/cargando']);
                // console.log('main');
                setTimeout( () => {
                  // console.log('nodo');
                  this.abrirNodo();
                  this.router.navigate(['/rkmain/' + this.nodoseleccionado]);
                  //this.ver(this.nodoseleccionado);
                }, 1000 );

              // this.RefrescarPantalla()
              // setTimeout(() => {

              //   this.ExpandirNodos(this.nodoseleccionado)
              // }, 11000);


            }else{

              this.abrirNodo();


            }

            }

          });
      }

    })



  }



  sendValidate() {
    if (localStorage.getItem('isSelectedNode') === 'true') {
      this.validateOrApprove();

    }

    if (localStorage.getItem('isSelectedNode') === 'false') {
      // this.autentication.showMessage(false, 'Por favor seleccione el nivel que desea enviar', {}, false);
      Swal2.fire({
        icon:'question',
        text:'Por favor seleccione el nivel que desea enviar a Validar'
      })
      this.router.navigate(['/rkmain']);
    }

  }

  async validateOrApprove() {

    if (localStorage.getItem('keySelected') === '') {
      Swal2.fire({
        text: 'Key Invalido',
        icon: 'error',
        timer: 3000
      })
      // this.autentication.showMessage(false, 'Key Invalido', {}, false);
      return;
    }

    if (localStorage.getItem('versionSelected') === '') {
      Swal2.fire({
        text: 'Versión Invalida',
        icon: 'error',
        timer: 3000
      })
      // this.autentication.showMessage(false, 'Versión Invalida', {}, false);
      return;
    }

    if (localStorage.getItem('statusSelected') === '') {
      Swal2.fire({
        text: 'Status Invalido',
        icon: 'error',
        timer: 3000
      })
      // this.autentication.showMessage(false, 'Status Invalido', {}, false);
      return;
    }

    if (localStorage.getItem('statusSelected') ==='004' || localStorage.getItem('statusSelected') === '007' || localStorage.getItem('statusSelected') === '008' ){
      Swal2.fire({
        text: 'El Item ya ha sido enviado a Validar',
        icon: 'info',
        timer: 3000
      })
      // this.autentication.showMessage(false, 'El Item ya ha sido enviado a Validar', {}, false);
      return;
    }
    const inputOptions = {


          'Y': 'Solo Padre',
          'N': 'Padre e Hijos',


    }

    const { value: color } = await Swal2.fire({
      title: 'Enviar a Validar',
      text: '¿Desea Enviar a Validar este registro?',

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


    if (color ){


        let _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
        _atts.push({ name: 'key', value: localStorage.getItem('keySelected').trim() });
        _atts.push({ name: 'onlyActualNode', value: color });

        _atts.push({ name: 'versionId', value: localStorage.getItem('versionSelected') });
        _atts.push({ name: 'statusId', value: localStorage.getItem('statusSelected') });

        const spinner = this.controlService.openSpinner();
        const obj =  this.autentication.generic(_atts);

        obj.subscribe(
          (data) => {
            if (data.success === true) {
              if (data.data[0].atts[1]) {

                Swal2.fire(
                  {
                    text:'Registro Enviado a Validar',
                    icon:'success',
                    timer: 3000
                  }
                )

                let recargable = localStorage.getItem('keySelected')

              if(recargable !==''){

                this.router.navigate(['/rkmain/cargando']);
                // console.log('main');
                setTimeout( () => {
                  // console.log('nodo');
                  this.recargarArbol();
                  this.router.navigate(['/rkmain/' ]);
                  //this.ver(this.nodoseleccionado);
                }, 1000 );
              }else{

                this.recargarArbol();
              }
                // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
              }

            } else {
              Swal2.fire({
                text:data.message,
                icon:'error',
                timer:3000
              })
              // this.autentication.showMessage(data.success, data.message, {}, data.redirect);

            }
            this.controlService.closeSpinner(spinner);
          },
          (error) => {
            // if ( error.status === 401 ) { this.autentication.logout(); return; }
            this.controlService.closeSpinner(spinner);
          });

      }





  }

  verDetalleAprobacion(item: any) {
    this.router.navigate(['/rkmain/rkapprovals/' + item.key + '/' + item.status + '/' + item.version]);
  }


  async VerEnviarValidar() {

    const conf =this.confirm.open(RkpendComponent,
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
          button_close: 'Cerrar'

        },
        panelClass : 'tabla'


      });
      conf.afterClosed()
      .subscribe(async (result) => {

        if(result === 'undefined' || result === 'falso'){

          this.cargarDashboard()
        }else{

          if(result){


            // this.recargarArbol()
                setTimeout(() => {
                  this.ExpandirNodos(result)

                }, 3000);


          }
        }

      })

  }

  /**
   * pruebaclick
   */


 ExpandirNodos(key:any){

  console.log(key)
  // const spinner = this.controlService.openSpinner()
  // this.PosicionAMover



   let area = key.substring(0,2)
  let proceso = key.substring(0,6)
  let subproceso = key.substring(0,10)
  let actividad = key.substring(0,14)
  let tarea = key.substring(0,18)
  let dimension = key.substring(0,19)
  let riesgo = key.substring(0,23)
  let consecuencia = key.substring(0,27)

  let desplegable = []



  // console.log(this.dataSource.data)

  for(let i =0 ;this.dataSource.data.length; i++){
    const spinner = this.controlService.openSpinner()

    if(this.dataSource.data[i]['key'] === area)
    {
      let level =this.dataSource.data[i]

      const spinner = this.controlService.openSpinner()
      console.log('area')

                  let padre = this.dataSource.data.indexOf(level)
                  console.log(padre)
                  console.log(level.key)
                  this.treeControl.expand(level)
                  let band = true
                  // this.ver(level)
                  if(key.length == area.length ){
                    document.getElementById(area).click()

                    document.getElementById(area).focus()


                    // this.ver(this.nivel2)
                    this.controlService.closeSpinner(spinner);

                  }



                  setTimeout(() => {

                    console.log('proceso')

                      desplegable = JSON.parse(localStorage.getItem('comparar'))

                        for(let i = 0 ; desplegable.length; i++){

                          if(desplegable[i]['key']  === proceso){



                            console.log(desplegable[i])
                            this.nivel2 = padre+i+1;
                            console.log(this.nivel2)
                            this.treeControl.expand(this.treeControl.dataNodes[this.nivel2])
                            if(key.length == proceso.length ){
                              // let pos = document.getElementById(proceso)
                              // pos.scrollIntoView()
                              document.getElementById(proceso).click()

                              document.getElementById(proceso).focus()
                              // document.getElementById(proceso).scrollTo(pos.bottom,pos.left)

                              // this.ver(this.nivel2)
                              this.controlService.closeSpinner(spinner);

                            }

                          }



                      }
                      // console.log( desplegable)


                  }, 2000);

                  setTimeout(() => {

                    console.log('subproceso')

                    desplegable = JSON.parse(localStorage.getItem('comparar'))



                      for(let i = 0 ; desplegable.length; i++){

                      if(desplegable[i]['key']  === subproceso){

                        console.log(desplegable[i])
                        this.nivel3 = this.nivel2+i+1;
                        // console.log(this.nivel3)
                        this.treeControl.expand(this.treeControl.dataNodes[this.nivel3])
                        if(key.length == subproceso.length ){
                          // let pos = document.getElementById(subproceso)
                          //       pos.scrollIntoView()
                          document.getElementById(subproceso).click()
                          // this.ver(this.nivel3)
                          this.controlService.closeSpinner(spinner);
                        }

                      }
                      }


                  }, 4000);

                  setTimeout(() => {

                    console.log('actividad')

                    desplegable = JSON.parse(localStorage.getItem('comparar'))


                    for(let i = 0 ; desplegable.length; i++){

                    if(desplegable[i]['key']  === actividad){

                      console.log(desplegable[i])
                      this.nivel4 = this.nivel3+i+1;
                      // console.log(this.nivel4)
                      this.treeControl.expand(this.treeControl.dataNodes[this.nivel4])
                      if(key.length == actividad.length ){
                        // let pos = document.getElementById(actividad)
                        // pos.scrollIntoView()
                        // this.router.navigate(['/rkmain/cargando']);
                        document.getElementById(actividad).click()

                        // this.ver(this.nivel4)
                        this.controlService.closeSpinner(spinner);

                      }

                    }
                    }

                  }, 6000);

                  setTimeout(() => {

                    console.log('tarea')

                    desplegable = JSON.parse(localStorage.getItem('comparar'))



                      for(let i = 0 ; desplegable.length; i++){

                      if(desplegable[i]['key']  === tarea){

                        console.log(desplegable[i])
                        this.nivel5 = this.nivel4+i+1;
                        // console.log(this.nivel5)
                        this.treeControl.expand(this.treeControl.dataNodes[this.nivel5])
                        if(key.length == tarea.length ){
                          // let pos = document.getElementById(tarea)
                          // pos.scrollIntoView();
                          document.getElementById(tarea).click()
                          document.getElementById(tarea).focus()
                          // this.ver(this.nivel5)
                          this.controlService.closeSpinner(spinner);

                        }

                      }
                      }


                  }, 8500);
                  setTimeout(() => {

                    console.log('dimension')

                    desplegable = JSON.parse(localStorage.getItem('comparar'))



                      for(let i = 0 ; desplegable.length; i++){

                        if(desplegable[i]['key']  === dimension){

                          console.log(desplegable[i])
                          this.nivel6 = this.nivel5+i+1;
                          // console.log(this.nivel6)
                          this.treeControl.expand(this.treeControl.dataNodes[this.nivel6])
                          if(key.length == dimension.length ){
                            // let pos = document.getElementById(dimension)
                            // pos.scrollIntoView();
                            document.getElementById(dimension).click()

                            // this.ver(this.nivel6)
                            this.controlService.closeSpinner(spinner);

                          }

                        }
                        }



                  }, 10000);

                  setTimeout(() => {

                    console.log('dimension')

                    desplegable = JSON.parse(localStorage.getItem('comparar'))



                      for(let i = 0 ; desplegable.length; i++){

                      if(desplegable[i]['key']  === riesgo){

                        console.log(desplegable[i])
                        this.nivel7 = this.nivel6+i+1;
                        // console.log(this.nivel6)
                        this.treeControl.expand(this.treeControl.dataNodes[this.nivel7])
                        if(key.length == riesgo.length ){
                          // let pos = document.getElementById(riesgo)
                          // pos.scrollIntoView();

                          document.getElementById(riesgo).click()
                          document.getElementById(riesgo).focus()
                          // this.ver(this.nivel6)
                          this.controlService.closeSpinner(spinner);

                        }

                      }
                      }


                  }, 12000);

                  setTimeout(() => {

                    console.log('consecuencia')

                    desplegable = JSON.parse(localStorage.getItem('comparar'))



                      for(let i = 0 ; desplegable.length; i++){

                      if(desplegable[i]['key']  === consecuencia){

                        console.log(desplegable[i])
                        this.nivel8 = this.nivel7+i+1;
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

            let pos = document.getElementById(key)
            pos.scrollIntoView()

            this.controlService.closeSpinner(spinner);
          }





          // console.log("entre despues de la bandera")s



 }




  async VerEnviarAprobar() {

    const conf = this.confirm.open(RkpendaprobComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',

      data:
      {
        title: 'Items Rechazados',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar'

      },


    });

    conf.afterClosed()
    .subscribe(async (result) => {
      console.log(result)
      if(result === 'undefined' || result === 'falso'){

        this.cargarDashboard()
      }else{

        if(result){


          // this.recargarArbol()
              setTimeout(() => {
                this.ExpandirNodos(result)

              }, 3000);


        }
      }

    })



  }

  async VerPorAprobar() {

    const conf = this.confirm.open(RkporaprobarComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',

      data:
      {
        title: 'Items Pendientes por Aprobar',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar'

      }

    });

    conf.afterClosed()
    .subscribe(async (result) => {
      console.log(result)
      if(result === 'undefined' || result === 'falso'){

        this.cargarDashboard()
      }else{

        if(result){


          // this.recargarArbol()
              setTimeout(() => {
                this.ExpandirNodos(result)

              }, 3000);


        }
      }

    })



  }

  async VerValidar() {

    const conf = this.confirm.open(RkvalidarComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data:
      {
        title: 'Items pendientes de validación',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar'

      }

    });
    conf.afterClosed()
    .subscribe(async (result) => {
      console.log(result)

        if(result === 'undefined' || result === 'falso'){

          this.cargarDashboard()
        }else{

          if(result){


            // this.recargarArbol()
                setTimeout(() => {
                  this.ExpandirNodos(result)

                }, 3000);


          }
        }

    })



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
    //           //debugger
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
    //         //debugger
    //         console.log(error)
    //         this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet6');
    //       });
    //     });


        this.mostrar();

      }

      async mostrar() {

    switch (this.cargo) {
      case 'NNYNN': //SOLO LECTURA
        this.sololectura = true

        return;




      default:
        break;
    }


  }

  async VerLeyenda(){



    this.confirm.open(LeyendaComponent,{
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data:
      {
        title: 'Informacion',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar'

      }
    });
  }

  statusPadreCopy(statusP,level){

    // debugger

    switch(statusP){
        case '004':
          if(level == 4 ){
            return true
          }else{

            return false;
          }
        case '006':
          if(level == 4 ){
            return true
          }else{

            return false;
          }
        case '007':
          if(level == 4 ){
            return true
          }else{

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
  compararNiveles(nodeto,nodefrom){

    if(nodeto == 1 && nodefrom == 2){
      return true
    }else if(nodeto == 2 && nodefrom == 3){
      return true
    }else if(nodeto == 3 && nodefrom == 4){
      return true

    }else if(nodeto == 4 && nodefrom == 5){
      return true

    }else if(nodeto == 5 && nodefrom == 6){
      return true

    }else if(nodeto == 6 && nodefrom == 7){
      return true

    }else if(nodeto == 7 && nodefrom == 8){
      return true

    }
    else{
      return false
    }
  }

  limpiarCopiado(){
    this.rutaimagen = true;
    this.nodocopiar = ''
    this.nodoPadreBloqueo = ''
    this.mostrarLimpiar = false
  }

  copy(node){


    switch(node.level){

      case 2:
          this.nodoPadreBloqueo = node.key.substring(0,2)

          break
      case 3:
        this.nodoPadreBloqueo = node.key.substring(0,6)
          break
      case 4:
        this.nodoPadreBloqueo = node.key.substring(0,10)
          break
      case 5:
        this.nodoPadreBloqueo = node.key.substring(0,14)
          break
      case 6:
        this.nodoPadreBloqueo = node.key.substring(0,18)
          break
      case 7:
        this.nodoPadreBloqueo = node.key.substring(0,19)
          break
      case 8:
        this.nodoPadreBloqueo = node.key.substring(0,23)
          break

    }

      console.log(this.nodoPadreBloqueo)

    this.rutaimagen = true;
    this.mostrarLimpiar = true

    if(node){
      this.nodocopiar = node
      this.nivelpermitido = node.level - 1
      this.rutaimagen = false;

      this.controlService.snackbarSucces('Jerarquia Copiada');
    }

  }

  paste(node){

    console.log(node)
    console.log(this.nodocopiar)


    let canI = this.compararNiveles(node.level, this.nodocopiar.level)
    let stutuspermitido = this.statusPadreCopy(node.status,node.level);
    this.CopyPaste = node

    if(!canI ){

      Swal2.fire({
        icon:'error',
        title:'Accion No Valida',
        text:'Asegurese que esta intentanto pegar el item en su nivel correspondiente'
      })


    }else{
      if(stutuspermitido){
        Swal2.fire({
          title: 'Copiar/Pegar',
          text: '¿ Seguro que desea Copiar este item ?',
          icon: 'question',
          cancelButtonColor:'red',
          showCancelButton: true,
          cancelButtonText:'Cancelar',



        }).then((result)=>{

          if(result.value){


            this.copiadoJerarquia(node.key,this.nodocopiar.key)

          }
        })

      }else{

        Swal2.fire({
          icon:'error',
          title:'Accion No Valida',
          text:'No se perimten adicionar elementos a items en estatus diferentes a creacion o aprobacion'
        })

      }


    }
  }

  drop(event:CdkDragDrop<string[]>){



    console.log(event)

    let dad =this.dataSource.data[event.currentIndex].key
    let levelto = this.dataSource.data[event.currentIndex].level
    let statusto = this.dataSource.data[event.currentIndex].status
    this.CopyPaste= this.dataSource.data[event.currentIndex]

    let key = event.item.data.key
    let levelfrom = event.item.data.level
    console.log(dad)
    console.log(key)
    console.log(levelto)
    console.log(levelfrom)

    let canI = this.compararNiveles(levelto, levelfrom)
    let stutuspermitido = this.statusPadreCopy(statusto,levelto);

    debugger
    if(!canI ){

      Swal2.fire({
        icon:'error',
        title:'Accion No Valida',
        text:'Asegurese que esta intentanto pegar el item en su nivel correspondiente'
      })


    }else{
      if(stutuspermitido){
        Swal2.fire({
          title: 'Copiar/Pegar',
          text: '¿ Seguro que desea Copiar este item ?',
          icon: 'question',
          cancelButtonColor:'red',
          showCancelButton: true,
          cancelButtonText:'Cancelar',



        }).then((result)=>{

          if(result.value){


            this.copiadoJerarquia(dad,key)

          }
        })

      }else{

        Swal2.fire({
          icon:'error',
          title:'Accion No Valida',
          text:'No se perimten adicionar elementos a items en estatus diferentes a creacion o aprobacion'
        })

      }


    }

  }

  copiadoJerarquia(nodeto:string,nodefrom:string,){

    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'COPIAR_NODO' });
    _atts.push({ name: 'nodoTo', value: nodeto });
    _atts.push({ name: 'nodoFrom', value: nodefrom });



    const spinner = this.controlService.openSpinner();


    const obj =  this.autentication.generic(_atts);

    obj.subscribe((data)=>{

      if (data.success === true) {
        console.log(data)

        if (data.data[0].atts[1]) {
          Swal2.fire({
            text:data.data[0].atts[1].value,
            title:'',
            icon:'success'})
          this.controlService.closeSpinner(spinner);
          // this.autentication.showMessages( data.data[0].atts[0].value, data.data[0].atts[1].value, this.procesoModel, data.redirect);
          this.rutaimagen = true
          this.mostrarLimpiar = false


          this.treeControl.collapse(this.CopyPaste);
          this.treeControl.expand(this.CopyPaste);
        }

      }
      else {
        // data.success = 'I'
        // this.autentication.showMessage(data.success, data.message, this.procesoModel, data.redirect);
        Swal2.fire( '',data.message,'error')

        this.controlService.closeSpinner(spinner);

      }
      this.controlService.closeSpinner(spinner);

    }), (error) => {
      this.controlService.closeSpinner(spinner);

    }
  }



  //cerrar Session al cerrar pestaña



  @HostListener('window:beforeunload', ['$event'])
beforeunloadHandler(event) {
  // //debugger
    this.showDashboard = false
    // localStorage.clear();
    this.autentication.BorrarStorage()
}




}
