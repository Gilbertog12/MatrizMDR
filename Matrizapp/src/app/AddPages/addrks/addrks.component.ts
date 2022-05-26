import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../shared';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationComponent } from '../../controls/confirmation/confirmation.component';
import { MatDialog } from '@angular/material';
import Swal2 from 'sweetalert2'

@Component({
  selector: 'app-addrks',
  templateUrl: './addrks.component.html',
  styleUrls: ['./addrks.component.scss']
})

export class AddrksComponent implements OnInit {

  public subprocesoModel: any = {
    areaId: '',
    procesoId: '',
    subprocesoId: '',
    name: '',
    subprocesoDescripcion: '',
  };

  public subprocesosList: any[] = [];
  public descripcion: string

  private aid: string;
  private pid: string;

  subprocesoControl = new FormControl('', [Validators.required]);

  bankMultiFilterCtrl = new FormControl()

  constructor(public dialogRef: MatDialogRef<AddrksComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.subprocesoModel = {
      areaId: this.data.areaId,
      procesoId: this.data.procesoId,
      subprocesoId: '',
      name: this.data.name,
      subprocesoDescripcion: ''
    };
    this.subprocesosList = [];
    this.cargarsubprocesos(this.data.areaId, this.data.procesoId, this.data.subprocesoId, this.data.name);
  }

  ngOnInit() {
  }

  cargarsubprocesos(areaId: string, procesoId: string, subprocesoId: string, name: string) {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'SUBPROCESO_LIST' });
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'subprocesoId', value: subprocesoId });
    _atts.push({ name: 'name', value: name });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  this.subprocesosList.push({
                    Id: element.atts[0].value.trim(),
                    Descripcion: element.atts[1].value
                  });
                }
              });

            }
            else {
              this.autentication.showMessage(data.success, data.message, this.subprocesosList, data.redirect);
            }
            return result;
          },
          (error) => {
            this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.subprocesosList, false);
          });
    });
  }

  async guardar() {


    Swal2.fire({
      title: 'Agregar Subproceso',
      text: '¿Desea guardar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{
      if(result.value){
        
        let ids = this.subprocesoModel.subprocesoId.toString();
        
        let _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'SUBPROCESO_CREATE' });
        _atts.push({ name: 'areaId', value: this.subprocesoModel.areaId });
        _atts.push({ name: 'procesoId', value: this.subprocesoModel.procesoId });
        _atts.push({ name: 'subprocesoId', value: ids });
      
        const spinner = this.controlService.openSpinner();
        const obj =  this.autentication.generic(_atts);
      
        obj.subscribe(
          (data) => {
            if (data.success === true) {
              if (data.data[0].atts[1]) {
                Swal2.fire({text:'Subproceso Agregado', icon:'success'})
                // this.autentication.showMessage(data.data[0].atts[0].value, data.data[0].atts[1].value, this.subprocesoModel, data.redirect);
                this.subprocesoModel = {
                  areaId: this.data.areaId,
                  procesoId: this.data.procesoId,
                  subprocesoId: '',
                  subprocesoDescripcion: ''
                };
                this.subprocesosList = [];
                this.cargarsubprocesos(this.data.areaId, this.data.procesoId, this.data.subprocesoId, this.data.name);
                this.cancelar();
              } else {
                Swal2.fire('',data.message,'error')
                // this.autentication.showMessage(data.success, data.message, this.subprocesoModel, data.redirect);
                this.data.subprocesoId = '';
              }
            } else {
              // this.autentication.showMessage(data.success, data.message, this.subprocesoModel, data.redirect);
              Swal2.fire('',data.message,'error')
              this.data.subprocesoId = '';
            }
            this.controlService.closeSpinner(spinner);
          },
          (error) => {
            this.controlService.closeSpinner(spinner);
            this.data.subprocesoId = '';
          });
      }
	}

    // const conf = this.confirm.open(ConfirmationComponent, {
    //   hasBackdrop: true,
    //   height: 'auto',
    //   width: 'auto',
    //   data: {
    //     title: 'Crear Subproceso',
    //     message: `¿Desea guardar este Subproceso?`,
    //     button_confirm: 'Si',
    //     button_close: 'No'
    //   }
    );

    


  }

  async Buscar(event) {

    if (event.key === "Enter") {
    if( this.subprocesosList.length === 0){
      this.autentication.showMessage(false,'No hay coincidencias', this.subprocesoModel,false)
      this.subprocesoModel.name='';
      this.subprocesosList = [];
      this.cargarsubprocesos(this.data.areaId, this.data.procesoId, this.data.subprocesoId, this.data.name);

    }else{
      this.subprocesosList = [];
      this.cargarsubprocesos(this.data.areaId, this.data.procesoId, this.data.subprocesoId, this.data.name);
    }

    }

  }


  cancelar() {
    this.data.subprocesoId = '';
    this.dialogRef.close(false);
  }

}