import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthenticationService, ControlsService } from "../../../shared";
import { FormControl, Validators } from "@angular/forms";
import { ConfirmationComponent } from "../../../controls/confirmation/confirmation.component";
import { MatDialog } from "@angular/material";
import Swal from 'sweetalert'
import Swal2 from 'sweetalert2';

@Component({
  selector: "app-addrkc",
  templateUrl: "./addrkc.component.html",
  styleUrls: ["./addrkc.component.scss"],
})
export class AddrkcComponent implements OnInit {
  public actividadModel: any = {
    areaId: "",
    procesoId: "",
    subprocesoId: "",
    actividadId: "",
    name: "",
    subprocesoDescripcion: "",
  };

  public actividadesList: any[] = [];
  public descripcion: string

  actividadControl = new FormControl("", [Validators.required]);
  public bankMultiFilterCtrl: FormControl = new FormControl();


  constructor(
    public dialogRef: MatDialogRef<AddrkcComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.actividadModel = {
      areaId: this.data.areaId,
      procesoId: this.data.procesoId,
      subprocesoId: this.data.subprocesoId,
      actividadId: "",
      name: this.data.name,
      subprocesoDescripcion: "",
    };

    this.actividadesList = [];
    this.cargarActividades(
      this.actividadModel.areaId,
      this.actividadModel.procesoId,
      this.actividadModel.subprocesoId,
      this.actividadModel.name
    );
  }

  ngOnInit() {}

  cargarActividades(
    areaId: string,
    procesoId: string,
    subprocesoId: string,
    name: string
  ) {
    let _atts = [];
    _atts.push({ name: "scriptName", value: "coemdr" });
    _atts.push({ name: "action", value: "ACTIVIDAD_LIST" });
    _atts.push({ name: "areaId", value: areaId });
    _atts.push({ name: "procesoId", value: procesoId });
    _atts.push({ name: "subprocesoId", value: subprocesoId });
    _atts.push({ name: "name", value: name });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts).subscribe(
        (data) => {
          const result = data.success;
          if (result) {
            data.data.forEach((element) => {
              if (element.atts.length > 0) {
                this.actividadesList.push({
                  Id: element.atts[0].value,
                  Descripcion: element.atts[1].value,
                });
              }
            });
          } else {
            this.autentication.showMessage(
              data.success,
              data.message,
              this.actividadesList,
              data.redirect
            );
          }
          return result;
        },
        (error) => {
          this.autentication.showMessage(
            false,
            "Ha ocurrido un error al intentar conectarse, verifique su conexión a internet",
            this.actividadesList,
            false
          );
        }
      );
    });
  }

  async guardar() {


    Swal2.fire({
      title: 'Agregar Actividad',
      text: '¿Desea Agregar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{
		if(result.value){
			
      let ids = this.actividadModel.actividadId.toString();
      let _atts = [];
      _atts.push({ name: "scriptName", value: "coemdr" });
      _atts.push({ name: "action", value: "ACTIVIDAD_CREATE" });
      _atts.push({ name: "areaId", value: this.actividadModel.areaId });
      _atts.push({ name: "procesoId", value: this.actividadModel.procesoId });
      _atts.push({
        name: "subprocesoId",
        value: this.actividadModel.subprocesoId,
      });
      _atts.push({ name: "actividadId", value: ids });
  
      const spinner = this.controlService.openSpinner();
      const obj =  this.autentication.generic(_atts);
  
      obj.subscribe(
        (data) => {
          if (data.success === true) {
            if (data.data[0].atts[1]) {
              // this.autentication.showMessages(
              //   data.data[0].atts[0].value,
              //   data.data[0].atts[1].value,
              //   this.actividadModel,
              //   data.redirect
              // );
  
              Swal2.fire({
                text:'Actividad Agregada',
                icon:'success'})
              this.actividadModel = {
                areaId: this.data.areaId,
                procesoId: this.data.procesoId,
                subprocesoId: this.data.subprocesoId,
                actividadId: "",
  
                subprocesoDescripcion: "",
              };
              this.actividadesList = [];
              this.cargarActividades(
                this.actividadModel.areaId,
                this.actividadModel.procesoId,
                this.actividadModel.subprocesoId,
                this.actividadModel.name
              );
              this.cancelar();
            } else {
              // this.autentication.showMessage(
              //   data.success,
              //   data.message,
              //   this.actividadModel,
              //   data.redirect
              // );
              Swal2.fire('',data.message.value,'error')
              this.actividadModel.actividadId = "";
            }
          } else {
            // this.autentication.showMessage(
            //   data.success,
            //   data.message,
            //   this.actividadModel,
            //   data.redirect
            // );
  
            Swal('',data.message.value,'error')
            this.actividadModel.actividadId = "";
          }
          this.controlService.closeSpinner(spinner);
        },
        (error) => {
          this.controlService.closeSpinner(spinner);
          this.actividadModel.actividadId = "";
        }
        );
      }
  	}
    )

    // const conf = this.confirm.open(ConfirmationComponent, {
    //   hasBackdrop: true,
    //   height: "auto",
    //   width: "auto",
    //   data: {
    //     title: "Crear Actividad",
    //     message: `¿Desea guardar esta Actividad?`,
    //     button_confirm: "Si",
    //     button_close: "No",
    //   },
    // });
    
  }

  async Buscar(event) {
    if (event.key === "Enter") {
      if (this.actividadesList.length === 0) {
        // alert("No Hay datos que coincidad con la busqueda");

        this.autentication.showMessage(false, 'No Hay coincidencias',this.actividadModel, false)
        this.actividadModel.name = "";
        this.actividadesList = [];

        this.cargarActividades(
          this.actividadModel.areaId,
          this.actividadModel.procesoId,
          this.actividadModel.subprocesoId,
          this.actividadModel.name
        );
      
        
      }else{
        this.actividadesList = [];

        this.cargarActividades(
          this.actividadModel.areaId,
          this.actividadModel.procesoId,
          this.actividadModel.subprocesoId,
          this.actividadModel.name
        );
      
     
      console.log(this.actividadesList);
      }
    
    }

    // this.tareasList = [];

    //  setTimeout( () => {

    // }, 4000 );
    // console.log(this.tareasList);
  }

  cancelar() {
    this.actividadModel.actividadId = "";
    this.dialogRef.close(false);
  }
}
