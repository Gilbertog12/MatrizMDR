import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';

@Component({
  selector: 'app-rkyriesgoresidualtabler',
  templateUrl: './rkyriesgoresidualtabler.component.html',
  styleUrls: ['./rkyriesgoresidualtabler.component.scss']
})

export class RkyriesgoresidualtablerComponent implements OnInit {

  public riesgoResidualModel: any = {

  };

  public dataList: any[] = [];
  public probabilidadList: any[] = [];
  public severidadList: any[] = [];
  public criticidadList: any[] = [];

  constructor(public dialogRef: MatDialogRef<RkyriesgoresidualtablerComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.riesgoResidualModel.areaId = data.areaId;
                this.riesgoResidualModel.procesoId = data.procesoId;
                this.riesgoResidualModel.subprocesoId = data.subprocesoId;
                this.riesgoResidualModel.actividadId = data.actividadId;
                this.riesgoResidualModel.tareaId = data.tareaId;
                this.riesgoResidualModel.dimensionId = data.dimensionId;
                this.riesgoResidualModel.riesgoId = data.riesgoId;
                this.riesgoResidualModel.consecuenciaId = data.consecuenciaId;
                this.riesgoResidualModel.versionId = data.versionId;
                this.riesgoResidualModel.probabilidad = data.probabilidad;
                this.riesgoResidualModel.severidad = data.severidad;
                this.riesgoResidualModel.criticidad = data.criticidad;
                //this.cargarprobabilidad();
                //this.cargarseveridad();
                //this.cargarcriticidad();
                this.cargarTablaProbabilidad();
              }

  ngOnInit() { }

  deseleccionarTodo(item: any) { 

    this.dataList.forEach( (element) => {
      if ( element.id !== item.id) {
          element.selected = false;
      }
    });

    this.riesgoResidualModel.severidadId = '';
    if ( item.selected === true ) {
      this.riesgoResidualModel.severidadId = item.id;
    }
  }

  cargarTablaProbabilidad() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'CONSECUENCIA_SEV_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            this.riesgoResidualModel.severidadId = this.riesgoResidualModel.severidad;

            //alert(this.riesgoResidualModel.severidadId);

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {

                this.dataList.push({
                  selected: element.atts[1].value.trim() === this.riesgoResidualModel.severidadId ? true : false,
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
            this.autentication.showMessage(data.success, data.message, this.riesgoResidualModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgoResidualModel, false);
      });
    });
  }

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

            this.riesgoResidualModel.probabilidadId = this.riesgoResidualModel.probabilidad;

          } else {
            this.autentication.showMessage(data.success, data.message, this.riesgoResidualModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgoResidualModel, false);
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

            this.riesgoResidualModel.severidadId = this.riesgoResidualModel.severidad;

          } else {
            this.autentication.showMessage(data.success, data.message, this.riesgoResidualModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgoResidualModel, false);
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

            this.riesgoResidualModel.criticidadId = this.riesgoResidualModel.criticidad;

          } else {
            this.autentication.showMessage(data.success, data.message, this.riesgoResidualModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgoResidualModel, false);
      });
    });
  }

  guardar() {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'CONSECUENCIA_MODIFY_RR'});
    _atts.push({ name: 'areaId', value: this.riesgoResidualModel.areaId });
    _atts.push({ name: 'procesoId', value: this.riesgoResidualModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.riesgoResidualModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.riesgoResidualModel.actividadId });
    _atts.push({ name: 'tareaId', value: this.riesgoResidualModel.tareaId });
    _atts.push({ name: 'dimensionId', value: this.riesgoResidualModel.dimensionId });
    _atts.push({ name: 'riesgoId', value: this.riesgoResidualModel.riesgoId });
    _atts.push({ name: 'consecuenciaId', value: this.riesgoResidualModel.consecuenciaId });
    _atts.push({ name: 'riesgoResidualP', value: '' });
    _atts.push({ name: 'riesgoResidualS', value: this.riesgoResidualModel.severidadId });
    _atts.push({ name: 'riesgoResidualC', value: '' });
    _atts.push({ name: 'versionId', value: this.riesgoResidualModel.versionId });

    if ( this.riesgoResidualModel.severidadId === undefined || this.riesgoResidualModel.severidadId === null || this.riesgoResidualModel.severidadId.trim() === '' ) { 
      this.autentication.showMessage(false, 'Seleccione la Severidad', this.riesgoResidualModel, false);
      return;
    }

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.riesgoResidualModel, data.redirect);
        this.dialogRef.close(true);
      } else {
        this.autentication.showMessage(data.success, data.message, this.riesgoResidualModel, data.redirect);
      }
    }
    else {
      this.autentication.showMessage(data.success, data.message, this.riesgoResidualModel, data.redirect);
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgoResidualModel, false);
      this.controlService.closeSpinner(spinner);
      this.dialogRef.close(true);
    });

  }

  cancelar() {
    this.dialogRef.close(true);
  }

}
