import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../shared';
import { FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material';
import  Swal2 from 'sweetalert2'

@Component({
  selector: 'app-addrkp',
  templateUrl: './addrkp.component.html',
  styleUrls: ['./addrkp.component.scss']
})

export class AddrkpComponent implements OnInit {

  public procesoModel: any = {
    procesoId: '',
    areaId: '',
    name: '',
    procesoDescripcion: '',
  };

  public procesosList: any[] = [];
  public descripcion: string
  public bankMultiFilterCtrl: FormControl = new FormControl();


  procesoControl = new FormControl('', [Validators.required]);
  

  constructor(public dialogRef: MatDialogRef<AddrkpComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.procesoModel = {
      areaId: this.data.areaId,
      procesoId: '',
      name: this.data.name,
      procesoDescripcion: ''
    };
    this.procesosList = [];
    this.cargarprocesos(this.procesoModel.areaId, this.procesoModel.procesoId, this.procesoModel.name);
  }

  ngOnInit() {

    
  }

  cargarprocesos(areaId: string, procesoId: string, name: string) {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'PROCESO_LIST' });
    _atts.push({ name: 'areaId', value: areaId });
    _atts.push({ name: 'procesoId', value: procesoId });
    _atts.push({ name: 'name', value: name });


    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  this.procesosList.push({
                    Id: element.atts[0].value.trim(),
                    Descripcion: element.atts[1].value
                  });
                }
              });

            } else {
              this.autentication.showMessage(data.success, data.message, this.procesosList, data.redirect);
            }
            return result;
          },
          (error) => {
            this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', [], false);
          });
    });
  }

  async guardar() {


    Swal2.fire({
      title: 'Agregar Proceso',
      text: '¿Desea guardar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{
      if(result.value){
        
        let ids = this.procesoModel.procesoId.toString();
      
        let _atts = [];
        _atts.push({ name: 'scriptName', value: 'coemdr' });
        _atts.push({ name: 'action', value: 'PROCESO_CREATE' });
        _atts.push({ name: 'areaId', value: this.procesoModel.areaId });
        _atts.push({ name: 'procesoId', value: ids });
      
        const spinner = this.controlService.openSpinner();
        const obj =  this.autentication.generic(_atts);
      
        obj.subscribe(
          (data) => {
      
            if (data.success === true) {
              console.log(data)
              
              if (data.data[0].atts[1]) {
                Swal2.fire('Proceso Agregado','','success')
                // this.autentication.showMessages( data.data[0].atts[0].value, data.data[0].atts[1].value, this.procesoModel, data.redirect);
                this.procesoModel = {
                  areaId: this.procesoModel.areaId,
                  procesoId: '',
                  procesoDescripcion: ''
                };
                this.procesosList = [];
                this.cargarprocesos(this.procesoModel.areaId, this.procesoModel.procesoId, this.procesoModel.name);
                this.cancelar();
              }
      
            }
            else {
              // data.success = 'I'
              // this.autentication.showMessage(data.success, data.message, this.procesoModel, data.redirect);
              Swal2.fire( '',data.message,'error')
              this.procesoModel.procesoId = '';
            }
            
            this.controlService.closeSpinner(spinner);
            // console.log('Cambieeee')
          },
          (error) => {
            this.controlService.closeSpinner(spinner);
            this.procesoModel.procesoId = '';
          });
		}
	})

    // const conf = this.confirm.open(ConfirmationComponent, {
    //   hasBackdrop: true,
    //   height: 'auto',
    //   width: 'auto',
    //   data: {
    //     title: 'Insertar Proceso',
    //     message: `¿Desea guardar este Proceso?`,
    //     button_confirm: 'Si',
    //     button_close: 'No'
    //   }
    // });

    



  }

  async Buscar(event) {


    if (event.key === "Enter") {
      
      
      if(this.procesosList.length === 0){

        
        this.autentication.showMessage(false, 'No Hay coincidencias',this.procesoModel, false)
        this.procesoModel.name = "";
        this.procesosList = [];

        this.cargarprocesos(this.procesoModel.areaId, this.procesoModel.procesoId, this.procesoModel.name);

      }else{

        this.procesosList = [];
      this.cargarprocesos(this.procesoModel.areaId, this.procesoModel.procesoId, this.procesoModel.name);


      }
      

    }
  }


  cancelar() {
    this.procesoModel.procesoId = '';
    this.dialogRef.close(false);
  }

}
