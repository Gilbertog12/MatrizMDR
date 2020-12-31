import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { MatDialog } from '@angular/material';
import Swal2 from 'sweetalert2';

@Component({
  selector: 'app-addrkt',
  templateUrl: './addrkt.component.html',
  styleUrls: ['./addrkt.component.scss']
})

export class AddrktComponent implements OnInit {

  public tareaModel: any = {
    areaId: '',
    procesoId: '',
    subprocesoId: '',
    actividadId: '',
    tareaId: '',
    name: '',
    subprocesoDescripcion: '',
  };

  public tareasList: any[] = [];
  public descripcion: string

  tareaControl = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AddrktComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.tareaModel = {
      areaId: this.data.areaId,
      procesoId: this.data.procesoId,
      subprocesoId: this.data.subprocesoId,
      actividadId: this.data.actividadId,
      tareaId: '',
      name: this.data.name,
      subprocesoDescripcion: ''
    };
    this.tareasList = [];
    this.cargarTareas(this.tareaModel.areaId, this.tareaModel.procesoId, this.tareaModel.subprocesoId, this.tareaModel.actividadId, this.tareaModel.name);
  }

  ngOnInit() {
  }

  cargarTareas(areaId: string, procesoId: string, subprocesoId: string, actividadId: string, name: string) {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'TAREA_LIST' });
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'actividadId', value: actividadId });
    _atts.push({ name: 'name', value: name });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  this.tareasList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
                }
              });

            }
            else {
              this.autentication.showMessage(data.success, data.message, this.tareasList, data.redirect);
            }
            return result;
          },
          (error) => {
            this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.tareasList, false);
          });
    });
  }

  async guardar() {

    Swal2.fire({
      title: 'Agregar Tarea',
      text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{
		if(result.value){
			let ids = this.tareaModel.tareaId.toString();
            let _atts = [];
            _atts.push({ name: 'scriptName', value: 'coemdr' });
            _atts.push({ name: 'action', value: 'TAREA_CREATE' });
            _atts.push({ name: 'areaId', value: this.tareaModel.areaId });
            _atts.push({ name: 'procesoId', value: this.tareaModel.procesoId });
            _atts.push({ name: 'subprocesoId', value: this.tareaModel.subprocesoId });
            _atts.push({ name: 'actividadId', value: this.tareaModel.actividadId });
            _atts.push({ name: 'tareaId', value: ids });

            const spinner = this.controlService.openSpinner();
            const obj =  this.autentication.generic(_atts);

            obj.subscribe(
              (data) => {
                if (data.success === true) {
                  if (data.data[0].atts[1]) {
                    Swal2.fire({text:'Tarea Agregada', icon: 'success'})
                    // this.autentication.showMessage(data.data[0].atts[0].value, data.data[0].atts[1].value, this.tareaModel, data.redirect);
                    this.tareaModel = {
                      areaId: this.data.areaId,
                      procesoId: this.data.procesoId,
                      subprocesoId: this.data.subprocesoId,
                      actividadId: this.data.actividadId,
                      tareaId: '',
                      subprocesoDescripcion: ''
                    };
                    this.tareasList = [];
                    this.cargarTareas(this.tareaModel.areaId, this.tareaModel.procesoId, this.tareaModel.subprocesoId, this.tareaModel.actividadId, this.tareaModel.name);
                    this.cancelar();
                  }
                  else {
                    this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
                    this.tareaModel.tareaId = '';
                  }
                }
                else {
                  // this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
                  Swal2.fire('',data.message,'error')
                  this.tareaModel.tareaId = '';
                }
                this.controlService.closeSpinner(spinner);
              },
              (error) => {
                this.controlService.closeSpinner(spinner);
                this.tareaModel.tareaId = '';
              });
		}
	})

    // const conf = this.confirm.open(ConfirmationComponent, {
    //   hasBackdrop: true,
    //   height: 'auto',
    //   width: 'auto',
    //   data: {
    //     title: 'Crear Tarea',
    //     message: `¿Desea guardar esta Tarea?`,
    //     button_confirm: 'Si',
    //     button_close: 'No'
    //   }
    // });

    // conf.afterClosed()
    //   .subscribe(async (result) => {

        
    //     if (result) {
          
    //         let ids = this.tareaModel.tareaId.toString();
    //         let _atts = [];
    //         _atts.push({ name: 'scriptName', value: 'coemdr' });
    //         _atts.push({ name: 'action', value: 'TAREA_CREATE' });
    //         _atts.push({ name: 'areaId', value: this.tareaModel.areaId });
    //         _atts.push({ name: 'procesoId', value: this.tareaModel.procesoId });
    //         _atts.push({ name: 'subprocesoId', value: this.tareaModel.subprocesoId });
    //         _atts.push({ name: 'actividadId', value: this.tareaModel.actividadId });
    //         _atts.push({ name: 'tareaId', value: ids });

    //         const spinner = this.controlService.openSpinner();
    //         const obj = await this.autentication.generic(_atts);

    //         obj.subscribe(
    //           (data) => {
    //             if (data.success === true) {
    //               if (data.data[0].atts[1]) {
    //                 Swal2.fire('', data.data[0].atts[1].value, 'success')
    //                 // this.autentication.showMessage(data.data[0].atts[0].value, data.data[0].atts[1].value, this.tareaModel, data.redirect);
    //                 this.tareaModel = {
    //                   areaId: this.data.areaId,
    //                   procesoId: this.data.procesoId,
    //                   subprocesoId: this.data.subprocesoId,
    //                   actividadId: this.data.actividadId,
    //                   tareaId: '',
    //                   subprocesoDescripcion: ''
    //                 };
    //                 this.tareasList = [];
    //                 this.cargarTareas(this.tareaModel.areaId, this.tareaModel.procesoId, this.tareaModel.subprocesoId, this.tareaModel.actividadId, this.tareaModel.name);
    //                 this.cancelar();
    //               }
    //               else {
    //                 this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
    //                 this.tareaModel.tareaId = '';
    //               }
    //             }
    //             else {
    //               // this.autentication.showMessage(data.success, data.message, this.tareaModel, data.redirect);
    //               Swal2.fire('',data.message,'error')
    //               this.tareaModel.tareaId = '';
    //             }
    //             this.controlService.closeSpinner(spinner);
    //           },
    //           (error) => {
    //             this.controlService.closeSpinner(spinner);
    //             this.tareaModel.tareaId = '';
    //           });

    //       }
        
    //   });
  }

  async Buscar(event) {

    if (event.key === "Enter") {

      if(this.tareasList.length === 0 ){

        this.autentication.showMessage(false,'No hay coincidencias',this.tareaModel,false);
        this.tareaModel.name= '';
        this.tareasList = [];

      this.cargarTareas(this.tareaModel.areaId, this.tareaModel.procesoId, this.tareaModel.subprocesoId, this.tareaModel.actividadId, this.tareaModel.name);
      
      }

      this.tareasList = [];

      this.cargarTareas(this.tareaModel.areaId, this.tareaModel.procesoId, this.tareaModel.subprocesoId, this.tareaModel.actividadId, this.tareaModel.name);

    }

  }





  cancelar() {
    this.tareaModel.tareaId = '';
    this.dialogRef.close(false);
  }

}