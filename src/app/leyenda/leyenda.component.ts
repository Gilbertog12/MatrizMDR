import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthenticationService, ControlsService } from '../shared';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../controls/confirmation/confirmation.component';

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

  ngOnInit() {

  }

  cerrar() {
    this.dialogRef.close(true);

  }

}
