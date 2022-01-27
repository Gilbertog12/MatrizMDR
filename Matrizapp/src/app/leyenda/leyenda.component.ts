import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthenticationService, ControlsService } from '../shared';
import { Router } from '@angular/router';

import Swal2 from 'sweetalert2';


@Component({
  selector: 'app-leyenda',
  templateUrl: './leyenda.component.html',
  styleUrls: ['./leyenda.component.scss']
})
export class LeyendaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LeyendaComponent>,
    private controlService: ControlsService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    private router: Router,
    
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    public key:string

  ngOnInit() {

  }

  approve(){

    const _atts = [];
              _atts.push({ name: 'scriptName', value: 'coemdr' });
              _atts.push({ name: 'action', value: 'APPROVE' });
              // _atts.push({ name: 'onlyActualNode', value: 'Y' });
              _atts.push({ name: 'key', value: this.key });
    
              const spinner = this.controlService.openSpinner();
              const obj = this.autentication.generic(_atts);
    
                        obj.subscribe(
                        (data) => {
                          if (data.success === true) {
                            // this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
    
                            Swal2.fire('Registro Enviado a Validar','', 'success' )
                            localStorage.setItem('isSendToValidate','1')
                            this.cerrar();
    
                            
                          } else {
                            // this.autentication.showMessage(data.success, data.message, {}, data.redirect);
                            Swal2.fire('',data.message,'error')
                          }
            
                          this.controlService.closeSpinner(spinner);
                          
                        },
                        (error) => {
                          // if ( error.status === 401 ) { this.autentication.logout(); return; }
                          this.controlService.closeSpinner(spinner);
                        });
  }

  cerrar() {
    this.dialogRef.close(true);

  }

}
