import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import Swal2 from 'sweetalert2';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent  {
  notificaciones: any = [];
  valor: string;
  deshabilitar: boolean = false;

  constructor(public dialogRef: MatDialogRef<NotificacionesComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              private confirm: MatDialog,
              private ControlsService: ControlsService,

              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.cargarNotificiaciones();

              }

  cargarNotificiaciones() {
    const spinner = this.ControlsService.openSpinner();
    this.notificaciones = [];
    const _atts = [];

    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'NOTIFICACION_LIST' });

    this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data);
            const result = data.success;
            if (result) {

              console.log(data);
              data.data.forEach((element) => {

                  if (localStorage.getItem('Usuario').includes('@')) {

                  if (element.atts[7].value.trim() !== localStorage.getItem('Usuario').split('@', 1 ).toString() ) {
                    this.deshabilitar = true;
                  }
                } else {
                  if (element.atts[7].value.trim() !== localStorage.getItem('Usuario')) {
                    this.deshabilitar = true;
                  }
                }

                // this.deshabilitar = localStorage.getItem('Usuario').includes(element.atts[7].value.trim());

                  this.notificaciones.push({
                  jerarquia: element.atts[1].value.trim(),
                  comentario: element.atts[2].value.trim(),
                  estado: element.atts[3].value.trim(),
                  key_value: element.atts[4].value.trim(),
                  fecha: element.atts[5].value.trim(),
                  no_items: element.atts[6].value.trim(),
                  usuario: element.atts[7].value.trim(),
                  avance: element.atts[8].value.trim()+'%', 
                  check: false,
                  habilitado : this.deshabilitar

                });

              });
              this.ControlsService.closeSpinner(spinner);

            } else {
              this.controlService.closeSpinner(spinner);

              // this.autentication.showMessage(data.success, data.message, this.aprobacionesList, data.redirect);
            }
            return result;
          });
  }

  /** Whether the number of selected elements matches the total number of rows. */

  validarEliminacion() {
    this.valor = '';

    for (let i = 0; i < this.notificaciones.length; i++) {

      if (this.notificaciones[i]['check'] === true) {

        this.valor = this.valor + ',' + this.notificaciones[i]['key_value'] ;

      }

    }
    this.valor = this.valor.slice(1);

    this.cerrar(this.valor);
  }

  cerrar(valores) {

    console.log(valores);

    // debugger
    if (valores !== '') {

        this.dialogRef.close(valores);

    } else {
        // if(mensaje === 'undefined'){
          this.dialogRef.close(false);
        // }

    }
  }

  getClass(estado) {
      switch ( estado ) {

        case 'En Proceso':
          return 'proceso';
        case 'OK' :
          return 'success';
        default :
          return 'error';
      }

  }

  getText( texto: string){
    switch ( texto ) {

      case 'En Proceso':
        return 'En Ejecución';
        case 'OK' :
          return 'Ejecución Exitosa';
      default :
        return `Ejecución fallida ${texto}`;
    }
  }
}
