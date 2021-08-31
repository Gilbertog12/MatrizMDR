import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RkvalidarComponent } from '../componentes/rkmain/rkvalidar/rkvalidar.component';

@Component({
  selector: 'app-cajaslink',
  templateUrl: './cajaslink.component.html',
  styleUrls: ['./cajaslink.component.scss']
})
export class CajaslinkComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router,
    private route: ActivatedRoute,private confirm: MatDialog,) { 

      this.route.params.subscribe( parametros => {
        console.log(parametros)
      })
      
      this.VerValidar()




      
    }

  ngOnInit() {}


 VerValidar(){

  const conf = this.confirm.open(RkvalidarComponent, {
    hasBackdrop: true,
    height: 'auto',
    width: 'auto',
    data:
    {
      title: 'Items pendientes de validación',
      message: '',
      button_confirm: 'Cerrar',
      button_close: 'Cerrar'

    }

  });
}

}
