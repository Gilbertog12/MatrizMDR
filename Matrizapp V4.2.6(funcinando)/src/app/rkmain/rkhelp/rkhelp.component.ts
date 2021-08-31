import { Component, OnInit, Inject, Injectable, Output, EventEmitter, Input, HostBinding, HostListener, Directive } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AuthenticationService, ControlsService } from '../../shared';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../../controls/confirmation/confirmation.component';

import { NgxLoadingService } from 'ngx-loading';

@Component({
  selector: 'app-rkhelp',
  templateUrl: './rkhelp.component.html',
  styleUrls: ['./rkhelp.component.scss']
})
export class RkhelpComponent implements OnInit {
  icono: string;

  constructor(public dialogRef: MatDialogRef<RkhelpComponent>,
    private controlService: ControlsService,private spinner: NgxLoadingService,
    private autentication: AuthenticationService,
    private confirm: MatDialog,
    private router: Router,
    
    // public papa :RkmainComponent,
    
    
    
    @Inject(MAT_DIALOG_DATA) public data: any) { }


    public docsHelp: any[] = [
    //   {
    //   No:'0001',
    //   Nombre:'VIDEO 001',
    //   descripcion:'Video de youtube',
    //   link:'https://www.youtube.com/watch?v=xygGV6tU5pw&ab_channel=GESTIONACTIVOSCOLLAHUASI'

    // },
    // {
    //   No:'0001',
    //   Nombre:'VIDEO 001',
    //   descripcion:'Video de youtube',
    //   link:'https://www.sdadasd.com/watch?v=xygGV6tU5pw&ab_channel=GESTIONACTIVOSCOLLAHUASI'

    // },
  
  ];

  ngOnInit() {


    // let pruebaLink='https://www.youtube.com/watch?v=xygGV6tU5pw&ab_channel=GESTIONACTIVOSCOLLAHUASI'

    //         if(pruebaLink.includes('youtube')){
    //           this.icono ='assets/images/youtube.png'
    //         }else{
    //           this.icono ='assets/images/pdf.png'
    //         }


    this.CargarDocsHelp()
  }

  CargarDocsHelp(){

    let _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'HELP_DOCUMENTS' });

    const spinner = this.controlService.openSpinner();

    const promesa = new Promise((resolve, reject)=>{

      this.autentication.generic(_atts).subscribe(
       (data)=>{
        console.log(data)
        const result = data.success;

        if(result){
          data.data.forEach(element => {

            let pruebaLink=element.atts[7].value.trim()

            if(pruebaLink.includes('youtube')){
              this.icono ='assets/images/youtube.png'
            }else{
              this.icono ='assets/images/link.png'
            }

            this.docsHelp.push({
              DOCUMENT_NO:element.atts[2].value.trim(),
              DOCUMENT_NAME1:element.atts[5].value.trim(),
              ELEC_REF:element.atts[7].value.trim(),
              icono:this.icono 
              
              
            })
            
          });

          this.controlService.closeSpinner(spinner);

        }
        }
      )
    })

    

  }

  Ir(){
    console.log('Holaaaa')
  }


  cerrar(){
    this.dialogRef.close(false);

  }

}
