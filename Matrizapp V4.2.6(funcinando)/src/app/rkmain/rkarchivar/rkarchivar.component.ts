import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'app-rkarchivar',
  templateUrl: './rkarchivar.component.html',
  styleUrls: ['./rkarchivar.component.scss']
})
export class RkarchivarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RkarchivarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public Confirmar: boolean = false

  ngOnInit() {

  }

  aceptar() {
    this.dialogRef.close(true);
  }

}
