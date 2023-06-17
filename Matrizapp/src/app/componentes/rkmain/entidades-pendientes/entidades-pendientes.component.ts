import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxLoadingService } from 'ngx-loading';
import { ControlsService } from '../../../shared';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { NuevaEntidadComponent } from '../../../nueva-entidad/nueva-entidad.component';
import { MatDialogRef } from '@angular/material';
import swal from 'sweetalert';
import Swal2 from 'sweetalert2';
import { title } from 'process';
import { text } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-entidades-pendientes',
  templateUrl: './entidades-pendientes.component.html',
  styleUrls: ['./entidades-pendientes.component.scss']
})
export class EntidadesPendientesComponent implements OnInit {

  titulo = 'Solicitud de creación de registros en tablas Maestras';
  public solicitudes: any[] = [];
  masterSelected = false;

  miFormulario: FormGroup = this.fb.group(
    {
      codigo: this.fb.array([]),
      Valores_Asociados: this.fb.array([]),
      comentarioSolicitud: this.fb.array([]),
    }
  );

  constructor( private fb: FormBuilder, private controlService: ControlsService, private spinner: NgxLoadingService,
               private autentication: AuthenticationService,
               public dialogRef: MatDialogRef<NuevaEntidadComponent> ) {

                this.obtenerPendientes();
               }

  ngOnInit() {
  }

  obtenerPendientes() {

    const _atts = [];

    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'LIST_DEFINITION' });

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe( (data) => {

      data.data.forEach((element) => {

        const tipo = this.getTipo( element.atts[1].value.trim());
        const tabla = this.getTabkaAuxiliar( element.atts[1].value.trim());

        this.solicitudes.push({
          tipo,
          tablatipo : element.atts[1].value.trim(),
          TABLE_CODE: element.atts[2].value.trim(),
          TABLE_DESC: element.atts[3].value.trim(),
          // ASSOC_REC: element.atts[4].value.trim(),
          TEXTO_EXTENDIDO: element.atts[5].value.trim(),
          COMENTARIOS: element.atts[5].value.trim(),
          check: false,
        });

      });

      this.controlService.closeSpinner(spinner);
    });

  }

  getTipo(tabla: any) {

    switch (tabla) {

        case '+RKC':
        return 'Actividad';
        case '+RKT':
        return 'Tarea';
        case '+RKR':
        return 'Riesgo';
        case '+RKY':
        return 'Consecuencia';
        case '+RKB':
        return 'Control Blando';
        case '+RKF':
        return 'Control Epf';

    }

  }

  getTabkaAuxiliar(tabla) {

    switch (tabla) {

      case '+RKC':
      return 'Actividad';
      case '+RKT':
      return '+MR5';
      case '+RKR':
      return '+MR7';
      case '+RKY':
      return '+MR8';
      case '+RKB':
      return '+MR9';

  }

  }

  obtenerCodigosYTablas(accion: string) {
    const codigos = [];
    const tipos = [];
    debugger;
    this.solicitudes.forEach( (item) => {
          if (item.check) {
            codigos.push( item.TABLE_CODE);
            tipos.push( item.tablatipo);
          }
        }
      );
    this.EnviarSolicitud(codigos.toString(), tipos.toString(), accion);

  }

  EnviarSolicitud( codigos, tipos , accion) {

    const atts = [];

    atts.push({name: 'scriptName', value: 'coemdr'});
    atts.push({name: 'action', value: accion});
    if (accion === 'DELETE_DEFINITION') {
      atts.push({name: 'type', value: tipos});
      atts.push({name: 'code', value: codigos});

    } else {

      atts.push({name: 'types', value: tipos});
      atts.push({name: 'codes', value: codigos});

   }

    let mensaje = '';
    if ( accion === 'DELETE_DEFINITION') {

     mensaje = 'Solicitudes Eliminadas';
   } else {
     mensaje = 'Solicitudes han sido enviadas a aprobar';
   }

    this.autentication.generic(atts).subscribe(

      (data: any) => {
        console.log(data.data[0].atts[1].value);
        Swal2.fire({
          text : mensaje,
          icon : 'info'

        }
        );
        this.cerrar();
      }
    );
  }

  cerrar() {
    this.dialogRef.close();
  }

  checkUncheckAll() {
    this.solicitudes.forEach( (item) => {
      item.check = this.masterSelected;

    });
  }

}
