import { Component, OnInit, inject, Inject } from '@angular/core';
import { AuthenticationService, ControlsService,ServiciocajasService } from '../../shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RkpendaprobComponent } from '../../componentes/rkmain/rkpendaprob/rkpendaprob.component';
import { RkpendComponent } from '../../componentes/rkmain/rkpend/rkpend.component';
import { Router } from '@angular/router';
import Swal2 from 'sweetalert2';


@Component({
  selector: 'app-cajasdashboard',
  templateUrl: './cajasdashboard.component.html',
  styleUrls: ['./cajasdashboard.component.scss']
})
export class CajasdashboardComponent implements OnInit {

  public nodoseleccionado: string;

  public dashboardData: any = {
    ENVIAR_A_VALIDAR: 0,
    ENVIAR_A_VALIDAR_CONSTRUCCION: 0,
    RECHAZADO: 0,
    POR_VALIDAR: 0,
    POR_APROBAR: 0,
    pendientes : '    ITEMS PENDIENTES ENVIAR VALIDAR   ',
    construccion : '    ITEMS EN CONSTRUCCION   '
  };
  prueba: any;
  mostrar: boolean = false;
  llaves: string[] = [];

  constructor(private autentication: AuthenticationService,
              private confirm: MatDialog ,
              private router: Router,
              private Cajas: ServiciocajasService,
              private controlService: ControlsService,
              public dialogRef: MatDialogRef<CajasdashboardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      // console.log(data)
      this.data.id,
      this.data.status;
    }

    ngOnInit() {
    this.nodoseleccionado = localStorage.getItem('itemseleccionado');

    this.cargarDashboard();
      console.log(this.dashboardData.pendientes)
  }

  enviarAvalidar(){
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'PENDIENTE_VALIDAR_LIST' });
    _atts.push({ name: 'status', value: 'EV' });
    _atts.push({ name: 'key', value: this.data.id });
    _atts.push({ name: 'statusItem', value: this.data.status });
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
        this.sendValidate(this.llaves.toString())
        this.controlService.closeSpinner(spinner);
      }
    })

  }

  sendValidate(llaves){

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

        

        const _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
            _atts.push({ name: 'onlyActualNode', value: 'Y' });
            _atts.push({ name: 'key', value: llaves });

            const obj = this.autentication.generic(_atts);
            const spinner = this.controlService.openSpinner();        

        obj.subscribe(
                    (data) => {
                      if (data.success === true) {


                        this.mostrarMensaje();
                        
                        
                        this.Cajas.notificaciones$.emit(true);
                        this.cancelar()
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

  cargarDashboard() {
    const _atts = [];
    // _atts.push({ name: 'stdJobNo1', value: '' });
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'status', value: this.data.status });
    _atts.push({ name: 'key', value: this.data.id });
    _atts.push({ name: 'action', value: 'TABLERO_LIST' });

    const spinner = this.controlService.openSpinner();
    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data);
            const result = data.success;
            if (result) {
              // this.Cajas.caja1 = data.data[0].atts[1].value.trim()
              // this.prueba = data.data[0].atts[3].value.trim()
              // debugger

              if (data.data[0].atts[1].name === 'TIMEOUT') {
                // debugger
                this.controlService.closeSpinner(spinner);

                Swal2.fire({
                  icon: 'info',
                  text: `Numero de items en Validación/Construcción excedido: ${data.data[0].atts[1].value.trim()} ,bajar de nivel en la jerarquía`

                }).then((resultado) => {
                  if (resultado.value) {

                    this.dialogRef.close(true);
                  }
                });

                return;

              }

              if (this.data.status === '001' || this.data.status === '002' || this.data.status === '003' || this.data.status === '006') {
                this.mostrar = true;
                this.dashboardData = {

                  ENVIAR_A_VALIDAR: data.data[0].atts[1].value.trim(),
                  ENVIAR_A_VALIDAR_CONSTRUCCION: data.data[0].atts[2].value.trim(),
                  RECHAZADO: data.data[0].atts[3].value.trim(),
                  // POR_VALIDAR: data.data[0].atts[4].value.trim(),
                  // POR_APROBAR:data.data[0].atts[5].value.trim()

                 /* ENVIAR_A_VALIDAR: data.data[0].atts[1].value.trim(),
                  POR_VALIDAR: data.data[0].atts[2].value.trim(),
                  Rechazados: data.data[0].atts[3].value.trim(),
                  POR_APROBAR: data.data[0].atts[4].value.trim(),
                  En_Construccion: data.data[0].atts[5].value.trim()*/
                };
              } else if (this.data.status === '004') {
                this.mostrar = true;
                this.dashboardData = {

                  POR_VALIDAR: data.data[0].atts[1].value.trim(),

                  // POR_VALIDAR: data.data[0].atts[4].value.trim(),
                  // POR_APROBAR:data.data[0].atts[5].value.trim()

                 /* ENVIAR_A_VALIDAR: data.data[0].atts[1].value.trim(),
                  POR_VALIDAR: data.data[0].atts[2].value.trim(),
                  Rechazados: data.data[0].atts[3].value.trim(),
                  POR_APROBAR: data.data[0].atts[4].value.trim(),
                  En_Construccion: data.data[0].atts[5].value.trim()*/
                };

              } else {

                this.mostrar = true;

                this.dashboardData = {

                  POR_VALIDAR: data.data[0].atts[1].value.trim(),

                  // POR_VALIDAR: data.data[0].atts[4].value.trim(),
                  // POR_APROBAR:data.data[0].atts[5].value.trim()

                 /* ENVIAR_A_VALIDAR: data.data[0].atts[1].value.trim(),
                  POR_VALIDAR: data.data[0].atts[2].value.trim(),
                  Rechazados: data.data[0].atts[3].value.trim(),
                  POR_APROBAR: data.data[0].atts[4].value.trim(),
                  En_Construccion: data.data[0].atts[5].value.trim()*/
                };
              }

            // console.log(this.dashboardData)

              this.controlService.closeSpinner(spinner);
            } else {

              // this.autentication.showMessage(data.success, data.message, this.aprobacionesList, data.redirect);

              Swal2.fire({
                title: 'mensaje',
                text: data.message,
                icon: 'info'

              }).then((resultado) => {
                if (resultado.value) {

                  this.dialogRef.close(true);
                }
              }

              );
              this.controlService.closeSpinner(spinner);

            }
            return result;
          });
    });
  }

  async VerEnviarValidar(completo?: boolean) {

    const conf = this.confirm.open(RkpendComponent,
      {
        hasBackdrop: true,
        // id: 'drag',
        height: 'auto',
        width: 'auto',
        data:
        {
          title: 'Items en fase de creacion, modificacion o eliminacion',
          message: '',
          button_confirm: 'Cerrar',
          button_close: 'Cerrar',
          id: this.data.id,
          status: this.data.status,
          completo : completo

        },
        // panelClass : 'tabla'

      });
    conf.afterClosed()
      .subscribe(async (result) => {
        if (result === 'undefined' || !result) {

          this.cancelar()
          
          // this.cargarDashboard();
        } else {
          // this.cargarDashboard();
          this.cancelar();
          
        }
      });
      // this.cancelar()
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
        button_close: 'Cerrar',
        id: this.data.id,
        status: this.data.status
      },

    });
    conf.afterClosed()
      .subscribe(async (result) => {
        if (result === 'undefined' || !result) {

          // this.cargarDashboard();
          this.cancelar();

        } else {
          // this.cargarDashboard();
          this.cancelar();


        }
      });
  }

  cancelar() {

    // this.Cajas.RecargarDetalle$.emit(true)
    this.dialogRef.close(false);
    
        // this.router.navigate(['/rkmain/cargando']);
    // setTimeout(() => {
    //   this.router.navigate(['/rkmain/' + this.nodoseleccionado]);

    // }, 1000);
  }

}
