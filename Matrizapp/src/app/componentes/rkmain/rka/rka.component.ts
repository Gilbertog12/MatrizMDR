import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService, ServiciocajasService } from '../../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkpendComponent } from '../rkpend/rkpend.component';
import { RkpendaprobComponent } from '../rkpendaprob/rkpendaprob.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { RkReasonRejectComponent } from '../../../rk-reason-reject/rk-reason-reject.component';
import { RkarchivarComponent } from '../../../rkmain/rkarchivar/rkarchivar.component';

import Swal2 from 'sweetalert2';
import swal from 'sweetalert';
import { MatDialog } from '@angular/material';
import { RkmainComponent } from '../rkmain.component';
import { CajasdashboardComponent } from '../../../rkmain/cajasdashboard/cajasdashboard.component';
import { async } from '@angular/core/testing';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rka',
  templateUrl: './rka.component.html',
  styleUrls: ['./rka.component.scss']
})
export class RkaComponent implements OnInit {

  public areaModel: any = {

  };

  public administrador = 'administrador';
  public creacion = 'creacion' ;
  public lectura = 'lectura' ;
  public creacionvalidacion = 'creacionvalidacion';
  public validacion = 'Validacion';
  public aprobacion = 'aprobacion';
  public validacionaprobacion = 'validacionaprobacion';
  creacionaprobacion = 'creacionaprobacion';
  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public cargo: string;
  public btn: string;

public key: string;
public version: string;
public Razon: string;

  public procesosList: any[] = [];
  public procesosListLectura: any[] = [];
  private id: string;
  EnviarHijos: string;
  public papa: RkmainComponent;
  permisoValidar: any;
  loading: boolean;
  type: string;
  valorType: string;
  message: string;
  valorMessage: string;
  arrayPrueba: any;
  llaves: string[] = [];
  allow: string;
  boton: string;
  vueltas: number;
  contador2: any;
  contador1: any;
  uid: any;

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private Cajas: ServiciocajasService) {

                // console.log('ante del obtener el perfil')
                // this.aperfil()

                this.route.params.subscribe( (params) => {
                  this.id = params['id'];
                  this.areaModel = {};
                  this.procesosList = [];
                  this.ver(this.id);

                });

              }

  ngOnInit() {
    localStorage.setItem('isSendToValidate', '0');
    localStorage.setItem('UltimoEnviado', this.id);
    // this.cargarRiesgo()

    this.Cajas.RecargarDetalle$.subscribe((resp) => {
      if (resp) {
        // this.areaModel = {};
        this.procesosList = [];
        this.procesosListLectura = [];
        this.cargarRiesgo();

      }
    });

    this.Cajas.notificaciones$.subscribe((resp) => {
      this.activarNotificaciones();
       });

  }

  async ver(areaId: string) {

    this.permisoValidar = localStorage.getItem('canAdd');

    if (this.permisoValidar === 'Y') {

      this.permisoValidar = true;
    } else {
      this.permisoValidar = false;
    }
    // console.log(this.permisoValidar)

    const _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'AREA_READ'});
    _atts.push({ name: 'areaId', value: areaId });

    const spinner = this.controlService.openSpinner();

    const promiseView = new Promise((resolve, reject) => {

      try {
        this.autentication.generic(_atts)
        .subscribe(

          (data) => {
            const result = data.success;
            console.log(data);
            if (result) {

              this.allow = localStorage.getItem('allow');

              // console.info('aqui esta el cambio')
              data.data.forEach( (element) => {
                if ( element.atts.length > 0) {
                  // console.log(element.atts[0].value)
                  if ( element.atts[0].value === '0'   ) {

                    

                    this.areaModel = {
                      offset: data.data[0].atts[0].value,
                      areaId: data.data[0].atts[1].value,
                      areaDescripcion: data.data[0].atts[2].value,
                      areaDescripcionExt: data.data[0].atts[3].value,
                      areaPosicion: data.data[0].atts[4].value,
                      areaPosicionDesc: data.data[0].atts[5].value,
                      areaIdClasificacion: data.data[0].atts[6].value,
                      areaDescClasificacion: data.data[0].atts[7].value,
                      areaRiesgoPuroDesc: data.data[0].atts[8].value,
                      areaRiesgoResidualDesc: data.data[0].atts[9].value,
                      areaStatus: data.data[0].atts[10].value,
                      areaVersion: data.data[0].atts[11].value,
                      // areaNivel: data.data[0].atts[12].value,
                      // areaAtributos: data.data[0].atts[13].value,
                      areaStatusId: data.data[0].atts[14].value,
                      key: data.data[0].atts[15].value,
                      statusParent: data.data[0].atts[16].value,
                      CanAdd: data.data[0].atts[17].value,
                      CanModify: data.data[0].atts[18].value,

                    };

                    localStorage.setItem('keySelected', this.areaModel.key);
                    localStorage.setItem('versionSelected', this.areaModel.areaVersion);
                    localStorage.setItem('statusSelected', this.areaModel.areaStatusId);

                  } else {
                    // console.log(data)
                    // console.log(element.atts[9].value )
                    if ( element.atts[9].value === '008' && this.btn === 'lectura' ) {
                      console.log('aqui');
                      this.procesosListLectura.push({

                      offset: element.atts[0].value,
                      Id: element.atts[1].value.trim(),
                      Descripcion: element.atts[2].value,
                      procesoRiesgoPuroN: element.atts[3].value,
                      procesoRiesgoPuroM: element.atts[4].value,
                      procesoRiesgoPuroS: element.atts[5].value,
                      procesoRiesgoResidualN: element.atts[6].value,
                      procesoRiesgoResidualM: element.atts[7].value,
                      procesoRiesgoResidualS: element.atts[8].value,
                      estado: element.atts[9].value
                    });
                    } else {
                      // console.log("No Soy SOLOLectura")
                      this.procesosList.push({

                      offset: element.atts[0].value,
                      Id: element.atts[1].value.trim(),
                      Descripcion: element.atts[2].value,
                      procesoRiesgoPuroN: element.atts[3].value,
                      procesoRiesgoPuroM: element.atts[4].value,
                      procesoRiesgoPuroS: element.atts[5].value,
                      procesoRiesgoResidualN: element.atts[6].value,
                      procesoRiesgoResidualM: element.atts[7].value,
                      procesoRiesgoResidualS: element.atts[8].value,
                      estado: element.atts[9].value,
                      pendingDelete: element.atts[11].value

                    });
                    }
                  }
                }
              });

              const parameters = [ this.allow , this.areaModel.areaStatusId , this.areaModel.CanAdd ];
              this.boton = this.autentication.botonesFlujoAprobacion(parameters);
              this.cargarRiesgo();

            } else {
                if (data.bypass === '1') {

                  this.controlService.closeSpinner(spinner);

                } else {
                  this.controlService.closeSpinner(spinner);
                  this.autentication.showMessage(data.success, data.message, this.areaModel, data.redirect);

                }
              }
              // this.controlService.closeSpinner(spinner);
            console.log(result);
            return result;
            },
            (error) => {
              // debugger
          console.log(error);
          this.controlService.closeSpinner(spinner);
          this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.areaModel, false);
        });

      } catch (error) {
        console.log(reject);
      }
    });
    // this.controlService.closeSpinner(spinner);

  }

  cargarRiesgo() {

    this.loading = true;
    this.procesosList = [];
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'ITEM_EVALRISK_DETAIL_READ' });
    _atts.push({ name: 'key', value:  this.id });

    const spinner = this.controlService.openSpinner();
    const obj =  this.autentication.generic(_atts);

    obj.subscribe((data) => {

      if (data.success === true) {

        console.log(data);

        data.data.forEach((element) => {

          if(  element.atts[9].value !== '010'){

            this.procesosList.push({
              offset: element.atts[0].value,
              Id: element.atts[1].value.trim(),
              Descripcion: element.atts[2].value,
              procesoRiesgoPuroN: element.atts[3].value,
              procesoRiesgoPuroM: element.atts[4].value,
              procesoRiesgoPuroS: element.atts[5].value,
              procesoRiesgoResidualN: element.atts[6].value,
              procesoRiesgoResidualM: element.atts[7].value,
              procesoRiesgoResidualS: element.atts[8].value,
              estado: element.atts[9].value,
              pendingDelete: element.atts[11].value
            });

          }

         

        });

        this.loading = false;
        this.controlService.closeSpinner(spinner);

      } else {
        this.controlService.closeSpinner(spinner);

        this.loading = false;
      }
    });

    // this.loading = false
  }

   async Caja(key, status) {

      switch (status) {

        case '004':

              this.VerRkvalidarC(key);
              break;

        case '007':
          this.VerRkporaprobar(key);

          break;

          default:
            this.VerCajasdashboard(key);

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

            if ( element.atts[0].name === 'uuid'){
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
    this.autentication.generarReporte(this.areaModel.key)
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
