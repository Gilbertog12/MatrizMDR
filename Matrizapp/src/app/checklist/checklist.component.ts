import { Component, OnInit, Inject, OnChanges, ViewChild } from '@angular/core';
import { MatDialogRef, MatSelect, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import Swal2 from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { pipe, ReplaySubject, Subject } from 'rxjs';
import { AuthenticationService, ControlsService } from '../shared';
import { check } from '../componentes/rkmain/interfaces/checklist.interfaces';
import { F } from '@angular/cdk/keycodes';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import swal from 'sweetalert';
import { forEach } from 'core-js/core/array';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})

export class ChecklistComponent implements OnInit {

  public checkModel: any = {
    areaId: '',
    name: '',
    areaDescripcion: '',
  };

  public actividadModel: any = {
    areaId: '',
    procesoId: '',
    subprocesoId: '',
    actividadId: '',
    name: '',
    subprocesoDescripcion: '',
  };

  seleccion: string[] = [];
  public areasList: any[] = [];
  public descripcion: string;
  areaControl = new FormControl('', [Validators.required]);
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
  checklistEllipse: check[] = [];
  valor: string;
  comments: string;
  comentarios: string;
  aplica: string;

  rka_form = this.fb.group({
    areaId : ['', [Validators.required]]

  });
  unicos: any[];
  contadorBuenos: number;
  contadorMalos: number;

  constructor(
    public dialogRef: MatDialogRef<ChecklistComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private fb: FormBuilder,
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
        this.areasList.filter((bank) => bank.chkDescripcionSola.toLowerCase().indexOf(search) > -1)
      );
    }

  cargarAreas() {
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'RCK_LIST' });
    _atts.push({ name: 'areaId', value: this.actividadModel.areaId });
    _atts.push({ name: 'procesoId', value: this.actividadModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.actividadModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.actividadModel.actividadId });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts).subscribe(
        (data) => {

          console.log(data);
          const result = data.success;
          if (result) {
            data.data.forEach((element) => {
              if (element.atts.length > 0) {
                this.areasList.push({
                  Id: element.atts[0].value.trim(),
                  chkDescripcion : element.atts[1].value,
                  chkDescripcionSola: element.atts[2].value,
                  comentario : this.comentarios,
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
            'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet',
            [],
            false
          );
        }
      );
    });
  }

 /* async guardar() {

    Swal2.fire({
      title: 'Agregar item CheckList',
      text: '¿Desea guardar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async (result) => {

        if (result.value) {

    this.valor = '';
    this.comments = '';
    this.aplica = '';

    for (let i = 0; i < this.checklistEllipse.length; i++) {

      // this.valor = this.valor + ',' + this.checklistEllipse[i].table_code;
      // this.comments = this.comments + '^~|' + this.checklistEllipse[i].comentario;
      if ( this.checklistEllipse[i].check === true) {
        this.checklistEllipse[i].checkValidation = 'Y';
      } else {
        this.checklistEllipse[i].checkValidation = 'N';
      }
      // this.aplica = this.aplica + ',' + this.checklistEllipse[i].checkValidation;
    }

    /*this.checklistEllipse.forEach((valor) => {
      this.valor = this.valor + ',' + valor.table_code;
      this.comments = this.comments + '^~|' + valor.comentario;
      if ( valor.check === true) {
        valor.checkValidation = 'Y';
      } else {
        valor.checkValidation = 'N';
      }
      this.aplica = this.aplica + ',' + valor.checkValidation;
      // console.log(valor.table_code)

    });
    const spinner = this.controlService.openSpinner();

    this.valor = this.valor.slice(1);
    this.comments = this.comments.slice(3);
    this.aplica = this.aplica.slice(1);
    console.log(this.valor, this.comments);
    console.log(this.aplica);

    if(this.comments.includes('undefined')){

      return Swal2.fire({
        title : '<b style = "color:red"> ADVERTENCIA </b>',
        icon : 'warning',
        text : 'Comentario Obligatorio'
      });
    }
    for (let i = 0; i < this.checklistEllipse.length; i++) {

      this.valor = this.checklistEllipse[i].table_code;
      this.comments = this.checklistEllipse[i].comentario;
      this.aplica = this.checklistEllipse[i].checkValidation;

      let resp = await this.SendCheckList(this.actividadModel.areaId,this.actividadModel.procesoId,this.actividadModel.subprocesoId ,this.actividadModel.actividadId,this.valor,this.aplica,this.comments )
      console.log(resp.success)
      if(resp.success === true){

      }else{
        
        this.controlService.closeSpinner(spinner);
         Swal2.fire({
          icon: 'error',
          text: resp.message,
          showConfirmButton: false,
          timer: 2000

        });
        // this.cancelar();
        return
        
      }
      }
      Swal2.fire({
        title: 'item Agregado',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000

      });
      this.checkModel = {
        areaId: '',
        chkDescripcionSola: '',
      };
      this.areasList = [];
      this.cargarAreas();
      this.cancelar();
      this.controlService.closeSpinner(spinner);
    }

    });

  }*/


  async guardar() {

    Swal2.fire({
      title: 'Agregar item CheckList',
      text: '¿Desea guardar este registro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {

        if (result.value) {

    this.valor = '';
    this.comments = '';
    this.aplica = '';

    for (let i = 0; i < this.checklistEllipse.length; i++) {

      this.valor = this.valor + ',' + this.checklistEllipse[i].table_code;
      this.comments = this.comments + '^~|' + this.checklistEllipse[i].comentario;
      if ( this.checklistEllipse[i].check === true) {
        this.checklistEllipse[i].checkValidation = 'Y';
      } else {
        this.checklistEllipse[i].checkValidation = 'N';
      }
      this.aplica = this.aplica + ',' + this.checklistEllipse[i].checkValidation;
    }

    /*this.checklistEllipse.forEach((valor) => {
      this.valor = this.valor + ',' + valor.table_code;
      this.comments = this.comments + '^~|' + valor.comentario;
      if ( valor.check === true) {
        valor.checkValidation = 'Y';
      } else {
        valor.checkValidation = 'N';
      }
      this.aplica = this.aplica + ',' + valor.checkValidation;
      // console.log(valor.table_code)

    });*/

    this.valor = this.valor.slice(1);
    this.comments = this.comments.slice(3);
    this.aplica = this.aplica.slice(1);
    console.log(this.valor, this.comments);
    console.log(this.aplica);

    if(this.comments.includes('undefined')){

      return Swal2.fire({
        title : '<b style = "color:red"> ADVERTENCIA </b>',
        icon : 'warning',
        text : 'Comentario Obligatorio'
      });
    }


    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'CHECK_CREATE' });
    _atts.push({ name: 'areaId', value: this.actividadModel.areaId });
    _atts.push({ name: 'procesoId', value: this.actividadModel.procesoId });
    _atts.push({ name: 'subprocesoId', value: this.actividadModel.subprocesoId });
    _atts.push({ name: 'actividadId', value: this.actividadModel.actividadId });
    _atts.push({ name: 'checkNo', value: this.valor });
    _atts.push({ name: 'checkValidation', value: this.aplica });
    _atts.push({ name: 'comentario', value: this.comments });

    const spinner = this.controlService.openSpinner();
    console.log(_atts);
    const obj =  this.autentication.generic(_atts);

    obj.subscribe(
          (data) => {
            if (data.success === true) {
              console.log('Aqui!!!');
              console.log(data.data[0]);

              if (data.data[0].atts[1]) {

                console.log('Otro');
                console.log(data.data[0].atts[0].value);

                Swal2.fire({

                  title: 'item Agregado',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000
                }
                );
                this.checkModel = {
                  areaId: '',
                  chkDescripcionSola: '',
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

              });

            }
            this.controlService.closeSpinner(spinner);
          },
          (error) => {
            this.controlService.closeSpinner(spinner);
            this.checkModel.areaId = '';
          }
        );

        }
    });

  }

  cancelar() {
    this.checkModel.areaId = '';
    this.dialogRef.close(true);
  }

  async Buscar(event) {
    if (event.key === 'Enter') {
      if (this.areasList.length === 0) {
        // alert("No Hay datos que coincidad con la busqueda");

        this.autentication.showMessage(
          false,
          'No Hay coincidencias',
          this.checkModel,
          false
        );
        this.checkModel.name = '';
        this.areasList = [];

        this.cargarAreas();
      } else {
        this.areasList = [];
        this.cargarAreas();
        console.log(this.areasList);
      }
    }
  }

  imprimeSeleccion(codigo) {

    console.log(codigo);

    this.checklistEllipse = [];

    for (  const code of codigo) {
      // tslint:disable-next-line: no-debugger

      // debugger;

      this.areasList.forEach((elemento, index) => {

            if (elemento.Id === code) {
              // console.log(this.checklistEllipse[index].comentario);
              console.log(index);

              this.checklistEllipse.push({
                table_code: elemento.Id,
                table_desc: elemento.chkDescripcionSola,
                comentario: elemento.comentario,
                checkValidation : 'Y',
                check : true

              });
            }
          });

      // this.unicos = [];

      // this.checklistEllipse.forEach( (elemento) => {
        //       if (!this.unicos.includes(elemento)) {
          //         this.unicos.push(elemento);
          //       }
          //     });

          // if (this.checklistEllipse.length === 0) {

            //   this.areasList.forEach((elemento, index) => {

              //     if (elemento.Id === code) {
                //       this.checklistEllipse.push({
                  //         table_code: elemento.Id,
                  //         table_desc: elemento.Descripcion,
                  //         comentario: elemento.comentario
                  //       });
                  //     }
                  //   });
                  // } else {

                    //   this.areasList.forEach((elemento, index) => {
                      //     // tslint:disable-next-line: no-debugger
                      //     debugger;
                      //     if (elemento.Id === code) {

                        //       if (this.checklistEllipse.indexOf(code)) {
                          //           console.log('aqui toy');

                          //       } else {

                            //         this.checklistEllipse.push({
                              //           table_code: elemento.Id,
                              //           table_desc: elemento.Descripcion,
                              //           comentario: elemento.comentario
      //         });
      //       }
      //     }
      //   });
      // }

      console.log(this.checklistEllipse);
    }

    // this.checkModel.areaId = this.seleccion;
    // console.log(this.unicos);
    // this.checklistEllipse = this.unicos;

  }

  borrarItem(code) {

    console.log(this.seleccion);

    this.seleccion.forEach((element, index) => {
      console.log(element);

        
      if (element === code) {

          if (index === 0){
            this.seleccion.splice(index);
            
          }else{

            this.seleccion.splice(index, index);
            console.log(this.seleccion);
          }

      }

      // this.checkModel.areaId = this.seleccion
    });

    // this.checkModel.forEach((element,index) => {
    //   if(element.areaId === code){
    //     this.checklistEllipse.splice(index,index)
    //   }
    // });

    this.checklistEllipse.forEach((element, index) => {

      if (element.table_code === code) {
        debugger;

        if (index === 0){
          this.checklistEllipse.splice(index);

        }else{

          this.checklistEllipse.splice(index, index);
        }
        // tslint:disable-next-line: no-debugger

      }

    });
  }

  cambiarValidation(indice: number ) {

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.checklistEllipse.length; i++) {
       
      if ( i  === indice ) {
          if( this.checklistEllipse[i].check ) {
              this.checklistEllipse[i].checkValidation = 'N';
            } else {
              this.checklistEllipse[i].checkValidation = 'Y';

          }
      }

    }

  }

}
