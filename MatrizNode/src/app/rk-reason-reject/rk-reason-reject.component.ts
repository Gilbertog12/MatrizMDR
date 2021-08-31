import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../controls/confirmation/confirmation.component';
import { AuthenticationService,ControlsService } from '../shared'
import Swal2 from 'sweetalert2';



@Component({
  selector: 'app-rk-reason-reject',
  templateUrl: './rk-reason-reject.component.html',
  styleUrls: ['./rk-reason-reject.component.scss']
})
export class RkReasonRejectComponent implements OnInit {

  razon:string;
  valor:any;
  version : any;
  isValidatingFromTree: string;
  constructor(public dialogRef: MatDialogRef<RkReasonRejectComponent>,
    // private controlService: ControlsService,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
          
      console.log( this.razon)
     }

  

   
  ngOnInit() {
  }
  
  CargarRazon(){
    
    const conf = this.confirm.open(ConfirmationComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Razon de Rechazo',
        // message: `¿Desea enviar a Validar/Aprobar?`,
        button_confirm: 'Aceptar',
        button_close: 'Rechazar'
      }
    });
  }
  
  async EnviarRazon(){

      this.valor =localStorage.getItem('Llave');
      this.version = localStorage.getItem('VersionL')
      this.isValidatingFromTree = localStorage.getItem('isValidatingFromTree')
      console.log(this.razon)
      let _atts = [];
      _atts.push({ name: 'scriptName', value: 'coemdr'});
      _atts.push({ name: 'action', value: 'VALIDATE'});
      _atts.push({ name: 'key', value: this.valor });
      _atts.push({ name: 'version', value: this.version});
      _atts.push({ name: 'approveInd', value: 'U' });
      _atts.push({ name: 'isValidatingFromTree', value: this.isValidatingFromTree });      
      _atts.push({ name: 'comments', value: this.razon });
      const spinner = this.controlService.openSpinner();
      const obj = await this.autentication.generic(_atts);

      obj.subscribe(
        
        (data) => {
          if (data.success === true) {
            if (data.data[0].atts[1]) {
              Swal2.fire({
                text:'Registro Rechazado',
                icon:'success',
                
              })
              this.cerrar()
      
            }
      
          } else {
            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
            Swal2.fire({
              text: data.message,
              icon:'error',
              
            })
            // this.cerrar()

          }
          this.controlService.closeSpinner(spinner);
      
        },(error) =>{
          this.controlService.closeSpinner(spinner);
          }
      )
  }

  cerrar() {
    this.dialogRef.close(true);
  }

}
