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

  titulo = 'Solicitud de Creacion de Registros en Tablas Maestras';
  public solicitudes: any[] = [];

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

        this.solicitudes.push({
          tipo,
          TABLE_CODE: element.atts[2].value.trim(),
          TABLE_DESC: element.atts[3].value.trim(),
          ASSOC_REC: element.atts[4].value.trim(),
          TEXTO_EXTENDIDO: element.atts[5].value.trim(),
          COMENTARIOS: element.atts[5].value.trim(),
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

  EnviarSolicitud() {

    this.autentication.EnviarSolicitud().subscribe(

      (data: any) => {
        console.log(data.data[0].atts[1].value);
        Swal2.fire({
          text : data.data[0].atts[1].value,
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

}
