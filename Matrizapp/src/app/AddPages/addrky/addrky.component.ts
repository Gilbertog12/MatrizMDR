import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../shared';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from '../../controls/confirmation/confirmation.component';
import { MatDialog } from '@angular/material';
import { async } from '@angular/core/testing';
import { AddrkyprobabilidadComponent } from '../addrkyprobabilidad/addrkyprobabilidad.component';
import { AddrkyseveridadComponent } from '../addrkyseveridad/addrkyseveridad.component';
// import Swal from 'sweetAlert';
import Swal2 from 'sweetalert2';
import { AddItem } from '../addrka/addrka.component';
import { NuevaEntidadComponent } from '../../nueva-entidad/nueva-entidad.component';

@Component({
  selector: 'app-addrky',
  templateUrl: './addrky.component.html',
  styleUrls: ['./addrky.component.scss']
})

export class AddrkyComponent implements OnInit {

  public consecuenciaModel: any = {
    areaId: '',
    procesoId: '',
    subprocesoId: '',
    actividadId: '',
    tareaId: '',
    dimensionId: '',
    riesgoId: '',
    consecuenciaId: '',
    consecuenciaDescripcion: '',
    riesgoPuroP: '',
    riesgoPuroS: '',
    riesgoPuroC: '',
    riesgoResidualP: '',
    riesgoResidualS: '',
    riesgoResidualC: '',
    name:''
  };

  public columnas : string[] = ['select', 'Id', 'Descripcion'];
  public datasource: MatTableDataSource<AddItem>;
  removable = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  bloquearFiltro: boolean;
  isLoading: boolean;
  public areasListSeleccionadas: AddItem[] = [];
  public consecuenciasList: any[] = [];
  public descripcion: string
  public probabilidadList: any[] = [];
  public severidadList: any[] = [];
  public criticidadList: any[] = [];

  consecuenciaControl = new FormControl('', [Validators.required]);
  riesgoPuroPControl = new FormControl('', [Validators.required]);
  riesgoPuroSControl = new FormControl('', [Validators.required]);
  riesgoPuroCControl = new FormControl('', [Validators.required]);
  riesgoResidualPControl = new FormControl('', [Validators.required]);
  riesgoResidualSControl = new FormControl('', [Validators.required]);
  riesgoResidualCControl = new FormControl('', [Validators.required]);
  bankMultiFilterCtrl = new FormControl()
  criticidadLevel: any[] = [];
  isLinear: boolean = true
  indice: number = 1;

    constructor(public dialogRef: MatDialogRef<AddrkyComponent>,
                private controlService: ControlsService,
                private autentication: AuthenticationService,
                private confirm: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: any) {
                  this.consecuenciaModel = {
                    areaId: this.data.areaId,
                    procesoId: this.data.procesoId,
                    subprocesoId: this.data.subprocesoId,
                    actividadId: this.data.actividadId,
                    tareaId: this.data.tareaId,
                    dimensionId: this.data.dimensionId,
                    riesgoId: this.data.riesgoId,
                    consecuenciaId: '',
                    consecuenciaDescripcion: '',
                    riesgoPuroP: '',
                    riesgoPuroS: '',
                    riesgoPuroC: '',
                    riesgoResidualP: '',
                    riesgoResidualS: '',
                    riesgoResidualC: '',
                    name: this.data.name
                  };
                  this.consecuenciasList = [];
                  debugger
                  this.cargarconsecuencias();
                  this.cargarprobabilidad();
                  this.cargarseveridad();
                  this.cargarcriticidad();
                }

  ngOnInit() { }

  pageEvents(pagina: MatPaginator) {

    if (!this.paginator.hasNextPage()) {
      debugger;
      this.indice = this.indice + 1;
      console.log(this.txtBuscar.nativeElement.value);
      if (this.txtBuscar.nativeElement.value === "" || this.txtBuscar.nativeElement.value === undefined ) {
        this.cargarconsecuencias('', this.indice);
      } else {
        this.consecuenciasList = [];
        this.cargarconsecuencias(this.txtBuscar.nativeElement.value, this.indice);

      }

     }

 }

  cargarconsecuencias( name?, index?) {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'CONSECUENCIA_LIST'});
    _atts.push({name: 'areaId', value: this.consecuenciaModel.areaId });
    _atts.push({name: 'procesoId', value: this.consecuenciaModel.procesoId });
    _atts.push({name: 'subprocesoId', value: this.consecuenciaModel.subprocesoId });
    _atts.push({name: 'actividadId', value: this.consecuenciaModel.actividadId });
    _atts.push({name: 'tareaId', value: this.consecuenciaModel.tareaId });
    _atts.push({name: 'dimensionId', value: this.consecuenciaModel.dimensionId });
    _atts.push({name: 'riesgoId', value: this.consecuenciaModel.riesgoId });
    if(name === '' || name === undefined){

    }else{
      _atts.push({ name: "lookupName", value: '%'+name });
    }
    _atts.push({ name: "index", value: index });
    this.isLoading = true

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts).subscribe(
        (data) => {
          const result = data.success;
          if (result) {
            // if(data.data.length > 0){

            // }

            if (data.data.length === 0 && index !== undefined) {

              this.isLoading = false;
              this.bloquearFiltro = false;
              return Swal2.fire({
                icon : 'info',
                text : 'Items Listados en su totalidad'
              });
            }else{
                if(data.data.length === 0){
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
                this.consecuenciasList.unshift({
                  Id: element.atts[0].value.trim(),
                  Descripcion: element.atts[2].value.trim(),
                  selected : false
                });
                this.bloquearFiltro = false
              }else{

              }
            });

            // console.log(this.areasList);
            this.consecuenciasList.sort( (a, b) => {
              if (a.Id > b.Id) {
                return 1;
              }
              if (a.Id < b.Id) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });
            this.datasource= new MatTableDataSource<AddItem>(this.consecuenciasList);
            console.log(this.datasource.data);
            this.datasource.paginator = this.paginator;
          } else {
            this.autentication.showMessage(
              data.success,
              data.message,
              this.consecuenciasList,
              data.redirect
            );
          }
          this.isLoading = false
          return result;
        },
        (error) => {
          this.autentication.showMessage(
            false,
            'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet',
            [],
            false
          );
        }
      );
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
                    Id: element.atts[0].value.trim(),
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
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
                    Id: element.atts[0].value.trim(),
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
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
                    Id: element.atts[0].value.trim(),
                    Descripcion: element.atts[1].value
                  });
              }
            });

          } else {
            this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
      });
    });
  }

  async guardar() {
    Swal2.fire({
      title: 'Agregar consecuencia',
      text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{
		if(result.value){

      let ids = []
      if(this.areasListSeleccionadas.length >0){

        this.areasListSeleccionadas.forEach( id => {
          ids.push(id.Id)
       })
      }else{
        return Swal2.fire({
          icon: 'warning',
          text : 'Debe seleccionar al menos una consecuencia'
        })
      }

    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr'});
    _atts.push({ name: 'action', value: 'CONSECUENCIA_CREATE'});
    _atts.push({ name: 'areaId', value: this.consecuenciaModel.areaId });
    _atts.push({ name: 'procesoId', value: this.consecuenciaModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.consecuenciaModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.consecuenciaModel.actividadId });
    _atts.push({ name: 'tareaId', value: this.consecuenciaModel.tareaId });
    _atts.push({ name: 'dimensionId', value: this.consecuenciaModel.dimensionId });
    _atts.push({ name: 'riesgoId', value: this.consecuenciaModel.riesgoId });
    _atts.push({ name: 'consecuenciaId', value: ids.toString() });
    _atts.push({ name: 'riesgoPuroP', value: this.consecuenciaModel.riesgoPuroP });
    _atts.push({ name: 'riesgoPuroS', value: this.consecuenciaModel.riesgoPuroS });
    _atts.push({ name: 'riesgoPuroC', value: this.consecuenciaModel.riesgoPuroC });
    _atts.push({ name: 'riesgoResidualP', value: this.consecuenciaModel.riesgoResidualP });
    _atts.push({ name: 'riesgoResidualS', value: this.consecuenciaModel.riesgoResidualS });
    _atts.push({ name: 'riesgoResidualC', value: this.consecuenciaModel.riesgoResidualC });

    const spinner = this.controlService.openSpinner();
    const obj =  this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      if ( data.data[0].atts[1] ) {
        Swal2.fire({text:'Consecuencia Agregada',icon:'success'})
        // this.autentication.showMessage(data.data[0].atts[0].value, data.data[0].atts[1].value, this.consecuenciaModel, data.redirect);
        this.consecuenciaModel = {
          areaId: this.data.areaId,
          procesoId: this.data.procesoId,
          subprocesoId: this.data.subprocesoId,
          actividadId: this.data.actividadId,
          tareaId: this.data.tareaId,
          dimensionId: this.data.dimensionId,
          riesgoId: this.data.riesgoId,
          consecuenciaId: '',
          consecuenciaDescripcion: '',
          riesgoPuroP: '',
          riesgoPuroS: '',
          riesgoResidualP: '',
          riesgoResidualS: ''
        };
        // this.consecuenciasList = [];

        this.cancelar();
      }
      else {
        // this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
        Swal2.fire('',data.message,'error')
        this.consecuenciaModel.consecuenciaId = '';
      }
    } else {
      Swal2.fire('',data.message,'error')
      // this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
      this.consecuenciaModel.consecuenciaId = '';
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.controlService.closeSpinner(spinner);
      this.consecuenciaModel.consecuenciaId = '';
    });
		}
	})

  }

  Criticidad(){

    if(this.consecuenciaModel.riesgoPuroP !="" && this.consecuenciaModel.riesgoPuroS !=""){

      this.criticidadLevel=[]

      let _atts = [];
      _atts.push({ name: 'scriptName', value: 'coemdr'});
      _atts.push({ name: 'action', value: 'READ_CRITICIDAD'});
      _atts.push({ name: 'dimensionId', value: this.consecuenciaModel.dimensionId });
      _atts.push({ name: 'severidadId', value: this.consecuenciaModel.riesgoPuroP });
      _atts.push({ name: 'probabilidadId', value: this.consecuenciaModel.riesgoPuroS });

      const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
          if (result) {

            data.data.forEach( (element) => {
              if ( element.atts.length > 0) {
                  this.criticidadLevel.push({
                    Id: element.atts[0].value.trim(),
                    Descripcion: element.atts[1].value
                  });
              }
            });

            console.log(this.criticidadLevel)

          } else {

            this.autentication.showMessage(data.success, data.message, this.consecuenciaModel, data.redirect);
          }
          return result;
      },
      (error) => {
        this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.consecuenciaModel, false);
      });
    });
    }

  }

  cancelar() {
    this.consecuenciaModel.consecuenciaId = '';
    this.dialogRef.close(false);
  }

  async tablaProbabilidad(_type: string) {

    const conf = this.confirm.open(AddrkyprobabilidadComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '900px',
      data: {
        title: 'Probabilidad Riesgo ' + (_type === 'RP' ? 'Puro' : 'Residual'),
        button_confirm: 'Seleccionar',
        button_close: 'Cancelar',
        type: _type
      }
    });

    conf.afterClosed()
    .subscribe(async (result) => {
      if (result) {
        if ( _type === 'RP' ) {
          this.consecuenciaModel.riesgoPuroP = localStorage.getItem('selRp').trim();
        }
        if ( _type === 'RR' ) {
          this.consecuenciaModel.riesgoResidualP = localStorage.getItem('selRr').trim();
        }
      }
    });
  }

  async tablaSeveridad(_type: string) {

    const conf = this.confirm.open(AddrkyseveridadComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '900px',
      data: {
        title: 'Severidad Riesgo ' + (_type === 'RP' ? 'Puro' : 'Residual'),
        button_confirm: 'Seleccionar',
        button_close: 'Cancelar',
        type: _type
      }
    });

    conf.afterClosed()
    .subscribe(async (result) => {
      if (result) {
        if ( _type === 'RP' ) {
          this.consecuenciaModel.riesgoPuroS = localStorage.getItem('selRp').trim();
        }
        if ( _type === 'RR' ) {
          this.consecuenciaModel.riesgoResidualS = localStorage.getItem('selRr').trim();
        }
      }
    });
  }

  remove(fruit: AddItem): void {
    const index = this.areasListSeleccionadas.indexOf(fruit);

    if (index >= 0) {
      this.areasListSeleccionadas.splice(index, 1);

    }

    this.deseleccionar(fruit)

  }

  seleccionar( id: AddItem ) {
    for (let i  = 0; i < this.datasource.data.length; i++) {
      if ( this.datasource.data[i]['selected'] === true ) {

        this.areasListSeleccionadas.push(this.datasource.data[i]) ;
        this.areasListSeleccionadas = this.areasListSeleccionadas.filter((item, index) => {
          return this.areasListSeleccionadas.indexOf(item) === index;
        });
      }else{
        debugger
        if(this.datasource.data[i]['selected'] === false){

          this.remove(this.datasource.data[i])
        }
      }
    }
  }

  deseleccionar(item:AddItem){
    for(let i  = 0; i < this.datasource.data.length; i++){

      if(this.datasource.data[i] === item && this.datasource.data[i].selected === true){
        this.datasource.data[i].selected = false ;
      }
    }
  }
  applyFilter(filterValue) {
    console.log(filterValue);

    filterValue = filterValue.trim().toLowerCase();

    this.datasource.filter = filterValue;

        // tslint:disable-next-line: one-line

          this.datasource.data = [];
          this.bloquearFiltro = true;
          this.consecuenciasList = [];
          this.cargarconsecuencias(filterValue);

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
          tabla : this.data.tabla
        }
      });

  }

}
