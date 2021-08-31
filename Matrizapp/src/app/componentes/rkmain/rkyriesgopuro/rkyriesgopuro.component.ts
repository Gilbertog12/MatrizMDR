import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';

@Component({
  selector: 'app-rkyriesgopuro',
  templateUrl: './rkyriesgopuro.component.html',
  styleUrls: ['./rkyriesgopuro.component.scss']
})

export class RkyriesgopuroComponent implements OnInit {

  public riesgoPuroModel: any = {

  };

  public probabilidadList: any[] = [];
  public severidadList: any[] = [];
  public criticidadList: any[] = [];

  constructor(public dialogRef: MatDialogRef<RkyriesgopuroComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.riesgoPuroModel.areaId = data.areaId;
                this.riesgoPuroModel.procesoId = data.procesoId;
                this.riesgoPuroModel.subprocesoId = data.subprocesoId;
                this.riesgoPuroModel.actividadId = data.actividadId;
                this.riesgoPuroModel.tareaId = data.tareaId;
                this.riesgoPuroModel.dimensionId = data.dimensionId;
                this.riesgoPuroModel.riesgoId = data.riesgoId;
                this.riesgoPuroModel.consecuenciaId = data.consecuenciaId;
                this.riesgoPuroModel.versionId = data.versionId;
                this.riesgoPuroModel.probabilidad = data.probabilidad;
                this.riesgoPuroModel.severidad = data.severidad;
                this.riesgoPuroModel.criticidad = data.criticidad;
                this.cargarprobabilidad();
                this.cargarseveridad();
                this.cargarcriticidad();
              }

  ngOnInit() { }

  cargarprobabilidad() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'RKM_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.probabilidadList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

            this.riesgoPuroModel.probabilidadId = this.riesgoPuroModel.probabilidad;

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

  cargarseveridad() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'RKN_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.severidadList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

            this.riesgoPuroModel.severidadId = this.riesgoPuroModel.severidad;

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

  cargarcriticidad() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'RKO_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.criticidadList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

            this.riesgoPuroModel.criticidadId = this.riesgoPuroModel.criticidad;

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

  guardar() {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'CONSECUENCIA_MODIFY_RP'});
    _atts.push({ name: 'areaId', value: this.riesgoPuroModel.areaId });
    _atts.push({ name: 'procesoId', value: this.riesgoPuroModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.riesgoPuroModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.riesgoPuroModel.actividadId });
    _atts.push({ name: 'tareaId', value: this.riesgoPuroModel.tareaId });
    _atts.push({ name: 'dimensionId', value: this.riesgoPuroModel.dimensionId });
    _atts.push({ name: 'riesgoId', value: this.riesgoPuroModel.riesgoId });
    _atts.push({ name: 'consecuenciaId', value: this.riesgoPuroModel.consecuenciaId });
    _atts.push({ name: 'riesgoPuroP', value: this.riesgoPuroModel.probabilidadId });
    _atts.push({ name: 'riesgoPuroS', value: this.riesgoPuroModel.severidadId });
    _atts.push({ name: 'riesgoPuroC', value: this.riesgoPuroModel.criticidadId });
    _atts.push({ name: 'versionId', value: this.riesgoPuroModel.versionId });

    if ( this.riesgoPuroModel.probabilidadId === undefined || this.riesgoPuroModel.probabilidadId === null || this.riesgoPuroModel.probabilidadId.trim() === '' ) { 
      this.autentication.showMessage(false, 'Seleccione la Probabilidad', this.riesgoPuroModel, false);
      return;
    }

    if ( this.riesgoPuroModel.severidadId === undefined || this.riesgoPuroModel.severidadId === null || this.riesgoPuroModel.severidadId.trim() === '' ) { 
      this.autentication.showMessage(false, 'Seleccione la Severidad', this.riesgoPuroModel, false);
      return;
    }

    if ( this.riesgoPuroModel.criticidadId === undefined || this.riesgoPuroModel.criticidadId === null || this.riesgoPuroModel.criticidadId.trim() === '' ) { 
      this.autentication.showMessage(false, 'Seleccione la Criticidad', this.riesgoPuroModel, false);
      return;
    }

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.riesgoPuroModel, data.redirect);
        this.dialogRef.close(true);
      } else {
        this.autentication.showMessage(data.success, data.message, this.riesgoPuroModel, data.redirect);
      }
    }
    else {
      this.autentication.showMessage(data.success, data.message, this.riesgoPuroModel, data.redirect);
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgoPuroModel, false);
      this.controlService.closeSpinner(spinner);
      this.dialogRef.close(true);
    });

  }

  cancelar() {
    this.dialogRef.close(true);
  }

}
