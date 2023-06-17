import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthenticationService, ControlsService, ServiciocajasService } from '../shared';
import Swal2 from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-posicion',
  templateUrl: './cambio-posicion.component.html',
  styleUrls: ['./cambio-posicion.component.scss']
})
export class CambioPosicionComponent implements OnInit {

  user: string = '';
  pwd: string = '';
  posicionesEllipse: any[];
  posDefault: any;
  public model: any = {};
  miFormulario: FormGroup;

  constructor( private fb: FormBuilder, private autentication: AuthenticationService, private _Recargarble: ServiciocajasService, private controlService: ControlsService,
               @Inject(MAT_DIALOG_DATA) public data: any,
               public MatDialogRef: MatDialogRef<CambioPosicionComponent>, private router: Router) { }

  ngOnInit() {

    this.obtenerPosiciones();
  }

  add() {

     Swal2.fire({
      title: 'Cambiar Credenciales',
      text : 'Atención: Esto cerrará todas las Jerarquias expandidas asociadas con su inicio de sesión. ¿Está seguro de que desea continuar?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText : 'Aceptar',
      cancelButtonColor: '#ef5350'
     }).then((result) => {

      if (!result.dismiss) {
        const {usuario, pwd, Distrito, posiscion} = this.miFormulario.value;
        const spinner = this.controlService.openSpinner();
        this.autentication.login_token(usuario, pwd, Distrito, posiscion)
      .subscribe( (data) => {
        const result = data.access_token;
        localStorage.setItem('tokenApp', JSON.stringify(data));
        if (result) {

          localStorage.setItem('tk', result);
          localStorage.setItem('Distrito', Distrito);
          localStorage.setItem('Posicion', posiscion);
          // debugger;
          this._Recargarble.notificaciones$.emit(true);
          this._Recargarble.Recargar$.emit(false);
          this.router.navigate(['/rkmain']);
          this.controlService.closeSpinner(spinner)
          this.cerrar();

        }
      });
      }
     });

  }
  obtenerPosiciones() {
    const spinner = this.controlService.openSpinner();
    this.autentication.positions(localStorage.getItem('Usuario'), '')
    .subscribe((data) => {
      this.posDefault = '';
      this.posicionesEllipse = [];
      data.data[0].atts.forEach((x) => {
        this.posicionesEllipse.push({
          name : x.name,
          value : x.value
        });

      });
      this.posDefault = this.posicionesEllipse[0].name;
      this.controlService.closeSpinner(spinner);
    });

    this.obtenerPerfil();
  }

  obtenerPerfil() {
    this.miFormulario = this.fb.group({
      usuario : [localStorage.getItem('Usuario')],
      pwd : [localStorage.getItem('pwd')],
      Distrito : [localStorage.getItem('Distrito')],
      posiscion: [this.posicionesEllipse]
    });

  }

  cerrar() {
    this.MatDialogRef.close();
  }

}
