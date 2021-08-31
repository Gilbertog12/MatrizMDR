import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';

@Component({
  selector: 'app-rkcequip',
  templateUrl: './rkcequip.component.html',
  styleUrls: ['./rkcequip.component.scss']
})

export class RkcequipComponent implements OnInit {

  public equipModel: any = {

  };

  public equipList: any[] = [];

  constructor(public dialogRef: MatDialogRef<RkcequipComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.equipModel.stdJobNo = data.stdJobNo;
                this.recargar();
              }

  ngOnInit() { }

  recargar() {

      let _atts = [];
      _atts.push({name: 'scriptName', value: 'coemdr'});
      _atts.push({name: 'action', value: 'EQUIP_LIST'});
      _atts.push({name: 'stdJobNo1', value: this.equipModel.stdJobNo });

      const promiseView = new Promise((resolve, reject) => {
        this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            const result = data.success;
            if (result) {

              data.data.forEach( (element) => {
                if ( element.atts.length > 0) {
                    this.equipList.push({
                      Id: element.atts[1].value,
                      Descripcion: element.atts[2].value
                    });
                }
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

  cerrar() {
    this.dialogRef.close(true);
  }

}
