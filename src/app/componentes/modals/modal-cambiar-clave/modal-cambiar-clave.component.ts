import { Component, OnInit, Inject } from '@angular/core';
import { ControlsService, HttpMethodService } from '../../../shared';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-cambiar-clave',
  templateUrl: './modal-cambiar-clave.component.html',
  styleUrls: ['./modal-cambiar-clave.component.scss']
})
export class ModalCambiarClaveComponent implements OnInit {

  public model: any = {};
  private usuario: any = {};
  constructor(public methodService: HttpMethodService,
              public controlService: ControlsService,
              @Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<ModalCambiarClaveComponent>) {

    }

  ngOnInit() {
    this.model = {};
    this.usuario = JSON.parse(localStorage.getItem('currentUser'));
  }

  onSubmit() {

    const spinner = this.controlService.openSpinner();
    this.model.usuario = this.usuario.username;
    this.methodService.PUT<any>(`/lider/cambiar-clave/${this.usuario.id}/`, this.model)
    .subscribe(
      (data) => {
        if (data.status === 'success') {
          this.controlService.snackbarSucces(data.message);
          this.model = {};
          this.dialogRef.close(null);
        }
        this.controlService.closeSpinner(spinner);
      },
      (error) => {
        this.controlService.snackbarError(error.error.message);
        this.controlService.closeSpinner(spinner);
      });
  }

  cerrar() {
    this.dialogRef.close(null);
  }

}
