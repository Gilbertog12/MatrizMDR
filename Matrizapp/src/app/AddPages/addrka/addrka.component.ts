// import { Component, OnInit, Inject, OnChanges, ViewChild, ElementRef } from '@angular/core';
// import { MatDialogRef, MatSelect, MAT_DIALOG_DATA } from "@angular/material";
// import { AuthenticationService, ControlsService } from "../../shared";
// import { FormControl, Validators } from "@angular/forms";
// import { MatDialog } from "@angular/material";

// import Swal2 from 'sweetalert2'
// import { takeUntil } from 'rxjs/operators';
// import { pipe, ReplaySubject, Subject } from 'rxjs';

// @Component({
//   selector: "app-addrka",
//   templateUrl: "./addrka.component.html",
//   styleUrls: ["./addrka.component.scss"],
// })
// export class AddrkaComponent implements OnInit,OnChanges {
//   public areaModel: any = {
//     areaId: "",
//     name: "",
//     areaDescripcion: "",
//   };

//   public areasList: any[] = [];
//   public descripcion: string
//   areaControl = new FormControl("", [Validators.required]);
//   aux: any;
//   @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
//   protected banks = this.areasList;

//   /** control for the selected bank for multi-selection */
//   public bankMultiCtrl: FormControl = new FormControl();

//   /** control for the MatSelect filter keyword multi-selection */
//   public bankMultiFilterCtrl: FormControl = new FormControl();

//   /** list of banks filtered by search keyword */
//   public filteredBanksMulti: ReplaySubject<any[]> = new ReplaySubject();

//   @ViewChild('multiSelect') multiSelect: MatSelect;

//   /** Subject that emits when the component has been destroyed. */
//   protected _onDestroy = new Subject<void>();
  
  
//   constructor(
//     public dialogRef: MatDialogRef<AddrkaComponent>,
//     private controlService: ControlsService,
//     private autentication: AuthenticationService,
//     private confirm: MatDialog,
//     @Inject(MAT_DIALOG_DATA) public data: any
//     ) {}

//     ngOnInit() {
//       this.cargarAreas(this.areaModel.areaId, this.areaModel.name);

    

//       this.bankMultiCtrl.setValue([this.areasList[10], this.areasList[11], this.areasList[12]]);

//       // load the initial bank list
//       this.filteredBanksMulti.next(this.areasList.slice());
  
//       // listen for search field value changes
//       this.bankMultiFilterCtrl.valueChanges
//         .pipe(takeUntil(this._onDestroy))
//         .subscribe(() => {
//           this.filterBanksMulti();
//         });
      
//     }

//     protected filterBanksMulti() {
//       if (!this.areasList) {
//         return;
//       }
//       // get the search keyword
//       let search = this.bankMultiFilterCtrl.value;
//       if (!search) {
//         this.filteredBanksMulti.next(this.areasList.slice());
//         return;
//       } else {
//         search = search.toLowerCase();
//       }
//       // filter the banks
//       this.filteredBanksMulti.next(
//         this.areasList.filter(bank => bank.Descripcion.toLowerCase().indexOf(search) > -1)
//       );
//     }
  

//   ngOnChanges(){
//     this.aux += this.areaModel.areaId

    
//   }

//   onClick(descripcion: string) {
//     this.areaModel.areaDescripcion = descripcion;
//   }

  
//     buscar() {
    
//       const valor = this.txtBuscar.nativeElement.value;
  
//       if ( valor.trim().length === 0 ) {
//         return;
//       }
//       this.cargarAreas(this.areaModel.areaId,valor);
//       this.txtBuscar.nativeElement.value = '';
//     }
  

//   cargarAreas(areaId: string, name: string) {
//     let _atts = [];
//     _atts.push({ name: "scriptName", value: "coemdr" });
//     _atts.push({ name: "action", value: "AREA_LIST" });
//     _atts.push({ name: "areaId", value: areaId });
//     _atts.push({ name: "lookupName", value: name });

//     const promiseView = new Promise((resolve, reject) => {
//       this.autentication.generic(_atts).subscribe(
//         (data) => {
//           const result = data.success;
//           if (result) {
//             data.data.forEach((element) => {
//               if (element.atts.length > 0) {
//                 this.areasList.push({
//                   Id: element.atts[0].value.trim(),
//                   Descripcion: element.atts[1].value,
//                   check: false
//                 });
//               }
//             });
//           } else {
//             this.autentication.showMessage(
//               data.success,
//               data.message,
//               this.areasList,
//               data.redirect
//             );
//           }
//           return result;
//         },
//         (error) => {
//           this.autentication.showMessage(
//             false,
//             "Ha ocurrido un error al intentar conectarse, verifique su conexión a internet",
//             [],
//             false
//           );
//         }
//       );
//     });
//   }

//   almacenar(){
//     this.aux +=this.areaModel.areadId
//     console.log(this.aux)
//   }

//   async guardar() {

//     Swal2.fire({
//       title: 'Agregar Area',
//       text: '¿Desea guardar este registro?',
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Aceptar',
//       cancelButtonText: 'Cancelar',
//       confirmButtonColor:'#3085d6',
//       cancelButtonColor: '#d33'
//     }).then((result)=>{

        
//         if(result.value){

//           let ids = this.areaModel.areaId.toString();

//           console.log(ids)
//         let _atts = [];
//         _atts.push({ name: "scriptName", value: "coemdr" });
//         _atts.push({ name: "action", value: "AREA_CREATE" });
//         _atts.push({ name: "areaId", value: ids });

//         const spinner = this.controlService.openSpinner();
//         const obj =  this.autentication.generic(_atts);

//         obj.subscribe(
//           (data) => {
//             if (data.success === true) {
//               console.log('Aqui!!!')
//               console.log(data.data[0])

//               if (data.data[0].atts[1]) {

//                 console.log('Otro')
//                 console.log(data.data[0].atts[0].value)


//                 Swal2.fire({

//                   title:'Area Agregada',
//                   icon:'success',
//                   showConfirmButton: false,
//                   timer: 2000
//                 }
//                 )
//                 this.areaModel = {
//                   areaId: "",
//                   areaDescripcion: "",
//                 };
//                 this.areasList = [];
//                 this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
//                 this.cancelar();
//               }
//             } else {
//               Swal2.fire({
//                 icon: 'error',
//                 text: data.message,
//                 showConfirmButton: false,
//                 timer: 2000
                
//               })
              
//             }
//             this.controlService.closeSpinner(spinner);
//           },
//           (error) => {
//             this.controlService.closeSpinner(spinner);
//             this.areaModel.areaId = "";
//           }
//         );

//         }
//     })

//     // const conf = this.confirm.open(ConfirmationComponent, {
//     //   hasBackdrop: true,
//     //   height: "auto",
//     //   width: "auto",
//     //   data: {
//     //     title: "Insertar Area",
//     //     message: `¿Desea guardar esta Area?`,
//     //     button_confirm: "Si",
//     //     button_close: "No",
//     //   },
//     // });

//     // conf.afterClosed().subscribe(async (result) => {
//     //   if (result) {
//     //     let ids = this.areaModel.areaId.toString();
//     //     let _atts = [];
//     //     _atts.push({ name: "scriptName", value: "coemdr" });
//     //     _atts.push({ name: "action", value: "AREA_CREATE" });
//     //     _atts.push({ name: "areaId", value: ids });

//     //     const spinner = this.controlService.openSpinner();
//     //     const obj = await this.autentication.generic(_atts);

//     //     obj.subscribe(
//     //       (data) => {
//     //         if (data.success === true) {
//     //           console.log('Aqui!!!')
//     //           console.log(data.data[0])

//     //           if (data.data[0].atts[1]) {

//     //             console.log('Otro')
//     //             console.log(data.data[0].atts[0].value)


//     //             Swal2.fire({

//     //               title:'Area Agregada',
//     //               icon:'success',
//     //               showConfirmButton: false,
//     //               timer: 2000
//     //             }
//     //             )
//     //             this.areaModel = {
//     //               areaId: "",
//     //               areaDescripcion: "",
//     //             };
//     //             this.areasList = [];
//     //             this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
//     //             this.cancelar();
//     //           }
//     //         } else {
//     //           Swal2.fire({
//     //             icon: 'error',
//     //             text: data.message,
//     //             showConfirmButton: false,
//     //             timer: 2000
                
//     //           })
              
//     //         }
//     //         this.controlService.closeSpinner(spinner);
//     //       },
//     //       (error) => {
//     //         this.controlService.closeSpinner(spinner);
//     //         this.areaModel.areaId = "";
//     //       }
//     //     );
//     //   }
//     // });
//   }

//   cancelar() {
//     this.areaModel.areaId = "";
//     this.dialogRef.close(true);
//   }

//   async Buscar(event) {
//     if (event.key === "Enter") {
//       if (this.areasList.length === 0) {
//         // alert("No Hay datos que coincidad con la busqueda");

//         this.autentication.showMessage(
//           false,
//           "No Hay coincidencias",
//           this.areaModel,
//           false
//         );
//         this.areaModel.name = "";
//         this.areasList = [];

//         this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
//       } else {
//         this.areasList = [];
//         this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
//         console.log(this.areasList);
//       }
//     }
//   }
// }

import { Component, OnInit, Inject, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MatSelect, MAT_DIALOG_DATA, MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../shared';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import Swal2 from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { pipe, ReplaySubject, Subject } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface AddItem {
  Id: string;
  Descripcion: string;
  selected: boolean;
  }



@Component({
  selector: 'app-addrka',
  templateUrl: './addrka.component.html',
  styleUrls: ['./addrka.component.scss'],
})
export class AddrkaComponent implements OnInit {
  public areaModel: any = {
    areaId: '',
    name: '',
    areaDescripcion: '',
  };

  public areasList: AddItem[] = [];
  public areasListSeleccionadas: AddItem[] = [];
  public descripcion: string;
  areaControl = new FormControl('', [Validators.required]);
  aux: any;
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  selection = new SelectionModel<any>(true, []);
  public columnas : string[] = ['select', 'Id', 'Descripcion'];
  public datasource2: MatTableDataSource<AddItem>;
  removable = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  bloquearFiltro: boolean;
  isLoading: boolean;

  @ViewChild('multiSelect') multiSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  arrAux: any;
  seleccion: any;

  constructor(
    public dialogRef: MatDialogRef<AddrkaComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

      this.areaModel = {
                    accion : this.data.accion,
                    areaId: this.data.areaId,
                    procesoId: this.data.procesoId,
                    subprocesoId: this.data.subprocesoId,
                    actividadId: this.data.actividadId,
                    tareaId: this.data.tareaId,
                    dimensionId: this.data.dimensionId,
                    riesgoId: this.data.riesgoId,
                    name : ''
      };
    }

    ngOnInit() {
      this.cargarAreas(this.areaModel.name);

    }


    remove(fruit: AddItem): void {
      const index = this.areasListSeleccionadas.indexOf(fruit);

      if (index >= 0) {
        this.areasListSeleccionadas.splice(index, 1);

      }

      this.deseleccionar(fruit)

    }

    deseleccionar(item:AddItem){
      for(let i  = 0; i < this.datasource2.data.length; i++){

        if(this.datasource2.data[i] === item && this.datasource2.data[i].selected === true){
          this.datasource2.data[i].selected = false ;
        }
      }
    }
    applyFilter(filterValue: string) {
      console.log(filterValue);

      filterValue = filterValue.trim().toLowerCase()

      
        this.datasource2.filter = filterValue
  
        if(this.datasource2.filteredData.length === 0){
          this.bloquearFiltro = true
          this.cargarAreas(filterValue)

        }
      
      
      
      
    }
    

  onClick(descripcion: string) {
    this.areaModel.areaDescripcion = descripcion;
  }

  seleccionar( id: AddItem ) {
    for (let i  = 0; i < this.datasource2.data.length; i++) {
      if ( this.datasource2.data[i]['selected'] === true ) {

        this.areasListSeleccionadas.push(this.datasource2.data[i]) ;
        this.areasListSeleccionadas = this.areasListSeleccionadas.filter((item, index) => {
          return this.areasListSeleccionadas.indexOf(item) === index;
        });
      }else{
        debugger
        if(this.datasource2.data[i]['selected'] === false){

          this.remove(this.datasource2.data[i])
        }
      }
    }
  }

    buscar() {
      this.arrAux = this.areaModel.areaId;
      this.areaModel.areaId.push('gato');
      console.log(this.areaControl);
      this.areasList = [];
      const valor = this.txtBuscar.nativeElement.value;

      if ( valor.trim().length === 0 ) {
        return;
      }
      // this.cargarAreas(this.areaModel.areaId, valor, this.areaModel.procesoId);
      this.txtBuscar.nativeElement.value = '';
    }

    pageEvents(pagina:number){

    }

    ordenarArray(items:AddItem[]){
      items.sort(function (a, b) {
        if (a.Id > b.Id) {
          return 1;
        }
        if (a.Id < b.Id) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }


  cargarAreas(name?:string) {
    let _atts = [];

     _atts.push({ name: "scriptName", value: "coemdr" });
     _atts.push({ name: "action", value: this.areaModel.accion });
     _atts.push({name: 'areaId', value: this.areaModel.areaId });
     _atts.push({name: 'procesoId', value: this.areaModel.procesoId });
     _atts.push({name: 'subprocesoId', value: this.areaModel.subprocesoId });
     _atts.push({name: 'actividadId', value: this.areaModel.actividadId });
     _atts.push({name: 'tareaId', value: this.areaModel.tareaId });
     _atts.push({name: 'dimensionId', value:this.areaModel.dimensionId });
     _atts.push({name: 'riesgoId', value: this.areaModel.riesgoId });
     _atts.push({ name: "lookupName", value: name });
     this.isLoading = true

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts).subscribe(
        (data) => {
          const result = data.success;
          if (result) {
            // if(data.data.length > 0){
              
            // }

            if(data.data.length === 0){
              this.isLoading = false
              this.bloquearFiltro = false
              return Swal2.fire({
                icon : 'info',
                text : 'Codigo/Descripcion no encontrada'
              })
            }
            data.data.forEach((element) => {
              if (element.atts.length > 0) {
                this.areasList.unshift({
                  Id: element.atts[0].value.trim(),
                  Descripcion: element.atts[2].value.trim(),
                  selected : false
                });
                this.bloquearFiltro = false
              }else{
               
              }
            });

            // console.log(this.areasList);
            this.areasList.sort(function (a, b) {
              if (a.Id > b.Id) {
                return 1;
              }
              if (a.Id < b.Id) {
                return -1;
              }
              // a must be equal to b
              return 0;
            });

            this.datasource2 = new MatTableDataSource<AddItem>(this.areasList);
            console.log(this.datasource2.data);
            this.datasource2.paginator = this.paginator;
          } else {
            this.autentication.showMessage(
              data.success,
              data.message,
              this.areasList,
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

  almacenar() {
    this.aux += this.areaModel.areadId;
    console.log(this.aux);
  }


  llenarPeticion(accion:string,key:string){

    switch(accion){
      case 'PROCESO_CREATE':

      return [{ name: 'scriptName', value: 'coemdr' },
         { name: 'action', value: this.data.crear },
         { name: 'areaId', value: this.data.areaId },
         { name: 'procesoId', value:  key.toString() },
          ]
        
      case 'SUBPROCESO_CREATE':
        return [{ name: 'scriptName', value: 'coemdr' },
         { name: 'action', value: this.data.crear },
         { name: 'areaId', value: this.data.areaId },
         { name: 'procesoId', value: this.data.procesoId },
         { name: 'subprocesoId', value: key.toString() },
         
         ]
      
      case 'ACTIVIDAD_CREATE':
        return [{ name: 'scriptName', value: 'coemdr' },
         { name: 'action', value: this.data.crear },
         { name: 'areaId', value: this.data.areaId },
         { name: 'procesoId', value: this.data.procesoId },
         { name: 'subprocesoId', value: this.data.subprocesoId },
         { name: 'actividadId', value:  key.toString() },
         ]
      
      case 'TAREA_CREATE':
        return [{ name: 'scriptName', value: 'coemdr' },
         { name: 'action', value: this.data.crear },
         { name: 'areaId', value: this.data.areaId },
         { name: 'procesoId', value: this.data.procesoId },
         { name: 'subprocesoId', value: this.data.subprocesoId },
         { name: 'actividadId', value: this.data.actividadId },
         { name: 'tareaId', value:  key.toString() }]
      
      case 'DIMENSION_CREATE':
        return [{ name: 'scriptName', value: 'coemdr' },
         { name: 'action', value: this.data.crear },
         { name: 'areaId', value: this.data.areaId },
         { name: 'procesoId', value: this.data.procesoId },
         { name: 'subprocesoId', value: this.data.subprocesoId },
         { name: 'actividadId', value: this.data.actividadId },
         { name: 'tareaId', value: this.data.tareaId },
         { name: 'dimensionId', value: key.toString() }]
      
      case 'RIESGO_CREATE':
        return [{ name: 'scriptName', value: 'coemdr' },
         { name: 'action', value: this.data.crear },
         { name: 'areaId', value: this.data.areaId },
         { name: 'procesoId', value: this.data.procesoId },
         { name: 'subprocesoId', value: this.data.subprocesoId },
         { name: 'actividadId', value: this.data.actividadId },
         { name: 'tareaId', value: this.data.tareaId },
         { name: 'dimensionId', value: this.data.dimensionId },
         { name: 'riesgoId', value: key.toString() }]
      
      default:
        return [{ name: 'scriptName', value: 'coemdr' },
        { name: 'action', value: this.data.crear },
        { name: 'areaId', value: key.toString()}]

    }

  }

  async guardar() {
    

    Swal2.fire({
      title: this.data.title,
      text: '¿Desea guardar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

        if (result.value) {

         let ids = []
          this.areasListSeleccionadas.forEach( id => {
            ids.push(id.Id)
         })
         
         
          
          const _atts = this.llenarPeticion(this.data.crear, ids.toString())

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

                  title: this.data.ok,
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
                // this.cargarAreas(this.areaModel.areaId, this.areaModel.name);
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
          () => {
            this.controlService.closeSpinner(spinner);
            this.areaModel.areaId = '';
          }
        );

        }
    });

  }

  cancelar() {
    this.areaModel.areaId = '';
    if(this.data.accion !== 'AREA_CREATE'){

      this.dialogRef.close(false);
    }else{
      this.dialogRef.close(true);
      
    }
  }

}

