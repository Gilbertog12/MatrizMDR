import { Component, OnInit, inject, Inject } from '@angular/core';
import { AuthenticationService } from '../../shared';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RkpendaprobComponent } from '../../componentes/rkmain/rkpendaprob/rkpendaprob.component';
import { RkpendComponent } from '../../componentes/rkmain/rkpend/rkpend.component';

@Component({
  selector: 'app-cajasdashboard',
  templateUrl: './cajasdashboard.component.html',
  styleUrls: ['./cajasdashboard.component.scss']
})
export class CajasdashboardComponent implements OnInit {


  public dashboardData: any = {
    ENVIAR_A_VALIDAR: 0,
    POR_VALIDAR: 0,
    Rechazados: 0,
    POR_APROBAR: 0,
    En_Construccion:0
  };

  constructor(private autentication: AuthenticationService, 
    private confirm: MatDialog ,
    public dialogRef: MatDialogRef<CajasdashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
      this.data.id,
      this.data.status,
    this.cargarDashboard()
   }

  ngOnInit() {

    
  }

  cargarDashboard() {
    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    // _atts.push({ name: 'stdJobNo1', value: '' });
    _atts.push({ name: 'status', value: this.data.status });
    _atts.push({ name: 'key', value: this.data.id });
    _atts.push({ name: 'action', value: 'TABLERO_LIST' });

    // const spinner = this.controlService.openSpinner()
    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(
          (data) => {
            console.log(data)
            const result = data.success;
            if (result) {
              // this.Cajas.caja1 = data.data[0].atts[1].value.trim()
              this.dashboardData = {
                ENVIAR_A_VALIDAR: data.data[0].atts[1].value.trim(),
                POR_VALIDAR: data.data[0].atts[2].value.trim(),
                Rechazados: data.data[0].atts[3].value.trim(),
                POR_APROBAR: data.data[0].atts[4].value.trim(),
                En_Construccion: data.data[0].atts[5].value.trim()
              };
            } else {
              // this.controlService.closeSpinner(spinner);

              // this.autentication.showMessage(data.success, data.message, this.aprobacionesList, data.redirect);
            }
            return result;
          });
    });
  }


  async VerEnviarValidar() {

    const conf =this.confirm.open(RkpendComponent,
      {
        hasBackdrop: true,
        // id: 'drag',
        height: 'auto',
        width: 'auto',
        data:
        {
          title: 'Items en fase de creacion, modificacion o eliminacion',
          message: '',
          button_confirm: 'Cerrar',
          button_close: 'Cerrar',
          id:this.data.id,
          status: this.data.status

        },
        // panelClass : 'tabla'


      })
    }

   async VerEnviarAprobar() {

    const conf = this.confirm.open(RkpendaprobComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',

      data:
      {
        title: 'Items Rechazados',
        message: '',
        button_confirm: 'Cerrar',
        button_close: 'Cerrar',
        id:this.data.id,
        status: this.data.status
      },


    })
  }

  cancelar() {
    
    this.dialogRef.close(true);
  }

}
