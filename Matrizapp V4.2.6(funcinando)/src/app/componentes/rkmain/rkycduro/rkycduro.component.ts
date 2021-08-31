import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import Swal2 from 'sweetalert2';

@Component({
  selector: 'app-rkycduro',
  templateUrl: './rkycduro.component.html',
  styleUrls: ['./rkycduro.component.scss']
})

export class RkycduroComponent implements OnInit {

  public cDuroModel: any = {

  };

  public cDurosList: any[] = [];
  public cDuroClasificacionList: any[] = [];
  public cDuroTipos1List: any[] = [];
  public cDuroTipos2List: any[] = [];
  public cDuroEfectividadList: any[] = [];

  constructor(public dialogRef: MatDialogRef<RkycduroComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.cDuroModel.areaId = data.areaId;
                this.cDuroModel.procesoId = data.procesoId;
                this.cDuroModel.subprocesoId = data.subprocesoId;
                this.cDuroModel.actividadId = data.actividadId;
                this.cDuroModel.tareaId = data.tareaId;
                this.cDuroModel.dimensionId = data.dimensionId;
                this.cDuroModel.riesgoId = data.riesgoId;
                this.cDuroModel.consecuenciaId = data.consecuenciaId;
                this.cargarcDuros(
                  this.cDuroModel.areaId,
                  this.cDuroModel.procesoId,
                  this.cDuroModel.subprocesoId,
                  this.cDuroModel.actividadId,
                  this.cDuroModel.tareaId,
                  this.cDuroModel.dimensionId,
                  this.cDuroModel.riesgoId,
                  this.cDuroModel.consecuenciaId);

                  this.cargarcDurosClasificacion();
                  this.cargarcDurosTipo1();
                  this.cargarcDurosTipo2();
                  this.cargarcDurosEfectividad();
              }

  ngOnInit() { }

  cargarcDuros(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string, dimensionId: string, riesgoId: string, consecuenciaId: string) {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'CDURO_LIST'});
    _atts.push({name: 'areaId', value: areaId });
    _atts.push({name: 'procesoId', value: procesoId });
    _atts.push({name: 'subprocesoId', value: subprocesoId });
    _atts.push({name: 'actividadId', value: actividadId });
    _atts.push({name: 'tareaId', value: tareaId });
    _atts.push({name: 'dimensionId', value: dimensionId });
    _atts.push({name: 'riesgoId', value: riesgoId });
    _atts.push({name: 'consecuenciaId', value: consecuenciaId });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.cDurosList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.cDuroModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.cDuroModel, false);
      });
    });
  }

  guardar() {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'CDURO_CREATE'});
    _atts.push({ name: 'areaId', value: this.cDuroModel.areaId });
    _atts.push({ name: 'procesoId', value: this.cDuroModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.cDuroModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.cDuroModel.actividadId });
    _atts.push({ name: 'tareaId', value: this.cDuroModel.tareaId });
    _atts.push({ name: 'dimensionId', value: this.cDuroModel.dimensionId });
    _atts.push({ name: 'riesgoId', value: this.cDuroModel.riesgoId });
    _atts.push({ name: 'consecuenciaId', value: this.cDuroModel.consecuenciaId });
    _atts.push({ name: 'cduroDesc', value: this.cDuroModel.cduroDesc });
    _atts.push({ name: 'cduroClasificacion', value: this.cDuroModel.cduroClasificacion });
    _atts.push({ name: 'cduroTipo1', value: this.cDuroModel.cduroTipo1 });
    _atts.push({ name: 'cduroTipo2', value: this.cDuroModel.cduroTipo2 });
    _atts.push({ name: 'cduroEfectividad', value: this.cDuroModel.cduroEfectividad });

    if ( this.cDuroModel.cduroClasificacion === undefined || this.cDuroModel.cduroClasificacion === null || this.cDuroModel.cduroClasificacion.trim() === '' ) { 
      // this.autentication.showMessage(false, 'Seleccione la Clasificación', this.cDuroModel, false);
      Swal2.fire({
        icon:'warning',
        text:'Seleccione la Clasificación'
      })
      return;
    }

    if ( this.cDuroModel.cduroTipo1 === undefined || this.cDuroModel.cduroTipo1 === null || this.cDuroModel.cduroTipo1.trim() === '' ) {
      // this.autentication.showMessage(false, 'Seleccione el Tipo 1', this.cDuroModel, false);
      Swal2.fire({
        icon:'warning',
        text:'Seleccione el Tipo 1'
      })
      return;
    }

    // if ( this.cDuroModel.cduroTipo2 === undefined || this.cDuroModel.cduroTipo2 === null || this.cDuroModel.cduroTipo2.trim() === '' ) { 
    //   this.autentication.showMessage(false, 'Seleccione el Tipo 2', this.cDuroModel, false);
    //   return;
    // }

    if ( this.cDuroModel.cduroEfectividad === undefined || this.cDuroModel.cduroEfectividad === null || this.cDuroModel.cduroEfectividad.trim() === '' ) { 
      // this.autentication.showMessage(false, 'Seleccione la Efectividad', this.cDuroModel, false);
      Swal2.fire({
        icon:'warning',
        text:'Seleccione la Efectividad'
      })
      return;
    }

    if ( this.cDuroModel.cduroDesc === undefined || this.cDuroModel.cduroDesc === null || this.cDuroModel.cduroDesc.trim() === '' ) { 
      // this.autentication.showMessage(false, 'Digite la Descripción', this.cDuroModel, false);
      Swal2.fire({
        icon:'warning',
        text:'Digite la Descripción'
      })
      return;
    }

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        Swal2.fire({
          icon:'success',
          text:'Control Duro Agregado'
        })

        this.dialogRef.close(true);

      } else {
        // this.autentication.showMessage(data.success, data.message, this.cDuroModel, data.redirect);
        Swal2.fire({
          icon:'error',
          text:data.message
        })
      }
    }
    else {
      this.autentication.showMessage(data.success, data.message, this.cDuroModel, data.redirect);

      
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.cDuroModel, false);
      this.controlService.closeSpinner(spinner);
      this.dialogRef.close(true);
    });

  }

  cancelar() {
    this.dialogRef.close(true);
  }

  cargarcDurosClasificacion() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'RK5_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.cDuroClasificacionList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.cDuroModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.cDuroModel, false);
      });
    });
  }

  cargarcDurosTipo1() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'RK6_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.  cDuroTipos1List.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.cDuroModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.cDuroModel, false);
      });
    });
  }

  cargarcDurosTipo2() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'RK7_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.cDuroTipos2List.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.cDuroModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.cDuroModel, false);
      });
    });
  }

  cargarcDurosEfectividad() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'RK8_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.cDuroEfectividadList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.cDuroModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.cDuroModel, false);
      });
    });
  }

}
