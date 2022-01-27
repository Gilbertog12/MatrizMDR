
import { MatDialog } from '@angular/material';
import { ModalCambiarClaveComponent } from './../../componentes/modals/';
import { Component, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';
import { AuthenticationService, ControlsService, HttpMethodService } from '../../shared';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../../controls/confirmation/confirmation.component';
import { AddrkaComponent } from '../../componentes/rkmain/addrka/addrka.component';
import { RkhelpComponent } from '../../rkmain/rkhelp/rkhelp.component';
import { ServiciocajasService } from '../../shared/services/serviciocajas.service';

@Component({
  selector: 'my-app-header',
  styles: [],
  templateUrl: './header.component.html'
})

export class AppHeaderComponent implements OnInit {

  public AppConfig: any;
  public usuario: any = {};
  public Perfil: any[] = [];
  public consulta: string;
  public admin: string;
  public aprobador: string;
  public creador: string;
  public validador: string;
  public propiedad: boolean = false;
  public cargo: string;
  public pend: string;
  public valor: string;
  public Ambiente = '';
  public ver: string;
  public version: string = 'Version: 4.2.T';
  public posicion: string;
  public distrito: string;
  public usuario2: string;
  public informacion: string;

  public VersionCoemdr: any = {
    Fecha : '',
    Version : ''

  };
  tiempoVida: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private autentication: AuthenticationService,
              private methodService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              public posiciones: ServiciocajasService
    ) {
      this.ObtenerVersionCoemdr();
      // this.aperfil()
     }

  ngOnInit() {
    this.Version();
    this.AppConfig = APPCONFIG;
    this.usuario = JSON.parse(localStorage.getItem('currentUserPTEL'));
    localStorage.setItem('isSelectedNode', 'false');
    localStorage.setItem('keySelected', '');
    localStorage.setItem('versionSelected', '');
    localStorage.setItem('statusSelected', '');
    console.log(this.posiciones.Posiciones);

    this.usuario2 = localStorage.getItem('Usuario');
    this.posicion = localStorage.getItem('Posicion');
    this.distrito = localStorage.getItem('Distrito');

    this.informacion = this.usuario2 + ' ' + this.distrito + ' ' + this.posicion;
  }

  logout() {
    this.authenticationService.logout();
  }

  ObtenerVersionCoemdr() {
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    // _atts.push({ name: 'stdJobNo1', value: '' });
    _atts.push({ name: 'action', value: 'VERSION' });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe((data) => {
        const result = data.success;
        // console.log(data)
        if (result) {
          this.VersionCoemdr = {
            Fecha : data.data[0].atts[1].value.trim(),
            Version : `${this.version} - ${data.data[0].atts[1].value.trim()}`

          };
        }
        return result;
      });

    });
  }

  // help() {

  //   if (this.Ambiente.includes('DESARROLLO')) {
  //     let AmbienteEllipse = 'DESARROLLO';
  //   } else if (this.Ambiente.includes('DESARROLLO')) {
  //       AmbienteEllipse = 'TST';
  //   } else {
  //     AmbienteEllipse = 'PRD';
  //   }

  //   switch (AmbienteEllipse) {

  //     case 'DESARROLLO':
  //       window.open( 'https://prd-p01-col.ellipsehosting.com/html/ui?application=coehlp&type=read&AppName=COEMDR&scriptName=coehlp#!home', 'popup');
  //       break;
  //     case 'TEST':
  //       window.open( 'https://prd-p01-col.ellipsehosting.com/html/ui?application=coehlp&type=read&AppName=COEMDR&scriptName=coehlp#!home', 'popup');
  //       break;
  //     case 'PRD':
  //       window.open( 'https://prd-p01-col.ellipsehosting.com/html/ui?application=coehlp&type=read&AppName=COEMDR&scriptName=coehlp#!home', 'popup');
  //       break;

  //   }
  // }

  Version() {

    let _0x18a8 = ['\x6C\x6F\x67','\x41\x6D\x62\x69\x65\x6E\x74\x65','\x4D\x61\x74\x72\x69\x7A\x20\x64\x65\x20\x52\x69\x65\x73\x67\x6F\x73\x20\x45\x39','\x20\x2D\x20','\x44\x45\x53\x41\x52\x52\x4F\x4C\x4C\x4F','\x76\x65\x72','\x73\x6C\x69\x63\x65','\x74\x65\x78\x74','\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x72\x64\x2D\x70\x30\x31\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F','\x54\x45\x53\x54','\x68\x74\x74\x70\x73\x3A\x2F\x2F\x74\x73\x74\x2D\x6E\x30\x31\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F','\x50\x52\x4F\x44\x55\x43\x54\x49\x56\x4F','\x68\x74\x74\x70\x73\x3A\x2F\x2F\x70\x72\x64\x2D\x70\x30\x32\x2D\x63\x6F\x6C\x2E\x65\x6C\x6C\x69\x70\x73\x65\x68\x6F\x73\x74\x69\x6E\x67\x2E\x63\x6F\x6D\x2F\x65\x77\x73\x2F\x73\x65\x72\x76\x69\x63\x65\x73\x2F','\x73\x75\x62\x73\x63\x72\x69\x62\x65','\x67\x65\x74\x41\x50\x49','\x6D\x65\x74\x68\x6F\x64\x53\x65\x72\x76\x69\x63\x65','\x67\x65\x74\x4A\x53\x4F\x4E']; this[_0x18a8[15]][_0x18a8[16]]()[_0x18a8[13]]((_0xd5bdx1) => {console[_0x18a8[0]](_0xd5bdx1); this[_0x18a8[15]][_0x18a8[14]]()[_0x18a8[13]]((_0xd5bdx2) => {switch (_0xd5bdx2[0]) {case _0x18a8[8]: this[_0x18a8[1]] = _0x18a8[2] + _0x18a8[3] + _0x18a8[4]; this[_0x18a8[5]] = _0xd5bdx1[_0x18a8[7]][_0x18a8[6]](65, 80); return; case _0x18a8[10]: this[_0x18a8[1]] = _0x18a8[2] + _0x18a8[3] + _0x18a8[9]; this[_0x18a8[5]] = _0xd5bdx1[_0x18a8[7]][_0x18a8[6]](65, 80); return; case _0x18a8[12]: this[_0x18a8[1]] = _0x18a8[2] + _0x18a8[3] + _0x18a8[11]; this[_0x18a8[5]] = _0xd5bdx1[_0x18a8[7]][_0x18a8[6]](65, 80); return; default: break;}});});

  }

  cambiarClave() {

    const modal = this.confirm.open(RkhelpComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '800px',
      data: {
        title: 'Agregar Área',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cerrar'
      }
    });

  }

  goToDashboard() {
    this.router.navigate(['/rkmain']);
    // localStorage.setItem('cargartablero','2')
  }

  sendValidate() {
    if (localStorage.getItem('isSelectedNode') === 'true') {
      this.validateOrApprove();
    }

    if (localStorage.getItem('isSelectedNode') === 'false') {
      this.autentication.showMessage(false, 'Por favor seleccione el nivel que desea enviar', {}, false);
      this.router.navigate(['/rkmain']);
    }
  }

  async validateOrApprove() {

    if (localStorage.getItem('keySelected') === '') {
      this.autentication.showMessage(false, 'Key Invalido', {}, false);
      return;
    }

    if (localStorage.getItem('versionSelected') === '') {
      this.autentication.showMessage(false, 'Versión Invalida', {}, false);
      return;
    }

    if (localStorage.getItem('statusSelected') === '') {
      this.autentication.showMessage(false, 'Status Invalido', {}, false);
      return;
    }

    const conf = this.confirm.open(ConfirmationComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        title: 'Validar/Aprobar',
        message: `¿Desea enviar a Validar/Aprobar?`,
        button_confirm: 'Si',
        button_close: 'No'
      }
    });

    conf.afterClosed()
      .subscribe(async (result) => {
        if (result) {

          const _atts = [];
          _atts.push({ name: 'scriptName', value: 'coemdr' });
          _atts.push({ name: 'action', value: 'SEND_VALIDATE' });
          _atts.push({ name: 'key', value: localStorage.getItem('keySelected') });
          _atts.push({ name: 'versionId', value: localStorage.getItem('versionSelected') });
          _atts.push({ name: 'statusId', value: localStorage.getItem('statusSelected') });

          const spinner = this.controlService.openSpinner();
          const obj = await this.autentication.generic(_atts);

          obj.subscribe(
            (data) => {
              if (data.success === true) {
                if (data.data[0].atts[1]) {
                  this.autentication.showMessage(data.success, data.data[0].atts[1].value, data.data, data.redirect);
                }

              } else {
                this.autentication.showMessage(data.success, data.message, {}, data.redirect);
              }
              this.controlService.closeSpinner(spinner);
            },
            (error) => {
              this.controlService.closeSpinner(spinner);
            });
        }

      });

  }

  async nuevaArea() {

    this.confirm.open(AddrkaComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: '500px',
      data: {
        title: 'Agregar Área',
        message: ``,
        button_confirm: 'Guardar',
        button_close: 'Cancelar'
      }
    });

  }
  aperfil() {
    const _atts = [];
    _atts.push({ name: 'scriptName', value: 'coemdr' });
    _atts.push({ name: 'action', value: 'SESSION' });

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
        .subscribe(

          (data) => {
            // console.log("RES:" + JSON.stringify(data));
            const result = data.success;
            if (result) {

              data.data.forEach((element) => {
                if (element.atts.length > 0) {
                  this.Perfil.push({
                    adm: element.atts[1].value,
                    apr: element.atts[2].value,
                    con: element.atts[3].value,
                    cre: element.atts[4].value,
                    val: element.atts[5].value,
                  });
                }

              });

              this.Perfil.forEach((element, index, array) => {

                this.consulta = element.con;
                this.admin = element.adm;
                this.aprobador = element.apr;
                this.creador = element.cre;
                this.validador = element.val;

                this.cargo = this.admin + this.aprobador + this.consulta + this.creador + this.validador;
                if (this.cargo === 'NNYNN') {
                  this.propiedad = true;

                }
              });

            } else {
              this.controlService.snackbarError(data.message);
            }
            return result;
          },
          (error) => {
            this.controlService.snackbarError('Ha ocurrido un error al intentar conectarse, verifique su conexión a internet');
          });
    });

  }

}
