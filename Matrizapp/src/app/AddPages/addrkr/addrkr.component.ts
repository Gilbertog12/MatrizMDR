import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../shared';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from '../../controls/confirmation/confirmation.component';
import { MatDialog } from '@angular/material';
import Swal2 from 'sweetalert2';

@Component({
  selector: 'app-addrkr',
  templateUrl: './addrkr.component.html',
  styleUrls: ['./addrkr.component.scss']
})

export class AddrkrComponent implements OnInit {

  public riesgoModel: any = {
    areaId: '',
    procesoId: '',
    subprocesoId: '',
    actividadId: '',
    tareaId: '',
    dimensionId: '',
    riesgoId: '',
    name: '',
    riesgoDescripcion: '',
  };

  public riesgosList: any[] = [];
  public descripcion: string

  riesgoControl = new FormControl('', [Validators.required]);
  public bankMultiFilterCtrl: FormControl = new FormControl();


  constructor(public dialogRef: MatDialogRef<AddrkrComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.riesgoModel = {
      areaId: this.data.areaId,
      procesoId: this.data.procesoId,
      subprocesoId: this.data.subprocesoId,
      actividadId: this.data.actividadId,
      tareaId: this.data.tareaId,
      dimensionId: this.data.dimensionId,
      riesgoId: '',
      name: this.data.name,
      subprocesoDescripcion: ''
    };
    this.riesgosList = [];
    this.cargarRiesgos(this.riesgoModel.areaId, this.riesgoModel.procesoId, this.riesgoModel.subprocesoId, this.riesgoModel.actividadId, this.riesgoModel.tareaId, this.riesgoModel.dimensionId, this.riesgoModel.name);
  }

  ngOnInit() {
  }

  cargarRiesgos(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string, dimensionId: string, name: string) {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'RIESGO_LIST' });
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'actividadId', value: actividadId });
    _atts.push({ name: 'tareaId', value: tareaId });
    _atts.push({ name: 'dimensionId', value: dimensionId });
    _atts.push({ name: 'name', value: name });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  this.riesgosList.push({
                    Id: element.atts[0].value.trim(),
                    Descripcion: element.atts[1].value
                  });
                }
              });

            }
            else {
              this.autentication.showMessage(data.success, data.message, this.riesgosList, data.redirect);
            }
            return result;
          },
          (error) => {
            this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.riesgosList, false);
          });
    });
  }

  async guardar() {

    Swal2.fire({
      title: 'Agregar Riesgo',
      text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{
		if(result.value){
			
      let ids = this.riesgoModel.riesgoId.toString();
      

          let _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'RIESGO_CREATE' });
          _atts.push({ name: 'areaId', value: this.riesgoModel.areaId });
          _atts.push({ name: 'procesoId', value: this.riesgoModel.procesoId });
          _atts.push({ name: 'subprocesoId', value: this.riesgoModel.subprocesoId });
          _atts.push({ name: 'actividadId', value: this.riesgoModel.actividadId });
          _atts.push({ name: 'tareaId', value: this.riesgoModel.tareaId });
          _atts.push({ name: 'dimensionId', value: this.riesgoModel.dimensionId });
          _atts.push({ name: 'riesgoId', value: ids.trim() });

          const spinner = this.controlService.openSpinner();
          const obj =  this.autentication.generic(_atts);

          obj.subscribe(
            (data) => {
              if (data.success === true) {
                if (data.data[0].atts[1]) {
                  // this.autentication.showMessage(data.data[0].atts[0].value, data.data[0].atts[1].value, this.riesgoModel, data.redirect);
                  Swal2.fire({text:'Riesgo Agregado', icon:'success'})
                  this.riesgoModel = {
                    areaId: this.data.areaId,
                    procesoId: this.data.procesoId,
                    subprocesoId: this.data.subprocesoId,
                    actividadId: this.data.actividadId,
                    tareaId: this.data.tareaId,
                    dimensionId: this.data.dimensionId,
                    riesgoId: '',
                    subprocesoDescripcion: ''
                  };
                  this.riesgosList = [];
                  this.cargarRiesgos(this.riesgoModel.areaId, this.riesgoModel.procesoId, this.riesgoModel.subprocesoId, this.riesgoModel.actividadId, this.riesgoModel.tareaId, this.riesgoModel.dimensionId, this.riesgoModel.name);
                  this.cancelar();
                }
                else {
                  // this.autentication.showMessage(data.success, data.message, this.riesgoModel, data.redirect);
                  Swal2.fire('',data.message.value,'error')
                  this.riesgoModel.riesgoId = '';
                }
              } else {
                // this.autentication.showMessage(data.success, data.message, this.riesgoModel, data.redirect);
                Swal2.fire('',data.message.value,'error')
                this.riesgoModel.riesgoId = '';
              }
              this.controlService.closeSpinner(spinner);
            },
            (error) => {
              this.controlService.closeSpinner(spinner);
              this.riesgoModel.riesgoId = '';
            });
		}
	})

    // const conf = this.confirm.open(ConfirmationComponent, {
    //   hasBackdrop: true,
    //   height: 'auto',
    //   width: 'auto',
    //   data: {
    //     title: 'Crear Riesgo',
    //     message: `¿Desea guardar este Riesgo?`,
    //     button_confirm: 'Si',
    //     button_close: 'No'
    //   }
    // });


    // conf.afterClosed()
    //   .subscribe(async (result) => {
    //     if (result) {

    //       let ids = this.riesgoModel.riesgoId.toString();
    //       let _atts = [];
    //       _atts.push({ name: 'scriptName', value: 'coemdr' });
    //       _atts.push({ name: 'action', value: 'RIESGO_CREATE' });
    //       _atts.push({ name: 'areaId', value: this.riesgoModel.areaId });
    //       _atts.push({ name: 'procesoId', value: this.riesgoModel.procesoId });
    //       _atts.push({ name: 'subprocesoId', value: this.riesgoModel.subprocesoId });
    //       _atts.push({ name: 'actividadId', value: this.riesgoModel.actividadId });
    //       _atts.push({ name: 'tareaId', value: this.riesgoModel.tareaId });
    //       _atts.push({ name: 'dimensionId', value: this.riesgoModel.dimensionId });
    //       _atts.push({ name: 'riesgoId', value: ids });

    //       const spinner = this.controlService.openSpinner();
    //       const obj = await this.autentication.generic(_atts);

    //       obj.subscribe(
    //         (data) => {
    //           if (data.success === true) {
    //             if (data.data[0].atts[1]) {
    //               this.autentication.showMessage(data.data[0].atts[0].value, data.data[0].atts[1].value, this.riesgoModel, data.redirect);
    //               this.riesgoModel = {
    //                 areaId: this.data.areaId,
    //                 procesoId: this.data.procesoId,
    //                 subprocesoId: this.data.subprocesoId,
    //                 actividadId: this.data.actividadId,
    //                 tareaId: this.data.tareaId,
    //                 dimensionId: this.data.dimensionId,
    //                 riesgoId: '',
    //                 subprocesoDescripcion: ''
    //               };
    //               this.riesgosList = [];
    //               this.cargarRiesgos(this.riesgoModel.areaId, this.riesgoModel.procesoId, this.riesgoModel.subprocesoId, this.riesgoModel.actividadId, this.riesgoModel.tareaId, this.riesgoModel.dimensionId, this.riesgoModel.name);
    //               this.cancelar();
    //             }
    //             else {
    //               this.autentication.showMessage(data.success, data.message, this.riesgoModel, data.redirect);
    //               this.riesgoModel.riesgoId = '';
    //             }
    //           } else {
    //             this.autentication.showMessage(data.success, data.message, this.riesgoModel, data.redirect);
    //             this.riesgoModel.riesgoId = '';
    //           }
    //           this.controlService.closeSpinner(spinner);
    //         },
    //         (error) => {
    //           this.controlService.closeSpinner(spinner);
    //           this.riesgoModel.riesgoId = '';
    //         });

    //     } // if

    //   });


  }
  async Buscar(event) {

    if (event.key === "Enter") {
      if(this.riesgosList.length ===0){

        this.autentication.showMessage(false, 'No hay coincidencias',this.riesgoModel,false)
        this.riesgoModel.name=''
        this.riesgosList = [];
        this.cargarRiesgos(this.riesgoModel.areaId, this.riesgoModel.procesoId, this.riesgoModel.subprocesoId, this.riesgoModel.actividadId, this.riesgoModel.tareaId, this.riesgoModel.dimensionId, this.riesgoModel.name);

      }else{
        this.riesgosList = [];
      this.cargarRiesgos(this.riesgoModel.areaId, this.riesgoModel.procesoId, this.riesgoModel.subprocesoId, this.riesgoModel.actividadId, this.riesgoModel.tareaId, this.riesgoModel.dimensionId, this.riesgoModel.name);
      }
      

    }


  }



  cancelar() {
    this.riesgoModel.riesgoId = '';
    this.dialogRef.close(false);
  }

}