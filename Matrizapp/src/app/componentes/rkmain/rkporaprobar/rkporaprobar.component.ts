import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import Swal2 from 'sweetalert2';
import Swal from 'sweetalert';
import { includes } from 'core-js/fn/array';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';

@Component({
  selector: 'app-rkporaprobar',
  templateUrl: './rkporaprobar.component.html',
  styleUrls: ['./rkporaprobar.component.scss']
})
export class RkporaprobarComponent implements OnInit {

  Razon: string;
  filtro1 = '';
  FechaDesde = '';
  FechaDesdeServicio = '';
  FechaHastaServicio = '';
  FechaHasta = '';
  public jerarquia: any;
  EnviarHijos: string;
  aprobar = 'aprobar';
  rechazar = 'rechazar';
  permi: boolean;
  rutaJerarquia: any;
  controles: string;
  soloControles: boolean;
  comments: string = '';
  entidadfiltro: string = '';
  TotalRegistros: number = 0;
  totalMarcados: number = 0;
  sendSome: boolean = false;
  nodoseleccionado: string;

  vArrayKeys: any;
  nodo: any;
  bloquearNodos: boolean = false;

  constructor(public dialogRef: MatDialogRef<RkporaprobarComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              private confirm: MatDialog,
              private router: Router,
              private _Recargarble: ServiciocajasService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      this.data.key,
      this.data.status;
      this.recargar();
      this.mostrar();
  }

  ngOnInit() {

    this.nodoseleccionado = localStorage.getItem('itemseleccionado');

  }
  public pendList: any[] = [];
  masterSelected = false;
  valor: string;
  version: string;
  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public cargo: string;
  public btn: string;
  complete: boolean = false;
  //
  public administrador = 'administrador';
  public creacion = 'creacion' ;
  public lectura = 'lectura' ;
  public creacionvalidacion = 'creacionvalidacion';
  public validacion = 'Validacion';
  public aprobacion = 'aprobacion';
  public validacionaprobacion = 'validacionaprobacion';
  creacionaprobacion = 'creacionaprobacion';

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
    _atts.push({ name: 'status', value: 'IA' });
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
            console.log(data);
            const result = data.success;
            if (result) {

              debugger;
              console.log(data.data.length);
              if (data.data.length > 0) {

                if (data.data[0].atts[0].name === 'TIMEOUT') {
                  // debugger
                  this.controlService.closeSpinner(spinner);

                  Swal2.fire({
                    icon: 'info',
                    text: `Numero de items en Validación/Construcción excedido: ${data.data[0].atts[0].value.trim()} ,bajar de nivel en la jerarquía`

                  }).then((resultado) => {
                    if (resultado.value) {

                      this.dialogRef.close(true);
                    }
                  });

                  return;

                }
                if ( data.data.length > 3000 ) {
                  return Swal2.fire({
                    title: 'Limite de visualizacion excedido',
                    text : 'si desea validar la informacion baje un nivel',
                  });
                }
                data.data.forEach((element) => {

                  if (element.atts.length > 0) {

                    const fecha = this.convertiFechaYhora(element.atts[5].value.trim());

                    this.obtenerRuta(element.atts[6].value.trim());
                    let jerarquiaMapeada = this.autentication.getJerarquia(element.atts[6].value.trim())
                    this.pendList.push({
                      Accion: element.atts[1].value.trim(),
                      Entidad: element.atts[2].value.trim(),
                      Id: element.atts[3].value.trim(),
                      Descripcion: element.atts[4].value.trim(),
                      key: element.atts[6].value.trim(),
                      version : element.atts[7].value.trim(),
                      Fecha: fecha,
                      Comentarios : element.atts[8].value.trim(),
                      status: element.atts[9].value.trim(),
                      check: false,
                      bloqueo : false,
                      jerarquia : jerarquiaMapeada
                      // Area: element.atts[5].value.trim(),
                      // Proceso: element.atts[6].value.trim(),
                      // Subproceso: element.atts[7].value.trim(),
                      // Actividad: element.atts[8].value.trim(),
                      // Tarea: element.atts[9].value.trim(),
                      // Dimension: element.atts[10].value.trim(),
                      // Riesgo: element.atts[11].value.trim(),
                      // Consecuencia: element.atts[12].value.trim(),
                      // Controles : element.atts[13].value.trim(),
                      // permiso: this.permi,
                      // TipoControl: element.atts[21].value,
                      // rutaJerarquia: this.rutaJerarquia,

                    });

                  }

                }

                );

                console.log([this.pendList]);

                this.TotalRegistros = this.pendList.length;
                this.controlService.closeSpinner(spinner);
              } else {

                this.controlService.closeSpinner(spinner);
                this.dialogRef.close(false);
                // this.mostrarMensaje();

              }

              // this.comprobarPadre()

            } else {
              this.controlService.closeSpinner(spinner);
              this.controlService.snackbarError(data.message);
            }
            // this.controlService.closeSpinner(spinner);
            return result;
          },
          (error) => {
            this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
          });
        });
        // this.controlService.closeSpinner(spinner);

      }

      imprime() {
    console.log(this.FechaDesde = this.FechaDesde.split('-').join(''));
    console.log(this.FechaHasta = this.FechaHasta.split('-').join('') );

    this.FechaDesdeServicio = this.FechaDesde;

    this.FechaHastaServicio = this.FechaHasta;

  }

  Filtrar() {
    this.pendList = [];
    this.imprime();

    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'PENDIENTE_VALIDAR_LIST' });
    _atts.push({ name: 'status', value: 'IA' });
    if (this.complete == true) {
      _atts.push({ name: 'showCompleted', value: 'N' });

    } else {
            _atts.push({ name: 'showCompleted', value: 'Y' });

    }
    _atts.push({ name: 'startDate', value: this.FechaDesdeServicio });
    _atts.push({ name: 'endDate', value: this.FechaHastaServicio });

    const spinner = this.controlService.openSpinner();
    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data);
            const result = data.success;
            if (result) {
              // console.log(data)

              data.data.forEach((element) => {
                if (element.atts.length > 0) {

                  const rutaLongitud = element.atts[16].value.trim().length;
                  const ruta = element.atts[16].value.trim();
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

                        this.rutaJerarquia = ruta.substring(0, 2) + '-' + ruta.substring(2, 6) + '-' + ruta.substring(6, 10) + '-' + ruta.substring(10, 14) + '-' + ruta.substring(14, 18) + '-' + ruta.substring(18, 19) + '-' + ruta.substring(19, 23) + '-' + ruta.substring(23, 27) + '-' + element.atts[21].value.trim() + ruta.substring(28, 31);
                        break;
                    }

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
                    Fecha: element.atts[15].value.trim(),
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
              this.TotalRegistros = this.pendList.length;

              this.controlService.closeSpinner(spinner);
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

 MarcarJerarquia(Value, status, chek) {

    const key = Value;
    const Istatus = status;

    // console.log(Istatus)
    // let entidadActual
    // console.log(key)

    // console.error('Entro al For')
    for (let i = 0; i < this.pendList.length; i++) {
      // console.log(key)

      // console.log(i)
      if (this.pendList[i]['key'].startsWith(key)) {

        if (this.pendList[i]['key'] !== key) {

          if (this.pendList[i]['check'] == false) {

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

        if (this.pendList[i]['check'] == true) {
            this.totalMarcados = this.totalMarcados + 1;

          } else if (this.pendList[i]['check'] == false && this.totalMarcados > 0) {

            this.totalMarcados = this.totalMarcados - 1;
          }

      }

      }

    console.log(this.totalMarcados);

    }

    ejecutar() {
      this._Recargarble.RecargarDetalle$.emit(true);
    }

    cerrar(mensaje: any) {
      // console.log(mensaje)

      if (mensaje !== '' && this.sendSome ) {

          this.ejecutar();
          this.dialogRef.close(mensaje);

        //   this.router.navigate(['/rkmain/cargando']);
        //   setTimeout(() => {
        // this.router.navigate(['/rkmain/' + this.nodoseleccionado]);

      // }, 1000);

      } else {

        // this.ejecutar();
        this.dialogRef.close(false);
      //

      }

    }

    checkUncheckAll() {
      // tslint:disable-next-line: prefer-for-of
      this.totalMarcados = 0;
      for (let i = 0; i < this.pendList.length; i++) {
        this.pendList[i].check = this.masterSelected;
        this.pendList[i].bloqueo = true;
        if (this.masterSelected === true) {
          this.totalMarcados = this.pendList.length;

        } else {
          this.totalMarcados = 0;
          this.pendList[i].bloqueo = false;
        }
      }

    }

  async sendvalidate() {


    if ( this.totalMarcados > 1000) {

      return Swal2.fire({
          icon: 'info',
          text : 'la cantidad de items que esta intentando enviar a validar excede el limite deben ser menores o iguales a 1000',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
      });
    }

    if (this.valor.includes('Y')) {
      // this.autentication.showMessage(false, 'Debe Seleccionar al menos 1 item', {}, false);

      if (this.soloControles) {

        Swal2.fire({
          title: '<strong style="color:red">ADVERTENCIA !</strong>',
          html:
            'La modificación de los controles afecta al Riesgo Residual. ' +
            '<b>Está seguro que desea continuar?</b>',
          icon: 'warning',
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
            _atts.push({ name: 'key', value: this.valor });

            const spinner = this.controlService.openSpinner();
            const obj = this.autentication.generic(_atts);

            obj.subscribe(
                        (data) => {
                          if (data.success === true) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                            this.mostrarMensaje();
                            // this.cerrar('falso');
                            this.sendSome = true;
                            this.totalMarcados = 0;

                            // this.recargar()

                            this._Recargarble.notificaciones$.emit(true);
                            ////this.recargaArbol();
                            this.dialogRef.close(false);

                          } else {
                            // this.autentication.showMesage(data.success, data.message, {}, data.redirect);
                            Swal2.fire('', data.message, 'error');
                          }

                          this.controlService.closeSpinner(spinner);

                        },
                        (error) => {
                          // if ( error.status === 401 ) { this.autentication.logout(); return; }
                          this.controlService.closeSpinner(spinner);
                        });
            this.controlService.closeSpinner(spinner);
                      }

          });

      } else {

        Swal2.fire({
          html: '<h3><strong>Aprobar</strong></h3>',
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
            _atts.push({ name: 'key', value: this.valor });

            const spinner = this.controlService.openSpinner();
            const obj = this.autentication.generic(_atts);

            obj.subscribe(
                        (data) => {
                          if (data.success === true) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                            this.mostrarMensaje();
                            // this.cerrar('falso');
                            this.totalMarcados = 0;
                            // this.recargar()
                            this._Recargarble.notificaciones$.emit(true);
                            ////this.recargaArbol();
                            this.dialogRef.close(false);

                          } else {
                            // this.autentication.showMesage(data.success, data.message, {}, data.redirect);
                            Swal2.fire('', data.message, 'error');
                          }

                          this.controlService.closeSpinner(spinner);

                        },
                        (error) => {
                          // if ( error.status === 401 ) { this.autentication.logout(); return; }
                          this.controlService.closeSpinner(spinner);
                        });
            this.controlService.closeSpinner(spinner);
                      }

                    });
      }
    } else {
      Swal2.fire('', 'Debe Seleccionar al menos 1 item', 'info');
      return;

    }

  }

  aperfil() {
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'SESSION' });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            // console.log("RES:" + JSON.stringify(data));
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

                if (this.admin === 'Y') {
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

      default:
        break;
    }

  }

  ActivarFuncion() {

    setTimeout(function() { location.reload(); }, 500);

}

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
      this.cerrar( this.jerarquia.substring(0, 27));

      break;
  }
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

  consola(accion: string) {
    this.valor = '';
    this.version = '';
    this.controles = '';
    for (let i = 0; i < this.pendList.length; i++) {

      if (this.pendList[i]['check'] === true) {
          this.valor = this.valor + ',' + this.pendList[i]['key'] + ',' + 'Y'  ;
          this.version = this.version + ',' + this.pendList[i]['version'];
          this.comments = this.comments + '^~|' + this.pendList[i]['Comentarios'];
          this.controles = this.controles + ',' + this.pendList[i]['Entidad'];
          this.soloControles = this.isOnlyControl(this.controles.slice(1));

      } else {
        this.valor = this.valor + ',' + this.pendList[i]['key'] + ',' + 'N'  ;

      }

    }
    console.log(this.valor = this.valor.slice(1));
    console.log(this.version = this.version.slice(1));
    this.comments = this.comments.slice(3);

    console.log(this.valor);
    // AQUI COLOCA EL LLAMADO EL SRVICIIO

    if (accion === 'aprobar') {

      this.sendvalidate();

    } else {
       this.Rechazar();
    }

  }

  Rechazar() {
    if (this.valor.includes('Y')) {
      // this.autentication.showMessage(false, 'Debe Seleccionaar al menos 1 item', {}, false);

      localStorage.setItem('Llave', this.valor);
      localStorage.setItem('VersionL', this.version);

      if (this.soloControles) {

        Swal2.fire({

          title: '<strong style="color:red">ADVERTENCIA !</strong>',
          html:
            'La modificación de los controles afecta al Riesgo Residual. ' +
            '<b>Está seguro que desea continuar?</b>',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33'

        }).then(async (result) => {
            if (result.value) {

              // const conf = this.confirm.open(RkReasonRejectComponent,{
              //   hasBackdrop: true,
              //   height: 'auto',
              //   width: 'auto',
              //   data: {
              //     title: 'Razón de Rechazo',
              //     button_confirm: 'Aceptar',
              //     button_close: 'Cancelar'
              //   }
              // });
              // conf.afterClosed().subscribe(async(result)=>{
              //   // this.cerrar('falso');
              // })

              const _atts = [];
              _atts.push({ name: 'scriptName', value: 'coemdr'});
              _atts.push({ name: 'action', value: 'VALIDATE'});
              _atts.push({ name: 'key', value: this.valor });
              _atts.push({ name: 'version', value: this.version});
              _atts.push({ name: 'approveInd', value: 'U' });
              // _atts.push({ name: 'isValidatingFromTree', value: this.isValidatingFromTree });
              _atts.push({ name: 'comments', value: this.comments });
              const spinner = this.controlService.openSpinner();
              const obj = await this.autentication.generic(_atts);

              obj.subscribe(

                (data) => {
                  if (data.success === true) {
                    // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                    this.mostrarMensaje();
                    // this.cerrar('falso');
                    this.sendSome = true;
                    this.totalMarcados = 0;

                    // this.recargar()

                    this._Recargarble.notificaciones$.emit(true);
                    ////this.recargaArbol();
                    this.dialogRef.close(false);

                  } else {
                    // this.autentication.showMesage(data.success, data.message, {}, data.redirect);
                    Swal2.fire('', data.message, 'error');
                  }

                  this.controlService.closeSpinner(spinner);

                },
                (error) => {
                  // if ( error.status === 401 ) { this.autentication.logout(); return; }
                  this.controlService.closeSpinner(spinner);
                });
              this.controlService.closeSpinner(spinner);
              }
        });

      } else {

        Swal2.fire({

          title: 'Rechazar Aprobacion',
          text: 'Se procederá a RECHAZAR el(los) Registro(s) seleccionado(s)',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33'

        }).then(async (result) => {
            if (result.value) {

              /*const conf = this.confirm.open(RkReasonRejectComponent,{
                hasBackdrop: true,
                height: 'auto',
                width: 'auto',
                data: {
                  title: 'Razón de Rechazo',
                  button_confirm: 'Aceptar',
                  button_close: 'Cancelar'
                }
              });
              conf.afterClosed().subscribe(async(result)=>{
                // this.cerrar('falso');
              })*/
              const _atts = [];
              _atts.push({ name: 'scriptName', value: 'coemdr'});
              _atts.push({ name: 'action', value: 'VALIDATE'});
              _atts.push({ name: 'key', value: this.valor });
              _atts.push({ name: 'version', value: this.version});
              _atts.push({ name: 'approveInd', value: 'U' });
      // _atts.push({ name: 'isValidatingFromTree', value: this.isValidatingFromTree });
              _atts.push({ name: 'comments', value: this.comments });
              const spinner = this.controlService.openSpinner();
              const obj = await this.autentication.generic(_atts);

              obj.subscribe(

                (data) => {
                  if (data.success === true) {
                    // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);

                    // Swal2.fire('Registro Aprobado', '', 'success' );
                    this.mostrarMensaje();
                    // this.cerrar('falso');
                    this.sendSome = true;
                    this.totalMarcados = 0;

                    // this.recargar()

                    this._Recargarble.notificaciones$.emit(true);
                    ////this.recargaArbol();
                    // this.cerrar('cerrar');
                    this.dialogRef.close(false);

                  } else {
                    // this.autentication.showMesage(data.success, data.message, {}, data.redirect);
                    Swal2.fire('', data.message, 'error');
                  }

                  this.controlService.closeSpinner(spinner);

                },
                (error) => {
                  // if ( error.status === 401 ) { this.autentication.logout(); return; }
                  this.controlService.closeSpinner(spinner);
                });
              this.controlService.closeSpinner(spinner);
              }
    });
  }

    } else {

      Swal2.fire('', 'Debe Seleccionar al menos 1 item', 'info');
      return;
    }

   }

   // Nueva Logica para marcado de jerarquia en la tabla
   marcar(key) {

    this.bloquearNodos = true;
    console.log(this.bloquearNodos);
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
    this.contarMarcados();
    }

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

    buscarMarca(key?) {

      for ( let i = 0 ; i <=  this.pendList.length; i++) {
            if ( this.pendList[i]['key'] === key ) {
                // console.log(this.pendList[i]['key']);
                this.pendList[i]['bloqueo'] = true;
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
    for ( let i = 0 ; i <= 8 ; i++) {
      padre[i] = nodomarcado.substring(0, largo[i]);
      }
  }

  marcarPadres(vKeys, qKeys, vPadre, nivel) {
    console.log('entre a marcarPadres');

    // ' Marcar todos los padres, abuelos (jerarquía ascendente)
    // ' Si el nodo marcado fuera un AREA, no tiene padres, nada que buscar hacia arriba

    if (nivel > 0) {
      let padre = '';
      for ( let i = 0 ; i <= nivel - 1 ; i++) {
          padre = vPadre[i];

          let seguir = true;
          let j = 0;
          while (seguir) {
        if (j > qKeys) {
          seguir = false;
        } else if (vKeys[j] === padre) {
          // debugger

          this.pendList[j]['check'] = true;
          this.pendList[j]['bloqueo'] = true;

        }
        j = j + 1 ;
      }
      }

    }

  }
  marcarHijosTodos(vKeys, qKeys, vLargo, nodoMarcado, nivel) {

    console.log('entre a marcarHijosTodos');
    // console.log(vKeys)
    const VkeysArray = [];
    vKeys.forEach( (element) => {
      VkeysArray.push(element);
    });
    let hijo = '' ;
    let largo = 0 ;
    if (nivel < 8 ) {
      this.vArrayKeys = VkeysArray;
      hijo = nodoMarcado;
      largo = vLargo[nivel];
      hijo = hijo.substring(0, largo) ;
      // debugger;
      // console.log(hijo);
      let j = 0;
      let seguir = true;
      while ( seguir) {

        // console.log(this.vArrayKeys);
        // console.log(VkeysArray);
        if ( j > qKeys ) {
          seguir = false;
        } else {

          // console.log(this.vArrayKeys[j]);
          // debugger;
          this.nodo = this.vArrayKeys[j];
          // console.log(this.nodo);
          // console.log(largo);
          if (this.nodo ===  undefined) {
              return;
          } else {

            if ( this.nodo.length > largo) {

              if (this.nodo.substring(0, largo) === hijo) {
                // debugger;
                this.pendList[j]['check'] = true;
                this.pendList[j]['bloqueo'] = true;
              }
            }
          }
        }
        j = j + 1;
      }
    }
  }

  restablerSeleccion() {
    this.bloquearNodos = false;
    for (let i = 0; i < this.pendList.length; i++) {
      this.pendList[i].check = false;
      this.pendList[i].bloqueo = false;
      this.totalMarcados = 0 ;
      if (this.masterSelected === true) {
          this.masterSelected = false;
      }
    }
  }

  contarMarcados() {

    this.totalMarcados = 0;
    this.pendList.forEach( (contar) => {
      if (contar.check) {
        this.totalMarcados++;
      }
    });

  }

  /* =============================== Fin Logica Marcado ========================================================*/

  /* ================================= Inicio Emitir Señal para Recargar Arbol ========================================*/
recargaArbol() {
  this._Recargarble.arbol$.emit([true, this.data.id]);
  // this.dialogRef.close(false);
}

/* ================================= Fin Emitir Señal para Recargar Arbol ========================================*/

mostrarMensaje() {
  Swal2.fire({
    title: 'Aprobación en Proceso',
    text: 'Verifique en el icono de notificaciones, que la solicitud ha sido ejecutada exitosamente',
    imageUrl: 'assets/images/notificacion.png',
    imageWidth: 150,
  imageHeight: 150,
    imageAlt: 'Notificacion',
  });

  this.router.navigate(['/rkmain']);

}

}
