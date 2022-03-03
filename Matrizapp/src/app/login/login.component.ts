import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HttpMethodService, ControlsService } from '../shared';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { isNullOrUndefined } from 'util';
import Swal2 from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiciocajasService } from '../shared/services/serviciocajas.service';

interface Posiciones {
    name : string;
    value: string;

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  Ambiente: string;
  ambiente: string;
  pass: boolean;
  recuerdame: boolean;
  user: string;
  distrito: string;
  posicion: string;
  recordar: boolean = true;
  posDefault: any = '';
  disDefault: any;
  min: number;
  sec: number;
  ano: Date;

  //nuevo

  posicionesEllipse: Posiciones[] = [];

  form: FormGroup = new FormGroup({});

  constructor(private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private posiciones: ServiciocajasService,
              ) {
    // this.Version();
    this.min = 4;
    this.sec = 59;
    // this.prueba();
              }

  public model: any = {};
  returnUrl: string;

  ngOnInit() {
     // get return url from route parameters or default to '/'
     this.autentication.BorrarStorage();
     this.returnUrl = isNullOrUndefined(this.route.snapshot.queryParams['returnUrl']) || this.route.snapshot.queryParams['returnUrl'] === '/' || this.route.snapshot.queryParams['returnUrl'] === '' ? '/rkmain' : this.route.snapshot.queryParams['returnUrl'];

     if (localStorage.getItem('recordar') === 'true') {

        this.model.username = localStorage.getItem('Usuario');
        this.recordar = true;
        this.model.recordar = this.recordar;
        console.log('epa la arepa');
    } else {
      this.recordar = false;
      this.model.recordar = this.recordar;
    }

     console.log(this.recordar);

  }

  positions: any = [] ;
  districts: any = []  ;
  array1 = [];
  array2 = [];

  

  login() {
    localStorage.setItem('isLoggedinApp', 'false');
    const spinner = this.controlService.openSpinner();


    this.model.district = 'COLL';

    this.model.position = this.posDefault;

    this.model.password = this.model.password === 'undefined' ? '' : this.model.password;

    this.autentication.login_token(this.model.username, this.model.password, this.model.district, this.model.position)
    .subscribe(

       (data) => {

        console.log(data);
        const result = data.access_token;
        localStorage.setItem('tokenApp', JSON.stringify(data));
        if (result) {

             localStorage.setItem('isLoggedinApp', 'true');
             localStorage.setItem('tk', result);
             this.router.navigate([this.returnUrl]);
             this.controlService.closeSpinner(spinner);
             localStorage.setItem('show Dashboard', 'true');
             if (this.recordar) {

               localStorage.setItem('recordar', 'true');
              } else {
               localStorage.setItem('recordar', 'false');

             }

             localStorage.setItem('Usuario', this.model.username );
             localStorage.setItem('Distrito', this.model.district);
             localStorage.setItem('Posicion', this.model.position);

        } else {
          this.controlService.closeSpinner(spinner);
          this.autentication.showMessage(false, data.error_description, this.model, false);
        }
        return result;
     },
     (error) => {
       debugger;
       this.controlService.closeSpinner(spinner);
       console.log(error);
       console.log(error.error.error_description);
       this.controlService.snackbarError(error.error.error_description);
       debugger;
       Swal2.fire({
         title: error.error.error_description,
         icon: 'error',
         text: error.error.error_description
       });
     });

  }

  deafultValues() {

    const spinner = this.controlService.openSpinner();
    this.autentication.positions( this.model.username, this.model.password)
    .subscribe( (data) => {
      console.log(data.success)
      if (data.success === true) {
        
        data.data[0].atts.forEach((x) => {
          this.posicionesEllipse.push({
            name : x.name,
            value : x.value
          });
      });

        this.posDefault = this.posicionesEllipse[0].name;
        
        this.controlService.closeSpinner(spinner);

      } else {

        this.controlService.closeSpinner(spinner);
      }

    }),
     // tslint:disable-next-line: no-unused-expression
     (error) => {
       
       this.controlService.closeSpinner(spinner);
       this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
       alert(error.error);
     };

  }

    copyright() {
    // this.methodService.getJSON().subscribe(
    //   (data) => {

    //     this.methodService.getAPI().subscribe(
    //       (data2) => {

    //         // console.log(data['text'])

    //       let cadena1 = data['text']
    //       let cadena2 = cadena1.slice(65,80)
    //       let nuevaversion = ' version 4.1.2 '
    //       let nuevaleyenda = cadena1.replace(cadena2,nuevaversion)

    //       // console.log(nuevaleyenda)

    //         this.autentication.showInfo(true, nuevaleyenda + data2[0], {}, false);
    //     });
    // });

    Swal2.fire({
      icon: 'info',
      html: 'Matriz de riesgos, Copyright  . <br /> <b>Summa consulting.</b><br /> Version Aplicativo WEB 4.3.0 <br />Fecha de compilación: 2022-02-23<br />',
      showCloseButton: true

    });
  }

  Version() {
    let _0x4e79 = ['\x6C\x6F\x67', '\x41\x6D\x62\x69\x65\x6E\x74\x65', '\x4D\x61\x74\x72\x69\x7A\x20\x64\x65\x20\x52\x69\x65\x73\x67\x6F\x73\x20\x45\x39', '\x20\x2D\x20', '\x44\x45\x53\x41\x52\x52\x4F\x4C\x4C\x4F', '\x61\x6D\x62\x69\x65\x6E\x74\x65', '\x45\x6C\x6C\x69\x70\x73\x65\x20\x39\x20\x44\x65\x76', '\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x72\x64\x2D\x70\x30\x31\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F', '\x54\x45\x53\x54', '\x45\x6C\x6C\x69\x70\x73\x65\x20\x39\x20\x54\x53\x54', '\x68\x74\x74\x70\x73\x3A\x2F\x2F\x74\x73\x74\x2D\x6E\x30\x31\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F', '\x50\x52\x4F\x44\x55\x43\x54\x49\x56\x4F', '\x45\x6C\x6C\x69\x70\x73\x65\x20\x39\x20\x50\x52\x44', '\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x72\x64\x2D\x70\x30\x32\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F', '\x73\x75\x62\x73\x63\x72\x69\x62\x65', '\x67\x65\x74\x41\x50\x49', '\x6D\x65\x74\x68\x6F\x64\x53\x65\x72\x76\x69\x63\x65', '\x67\x65\x74\x4A\x53\x4F\x4E']; this[_0x4e79[16]][_0x4e79[17]]()[_0x4e79[14]]((_0x27c1x1) => {console[_0x4e79[0]](_0x27c1x1); this[_0x4e79[16]][_0x4e79[15]]()[_0x4e79[14]]((_0x27c1x2) => {switch (_0x27c1x2[0]) {case _0x4e79[7]: this[_0x4e79[1]] = _0x4e79[2] + _0x4e79[3] + _0x4e79[4]; this[_0x4e79[5]] = _0x4e79[6]; return; case _0x4e79[10]: this[_0x4e79[1]] = _0x4e79[2] + _0x4e79[3] + _0x4e79[8]; this[_0x4e79[5]] = _0x4e79[9]; return; case _0x4e79[13]: this[_0x4e79[1]] = _0x4e79[2] + _0x4e79[3] + _0x4e79[11]; this[_0x4e79[5]] = _0x4e79[12]; return; default: break; }}); });
  }

}
