import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import Swal2 from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rkycblando',
  templateUrl: './rkycblando.component.html',
  styleUrls: ['./rkycblando.component.scss']
})

export class RkycblandoComponent implements OnInit {

  CblandoControl = new FormControl("", [Validators.required]);
  
  public cBlandoModel: any = {
    
    cblandoId: "",
    name: "",
    areaDescripcion: "",
    
  };
  public descripcion: string
  
  bankMultiFilterCtrl = new FormControl();

  public cBlandosList: any[] = [];

  constructor(public dialogRef: MatDialogRef<RkycblandoComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.cBlandoModel.areaId = data.areaId;
                this.cBlandoModel.procesoId = data.procesoId;
                this.cBlandoModel.subprocesoId = data.subprocesoId;
                this.cBlandoModel.actividadId = data.actividadId;
                this.cBlandoModel.tareaId = data.tareaId;
                this.cBlandoModel.dimensionId = data.dimensionId;
                this.cBlandoModel.riesgoId = data.riesgoId;
                this.cBlandoModel.consecuenciaId = data.consecuenciaId;
                this.cargarcblandos(
                  this.cBlandoModel.areaId,
                  this.cBlandoModel.procesoId,
                  this.cBlandoModel.subprocesoId,
                  this.cBlandoModel.actividadId,
                  this.cBlandoModel.tareaId,
                  this.cBlandoModel.dimensionId,
                  this.cBlandoModel.riesgoId,
                  this.cBlandoModel.consecuenciaId,
                  this.cBlandoModel.name);
              }

  ngOnInit() { }

  cargarcblandos(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string, dimensionId: string, riesgoId: string, consecuenciaId: string,name:string) {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'CBLANDO_LIST'});
    _atts.push({name: 'areaId', value: areaId });
    _atts.push({name: 'procesoId', value: procesoId });
    _atts.push({name: 'subprocesoId', value: subprocesoId });
    _atts.push({name: 'actividadId', value: actividadId });
    _atts.push({name: 'tareaId', value: tareaId });
    _atts.push({name: 'dimensionId', value: dimensionId });
    _atts.push({name: 'riesgoId', value: riesgoId });
    _atts.push({name: 'consecuenciaId', value: consecuenciaId });
    _atts.push({name: 'name', value: name });


    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.cBlandosList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.cBlandoModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.cBlandoModel, false);
      });
    });
  }

  guardar() {

    let ids = this.cBlandoModel.cblandoId.toString();

    let _atts = [];

    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'CBLANDO_CREATE'});
    _atts.push({ name: 'areaId', value: this.cBlandoModel.areaId });
    _atts.push({ name: 'procesoId', value: this.cBlandoModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.cBlandoModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.cBlandoModel.actividadId });
    _atts.push({ name: 'tareaId', value: this.cBlandoModel.tareaId });
    _atts.push({ name: 'dimensionId', value: this.cBlandoModel.dimensionId });
    _atts.push({ name: 'riesgoId', value: this.cBlandoModel.riesgoId });
    _atts.push({ name: 'consecuenciaId', value: this.cBlandoModel.consecuenciaId });
    _atts.push({ name: 'cblandoId', value: ids });

    // if ( this.cBlandoModel.cblandoId === undefined || this.cBlandoModel.cblandoId === null || this.cBlandoModel.cblandoId === '' ) { 
    //   // this.autentication.showMessage(false, 'Seleccione un Control Blando', this.cBlandoModel, false);
    //   return;
    // }

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.cBlandoModel, data.redirect);
        Swal2.fire({
          icon:'success',
          text: 'Control Blando Agregado'

        })
        this.dialogRef.close(true);
      } else {
        Swal2.fire({
          icon:'error',
          text: data.message
        })
        // this.autentication.showMessage(data.success, data.message, this.cBlandoModel, data.redirect);
      }
    }
    else {
      // this.autentication.showMessage(data.success, data.message, this.cBlandoModel, data.redirect);
      Swal2.fire({
        icon:'error',
        text: data.message
      })
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.cBlandoModel, false);
      this.controlService.closeSpinner(spinner);
      this.dialogRef.close(true);
    });

  }

  cancelar() {
    this.dialogRef.close(true);
  }

  async Buscar(event) {
    if (event.key === "Enter") {
      if (this.cBlandosList.length === 0) {
        // alert("No Hay datos que coincidad con la busqueda");

        this.autentication.showMessage(
          false,
          "No Hay coincidencias",
          this.cBlandoModel,
          false
        );
        this.cBlandoModel.name = "";
        this.cBlandosList = [];

        this.cargarcblandos( this.cBlandoModel.areaId,
          this.cBlandoModel.procesoId,
          this.cBlandoModel.subprocesoId,
          this.cBlandoModel.actividadId,
          this.cBlandoModel.tareaId,
          this.cBlandoModel.dimensionId,
          this.cBlandoModel.riesgoId,
          this.cBlandoModel.consecuenciaId, this.cBlandoModel.name);
      } else {
        this.cBlandosList = [];
        this.cargarcblandos(this.cBlandoModel.areaId,
          this.cBlandoModel.procesoId,
          this.cBlandoModel.subprocesoId,
          this.cBlandoModel.actividadId,
          this.cBlandoModel.tareaId,
          this.cBlandoModel.dimensionId,
          this.cBlandoModel.riesgoId,
          this.cBlandoModel.consecuenciaId,this.cBlandoModel.name);
        console.log(this.cBlandosList);
      }
    }
  }

}
