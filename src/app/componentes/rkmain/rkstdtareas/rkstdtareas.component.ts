import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import Swal2 from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService, ControlsService } from '../../../shared';

@Component({
  selector: 'app-rkstdtareas',
  templateUrl: './rkstdtareas.component.html',
  styleUrls: ['./rkstdtareas.component.scss']
})
export class RkstdtareasComponent implements OnInit {

  public stdJobModel: any = {
    
  };
  isChecked;
  isCheckedName;
  public habilitar:boolean
  

  public StdJobTareasList: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<RkstdtareasComponent>,
    private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 

                this.stdJobModel.areaId = data.areaId;
                this.stdJobModel.procesoId = data.procesoId;
                this.stdJobModel.subprocesoId = data.subprocesoId;
                this.stdJobModel.actividadId = data.actividadId;
                this.stdJobModel.tareaId = data.tareaId;
                this.stdJobModel.statusId = data.statusId;
                this.stdJobModel.versionId = data.versionId;
                this.stdJobModel.stdJobNo1 = data.stdJobNo1
                this.stdJobModel.id = data.id
                console.log(this.stdJobModel.stdJobNo1)
  }

  ngOnInit() {
    this.CargarStdJob()
  }
  cancelar() {
    this.dialogRef.close(true);
  }
  
  CargarStdJob(){

    let _atts = [];
    // this.StdJobTareasList= []
    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'LISTA_STD_JOB_TASK'});
    _atts.push({ name: 'id', value: this.stdJobModel.id});
    _atts.push({ name: "stdJobNo", value: this.stdJobModel.stdJobNo1 });
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
                  selected: element.atts[1].value.trim() === this.stdJobModel.STD_JOB_TASK ? true : false,
                  STD_JOB_TASK: element.atts[1].value,
                  SJ_TASK_DESC:element.atts[2].value,
                  
                  
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

  deseleccionarTodo(item: any) { 

    this.StdJobTareasList.forEach( (element) => {
            console.log(element)

      if ( element.STD_JOB_TASK !== item.STD_JOB_TASK) {
          console.log(item.STD_JOB_TASK)
          element.selected = false;
          this.habilitar= false
      }
    });

    this.stdJobModel.STD_JOB_TASK = '';
    if ( item.selected === true ) {
      console.log(item.STD_JOB_TASK + 'verdadere')
      
      this.stdJobModel.STD_JOB_TASK= item.STD_JOB_TASK;
      this.habilitar= true
    }
  }

  guardar() {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr'});

    if ( this.stdJobModel.tareaId === '') {
      _atts.push({ name: 'action', value: 'ACTIVIDAD_STJB_CREATE'});
    }

    if ( this.stdJobModel.tareaId !== '') {
      _atts.push({ name: 'action', value: 'TAREA_STJB_CREATE'});
      _atts.push({ name: 'tareaId', value: this.stdJobModel.tareaId });
    }

    _atts.push({ name: 'areaId', value: this.stdJobModel.areaId });
    _atts.push({ name: 'procesoId', value: this.stdJobModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.stdJobModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.stdJobModel.actividadId });

    _atts.push({ name: 'stdJobNo1', value: this.stdJobModel.stdJobNo1 });
    _atts.push({ name: 'stdJobTaskNo1', value: this.stdJobModel.STD_JOB_TASK });
    _atts.push({ name: 'statusId', value: this.stdJobModel.statusId });
    _atts.push({ name: 'versionId', value: this.stdJobModel.versionId });

    console.log(this.stdJobModel.STD_JOB_TASK)

    if ( this.stdJobModel.stdJobNo1 === undefined || this.stdJobModel.stdJobNo1 === null || this.stdJobModel.stdJobNo1.trim() === '' ) { 
      // this.autentication.showMessage(false, 'Ingrese el StdJobNo', this.stdJobModel, false);
      Swal2.fire('','Ingrese el StdJobNo','warning')
      return;
    }

    if ( this.stdJobModel.tareaId !== '') {
      if ( this.stdJobModel.stdJobNo1 === undefined || this.stdJobModel.stdJobNo1 === null || this.stdJobModel.stdJobNo1.trim() === '' ) { 
        // Swal2.fire('','Ingrese el  StdJobTaskNo','warning')
        this.autentication.showMessage(false, 'Ingrese el StdJobTaskNo', this.stdJobModel, false);
        return;
      }
    }

    if ( this.stdJobModel.tareaId === '') {
      if ( this.stdJobModel.STD_JOB_TASK === undefined || this.stdJobModel.STD_JOB_TASK === null || this.stdJobModel.STD_JOB_TASK.trim() === '' ) {
        this.stdJobModel.STD_JOB_TASK = '';
      }
    }

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.stdJobModel, data.redirect);
        Swal2.fire('', data.data[0].atts[1].value, "success")
        this.dialogRef.close(true);
      }
    }
    else {
      // this.autentication.showMessage(data.success, data.message, this.stdJobModel, data.redirect);
      // this.autentication.showMessage(data.success, data.message, this.stdJobModel, data.redirect);
      Swal2.fire('',data.message,'error')
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.stdJobModel, false);
      this.controlService.closeSpinner(spinner);
      this.dialogRef.close(true);
    });

  }

}
