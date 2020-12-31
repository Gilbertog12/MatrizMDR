import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AuthenticationService, ControlsService } from "../../../shared";
import { FormControl, Validators } from "@angular/forms";
import { ConfirmationComponent } from "../../../controls/confirmation/confirmation.component";
import { MatDialog } from "@angular/material";

import Swal2 from 'sweetalert2'

@Component({
  selector: "app-addrka",
  templateUrl: "./addrka.component.html",
  styleUrls: ["./addrka.component.scss"],
})
export class AddrkaComponent implements OnInit,OnChanges {
  public areaModel: any = {
    areaId: "",
    name: "",
    areaDescripcion: "",
  };

  public areasList: any[] = [];
  public descripcion: string
  areaControl = new FormControl("", [Validators.required]);
  aux: any;

  public bankMultiFilterCtrl: FormControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddrkaComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
  }

  ngOnChanges(){
    this.aux += this.areaModel.areaId

    
  }

  onClick(descripcion: string) {
    this.areaModel.areaDescripcion = descripcion;
  }

  cargarAreas(areaId: string, name: string) {
    let _atts = [];
    _atts.push({ name: "scriptName", value: "coemdr" });
    _atts.push({ name: "action", value: "AREA_LIST" });
    _atts.push({ name: "areaId", value: areaId });
    _atts.push({ name: "name", value: name });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts).subscribe(
        (data) => {
          const result = data.success;
          if (result) {
            data.data.forEach((element) => {
              if (element.atts.length > 0) {
                this.areasList.push({
                  Id: element.atts[0].value,
                  Descripcion: element.atts[1].value,
                  check: false
                });
              }
            });
          } else {
            this.autentication.showMessage(
              data.success,
              data.message,
              this.areasList,
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

  almacenar(){
    this.aux +=this.areaModel.areadId
    console.log(this.aux)
  }

  async guardar() {

    Swal2.fire({
      title: 'Agregar Area',
      text: '¿Desea guardar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33'
    }).then((result)=>{

        
        if(result.value){

          let ids = this.areaModel.areaId.toString();

          console.log(ids)
        let _atts = [];
        _atts.push({ name: "scriptName", value: "coemdr" });
        _atts.push({ name: "action", value: "AREA_CREATE" });
        _atts.push({ name: "areaId", value: ids });

        const spinner = this.controlService.openSpinner();
        const obj =  this.autentication.generic(_atts);

        obj.subscribe(
          (data) => {
            if (data.success === true) {
              console.log('Aqui!!!')
              console.log(data.data[0])

              if (data.data[0].atts[1]) {

                console.log('Otro')
                console.log(data.data[0].atts[0].value)


                Swal2.fire({

                  title:'Area Agregada',
                  icon:'success',
                  showConfirmButton: false,
                  timer: 2000
                }
                )
                this.areaModel = {
                  areaId: "",
                  areaDescripcion: "",
                };
                this.areasList = [];
                this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
                this.cancelar();
              }
            } else {
              Swal2.fire({
                icon: 'error',
                text: data.message,
                showConfirmButton: false,
                timer: 2000
                
              })
              
            }
            this.controlService.closeSpinner(spinner);
          },
          (error) => {
            this.controlService.closeSpinner(spinner);
            this.areaModel.areaId = "";
          }
        );

        }
    })

    // const conf = this.confirm.open(ConfirmationComponent, {
    //   hasBackdrop: true,
    //   height: "auto",
    //   width: "auto",
    //   data: {
    //     title: "Insertar Area",
    //     message: `¿Desea guardar esta Area?`,
    //     button_confirm: "Si",
    //     button_close: "No",
    //   },
    // });

    // conf.afterClosed().subscribe(async (result) => {
    //   if (result) {
    //     let ids = this.areaModel.areaId.toString();
    //     let _atts = [];
    //     _atts.push({ name: "scriptName", value: "coemdr" });
    //     _atts.push({ name: "action", value: "AREA_CREATE" });
    //     _atts.push({ name: "areaId", value: ids });

    //     const spinner = this.controlService.openSpinner();
    //     const obj = await this.autentication.generic(_atts);

    //     obj.subscribe(
    //       (data) => {
    //         if (data.success === true) {
    //           console.log('Aqui!!!')
    //           console.log(data.data[0])

    //           if (data.data[0].atts[1]) {

    //             console.log('Otro')
    //             console.log(data.data[0].atts[0].value)


    //             Swal2.fire({

    //               title:'Area Agregada',
    //               icon:'success',
    //               showConfirmButton: false,
    //               timer: 2000
    //             }
    //             )
    //             this.areaModel = {
    //               areaId: "",
    //               areaDescripcion: "",
    //             };
    //             this.areasList = [];
    //             this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
    //             this.cancelar();
    //           }
    //         } else {
    //           Swal2.fire({
    //             icon: 'error',
    //             text: data.message,
    //             showConfirmButton: false,
    //             timer: 2000
                
    //           })
              
    //         }
    //         this.controlService.closeSpinner(spinner);
    //       },
    //       (error) => {
    //         this.controlService.closeSpinner(spinner);
    //         this.areaModel.areaId = "";
    //       }
    //     );
    //   }
    // });
  }

  cancelar() {
    this.areaModel.areaId = "";
    this.dialogRef.close(true);
  }

  async Buscar(event) {
    if (event.key === "Enter") {
      if (this.areasList.length === 0) {
        // alert("No Hay datos que coincidad con la busqueda");

        this.autentication.showMessage(
          false,
          "No Hay coincidencias",
          this.areaModel,
          false
        );
        this.areaModel.name = "";
        this.areasList = [];

        this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
      } else {
        this.areasList = [];
        this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
        console.log(this.areasList);
      }
    }
  }
}
