import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal2 from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService, ControlsService } from '../../shared';


@Component({
  selector: 'app-rktareastd',
  templateUrl: './rktareastd.component.html',
  styleUrls: ['./rktareastd.component.scss']
})
export class RktareastdComponent implements OnInit {


  public stdJobModel: any = {
    
  };

  public StdJobTareasList: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<RktareastdComponent>,
    private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { 

                this.stdJobModel.areaId = data.areaId;
                this.stdJobModel.procesoId = data.procesoId;
                this.stdJobModel.subprocesoId = data.subprocesoId;
                this.stdJobModel.actividadId = data.actividadId;
                this.stdJobModel.tareaId = data.tareaId;
                this.stdJobModel.statusId = data.statusId;
                this.stdJobModel.versionId = data.versionId;
                this.stdJobModel.stdJobNo = data.stdJobNo
  }

  ngOnInit() {
    this.CargarStdJob()
  }
  
  CargarStdJob(){

    let _atts = [];
    // this.StdJobTareasList= []
    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'LISTA_STD_JOB'});
    _atts.push({ name: "stdJobNo", value: this.stdJobModel.stdJobNo });
    const spinner = this.controlService.openSpinner();
        const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts).subscribe(
        (data) => {
          const result = data.success;
          if (result) {
            console.log(data)
            data.data.forEach((element) => {
                if (element.atts.length > 0) {
                this.StdJobTareasList.push({
                  STD_JOB_NO: element.atts[1].value.trim(),
                  STD_JOB_DESC:element.atts[2].value
                  
                });
              }
            });
           this.controlService.closeSpinner(spinner);

          } else {
            this.autentication.showMessage(
              data.success,
              data.message,
              this.StdJobTareasList,
              data.redirect
            );
          }
          return result;
        },
        (error) => {
          this.autentication.showMessage(
            false,
            "Ha ocurrido un error al intentar conectarse, verifique su conexión a internet",
            [],
            false
          );
        }
      );
    });
  }
}
