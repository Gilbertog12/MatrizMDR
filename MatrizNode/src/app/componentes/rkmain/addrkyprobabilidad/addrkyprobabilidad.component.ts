import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';

@Component({
  selector: 'app-addrkyprobabilidad',
  templateUrl: './addrkyprobabilidad.component.html',
  styleUrls: ['./addrkyprobabilidad.component.scss']
})

export class AddrkyprobabilidadComponent implements OnInit {

  public riesgoPuroModel: any = {
    probabilidadId: ''
  };

  public dataList: any[] = [];

  constructor(public dialogRef: MatDialogRef<AddrkyprobabilidadComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.cargarTablaProbabilidad();
              }

  ngOnInit() { }

  deseleccionarTodo(item: any) { 

    this.dataList.forEach( (element) => {
      if ( element.id !== item.id) {
          element.selected = false;
      }
    });

    this.riesgoPuroModel.probabilidadId = '';
    if ( item.selected === true ) {
      this.riesgoPuroModel.probabilidadId = item.id;
    }
  }

  cargarTablaProbabilidad() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'CONSECUENCIA_PRO_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            this.riesgoPuroModel.probabilidadId = this.riesgoPuroModel.probabilidad;

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {

                  this.dataList.push({
                    selected: element.atts[1].value.trim() === this.riesgoPuroModel.probabilidadId ? true : false,
                    offset: element.atts[0].value,
                    id: element.atts[1].value,
                    descripcion: element.atts[2].value,
                    valoracion: element.atts[3].value,
                    cualitativo: element.atts[4].value,
                    cuantitativo: element.atts[5].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.riesgoPuroModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgoPuroModel, false);
      });
    });
  }

  aceptar() {
    if ( this.data.type === 'RP' ) {
      localStorage.setItem('selRp', this.riesgoPuroModel.probabilidadId);
      localStorage.setItem('selRr', '');
    }

    if ( this.data.type === 'RR' ) {
      localStorage.setItem('selRp', '');
      localStorage.setItem('selRr', this.riesgoPuroModel.probabilidadId);
    }

    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(true);
  }

}
