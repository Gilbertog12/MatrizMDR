
import { Component, OnInit, Inject, Injectable, Output, EventEmitter, Input, HostBinding, HostListener, Directive } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import { Router } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';

import { NgxLoadingService } from 'ngx-loading';

import Swal from 'sweetAlert';
import { RkmainComponent } from '../rkmain.component';
import Swal2 from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-rkcequip',
  templateUrl: './rkpend.component.html',
  styleUrls: ['./rkpend.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],

})

export class RkpendComponent implements OnInit {

  @Input() Recargar: boolean = false;

  @Output() reload: EventEmitter<String>  = new EventEmitter<String>();

  @Output() Activador = new EventEmitter();

  FechaDesde = '';
  FechaHasta = '';
  FechaDesdeServicio = '';
  FechaHastaServicio = '';
  TotalRegistros: number = 0;
  complete: boolean = false;
  public jerarquia: any;

  public ValidarModel: any = {
    seleccion: '',
    areaId: '',
    Proceso: '',
    subprocesoId: '',
    actividadId: '',
    tareaId: '',
    Dimension: '',
    Riesgo: '',
    Consecuencia: '',

  };

  range = new FormGroup({
    FechaDesde: new FormControl(),
    FechaHasta: new FormControl()
  });

  public href: any = '';
  public aprobacionesList: any[] = [];
  public isLoading = false;
  public pendList: any[] = [];
  public pendList1: any[] = [];
  public status: string;
  valor: string;
  controles: string;
  version: string;
  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public cargo: string;
  public btn: string;
  public ruta: string;
  //
  public administrador = 'administrador';
  public creacion = 'creacion' ;
  public lectura = 'lectura' ;
  public creacionvalidacion = 'creacionvalidacion';
  public validacion = 'Validacion';
  public aprobacion = 'aprobacion';
  public validacionaprobacion = 'validacionaprobacion';
  public creacionaprobacion = 'creacionaprobacion';
  public recargare: boolean = false;
  masterSelected = false;
  EnviarHijos: string;
  permi: boolean;
  MostrarRestaurar: boolean = false;
  ArrAux: string = '';
  rutaJerarquia: any;
  entidadfiltro: any = '';
  soloControles: boolean;
  totalMarcados: number = 0;
  buscar: boolean = false;
  sendSome: boolean = false;
  vArrayKeys: any;
  nodo: any;

  constructor(public dialogRef: MatDialogRef<RkpendComponent>,
              private controlService: ControlsService, private spinner: NgxLoadingService,
              private autentication: AuthenticationService,
              private confirm: MatDialog,
              private router: Router,
              private _Recargarble: ServiciocajasService,

    // public papa :RkmainComponent,

              @Inject(MAT_DIALOG_DATA) public data: any, private cajas: ServiciocajasService) {
      this.data.key,
      this.data.status;
      this.recargar();

      this.mostrar();
      console.log(this.cajas.caja1);
    }

    // tslint:disable-next-line: no-empty
    ngOnInit() {
      // this.comprobarPadre()

      console.log(this.complete);

      // this.MarcarJerarquia('01000200010001','')

  }

  ngOnDestroy() {

  }

  Mostrarbarra() {

    if (this.buscar) {
      this.buscar = true;
     } else {

      this.buscar = true;
    }
  }

  ejecutar() {
    this._Recargarble.Recargar$.emit(true);

  }

  cerrar(mensaje: any) {
    console.log(mensaje);

    // debugger
    if (mensaje !== '' && this.sendSome) {

        this.ejecutar();
        this.dialogRef.close(mensaje);

    } else {
        // if(mensaje === 'undefined'){
          this.dialogRef.close(false);
        // }

    }

  }

  imprime() {
    console.log(this.FechaDesde = this.FechaDesde.split('-').join(''));
    console.log(this.FechaHasta = this.FechaHasta.split('-').join('') );

    // let a = this.FechaDesde.substring(0,4);
    // console.log(a)
    // let b = this.FechaDesde.substring(7,5);
    // console.log
    // let c = this.FechaDesde.substring(8,10);
    // let d = this.FechaHasta.substring(0,4);
    // let e = this.FechaHasta.substring(7,5);
    // let f = this.FechaHasta.substring(8,10);
    // let total=a+b+c

    this.FechaDesdeServicio = this.FechaDesde;

    this.FechaHastaServicio = this.FechaHasta;

  }

  checkUncheckAll() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.pendList.length; i++) {
      this.pendList[i].check = this.masterSelected;
      if (this.masterSelected === true) {
        this.totalMarcados = this.pendList.length;

      } else {
        this.totalMarcados = 0;

      }
    }

  }

   sendvalidate() {

    console.log(this.valor);

    if (this.valor.includes('Y')) {
      // this.autentication.showMessage(false, 'Debe Seleccionar al menos 1 item', {}, false);
      if (this.soloControles) {

        Swal2.fire({
          title: '<strong style="color:red">ADVERTENCIA !</strong>',
          html:
            'La modificación de los controles afecta al Riesgo Residual. ' +
            '<b>Está seguro que desea Enviar a Validar ?</b>',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {

            console.log(this.valor);

            const _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
            _atts.push({ name: 'onlyActualNode', value: 'Y' });
            _atts.push({ name: 'key', value: this.valor });

            const spinner = this.controlService.openSpinner();
            const obj = this.autentication.generic(_atts);

            obj.subscribe(
                        (data) => {

                          debugger;
                          console.log(data['data'][0]['atts'][0]['value']);
                          console.log(data['data'][0]['atts'][0]['name']);
                          console.log(data['data'][0]['atts'][1]['value']);
                          console.log(data['data'][0]['atts'][1]['name']);

                          localStorage.setItem('contadorNotificaciones', this.TotalRegistros.toString());
                          localStorage.setItem('type', data['data'][0]['atts'][0]['value']);
                          localStorage.setItem('valorType', data['data'][0]['atts'][0]['name']);
                          localStorage.setItem('message', data['data'][0]['atts'][1]['value']);
                          localStorage.setItem('valorMessage', data['data'][0]['atts'][1]['name']);

                          if (data.success === true) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                            Swal2.fire('Registro Enviado a Validar', '', 'success' );

                            // localStorage.setItem('isSendToValidate','1')
                            // this.cerrar('falso');
                            this.totalMarcados = 0;
                            this.sendSome = true;
                            this._Recargarble.notificaciones$.emit(true);
                            this.cerrar('cerrar');

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

                    });

      } else {

        Swal2.fire({
          html: '<h3><strong>Enviar a Validar</strong></h3>',

          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {

            console.log(this.valor);

            const _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
            _atts.push({ name: 'onlyActualNode', value: 'Y' });
            _atts.push({ name: 'key', value: this.valor });

            console.log(_atts);

            const spinner = this.controlService.openSpinner();
            const obj = this.autentication.generic(_atts);

            obj.subscribe(
                        (data) => {
                          if (data.success === true) {

                            debugger;
                            console.log(data['data'][0]['atts'][0]['value']);
                            console.log(data['data'][0]['atts'][0]['name']);
                            console.log(data['data'][0]['atts'][1]['value']);
                            console.log(data['data'][0]['atts'][1]['name']);

                            localStorage.setItem('type', data['data'][0]['atts'][0]['value']);
                            localStorage.setItem('valorType', data['data'][0]['atts'][0]['name']);
                            localStorage.setItem('message', data['data'][0]['atts'][1]['value']);
                            localStorage.setItem('valorMessage', data['data'][0]['atts'][1]['name']);
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                            Swal2.fire('Registro Enviado a Validar', '', 'success' );
                            // localStorage.setItem('isSendToValidate','1')
                            // this.cerrar('falso');
                            this.totalMarcados = 0;
                            this.sendSome = true;
                            this._Recargarble.notificaciones$.emit(true);
                            this.cerrar('cerrar');

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

                    });
      }

    } else {
      Swal2.fire('', 'Debe Seleccionar al menos 1 item', 'info');
      return;

    }

  }

//

    MarcarJerarquia(Value, status, chek) {

      const key = Value;
      const Istatus = status;

      if (Istatus === '006' && chek ) {

        this.MostrarRestaurar = true;
      } else {
        this.MostrarRestaurar = false;
      }

      // console.log(Istatus)
      // let entidadActual
      // console.log(key)

      // console.error('Entro al For')
      for (let i = 0; i < this.pendList.length; i++) {
        // console.log(key)

        // console.log(i)
        if (this.pendList[i]['key'].startsWith(key)) {

          if (this.pendList[i]['key'] !== key) {

            if (this.pendList[i]['check'] === false) {

              this.pendList[i]['check'] = true;

              // this.totalMarcados = this.totalMarcados +1;

              // console.log(this.totalMarcados)

              // this.pendList[i]['permiso'] = true

            } else {
              this.pendList[i]['check'] = false;
              if (this.pendList[i]['check'] == false && this.totalMarcados >= 0 ) {

              }

              }
            }

          if (this.pendList[i]['check'] === true) {
              this.totalMarcados = this.totalMarcados + 1;

            } else if (this.pendList[i]['check'] === false && this.totalMarcados > 0) {

              this.totalMarcados = this.totalMarcados - 1;
            }

        }

        }

      console.log(this.totalMarcados);

      this.ArrAux.slice(1);

      }

      isOnlyControl(arreglo) {
        console.log(arreglo = arreglo.split(','));

        for (let i = 0 ; i < arreglo.length; i++) {

          console.log(arreglo);
          if (arreglo[i].includes('CONTROLES')) {
            // console.log('soy solo controles')

            return true;
          } else {
            return false;
          }

        }

      }

      consola(opcion) {
        let total;
        this.valor = '';
        this.controles = '';
        for (let i = 0; i < this.pendList.length; i++) {

        if (this.pendList[i]['check'] === true) {

          this.valor = this.valor + ',' + this.pendList[i]['key'] + ',' + 'Y'  ;
          this.controles = this.controles + ',' + this.pendList[i]['Entidad'];
          this.soloControles = this.isOnlyControl(this.controles.slice(1));

        } else {
          this.valor = this.valor + ',' + this.pendList[i]['key'] + ',' + 'N'  ;

        }

      }
        this.valor = this.valor.slice(1);
        console.log(this.soloControles);

      // AQUI COLOCA EL LLAMADO EL SRVICIIO
        if (opcion === 'enviar a validar') {

        this.sendvalidate();
      } else if (opcion === 'restaurar') {

        this.RestaurarItem();
      }

    }

  async RestaurarItem() {

    if (this.valor === '' || this.valor === 'undefined'  ) {
      // this.autentication.showMessage(false, 'Debe Seleccionaar al menos 1 item', {}, false);
      Swal2.fire({
        icon: 'info',
        text: 'Debe Seleccionaar al menos 1 item',

      });

      return;
    }

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

      const _atts = [];
      _atts.push({ name: 'scriptName', value: 'coemdr' });
      _atts.push({ name: 'action', value: 'ENVIAR_RESTAURAR' });
      _atts.push({ name: 'key', value: this.valor });
      _atts.push({ name: 'accion', value: 'NM' });

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

                                }
                              );
                              this.recargar();
                            }

                          } else {

                              Swal2.fire(
                                {
                                  icon: 'error',
                                  text: data.message,

                                }
                              );

                          // this.autentication.showMessage(data.success, data.message, {}, data.redirect);

                          }
              this.controlService.closeSpinner(spinner);

            }, (error) => {
              this.controlService.closeSpinner(spinner);
            });
          //  this.cerrar('falso');

    }

  }

  convertiFechaYhora(valor) {

    const year = valor.substring(0, 4);
    const mes = valor.substring(4, 6);
    const dia = valor.substring(6, 8);
    const hora = valor.substring(9, 11);
    const min = valor.substring(11, 13);

    const fecha = `${mes}/${dia}/${year}`;
    const time = `${hora}:${min}`;

    return `${fecha} ${time}`;

  }

  obtenerRuta(rutaJerarquia) {

                  const rutaLongitud = rutaJerarquia.length;
                  const ruta = rutaJerarquia;
                  // console.log(ruta)
                  console.group();
                  console.log(rutaLongitud.toString());
                  console.groupEnd();
                  switch (rutaLongitud.toString()) {

                    case '2':
                      this.rutaJerarquia = ruta;
                      console.log(this.rutaJerarquia);
                      break;
                    case '6':
                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6);
                      break;
                    case '10':
                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' + ruta.substring(6, 10);
                      break;
                      case '14':

                      this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' + ruta.substring(6, 10) + '-' + ruta.substring(10, 14);
                      break;
                      case '18':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' + ruta.substring(6, 10) + '-' + ruta.substring(10, 14) + '-' + ruta.substring(14, 18);
                        break;
                      case '19':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' + ruta.substring(6, 10) + '-' + ruta.substring(10, 14) + '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19);
                        break;
                      case '23':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' + ruta.substring(6, 10) + '-' + ruta.substring(10, 14) + '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23);
                        break;
                      case '27':
                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' + ruta.substring(6, 10) + '-' + ruta.substring(10, 14) + '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23) + '-' + ruta.substring(23, 27);
                        break;
                      case '31':

                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' + ruta.substring(6, 10) + '-' + ruta.substring(10, 14) + '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23) + '-' + ruta.substring(23, 27) + '-' + ruta.substring(27, 31);
                        break;
                    }

  }

   recargar() {

    this.pendList = [];
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'PENDIENTE_VALIDAR_LIST' });
    _atts.push({ name: 'status', value: 'EV' });
    _atts.push({ name: 'key', value: this.data.id });
    _atts.push({ name: 'statusItem', value: this.data.status });
    if (this.complete == true) {
      _atts.push({ name: 'showCompleted', value: 'N' });

    } else {
            _atts.push({ name: 'showCompleted', value: 'Y' });

    }

    const spinner = this.controlService.openSpinner();
    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            // console.log("RES:" + JSON.stringify(data));
            console.log(data);
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {

                  // Bloquear Checks
                  // if( parseInt(element.atts[19].value.trim()) == 1 ||  parseInt(element.atts[19].value.trim()) == 2 ||  parseInt(element.atts[19].value.trim()) == 6){
                  //   var StatusTemp = 2
                  // }else{
                  //   var StatusTemp = parseInt(element.atts[19].value.trim())
                  // }
                  // if( parseInt(element.atts[20].value.trim()) == 1 ||  parseInt(element.atts[20].value.trim()) == 2 ||  parseInt(element.atts[20].value.trim()) == 6){
                  //   var StatusTempP = 2
                  // }else{
                  //   var StatusTempP = parseInt(element.atts[20].value.trim())
                  // }

                  // if(StatusTemp < StatusTempP){
                  //   this.permi = true
                  //   // console.log(this.permi)
                  // }else{
                  //   this.permi= false
                  //   // console.log(this.permi)

                  // }

                  const fecha = this.convertiFechaYhora(element.atts[15].value.trim());

                  this.obtenerRuta(element.atts[16].value.trim());

                  this.pendList.push({
                    Accion: element.atts[1].value.trim(),
                    Entidad: element.atts[2].value.trim(),
                    Id: element.atts[3].value.trim(),
                    Descripcion: element.atts[4].value.trim(),
                    Area: element.atts[5].value.trim(),
                    Proceso: element.atts[6].value.trim(),
                    Subproceso: element.atts[7].value.trim(),
                    Actividad: element.atts[8].value.trim(),
                    Tarea: element.atts[9].value.trim(),
                    Dimension: element.atts[10].value.trim(),
                    Riesgo: element.atts[11].value.trim(),
                    Consecuencia: element.atts[12].value.trim(),
                    Controles : element.atts[13].value.trim(),
                    Fecha: fecha,
                    key: element.atts[16].value.trim(),
                    version : element.atts[17].value.trim(),
                    Comentarios : element.atts[18].value.trim(),
                    // permiso: this.permi,
                    check: false,
                    status: element.atts[19].value.trim(),
                    TipoControl: element.atts[21].value,
                    rutaJerarquia: this.rutaJerarquia

                  });

                }

              }

              );

              // this.comprobarPadre()
              console.log([this.pendList]);
              this.crearArrayKeys();
              this.TotalRegistros = this.pendList.length;

              this.controlService.closeSpinner(spinner);
            } else {
              this.controlService.closeSpinner(spinner);
              this.controlService.snackbarError(data.message);
            }
            this.controlService.closeSpinner(spinner);
            return result;
          },
          (error) => {
            this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
          });
        });

    // this.controlService.closeSpinner(spinner);

      }

      // });

  verTable(item: any) {
    // alert(item.ruta.trim().length.toString());
    console.log(item);
    // for (let i = 0; i < this.pendList.length; i++) {

    //   if (this.pendList[i]['key'] === item.key) {
    //     this.jerarquia  = this.pendList[i]['key']

    //   }

    // }

    this.pendList.forEach((element) => {
        if (element.key === item) {

          this.jerarquia = element.key;
        }
    });

    console.log(this.jerarquia);
    switch (this.jerarquia.trim().length.toString()) {

      case '2':
      this.router.navigate(['/rkmain/rka/' + this.jerarquia]);
      this.cerrar(this.jerarquia);

      break;
    case '6':
      console.log('aqui');
      this.router.navigate(['/rkmain/rkp/' + this.jerarquia.substring(0, 2) + '/' + this.jerarquia.substring(2, 6)]);
      this.cerrar(this.jerarquia);
      break;
    case '10':
      this.router.navigate(['/rkmain/rks/' + this.jerarquia.substring(0, 2) + '/' + this.jerarquia.substring(2, 6) + '/' + this.jerarquia.substring(6, 10)]);
      this.cerrar(this.jerarquia);
      break;

      case '14':

        this.router.navigate(['/rkmain/rkc/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14)]);

        this.cerrar(this.jerarquia);
        //

        // window.location.reload()

        break;
      case '18':
        this.router.navigate(['/rkmain/rkt/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18)]);
        this.cerrar( this.jerarquia);

        break;
      case '19':
        this.router.navigate(['/rkmain/rkd/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18) + '/' + item.substring(18, 19)]);
        this.cerrar( this.jerarquia);

        break;
      case '23':
        this.router.navigate(['/rkmain/rkr/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18) + '/' + item.substring(18, 19) + '/' + item.substring(19, 23)]);
        this.cerrar( this.jerarquia);

        break;
      case '27':
        this.router.navigate(['/rkmain/rky/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18) + '/' + item.substring(18, 19) + '/' + item.substring(19, 23) + '/' + item.substring(23, 27)]);
        this.cerrar( this.jerarquia);

        break;
      case '31':
        this.router.navigate(['/rkmain/rky/' + item.substring(0, 2) + '/' + item.substring(2, 6) + '/' + item.substring(6, 10) + '/' + item.substring(10, 14) + '/' + item.substring(14, 18) + '/' + item.substring(18, 19) + '/' + item.substring(19, 23) + '/' + item.substring(23, 27)]);
        this.cerrar( this.jerarquia);

        break;
    }
  }

  async mostrar()  {

    this.cargo = localStorage.getItem('PerfilRkj');

    switch (this.cargo) {
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

  // Nueva Logica para marcado de jerarquia en la tabla
  crearArrayKeys() {
    const keys = [];

    // for(let i = 0 ; i <= this.pendList.length ; i++ ){
    //   keys.push(this.pendList[i]['key']);
    // }

    this.pendList.forEach((element) => {
      keys.push(element.key);

    });
    // console.log(keys);
    return keys;
  }

  marcar(key) {
  
  const vLargo = [2, 6, 10, 14, 18, 19, 23, 27, 31]; // Array para el largo de los 9 niveles area-->control
  const vKeys = this.crearArrayKeys(); // Array de todos los KEY que retornó el Json
  const qKeys = vKeys.length; // Cantidad de KEY que retornó el Jdon
  let nodoMarcado = ''; // Cual nodo marcó el usuario
  let nivel = 0;   //                                         ' Nivel (area-->control) del nodo marcado
  const vPadre = [];  //
  nodoMarcado = this.buscarMarca(key); //                               ' Obtener el nodo que marcó el usuario
  nivel = this.buscarNivel(nodoMarcado); //                        ' Determinar nivel del nodo basado en su largo
  this.armarPadres(nodoMarcado, vLargo, vPadre); //                  ' Armar nodos padres
  this.marcarPadres(vKeys, qKeys, vPadre, nivel);  //                ' Marcar nodos padre
  // debugger                                //  ' KEY a buscar como padre, abuelo, bisabuelo del nodo marcado
  this.marcarHijosTodos(vKeys, qKeys, vLargo, nodoMarcado, nivel);
  }


  buscarMarca(key?) {

    for ( let i = 0 ; i <=  this.pendList.length; i++) {
          if ( this.pendList[i]['key'] === key ) {
              console.log(this.pendList[i]['key']);
              return this.pendList[i]['key'];
          }

    }

  }

buscarNivel(key) {
  console.log('entre a buscar el nivel');
  switch (key.length) {
      case 2 :
        return 0;
      case 6 :
        return 1;
      case 10 :
        return 2;
      case 14 :
        return 3;
      case 18 :
        return 4;
      case 19 :
        return 5;
      case 23 :
        return 6;
      case 27 :
        return 7;
      case 31 :
        return 8;

  }
}

armarPadres(nodomarcado, largo, padre) {
  //  Notar que marco los 9 niveles (0..8) para evitar algún NULL en el arreglo vPadre
  console.log('entre a armarPadres');
  for( let i = 0 ; i<= 8 ; i++) {
    padre[i] = nodomarcado.substring(0, largo[i]);
    }
}

marcarPadres(vKeys, qKeys, vPadre, nivel) {
  console.log('entre a marcarPadres');

  // ' Marcar todos los padres, abuelos (jerarquía ascendente)
  // ' Si el nodo marcado fuera un AREA, no tiene padres, nada que buscar hacia arriba

  if(nivel > 0) {
    let padre = '';
    for( let i = 0 ; i <= nivel - 1 ; i++){
        padre = vPadre[i];

        let seguir = true;
    let j = 0;
    while(seguir){
      if(j > qKeys){
        seguir = false;
      }else if(vKeys[j] == padre){
        // debugger
        
        this.pendList[j]['check'] = true;

      }
      j = j + 1 ;
    }
    }
    
  }


}
marcarHijosTodos(vKeys, qKeys, vLargo, nodoMarcado, nivel){

  console.log('entre a marcarHijosTodos');
  // console.log(vKeys)
  let VkeysArray = [];
  vKeys.forEach( (element) => {
    VkeysArray.push(element);
  });
  let hijo = '' ;
  let largo = 0 ;
  if(nivel < 8 ){
    this.vArrayKeys = VkeysArray;
    hijo = nodoMarcado;
    largo = vLargo[nivel];
    hijo = hijo.substring(0,largo) ;
    debugger
    console.log(hijo);
    let j = 0;
    let seguir = true;
    while( seguir){
      
      // console.log(this.vArrayKeys);
      // console.log(VkeysArray);
      if( j > qKeys ){
        seguir = false;
      }else{

        console.log(this.vArrayKeys[j]);
        debugger;
        this.nodo = this.vArrayKeys[j];
        console.log(this.nodo);
        console.log(largo);
        if( this.nodo.length > largo) {
          if(this.nodo.substring(0,largo) === hijo) {
            debugger;
            this.pendList[j]['check'] = true;
          }
        }
      }
      j = j + 1;
    }
  }
}
}
