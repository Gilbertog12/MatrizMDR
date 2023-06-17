/* A dialog component that is used to add controls to a risk. */
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import Swal2 from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
import { NuevaEntidadComponent } from '../../../nueva-entidad/nueva-entidad.component';


export interface AddItem {
  Id: string;
  Descripcion: string;
  selected: boolean;
  }

@Component({
  selector: 'app-rkycblando',
  templateUrl: './rkycblando.component.html',
  styleUrls: ['./rkycblando.component.scss']
})

export class RkycblandoComponent implements OnInit {

  CblandoControl = new FormControl("", [Validators.required]);
  removable = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  bloquearFiltro: boolean;
  isLoading: boolean;
  public columnas : string[] = ['select', 'Id', 'Descripcion'];
  public datasource: MatTableDataSource<AddItem>;
  public controlesBList: AddItem[] = [];
  public controlesBListSeleccionadas: AddItem[] = [];
  public cBlandoModel: any = {

    cblandoId: "",
    name: "",
    areaDescripcion: "",

  };
  public descripcion: string;

  bankMultiFilterCtrl = new FormControl();

  public cBlandosList: any[] = [];
  indice: number = 1;

  constructor(public dialogRef: MatDialogRef<RkycblandoComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              private confirm: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.cBlandoModel.areaId = data.areaId;
                this.cBlandoModel.procesoId = data.procesoId;
                this.cBlandoModel.subprocesoId = data.subprocesoId;
                this.cBlandoModel.actividadId = data.actividadId;
                this.cBlandoModel.tareaId = data.tareaId;
                this.cBlandoModel.dimensionId = data.dimensionId;
                this.cBlandoModel.riesgoId = data.riesgoId;
                this.cBlandoModel.consecuenciaId = data.consecuenciaId;
                this.cargarcblandos();
              }

  ngOnInit() { }

  remove(fruit: AddItem): void {
    const index = this.controlesBListSeleccionadas.indexOf(fruit);

    if (index >= 0) {
      this.controlesBListSeleccionadas.splice(index, 1);

    }

    this.deseleccionar(fruit);

  }

  deseleccionar(item: AddItem) {
    for (let i  = 0; i < this.datasource.data.length; i++) {

      if (this.datasource.data[i] === item && this.datasource.data[i].selected === true) {
        this.datasource.data[i].selected = false ;
      }
    }
  }
  applyFilter(filterValue) {
    console.log(filterValue);
    console.log(filterValue);

    filterValue = filterValue.trim().toLowerCase();

    this.datasource.filter = filterValue;

        // tslint:disable-next-line: one-line

    this.datasource.data = [];
    this.bloquearFiltro = true;
    this.controlesBList = [];
    this.cargarcblandos(filterValue);

  }

  seleccionar( id: AddItem ) {
    for (let i  = 0; i < this.datasource.data.length; i++) {
      if ( this.datasource.data[i]['selected'] === true ) {

        this.controlesBListSeleccionadas.push(this.datasource.data[i]) ;
        this.controlesBListSeleccionadas = this.controlesBListSeleccionadas.filter((item, index) => {
          return this.controlesBListSeleccionadas.indexOf(item) === index;
        });
      } else {
        debugger;
        if (this.datasource.data[i]['selected'] === false) {

          this.remove(this.datasource.data[i]);
        }
      }
    }
  }

  pageEvents(pagina: MatPaginator) {

    if (!this.paginator.hasNextPage()) {
      debugger;
      this.indice = this.indice + 1;
      console.log(this.txtBuscar.nativeElement.value);
      if (this.txtBuscar.nativeElement.value === "" || this.txtBuscar.nativeElement.value === undefined ) {
        this.cargarcblandos('', this.indice);
      } else {
        this.controlesBList = [];
        this.cargarcblandos(this.txtBuscar.nativeElement.value, this.indice);

      }

     }

 }

  cargarcblandos(name?, index?) {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'CBLANDO_LIST'});
    _atts.push({name: 'areaId', value: this.cBlandoModel.careaId });
    _atts.push({name: 'procesoId', value: this.cBlandoModel.procesoId });
    _atts.push({name: 'subprocesoId', value: this.cBlandoModel.subprocesoId });
    _atts.push({name: 'actividadId', value: this.cBlandoModel.actividadId });
    _atts.push({name: 'tareaId', value: this.cBlandoModel.tareaId });
    _atts.push({name: 'dimensionId', value: this.cBlandoModel.dimensionId });
    _atts.push({name: 'riesgoId', value: this.cBlandoModel.riesgoId });
    _atts.push({name: 'consecuenciaId', value: this.cBlandoModel.consecuenciaId });
    if(name === '' || name === undefined){

    }else{
      _atts.push({ name: "lookupName", value: '%'+name });
    }
    _atts.push({ name: "index", value: index });
    this.isLoading = true;

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            if (data.data.length === 0 && index !== undefined) {

              this.isLoading = false;
              this.bloquearFiltro = false;
              return Swal2.fire({
                icon : 'info',
                text : 'Items Listados en su totalidad'
              });
            } else {
                if (data.data.length === 0) {
                  this.isLoading = false;
                  this.bloquearFiltro = false;
                  return Swal2.fire({
                icon : 'info',
                text : 'Codigo/Descripcion no encontrada'
              });
                }

            }

            data.data.forEach((element) => {
              if (element.atts.length > 0) {
                this.controlesBList.unshift({
                  Id: element.atts[0].value.trim(),
                  Descripcion: element.atts[2].value.trim(),
                  selected : false
                });
                this.bloquearFiltro = false;
              } else {

              }
            });

            this.controlesBList.sort(function (a, b) {
              if (a.Id > b.Id) {
                return 1;
              }
              if (a.Id < b.Id) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });

            this.datasource = new MatTableDataSource<AddItem>(this.controlesBList);
            console.log(this.datasource.data);
            this.datasource.paginator = this.paginator;
            this.isLoading = false;
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

    let ids = [];
    this.controlesBListSeleccionadas.forEach( id => {
            ids.push(id.Id);
         });

    console.log(ids)
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
    _atts.push({ name: 'cblandoId', value: ids.toString() });

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
          icon: 'success',
          text: 'Control Blando Agregado'

        });
        this.dialogRef.close(true);
      } else {
        Swal2.fire({
          icon: 'error',
          text: data.message
        });
        // this.autentication.showMessage(data.success, data.message, this.cBlandoModel, data.redirect);
      }
    } else {
      // this.autentication.showMessage(data.success, data.message, this.cBlandoModel, data.redirect);
      Swal2.fire({
        icon: 'error',
        text: data.message
      });
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


  nuevaEntidad(){

    const conf = this.confirm.open(NuevaEntidadComponent, {
      hasBackdrop: true,
      height: '600px',
      width: '950px',
        data: {
          title: 'Agregar Proceso',
          message: ``,
          accion: 'PROCESO_LIST',
          crear : 'PROCESO_CREATE',
          ok : 'Proceso Agregado',
          button_confirm: 'Guardar',
          button_close: 'Cancelar',
          panelClass: 'nueva-entidad',
          tabla : this.data.tabla,
          titulo: 'Solicitud de creación Control Blando'
        }
      });

  }

}
