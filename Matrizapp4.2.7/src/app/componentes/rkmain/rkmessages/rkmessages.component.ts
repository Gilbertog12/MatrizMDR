import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-rkmessages',
  templateUrl: './rkmessages.component.html',
  styleUrls: ['./rkmessages.component.scss']
})

export class RkmessagesComponent implements OnInit {
  public succes: string;
  public resultModel: any = {

  };

  constructor(public dialogRef: MatDialogRef<RkmessagesComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.resultModel.success = data.succcess;
                this.resultModel.redirect = data.redirect;
                this.resultModel.data = data.data;
                this.resultModel.message = data.message;
                
              }

  ngOnInit() { }

  

  aceptar() {
    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close(true);
  }

}
