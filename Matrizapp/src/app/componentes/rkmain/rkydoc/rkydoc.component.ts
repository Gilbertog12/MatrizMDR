import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import Swal2 from 'sweetalert2';

@Component({
  selector: 'app-rkydoc',
  templateUrl: './rkydoc.component.html',
  styleUrls: ['./rkydoc.component.scss']
})

export class RkydocComponent implements OnInit {

  public filterModel: any = {
    documentNo: '',
    documentType: '',
    documentTypeDesc: '',
    startWith: '',
    keyword1: '',
    keyword2: ''
  };

  public docModel: any = {
    documentNo: ''
  };

  public dataList: any[] = [];

  public doList: any[] = [];

  public first: number = 1;
  public refresh: number = 1;
  public last: number = 1;
  public isLoading: boolean = false;
  public activePagination: boolean = false;
  
  constructor(public dialogRef: MatDialogRef<RkydocComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.docModel.areaId = data.areaId;
                this.docModel.procesoId = data.procesoId;
                this.docModel.subprocesoId = data.subprocesoId;
                this.docModel.actividadId = data.actividadId;
                this.docModel.tareaId = data.tareaId;
                this.docModel.dimensionId = data.dimensionId;
                this.docModel.riesgoId = data.riesgoId;
                this.docModel.consecuenciaId = data.consecuenciaId;
                this.cargarTipoDocs();
              }

  ngOnInit() { }

  cargarTipoDocs() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'DO_LIST'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.doList.push({
                    Id: element.atts[0].value,
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.filterModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.filterModel, false);
      });
    });
  }

  getDescription(item: any){
    this.filterModel.documentTypeDesc = item.Descripcion;
  }

  deseleccionarTodo(item: any) { 

    this.dataList.forEach( (element) => {
      if ( element.documentNo !== item.documentNo) {
          element.selected = false;
      }
    });

    this.docModel.documentNo = '';
    if ( item.selected === true ) {
      this.docModel.documentNo = item.documentNo;
    }
  }

  cargarTablaDocs(startId, direction) {
    this.isLoading = true;
    this.activePagination = false;
    this.dataList = [];
    let _atts = [];

    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'DOCUMENTO_LIST'});
    _atts.push({name: 'documentNo', value: this.filterModel.documentNo });
    _atts.push({name: 'documentType', value: this.filterModel.documentType });
    _atts.push({name: 'documentTypeDesc', value: this.filterModel.documentTypeDesc });
    _atts.push({name: 'startWith', value: this.filterModel.startWith });
    _atts.push({name: 'keyword1', value: this.filterModel.keyword1 });
    _atts.push({name: 'keyword2', value: this.filterModel.keyword2 });
    _atts.push({name: 'startId', value: startId });
    _atts.push({name: 'direction', value: direction });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            this.docModel.documentNo = this.docModel.document;

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {

                  this.dataList.push({
                    selected: element.atts[1].value.trim() === this.docModel.documentNo ? true : false,
                    offset: element.atts[0].value,
                    documentNo: element.atts[1].value,
                    documentName: element.atts[2].value,
                    documentType: element.atts[3].value,
                    documentTypeDesc: element.atts[4].value,
                    documentAuthor: element.atts[5].value
                  });

                  this.last = parseInt(element.atts[0].value, 0);
              }
            });

            if ( this.dataList.length > 0) {
              this.first = parseInt(this.dataList[0].offset, 0);
              this.activePagination = true;
              //this.actual = parseInt(element.atts[0].value, 0);
            }
            else{
              this.activePagination = false;
            }

          } else {
            this.autentication.showMessage(data.success, data.message, this.docModel, data.redirect);
          }
          this.isLoading = false;
          //this.activePagination = true;
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.docModel, false);
        this.isLoading = false;
        this.activePagination = true;
      });
    });
  }

  /*aceptar() {
    localStorage.setItem('selDoc', this.docModel.documentNo);
    this.dialogRef.close(true);
  }*/

  aceptar() {
    //console.log(this.docModel);
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'DOCUMENTO_CREATE'});
    _atts.push({ name: 'areaId', value: this.docModel.areaId });
    _atts.push({ name: 'procesoId', value: this.docModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.docModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.docModel.actividadId });
    _atts.push({ name: 'tareaId', value: this.docModel.tareaId });
    _atts.push({ name: 'dimensionId', value: this.docModel.dimensionId });
    _atts.push({ name: 'riesgoId', value: this.docModel.riesgoId });
    _atts.push({ name: 'consecuenciaId', value: this.docModel.consecuenciaId });
    _atts.push({ name: 'documentoId', value: this.docModel.documentNo });
    //localStorage.setItem('selDoc', this.docModel.documentNo);
 
    if ( this.docModel.documentNo === undefined || this.docModel.documentNo === null || this.docModel.documentNo.trim() === '' ) { 
      // this.autentication.showMessage(false, 'No ha seleccionado un Documento', this.docModel, false);
      Swal2.fire('','No ha seleccionado un Documento','warning')
      return;
    }

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.docModel, data.redirect);
          Swal2.fire('',data.data[0].atts[1].value,'success')
        this.dialogRef.close(true);
      } else {
        // this.autentication.showMessage(data.success, data.message, this.docModel, data.redirect);
        Swal2.fire('',data.data[0].atts[1].value,'success')
        this.dialogRef.close(true);
      }
    }
    else {
      // this.autentication.showMessage(data.success, data.message, this.docModel, data.redirect);
      Swal2.fire('',data.message,'error')
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.docModel, false);
      this.controlService.closeSpinner(spinner);
      this.dialogRef.close(true);
    });

  }

  cancelar() {
    this.dialogRef.close(true);
  }

}
