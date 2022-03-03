import { Component, OnInit, Inject, ɵConsole, Output, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelect } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../shared';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

import { MatDialog } from '@angular/material';
import Swal2 from 'sweetalert2'







@Component({
  selector: 'app-addrkd',
  templateUrl: './addrkd.component.html',
  styleUrls: ['./addrkd.component.scss']
})

export class AddrkdComponent implements OnInit {


  // tslint:disable-next-line: no-empty

  public dimensionModel: any = {
    areaId: '',
    procesoId: '',
    subprocesoId: '',
    actividadId: '',
    tareaId: '',
    dimensionId: '',
    name: '',
    dimensionDescripcion: '',
  };

  public dimensionesList: any[] = [];
  public descripcion: string



  dimensionControl = new FormControl('', [Validators.required]);
  bankMultiFilterCtrl = new FormControl()

  constructor(private builder: FormBuilder, public dialogRef: MatDialogRef<AddrkdComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dimensionModel = {
      areaId: this.data.areaId,
      procesoId: this.data.procesoId,
      subprocesoId: this.data.subprocesoId,
      actividadId: this.data.actividadId,
      tareaId: this.data.tareaId,
      dimensionId: '',
      name: this.data.name,
      area: '',
      subprocesoDescripcion: ''
    };
    this.dimensionesList = [];
    this.cargardimensiones(this.dimensionModel.areaId, this.dimensionModel.procesoId, this.dimensionModel.subprocesoId, this.dimensionModel.actividadId, this.dimensionModel.tareaId, this.dimensionModel.name);
  }


  // tslint:disable-next-line: no-empty
  ngOnInit() {


  }


  cargardimensiones(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, tareaId: string, name: string) {

    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'DIMENSION_LIST' });
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'actividadId', value: actividadId });
    _atts.push({ name: 'tareaId', value: tareaId });
    _atts.push({ name: 'name', value: name });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  this.dimensionesList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
                }
              });

            }
            else {
              this.autentication.showMessage(data.success, data.message, this.dimensionesList, data.redirect);
            }
            return result;
          },
          (error) => {
            this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.dimensionesList, false);
          });
    });

  }

  async Buscar(event) {


    if (event.key === "Enter") {

      if(this.dimensionModel.lenght === 0){

        
        this.autentication.showMessage(false, 'No Hay coincidencias',this.dimensionModel, false)
        this.dimensionModel.name = "";
        this.dimensionesList = [];

        this.cargardimensiones(this.dimensionModel.areaId, this.dimensionModel.procesoId, this.dimensionModel.subprocesoId, this.dimensionModel.actividadId, this.dimensionModel.tareaId, this.dimensionModel.name);


      }else{

        this.dimensionesList = [];
      this.cargardimensiones(this.dimensionModel.areaId, this.dimensionModel.procesoId, this.dimensionModel.subprocesoId, this.dimensionModel.actividadId, this.dimensionModel.tareaId, this.dimensionModel.name);

      }
      
      

    }

  }





  async guardar() {

    Swal2.fire({
      title: 'Agregar Dimensión',
      text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{
		if(result.value){
			let ids = this.dimensionModel.dimensionId.toString();
            var _atts = [];
            console.log(_atts);

            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'DIMENSION_CREATE' });
            _atts.push({ name: 'areaId', value: this.dimensionModel.areaId });
            _atts.push({ name: 'procesoId', value: this.dimensionModel.procesoId });
            _atts.push({ name: 'subprocesoId', value: this.dimensionModel.subprocesoId });
            _atts.push({ name: 'actividadId', value: this.dimensionModel.actividadId });
            _atts.push({ name: 'tareaId', value: this.dimensionModel.tareaId });
            _atts.push({ name: 'dimensionId', value: ids});

            const spinner = this.controlService.openSpinner();
            const obj =  this.autentication.generic(_atts);

            obj.subscribe(
              (data) => {
                if (data.success === true) {
                  if (data.data[0].atts[1]) {
                    // this.autentication.showMessage( data.data[0].atts[0].value, data.data[0].atts[1].value, this.dimensionModel, data.redirect);
                    Swal2.fire({text:'Dimension Agregada', icon:'success'})
                    this.dimensionModel = {
                      areaId: this.data.areaId,
                      procesoId: this.data.procesoId,
                      subprocesoId: this.data.subprocesoId,
                      actividadId: this.data.actividadId,
                      tareaId: this.data.tareaId,
                      dimensionId: '',
                      subprocesoDescripcion: ''
                    };
                    this.dimensionesList = [];
                    this.cargardimensiones(this.dimensionModel.areaId, this.dimensionModel.procesoId, this.dimensionModel.subprocesoId, this.dimensionModel.actividadId, this.dimensionModel.tareaId, this.dimensionModel.name);
                    this.cancelar();
                  } else {
                    // this.autentication.showMessage(data.success, data.message, this.dimensionModel, data.redirect);
                    Swal2.fire('',data.message,'error')
                    this.dimensionModel.dimensionId = '';
                  }
                } else {
                  this.autentication.showMessage(data.success, data.message, this.dimensionModel, data.redirect);
                  this.dimensionModel.dimensionId = '';
                }
                this.controlService.closeSpinner(spinner);
              });
		}
	})

    // const conf = this.confirm.open(ConfirmationComponent, {
    //   hasBackdrop: true,
    //   height: 'auto',
    //   width: 'auto',
    //   data: {
    //     title: 'Crear Dimensión',
    //     message: `¿Desea guardar esta Dimensión?`,
    //     button_confirm: 'Si',
    //     button_close: 'No'
    //   }
    // });



    // conf.afterClosed()
    //   .subscribe(async (result) => {

        


    //       if (result) {
    //         let ids = this.dimensionModel.dimensionId.toString();
    //         var _atts = [];
    //         console.log(_atts);

    //         _atts.push({ name: 'scriptName', value: 'coemdr' });
    //         _atts.push({ name: 'action', value: 'DIMENSION_CREATE' });
    //         _atts.push({ name: 'areaId', value: this.dimensionModel.areaId });
    //         _atts.push({ name: 'procesoId', value: this.dimensionModel.procesoId });
    //         _atts.push({ name: 'subprocesoId', value: this.dimensionModel.subprocesoId });
    //         _atts.push({ name: 'actividadId', value: this.dimensionModel.actividadId });
    //         _atts.push({ name: 'tareaId', value: this.dimensionModel.tareaId });
    //         _atts.push({ name: 'dimensionId', value: ids});

    //         const spinner = this.controlService.openSpinner();
    //         const obj = await this.autentication.generic(_atts);

    //         obj.subscribe(
    //           (data) => {
    //             if (data.success === true) {
    //               if (data.data[0].atts[1]) {
    //                 // this.autentication.showMessage( data.data[0].atts[0].value, data.data[0].atts[1].value, this.dimensionModel, data.redirect);
    //                 Swal2.fire('',data.data[0].atts[1].value,'succes')
    //                 this.dimensionModel = {
    //                   areaId: this.data.areaId,
    //                   procesoId: this.data.procesoId,
    //                   subprocesoId: this.data.subprocesoId,
    //                   actividadId: this.data.actividadId,
    //                   tareaId: this.data.tareaId,
    //                   dimensionId: '',
    //                   subprocesoDescripcion: ''
    //                 };
    //                 this.dimensionesList = [];
    //                 this.cargardimensiones(this.dimensionModel.areaId, this.dimensionModel.procesoId, this.dimensionModel.subprocesoId, this.dimensionModel.actividadId, this.dimensionModel.tareaId, this.dimensionModel.name);
    //                 this.cancelar();
    //               } else {
    //                 // this.autentication.showMessage(data.success, data.message, this.dimensionModel, data.redirect);
    //                 Swal2.fire('',data.message,'error')
    //                 this.dimensionModel.dimensionId = '';
    //               }
    //             } else {
    //               this.autentication.showMessage(data.success, data.message, this.dimensionModel, data.redirect);
    //               this.dimensionModel.dimensionId = '';
    //             }
    //             this.controlService.closeSpinner(spinner);
    //           });
    //       }
        

    //   });

  }



  cancelar() {
    this.dimensionModel.dimensionId = '';
    this.dialogRef.close(false);
  }



}
