import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  public resultModel: any = {

  };

  constructor(public dialogRef: MatDialogRef<InfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.resultModel.success = data.succcess;
    this.resultModel.redirect = data.redirect;
    this.resultModel.data = data.data;
    this.resultModel.message = data.message;
  }

  ngOnInit() {
  }

  aceptar() {
    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close(true);
  }

}
