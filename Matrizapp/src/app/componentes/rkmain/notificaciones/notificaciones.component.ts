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
export class NotificacionesComponent implements OnInit {
  notificaciones: any = [];
  valor: string;

  constructor(public dialogRef: MatDialogRef<NotificacionesComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              private confirm: MatDialog,
              private ControlsService:ControlsService,

              @Inject(MAT_DIALOG_DATA) public data: any) {

                this.cargarNotificiaciones();

              }

  ngOnInit() {

  }

  cargarNotificiaciones() {
    const spinner = this.ControlsService.openSpinner();
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

                console.log(element.atts[5].value.trim().substring(0, 8 ));
                console.log(element.atts[5].value.trim().substring(9 , 15));

                this.notificaciones.push({
                  jerarquia: element.atts[1].value.trim(),
                  comentario: element.atts[2].value.trim(),
                  estado: element.atts[3].value.trim(),
                  key_value: element.atts[4].value.trim(),
                  fecha: element.atts[5].value.trim().substring(0, 8 ),
                  hora: element.atts[5].value.trim().substring(9, 15 ),
                  no_items: element.atts[6].value.trim(),
                  check: false

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
}
