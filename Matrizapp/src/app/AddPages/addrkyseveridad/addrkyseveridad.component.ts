import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../shared';

@Component({
  selector: 'app-addrkyseveridad',
  templateUrl: './addrkyseveridad.component.html',
  styleUrls: ['./addrkyseveridad.component.scss']
})

export class AddrkyseveridadComponent implements OnInit {

  public riesgoPuroModel: any = {
    severidadId: ''
  };

  public dataList: any[] = [];

  constructor(public dialogRef: MatDialogRef<AddrkyseveridadComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.cargarTablaSeveridad();
              }

  ngOnInit() { }

  deseleccionarTodo(item: any) { 

    this.dataList.forEach( (element) => {
      if ( element.id !== item.id) {
          element.selected = false;
      }
    });

    this.riesgoPuroModel.severidadId = '';
    if ( item.selected === true ) {
      this.riesgoPuroModel.severidadId = item.id;
    }
  }

  cargarTablaSeveridad() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'CONSECUENCIA_SEV_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            this.riesgoPuroModel.severidadId = this.riesgoPuroModel.severidad;

            //alert(this.riesgoPuroModel.severidadId);

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {

                  this.dataList.push({
                    selected: element.atts[1].value.trim() === this.riesgoPuroModel.severidadId ? true : false,
                    offset: element.atts[0].value,
                    id: element.atts[1].value,
                    descripcion: element.atts[2].value,
                    danosPersonas: element.atts[3].value,
                    medioAmbiente: element.atts[4].value,
                    interrupcionOperacion: element.atts[5].value,
                    reputacionSocial: element.atts[6].value,
                    legal: element.atts[7].value
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
      localStorage.setItem('selRp', this.riesgoPuroModel.severidadId);
      localStorage.setItem('selRr', '');
    }

    if ( this.data.type === 'RR' ) {
      localStorage.setItem('selRp', '');
      localStorage.setItem('selRr', this.riesgoPuroModel.severidadId);
    }

    this.dialogRef.close(true);
  }

  cancelar() {
    this.dialogRef.close(true);
  }

}
