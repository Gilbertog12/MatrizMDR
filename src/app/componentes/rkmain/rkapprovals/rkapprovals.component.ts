import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../../../shared';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationComponent } from '../../../controls/confirmation/confirmation.component';
import { RkvalidarComponent } from '../rkvalidar/rkvalidar.component';
import { RkporaprobarComponent } from '../rkporaprobar/rkporaprobar.component';
import { RkpendaprobComponent } from '../rkpendaprob/rkpendaprob.component';
import { RkpendComponent } from '../rkpend/rkpend.component';

@Component({
  selector: 'app-rkapprovals',
  templateUrl: './rkapprovals.component.html',
  styleUrls: ['./rkapprovals.component.scss']
})
export class RkapprovalsComponent implements OnInit {

  public actividadModel: any = {

  };

  public detalleList: any[] = [];

  private key : string;
  private status : string;
  private cj : string;

  constructor(public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute,private confirm: MatDialog,) { 

      this.route.params.subscribe( parametros => {
        this.cj = parametros['cj'];
        this.key = parametros['key'];
        this.status = parametros['status']

      })
      
      this.VerCaja()

      
    }

  ngOnInit() {
  }



  VerCaja(){
      
      switch(this.cj){
        case 'IV':
          this.confirm.open(RkvalidarComponent, {
            hasBackdrop: true,
            height: 'auto',
            width: 'auto',
            data:
            {
              title: 'Items pendientes de validación',
              message: '',
              button_confirm: 'Cerrar',
              button_close: 'Cerrar',
              id:this.key,
              status:this.status
        
            }
        
          });  
          break;

        case 'EV':
          this.confirm.open(RkpendComponent,
            {
              hasBackdrop: true,
              id: 'drag',
              height: 'auto',
              width: 'auto',
              data:
              {
                title: 'Items en fase de creacion, modificacion o eliminacion',
                message: '',
                button_confirm: 'Cerrar',
                button_close: 'Cerrar',
                id:this.key,
                status:this.status
      
              },
              
      
      
            });
          break;
        case 'IA':
          this.confirm.open(RkporaprobarComponent, {
            hasBackdrop: true,
            height: 'auto',
            width: 'auto',
      
            data:
            {
              title: 'Items Pendientes por Aprobar',
              message: '',
              button_confirm: 'Cerrar',
              button_close: 'Cerrar',
              id:this.key,
              status:this.status
            }
      
          });
          break;

        case 'RE':
           this.confirm.open(RkpendaprobComponent, {
            hasBackdrop: true,
            height: 'auto',
            width: 'auto',
      
            data:
            {
              title: 'Items Rechazados',
              message: '',
              button_confirm: 'Cerrar',
              button_close: 'Cerrar',
              id:this.key,
              status:this.status
      
            },
      
      
          });
          break
      }
      
  }

  //Logica antigua Componente
  // quitarU(item: any) {
  //   item.selectedU = false;
  // }

  // quitarA(item: any) {
  //   item.selectedA = false;
  // }

  // aceptar(item: any) {
  //   let _atts = [];
  //   _atts.push({ name: 'scriptName', value: 'coemdr'});
  //   _atts.push({ name: 'action', value: 'VALIDATE'});
  //   _atts.push({ name: 'key', value: item.key.trim() });
  //   _atts.push({ name: 'version', value: item.version });
  //   _atts.push({ name: 'approveInd', value: 'A' });

  //   const spinner = this.controlService.openSpinner();
  //   const obj = this.autentication.generic(_atts);

  //   obj.subscribe(
  //   (data) => {
  //   if (data.success === true) {
  //     if ( data.data[0].atts[1] ) {
  //       this.autentication.showMessage(data.success, data.data[0].atts[1].value, item, data.redirect);
  //       this.detalleList = [];
  //       this.ver(this.key, this.status, this.version);
  //       localStorage.setItem('recargarAprobaciones', 'true');
  //     } else {
  //       this.autentication.showMessage(data.success, data.message, item, data.redirect);
  //     }
  //     //this.autentication.showMessage(data.success, 'El item ' + item.id + ' fue Aprobado', item, data.redirect);

  //     /*this.detalleList = [];
  //     this.ver(this.key, this.status, this.version);*/
  //   }
  //   else {
  //     this.autentication.showMessage(data.success, data.message, item, data.redirect);
  //   }
  //   this.controlService.closeSpinner(spinner);
  //   },
  //   (error) => {
  //     this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', item, false);
  //     this.controlService.closeSpinner(spinner);
  //   });

  // }

  // generarTransaccionA(item: any) {

  //   const conf = this.confirm.open(ConfirmationComponent, {
  //     hasBackdrop: true,
  //     height: 'auto',
  //     width: 'auto',
  //     data: {
  //       title: 'Validar/Aprobar',
  //       message: '¿ Desea enviar a Validar/Aprobar ?',
  //       button_confirm: 'Si',
  //       button_close: 'No'
  //     }
  //   });

  //   conf.afterClosed()
  //   .subscribe(async (result) => {
  //   if (result) {
  //     this.aceptar(item);
  //   }
  //   });

  // }

  // generarTransaccionU(item: any) {

  //   const conf = this.confirm.open(ConfirmationComponent, {
  //     hasBackdrop: true,
  //     height: 'auto',
  //     width: 'auto',
  //     data: {
  //       title: 'Validar/Aprobar',
  //       message: '¿ Desea enviar a Validar/Aprobar ?',
  //       button_confirm: 'Si',
  //       button_close: 'No',
        
  //     }
  //   });

  //   conf.afterClosed()
  //   .subscribe(async (result) => {
  //   if (result) {
  //     this.rechazar(item);
  //   }
  //   });

  // }

  // generarTransacciones(detalleList: any[]) {

  //   let msj: string = '';
  //   let msjA: string = '';
  //   let msjU: string = '';
  //   let cntA: number = 0;
  //   let cntU: number = 0;

  //   detalleList.forEach( (element) => {
  //     if ( element.selectedA === true ) { msjA = msjA + '<b>' + element.id + '</b><br />'; cntA++; }
  //     if ( element.selectedU === true ) { msjU = msjU + '<b>' + element.id + '</b><br />'; cntU++; }
  //   });

  //   if ( cntA === 0 && cntU === 0 ) {
  //     this.autentication.showMessage(false, 'Debe escoger Aprobar o Rechazar por lo menos un item', detalleList, false);
  //     return;
  //   }

  //   if ( cntA > 0 ) { msj = msj + 'Usted aprobará los siguientes items: <br />' + msjA; }
  //   if ( cntU > 0 ) { msj = msj + 'Usted rechazará los siguientes items: <br />' + msjU; }

  //   msj = msj + '¿Desea continuar?';

  //   const conf = this.confirm.open(ConfirmationComponent, {
  //     hasBackdrop: true,
  //     height: 'auto',
  //     width: 'auto',
  //     data: {
  //       title: 'Validar/Aprobar',
  //       message: msj,
  //       button_confirm: 'Si',
  //       button_close: 'No'
  //     }
  //   });

  //   conf.afterClosed()
  //   .subscribe(async (result) => {
  //   if (result) {
  //     new Promise((resolve, reject) => {
  //       detalleList.forEach( (element) => { 
  //         if ( element.selectedA === true ) {
  //           // tslint:disable-next-line:no-unused-expression
  //           new Promise((resolve, reject) => {
  //             this.aceptar(element); 
  //           });
  //         }
  //         if ( element.selectedU === true ) { 
  //           // tslint:disable-next-line:no-unused-expression
  //           new Promise((resolve, reject) => {
  //             this.rechazar(element);
  //           });
  //         }
  //       });
  //     });
  //     this.detalleList = [];
  //     this.ver(this.key, this.status, this.version);
  //   }
  //   });

  // }

  // rechazar(item: any) {
  //   let _atts = [];
  //   _atts.push({ name: 'scriptName', value: 'coemdr'});
  //   _atts.push({ name: 'action', value: 'VALIDATE'});
  //   _atts.push({ name: 'key', value: item.key.trim() });
  //   _atts.push({ name: 'version', value: item.version });
  //   _atts.push({ name: 'approveInd', value: 'U' });

  //   const spinner = this.controlService.openSpinner();
  //   const obj = this.autentication.generic(_atts);

  //   obj.subscribe(
  //   (data) => {
  //   if (data.success === true) {
  //     if ( data.data[0].atts[1] ) {
  //       this.autentication.showMessage(data.success, data.data[0].atts[1].value, item, data.redirect);
  //       this.detalleList = [];
  //       this.ver(this.key, this.status, this.version);
  //       localStorage.setItem('recargarAprobaciones', 'true');
  //     } else {
  //       this.autentication.showMessage(data.success, data.message, item, data.redirect);
  //     }
  //     //this.autentication.showMessage(data.success, 'El item ' + item.id + ' no fue Aprobado', item, data.redirect);

  //     /*this.detalleList = [];
  //     this.ver(this.key, this.status, this.version);*/
  //   }
  //   else {
  //     this.autentication.showMessage(data.success, data.message, item, data.redirect);
  //   }
  //   this.controlService.closeSpinner(spinner);
  //   },
  //   (error) => {
  //     this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', item, false);
  //     this.controlService.closeSpinner(spinner);

  //   });

  // }

  // ver(key: string, status: string, version: string) {
  //   let _atts = [];
  //   _atts.push({name: 'scriptName', value: 'coemdr'});
  //   _atts.push({name: 'action', value: 'DETAIL_APPROVE'});
  //   _atts.push({ name: 'key', value: key });
  //   _atts.push({ name: 'status', value: status });
  //   _atts.push({ name: 'version', value: version });

  //   const spinner = this.controlService.openSpinner();

  //   const promiseView = new Promise((resolve, reject) => {
  //     this.autentication.generic(_atts)
  //     .subscribe(
  //       (data) => {
  //         const result = data.success;
  //         if (result) {

  //           data.data.forEach( (element) => {
  //             if ( element.atts.length > 0) {
  //               if ( element.atts[0].name === 'areaId' ) {
  //                 this.actividadModel = {
  //                   areaId: data.data[0].atts[0].value,
  //                   areaDescripcion: data.data[0].atts[1].value,
  //                   procesoId: data.data[0].atts[2].value,
  //                   procesoDescripcion: data.data[0].atts[3].value,
  //                   subprocesoId: data.data[0].atts[4].value,
  //                   subprocesoDescripcion: data.data[0].atts[5].value,
  //                   actividadId: data.data[0].atts[6].value,
  //                   actividadDescripcion: data.data[0].atts[7].value
  //                 };

  //               } else {
  //                 this.detalleList.push({
  //                   selectedU: false,
  //                   selectedA: false,
  //                   offset: element.atts[0].value,
  //                   id: element.atts[1].value,
  //                   tarea: element.atts[2].value,
  //                   dimension: element.atts[3].value,
  //                   riesgo: element.atts[4].value,
  //                   consecuencia: element.atts[5].value,
  //                   accion: element.atts[6].value,
  //                   entidad: element.atts[7].value,
  //                   usuario: element.atts[8].value,
  //                   fecha: element.atts[9].value,
  //                   key: element.atts[10].value,
  //                   version: element.atts[11].value
  //                 });
  //               }
  //             }
  //           });

  //           this.controlService.closeSpinner(spinner);
  //         } else {
  //           this.controlService.closeSpinner(spinner);
  //           this.autentication.showMessage(data.success, data.message, this.actividadModel, data.redirect);
  //         }
  //         return result;
  //     },
  //     (error) => {
  //       this.controlService.closeSpinner(spinner);
  //       this.autentication.showMessage(false, 'Ha ocurrido un error al intentar conectarse, verifique su conexión a internet', this.actividadModel, false);
  //     });
  //   });
  // }

  // verTable(item: any) {
  //     switch (item.key.trim().length.toString()) {
  //       case '2':
  //         this.router.navigate(['/rkmain/rka/' + item.key]);
  //         break;
  //       case '6':
  //         this.router.navigate(['/rkmain/rkp/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6)]);
  //         break;
  //       case '10':
  //         this.router.navigate(['/rkmain/rks/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10)]);
  //         break;
  //       case '14':
  //         this.router.navigate(['/rkmain/rkc/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14)]);
  //         break;
  //       case '21':
  //         this.router.navigate(['/rkmain/rkc/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14)]);
  //         break;
  //       case '18':
  //         this.router.navigate(['/rkmain/rkt/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18)]);
  //         break;
  //       case '19':
  //         this.router.navigate(['/rkmain/rkd/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18) + '/' + item.key.substring(18, 19)]);
  //         break;
  //       case '23':
  //         this.router.navigate(['/rkmain/rkr/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18) + '/' + item.key.substring(18, 19) + '/' + item.key.substring(19, 23)]);
  //         break;
  //       case '27':
  //         this.router.navigate(['/rkmain/rky/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18) + '/' + item.key.substring(18, 19) + '/' + item.key.substring(19, 23) + '/' + item.key.substring(23, 27)]);
  //         break;
  //       case '30':
  //         this.router.navigate(['/rkmain/rky/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18) + '/' + item.key.substring(18, 19) + '/' + item.key.substring(19, 23) + '/' + item.key.substring(23, 27)]);
  //         break;
  //       case '31':
  //         this.router.navigate(['/rkmain/rky/' + item.key.substring(0, 2) + '/' + item.key.substring(2, 6) + '/' + item.key.substring(6, 10) + '/' + item.key.substring(10, 14) + '/' + item.key.substring(14, 18) + '/' + item.key.substring(18, 19) + '/' + item.key.substring(19, 23) + '/' + item.key.substring(23, 27)]);
  //         break;
  //       default:
  //         alert(item.key.trim());
  //         alert(item.key.trim().length.toString());
  //         break;
  //     }
  //   }

}