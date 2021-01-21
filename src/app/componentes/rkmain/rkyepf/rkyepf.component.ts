import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import Swal2 from 'sweetalert2';

@Component({
  selector: 'app-rkyepf',
  templateUrl: './rkyepf.component.html',
  styleUrls: ['./rkyepf.component.scss']
})

export class RkyepfComponent implements OnInit {

  public epfModel: any = {
    paginacion: 1

  };
  valor:string

  public epfList: any[] = [];

  constructor(public dialogRef: MatDialogRef<RkyepfComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.epfModel.areaId = data.areaId;
                this.epfModel.procesoId = data.procesoId;
                this.epfModel.subprocesoId = data.subprocesoId;
                this.epfModel.actividadId = data.actividadId;
                this.epfModel.tareaId = data.tareaId;
                this.epfModel.dimensionId = data.dimensionId;
                this.epfModel.riesgoId = data.riesgoId;
                this.epfModel.consecuenciaId = data.consecuenciaId;
                
              }

  ngOnInit() { }

  cargarepfs() {

    this.epfList = []

    
    
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'EPF_LIST'});
    _atts.push({name: 'controlId', value: this.epfModel.epfcontrol  });
    _atts.push({name: 'controlDesc', value: this.epfModel.epfcontroldescripcion });
    _atts.push({name: 'epfId', value: this.epfModel.epf });
    _atts.push({name: 'epfDesc', value: this.epfModel.epfdescripcion });
    _atts.push({name: 'pageSize', value:  this.epfModel.paginacion});
   
    const spinner = this.controlService.openSpinner();
    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          console.log(data)
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.epfList.push({
                    controlId: element.atts[1].value,
                    controlDesc: element.atts[2].value,
                    epfId: element.atts[3].value,
                    epfDesc: element.atts[4].value,
                    check: false,
                  });
              }
            });

          } else {
            Swal2.fire('',data.message,'error')
          }
          this.controlService.closeSpinner(spinner);

          // return result;
      },
      (error) => {
        this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
      });
    });
  }  

  paginacion(pagina:number){
    
    
    this.epfModel.paginacion= this.epfModel.paginacion+pagina
    console.log(this.epfModel.paginacion)
    this.cargarepfs();

   }

  consola() {
    this.valor = '';
    
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.epfList.length; i++) {

      if (this.epfList[i]['check'] === true) {
        this.valor = this.epfList[i]['controlId'].trim()+','+this.valor;
        // this.valor.trim()
        // this.version = this.epfList[i]['version'] + ',' + this.version;
      }

    }
    console.log(this.valor + 'Hola');
    // AQUI COLOCA EL LLAMADO EL SRVICIIO

    this.guardar();

  }

  guardar() {

    if (this.valor === '' || this.valor === 'undefined') {
      // this.autentication.showMessage(false, 'Debe Seleccionar al menos 1 item', {}, false);
      Swal2.fire('','Debe Seleccionar al menos 1 item','info')
      return;
    }



    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'EPF_CREATE'});
    _atts.push({ name: 'areaId', value: this.epfModel.areaId });
    _atts.push({ name: 'procesoId', value: this.epfModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.epfModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.epfModel.actividadId });
    _atts.push({ name: 'tareaId', value: this.epfModel.tareaId });
    _atts.push({ name: 'dimensionId', value: this.epfModel.dimensionId });
    _atts.push({ name: 'riesgoId', value: this.epfModel.riesgoId });
    _atts.push({ name: 'consecuenciaId', value: this.epfModel.consecuenciaId });
    _atts.push({ name: 'controlEpfId', value: this.valor });

    // if ( this.epfModel.epfId === undefined || this.epfModel.epfId === null || this.epfModel.epfId.trim() === '' ) { 
    //   // this.autentication.showMessage(false, 'Seleccione el EPF', this.epfModel, false);

    //   Swal2.fire('','Seleccione el EPF','warning')
    //   return;
    // }

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.epfModel, data.redirect);
        Swal2.fire('','Control de EPF Agregado','success')
        // this.dialogRef.close(true);
      }
    } else {
      // this.autentication.showMessage(data.success, data.message, this.epfModel, data.redirect);
      Swal2.fire('',data.message,'error')
      this.dialogRef.close(true);
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.epfModel, false);
      this.controlService.closeSpinner(spinner);
      this.dialogRef.close(true);
    });

  }

  cancelar() {
    this.dialogRef.close(true);
  }

}
