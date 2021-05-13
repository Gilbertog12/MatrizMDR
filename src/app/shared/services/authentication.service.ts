import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpMethodService } from './http-method.service';
import { ResponseOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import { ControlsService } from './controls.service';
import { MatDialog } from '@angular/material';
import { RkmessagesComponent } from '../../componentes/rkmain/rkmessages/rkmessages.component';
import { InfoComponent } from '../../componentes/rkmain/info/info.component';

@Injectable()
export class AuthenticationService {

  private clientId = '';
  private clientSecret = '';

  constructor(private http: HttpClient,
              private httpService: HttpMethodService,
              private controlService: ControlsService,
              private confirm: MatDialog,
              private router: Router) {}

  // posicion(usernameV: string, passwordV: string){

  //   const _url = this.httpService.baseUrl + '/values/positions/';
  //   const online = navigator.onLine;

  //   if (!online) {
  //     this.controlService.snackbarError('Ha ocurrido un error al tratar de conectarse con el servidor.');
  //     return;
  //   }

  //   let body: any;

  //   body = {
  //     username: usernameV,
  //     pwd: passwordV === 'undefined' ? '' : passwordV
  //   };

  //   let headersV = new HttpHeaders();
  //   headersV = headersV.append('Content-Type', 'application/json');
  //   return this.http.post<any>(_url, body, { headers : headersV });
  //   console.log( body );
  // }


  login(usernameV: string, passwordV: string, districtV: any, positionV: string , recordar:boolean) {

    const _url = this.httpService.baseUrl + '/values/login/';
    const online = navigator.onLine;

    

    if (!online) {
      this.controlService.snackbarError('Ha ocurrido un error al tratar de conectarse con el servidor.');
      this.logout()
      return;
    }

    let body: any;

    body = {
      username: usernameV,
      pwd: passwordV === 'undefined' ? '' : passwordV,
      district: districtV.toUpperCase(),
      position: positionV.toUpperCase(),
      recordar : false
    };

    let headersV = new HttpHeaders();
    headersV = headersV.append('Content-Type', 'application/json');

    return this.http.post<any>(_url, body, { headers : headersV });

  }

  login_token(usernameV: string, passwordV: string, districtV: string, positionV: string) {

    const _url = this.httpService.baseUrl.slice(0, -4) + '/token';
    const online = navigator.onLine;

    if (!online) {
      this.controlService.snackbarError('Ha ocurrido un error al tratar de conectarse con el servidor.');
      this.logout()

      return;
    }

    let body = new HttpParams();
    if (typeof passwordV === "undefined"){
      passwordV = ' ';
    }
    body = body.append('grant_type', 'password');
    body = body.append('username', usernameV);
    
    body = body.append('password', passwordV);
    body = body.append('district', districtV);
    body = body.append('position', positionV);

    let headersV = new HttpHeaders();
    headersV = headersV.append('Content-Type', 'application/x-www-form-urlencoded');
    headersV = headersV.append('Access-Control-Allow-Origin', '*');

    return this.http.post<any>(_url, body, { headers : headersV});

  }

  districts(usernameV: string, passwordV: string) {

    const _url = this.httpService.baseUrl + '/values/districts/';
    
    const online = navigator.onLine;

    console.log("======" + _url);

    if (!online) {
      this.controlService.snackbarError('Ha ocurrido un error al tratar de conectarse con el servidor.');
      this.logout()

      return;
    }

    let body: any;
    if (typeof passwordV === "undefined"){
      passwordV = ' ';
    }

    body = {
      username: usernameV,
      pwd: passwordV
    };

    let headersV = new HttpHeaders();
    headersV = headersV.append('Content-Type', 'application/json');
    headersV = headersV.append('username', usernameV);
    headersV = headersV.append('password', passwordV);

    const _post  = this.http.post<any>(_url, body, {headers : headersV});

    return _post;

  }

  positions(usernameV: string, passwordV: string) {

    const _url = this.httpService.baseUrl + '/values/positions/';
    const online = navigator.onLine;

    console.log("======" + _url);

    if (!online) {
      this.controlService.snackbarError('Ha ocurrido un error al tratar de conectarse con el servidor.');
      this.logout()

      return;
    }

    let body: any;
    if (typeof passwordV === "undefined"){
      passwordV = ' ';
    }

    body = {
      username: usernameV,
      pwd: passwordV
    };

    let headersV = new HttpHeaders();
    headersV = headersV.append('Content-Type', 'application/json');
    headersV = headersV.append('username', usernameV);
    headersV = headersV.append('password', passwordV);

    const _post  = this.http.post<any>(_url, body, {headers : headersV});

    return _post;

  }

  generic(listParams: any []) {

    const _url = this.httpService.baseUrl + '/values/generic/';
    const online = navigator.onLine;

    if (!online) {
      //this.controlService.snackbarError('Ha ocurrido un error al tratar de conectarse con el servidor.');
      this.logout()

      return;
    }

    let body: any;

    body = {
      atts: listParams
    };

    /*body = {
      username: localStorage.getItem('un'),
      pwd: localStorage.getItem('pd') === 'undefined' ? null : localStorage.getItem('pd'),
      district: localStorage.getItem('ds'),
      position: localStorage.getItem('ps'),
      atts: listParams
    };*/

    let headersV = new HttpHeaders();
    headersV = headersV.append('Content-Type', 'application/json');
    headersV = headersV.append('Authorization', 'bearer ' + localStorage.getItem('tk'));
    const _post = this.http.post<any>(_url, body, { headers : headersV });

    /*_post.subscribe(
      (data) => { 
        console.log('Generic se ejecuto satisfactoriamente!' );
      },
      (error) => {
        if ( error.status === 401 ) {
          console.log(error);
          //alert('Sesión de usuario ha expirado');
          this.showMessage(false, 'Sesión de usuario ha expirado', {}, true);
        }
      }
    );*/
    console.log(_post)
    return _post;

  }

  BorrarStorage(){

    
    localStorage.removeItem('statusSelected')
    localStorage.removeItem('urlApi')
    localStorage.removeItem('canAdd')
    localStorage.removeItem('show Dashboard')
    localStorage.removeItem('itemseleccionado')
    localStorage.removeItem('NoCreador')
    localStorage.removeItem('versionSelected')
    localStorage.removeItem('StatusPadre')
    localStorage.removeItem('keySelected')
    localStorage.removeItem('sololectura')
    localStorage.removeItem('seleccionado')
    localStorage.removeItem('tk')
    localStorage.removeItem('isSendToValidate')
    localStorage.removeItem('Distrito')
    localStorage.removeItem('UltimoEnviado')
    localStorage.removeItem('isSelectedNode')
    localStorage.removeItem('noCreador')
    localStorage.removeItem('isLoggedinApp')
    localStorage.removeItem('STORE_KEY')
    
  }

  logout() {
    localStorage.removeItem('isLoggedinApp');
    this.router.navigate(['/login']);

    this.BorrarStorage()

    

  }



  async showMessage(_success: boolean, _message: string, _data: any, _redirect: boolean) {

    const conf = this.confirm.open(RkmessagesComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        button_confirm: 'Aceptar',
        button_close: 'Cancelar',
        success: _success,
        message: _message,
        data: _data,
        redirect: _redirect
      }
    });

    conf.afterClosed().subscribe(async (result) => { 
      if ( _redirect === true) {
        this.logout();
      }
    });

  }

  async showMessages(_success: string, _message: string, _data: any, _redirect: boolean) {

    const conf = this.confirm.open(RkmessagesComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        button_confirm: 'Aceptar',
        button_close: 'Cancelar',
        success: _success,
        message: _message,
        data: _data,
        redirect: _redirect
      }
    });

    conf.afterClosed().subscribe(async (result) => { 
      if ( _redirect === true) {
        this.logout();
      }
    });

  }

  async showInfo(_success: boolean, _message: string, _data: any, _redirect: boolean) {

    const conf = this.confirm.open(InfoComponent, {
      hasBackdrop: true,
      height: 'auto',
      width: 'auto',
      data: {
        button_confirm: 'Aceptar',
        button_close: 'Cancelar',
        success: _success,
        message: _message,
        data: _data,
        redirect: _redirect
      }
    });

    conf.afterClosed().subscribe(async (result) => { 
      if ( _redirect === true) {
        this.logout();
      }
    });

  }

}