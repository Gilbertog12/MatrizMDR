import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../../shared';
import Swal2 from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { RkstdtareasComponent } from '../rkstdtareas/rkstdtareas.component';
import { ServiciocajasService } from '../../../shared/services/serviciocajas.service';



@Component({
  selector: 'app-rkcstdjob',
  templateUrl: './rkcstdjob.component.html',
  styleUrls: ['./rkcstdjob.component.scss']
})

export class RkcstdjobComponent implements OnInit {

  stdJobControl = new FormControl("", [Validators.required]);

  public stdJobModel: any = {
    stdJobNo1:'',
    stdJobNo:'',
    paginacion: 1

  };
  
  public habilitar:boolean

  public descripcion:string
  public StdJobList: any[] = [];
  private id: string;
  private pid: string;
  private sid: string;
  private cid: string;

  public first: number = 1;
  public refresh: number = 1;
  public last: number = 1;
  public isLoading: boolean = false;
  public activePagination: boolean = false;
   

  

  constructor(public dialogRef: MatDialogRef<RkcstdjobComponent>,
              private controlService: ControlsService,
              private autentication: AuthenticationService,
              private confirm: MatDialog,
              private route: ActivatedRoute,
              private _Recargarble:ServiciocajasService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
               
                this.stdJobModel.areaId = data.areaId;
                console.log(this.stdJobModel.areaId)
                this.stdJobModel.procesoId = data.procesoId;
                this.stdJobModel.subprocesoId = data.subprocesoId;
                this.stdJobModel.actividadId = data.actividadId;
                this.stdJobModel.tareaId = data.tareaId;
                this.stdJobModel.statusId = data.statusId;
                this.stdJobModel.versionId = data.versionId;
                this.stdJobModel.id = data.id
                console.log(this.stdJobModel.versionId)
              }

  ngOnInit() {
    // this.CargarStdJob(this.stdJobModel.stdJobNo)
    // console.log(this.id)
   }

   paginacion(pagina:number){
    
    
    this.stdJobModel.paginacion= this.stdJobModel.paginacion+pagina
    console.log(this.stdJobModel.paginacion)
    this.CargarStdJob();

   }

   
   CargarStdJob(){
     
    
     
     this.StdJobList= []
     let _atts = [];
     _atts.push({ name: 'scriptName', value: 'coemdr'});
     _atts.push({ name: 'action', value: 'LISTA_STD_JOB'});     
     _atts.push({ name: 'id', value: this.stdJobModel.id });     
     _atts.push({ name: "stdJobNo", value: this.stdJobModel.stdJobNo1tx });
     _atts.push({ name: 'stdJobName', value: this.stdJobModel.stdJobNo1desc });
     _atts.push({ name: 'pageRequest', value: this.stdJobModel.paginacion });
     
    const spinner = this.controlService.openSpinner();
    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts).subscribe(
        (data) => {
          const result = data.success;
          if (result) {
            console.log(data)
            data.data.forEach((element) => {
                if (element.atts.length > 0) {
                this.StdJobList.push({
                  pagina:element.atts[0].value,
                  STD_JOB_NO: element.atts[1].value,
                  STD_JOB_DESC:element.atts[2].value,
                  STD_JOB_NO_TASK:element.atts[3].value
                  
                  
                });
                
              }
            });
    this.controlService.closeSpinner(spinner);

          } else {
            this.autentication.showMessage(
              data.success,
              data.message,
              this.StdJobList,
              data.redirect
            );
          }
          return result;
        },
        (error) => {
          this.autentication.showMessage(
            false,
            "Ha ocurrido un error al intentar conectarse, verifique su conexión a internet",
            [],
            false
          );
        }
      );
    });
  }

  deseleccionarTodo(item: any) { 

    this.StdJobList.forEach( (element) => {
            console.log(element)

      if ( element.STD_JOB_NO !== item.STD_JOB_NO) {
          console.log(item.STD_JOB_NO+ 'falso')
          element.selected = false;
          this.habilitar = false
      }
    });

    this.stdJobModel.STD_JOB_NO = '';
    if ( item.selected === true ) {
      console.log(item.STD_JOB_NO + 'verdadere')
      this.stdJobModel.STD_JOB_NO= item.STD_JOB_NO;
      this.habilitar = true
      this.stdJobModel.stdJobTaskNo1 ='*'
      console.log(this.stdJobModel.stdJobTaskNo1)
      
    }
  }

  SeleccionarTareas(codigo:string){

    // this.confirm.open(RktareastdComponent, {
    //   hasBackdrop: true,
    //   height: 'auto',
    //   width: 'auto',
    //   data: {
    //     title: 'Seleccione la Tarea',
    //     message: ``,
    //     button_confirm: 'Guardar',
    //     button_close: 'Cerrar',
    //     areaId : this.stdJobModel.areaId,
    //     procesoId : this.stdJobModel.procesoId,
    //     subprocesoId : this.stdJobModel.subprocesoId,
    //     actividadId : this.stdJobModel.actividadId,
    //     tareaId : this.stdJobModel.tareaId,
    //     statusId : this.stdJobModel.statusId,
    //     versionId : this.stdJobModel.versionId,
    //     stdJobNo: this.stdJobModel.stdJobNo
    //   }
    // });

    console.log(this.stdJobModel.STD_JOB_NO, codigo)

    let conf = this.confirm.open(RkstdtareasComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Seleccione la Tarea',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cancelar',
        areaId : this.stdJobModel.areaId,
        procesoId : this.stdJobModel.procesoId,
        subprocesoId : this.stdJobModel.subprocesoId,
        actividadId : this.stdJobModel.actividadId,
        tareaId : this.stdJobModel.tareaId,
        statusId : this.stdJobModel.statusId,
        versionId : this.stdJobModel.versionId,
        id:this.stdJobModel.id,
        stdJobNo1:  codigo
      }
    });

   
  }

  guardar() {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr'});

    if ( this.stdJobModel.tareaId === '') {
      _atts.push({ name: 'action', value: 'ACTIVIDAD_STJB_CREATE'});
    }

    if ( this.stdJobModel.tareaId !== '') {
      _atts.push({ name: 'action', value: 'TAREA_STJB_CREATE'});
      _atts.push({ name: 'tareaId', value: this.stdJobModel.tareaId });
    }

    _atts.push({ name: 'areaId', value: this.stdJobModel.areaId });
    _atts.push({ name: 'procesoId', value: this.stdJobModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.stdJobModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.stdJobModel.actividadId });

    _atts.push({ name: 'stdJobNo1', value: this.stdJobModel.STD_JOB_NO });
    _atts.push({ name: 'stdJobTaskNo1', value: this.stdJobModel.stdJobTaskNo1 });
    _atts.push({ name: 'statusId', value: this.stdJobModel.statusId });
    _atts.push({ name: 'versionId', value: this.stdJobModel.versionId });

    if ( this.stdJobModel.STD_JOB_NO === undefined || this.stdJobModel.STD_JOB_NO === null || this.stdJobModel.STD_JOB_NO.trim() === '' ) { 
      // this.autentication.showMessage(false, 'Ingrese el StdJobNo', this.stdJobModel, false);
      Swal2.fire('','Ingrese el StdJobNo','warning')
      return;
    }

    if ( this.stdJobModel.tareaId !== '') {
      if ( this.stdJobModel.stdJobTaskNo1 === undefined || this.stdJobModel.stdJobTaskNo1 === null || this.stdJobModel.stdJobTaskNo1.trim() === '' ) { 
        // Swal2.fire('','Ingrese el  StdJobTaskNo','warning')
        this.autentication.showMessage(false, 'Ingrese el StdJobTaskNo', this.stdJobModel, false);
        return;
      }
    }

    if ( this.stdJobModel.tareaId === '') {
      if ( this.stdJobModel.stdJobTaskNo1 === undefined || this.stdJobModel.stdJobTaskNo1 === null || this.stdJobModel.stdJobTaskNo1.trim() === '' ) {
        this.stdJobModel.stdJobTaskNo1 = '';
      }
    }

    const spinner = this.controlService.openSpinner();
    const obj = this.autentication.generic(_atts);

    obj.subscribe(
    (data) => {
    if (data.success === true) {
      console.log(data)
      if ( data.data[0].atts[1] ) {
        // this.autentication.showMessage(data.success, data.data[0].atts[1].value, this.stdJobModel, data.redirect);
        Swal2.fire('', data.data[0].atts[1].value, "success")
        

        this.dialogRef.close(true);
      }
    }
    else {
      // this.autentication.showMessage(data.success, data.message, this.stdJobModel, data.redirect);
      // this.autentication.showMessage(data.success, data.message, this.stdJobModel, data.redirect);
      Swal2.fire('',data.message,'error')
    }
    this.controlService.closeSpinner(spinner);
    },
    (error) => {
      this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.stdJobModel, false);
      this.controlService.closeSpinner(spinner);
      this.dialogRef.close(true);
    });

  }

  cancelar() {
    this.dialogRef.close(true);
  }

}
