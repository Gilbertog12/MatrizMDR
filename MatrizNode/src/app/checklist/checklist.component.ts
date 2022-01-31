import { Component, OnInit, Inject, OnChanges, ViewChild } from '@angular/core';
import { MatDialogRef, MatSelect, MAT_DIALOG_DATA } from "@angular/material";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import Swal2 from 'sweetalert2'
import { takeUntil } from 'rxjs/operators';
import { pipe, ReplaySubject, Subject } from 'rxjs';
import { AuthenticationService, ControlsService } from '../shared';
import { check } from '../componentes/rkmain/interfaces/checklist.interfaces';




@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})


export class ChecklistComponent implements OnInit {


  public checkModel: any = {
    areaId: "",
    name: "",
    areaDescripcion: "",
  };

 

  public actividadModel: any = {
    areaId: "",
    procesoId: "",
    subprocesoId: "",
    actividadId: "",
    name: "",
    subprocesoDescripcion: "",
  };


  

  public areasList: any[] = [];
  public descripcion: string
  areaControl = new FormControl("", [Validators.required]);
  aux: any;

  protected banks = this.areasList;

  /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanksMulti: ReplaySubject<any[]> = new ReplaySubject();

  @ViewChild('multiSelect') multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  checklistEllipse: check[];
  
  
  constructor(
    public dialogRef: MatDialogRef<ChecklistComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {


      this.actividadModel = {
        areaId: this.data.areaId,
        procesoId: this.data.procesoId,
        subprocesoId: this.data.subprocesoId,
        actividadId: this.data.actividadId
      };

    }

    ngOnInit() {
      this.cargarAreas();

    

      this.bankMultiCtrl.setValue([this.areasList[10], this.areasList[11], this.areasList[12]]);

      // load the initial bank list
      this.filteredBanksMulti.next(this.areasList.slice());
  
      // listen for search field value changes
      this.bankMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterBanksMulti();
        });
      
    }

    protected filterBanksMulti() {
      if (!this.areasList) {
        return;
      }
      // get the search keyword
      let search = this.bankMultiFilterCtrl.value;
      if (!search) {
        this.filteredBanksMulti.next(this.areasList.slice());
        return;
      } else {
        search = search.toLowerCase();
      }
      // filter the banks
      this.filteredBanksMulti.next(
        this.areasList.filter(bank => bank.Descripcion.toLowerCase().indexOf(search) > -1)
      );
    }
  

 

  cargarAreas() {
    let _atts = [];
    _atts.push({ name: "scriptName", value: "coemdr" });
    _atts.push({ name: "action", value: "RCK_LIST" });
    

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

          let ids = this.checkModel.areaId.toString();

          console.log(ids)
        let _atts = [];
        _atts.push({ name: "scriptName", value: "coemdr" });
        _atts.push({ name: "action", value: 'CHECK_CREATE' });
        _atts.push({ name: "areaId", value: this.actividadModel.areaId });
        _atts.push({ name: "procesoId", value: this.actividadModel.procesoId });
        _atts.push({ name: "subprocesoId", value: this.actividadModel.subprocesoId });
        _atts.push({ name: "actividadId", value: this.actividadModel.actividadId });
        _atts.push({ name: "checkNo", value: ids });
        _atts.push({ name: "comentario", value: 'comentario aqui' });

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
                this.checkModel = {
                  areaId: "",
                  areaDescripcion: "",
                };
                this.areasList = [];
                this.cargarAreas();
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
            this.checkModel.areaId = "";
          }
        );

        }
    })

  }

  cancelar() {
    this.checkModel.areaId = "";
    this.dialogRef.close(true);
  }

  async Buscar(event) {
    if (event.key === "Enter") {
      if (this.areasList.length === 0) {
        // alert("No Hay datos que coincidad con la busqueda");

        this.autentication.showMessage(
          false,
          "No Hay coincidencias",
          this.checkModel,
          false
        );
        this.checkModel.name = "";
        this.areasList = [];

        this.cargarAreas();
      } else {
        this.areasList = [];
        this.cargarAreas();
        console.log(this.areasList);
      }
    }
  }


  imprimeSeleccion(codigo,descripcion){

    this.checklistEllipse=[ ]

    codigo.forEach( (valor,index) =>{
      
      this.checklistEllipse.push({
        table_code:valor,
        table_desc:descripcion[index],
        comentario: ''
      })
    })
  }

}
