import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Body } from '@angular/http/src/body';
import { Observable } from 'rxjs';
// * as data_json from '../../assets/config.json';

@Injectable()
export class HttpMethodService {


  E9Dev:string='https://prd-p01-col.ellipsehosting.com/ews/services/'
  E9TST:string='https://tst-n01-col.ellipsehosting.com/ews/services/'
  E9PRD:string='https://prd-p02-col.ellipsehosting.com/ews/services/'
  public Ambiente :string
  public ver:string;
  

  public baseUrl: string;
  constructor(public http: HttpClient) {

    //this.baseUrl = data_json['api'];
    this.baseUrl = localStorage.getItem('urlApi');
    this.getJSON().subscribe(
      (data) => {
        if ( this.baseUrl === undefined || this.baseUrl === null || this.baseUrl === '' ) {
          this.baseUrl = data['api'];
          localStorage.setItem('urlApi', data['api']);
        }
        // this.baseUrl = 'http://localhost:54108/MatrizApi';
      },
      (error) => {  });
    // this.baseUrl = 'https://coemat.com';
    // this.baseUrl = '';
  }

  public getJSON(): Observable<any> {
    return this.http.get('assets/config.json');
  }


  obtenerVersion(){

    
      this.getJSON().subscribe(
        (data) => {
          console.log(data);
          
              switch (data['api']) {
  
                case this.E9Dev:
                  this.Ambiente = 'Matriz de Riesgos E9' + ' - ' + 'DESARROLLO' 
                  this.ver =data['text'].slice(65,80);

                  // this.AmbienteVersion


                  return;
  
                case this.E9TST:
                  this.Ambiente = 'Matriz de Riesgos E9' + ' - ' + 'TEST' 
                  this.ver=data['text'].slice(65,80);
                  return;
  
                case this.E9PRD:
                  this.Ambiente = 'Matriz de Riesgos E9' + ' - ' + 'PRODUCTIVO' 
                  this.ver= data['text'].slice(65,80);
                  return;
  
                
      
                default:
                  break;
              }
            });
        
    }
  

  // public Ambientes( Ambiente:string, pass:boolean ){

  //   this.getJSON().subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.getAPI().subscribe(
  //         (data2) => {
  //           switch (data2[0]) {

  //             case 'http://ellipse-elldeve.elldeve.collahuasi.cl/ews/services/':
  //               Ambiente = 'http://ellipse-elldeve.elldeve.collahuasi.cl/ews/services/';
  //               pass = false;
                
  //               return;

  //             case 'http://ellipse-elltest.elldeve.collahuasi.cl/ews/services/':
  //               Ambiente = 'Matriz de Riesgos' + ' - ' + 'TEST' + ' - ' + data['text'].slice(65,80);
  //               pass = true;
  //               return;

  //             case 'http://ellipse-ellprod.ellprod.collahuasi.cl/ews/services/':
  //               Ambiente = 'Matriz de Riesgos' + ' - ' + 'PRODUCTIVO' + ' - ' + data['text'].slice(65,80);
  //               pass = true;
  //               return;

  //             default:
  //               break;
  //           }
  //         });
  //     });
  // }



  
  public getAPI(): Observable<any> {
    return this.http.get(this.baseUrl + '/values');
  }

  GET<T>(url: string, data: any = {}) {
    if (data) {
      data.format = 'json';
    } else {
      data = {};
      data.format = 'json';
    }
    return this.http.get<T>(this.baseUrl + url, {headers: this.header(), params: data});
  }

  POST<T>(url: string, data: any) {
    return this.http.post<T>(this.baseUrl + url, data, {headers: this.header()});
  }

  PUT<T>(url: string, data: any) {
    return this.http.put<T>(this.baseUrl + url, data, {headers: this.header()});
  }

  DELETE<T>(url: string) {
    return this.http.delete<T>(this.baseUrl + url, {headers: this.header()});
  }

  POSTFORMDATA<T>(url: string, data: FormData) {
    return this.http.post<T>(this.baseUrl + url, data, {headers: this.headerFormData()});
  }

  PUTFORMDATA<T>(url: string, data: FormData) {
    return this.http.put<T>(this.baseUrl + url, data, {headers: this.headerFormData()});
  }

  EXPORTAR<T>(url: string) {
    window.open(this.baseUrl + url, '_blank');
  }

  private header() {
    // create authorization header with jwt token
    const tokenObj = JSON.parse(localStorage.getItem('tokenApp'));
    if (tokenObj.access_token) {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + tokenObj.access_token);
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }
  }

  private headerFormData() {
    // create authorization header with jwt token
    const tokenObj = JSON.parse(localStorage.getItem('tokenApp'));
    if (tokenObj.access_token) {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + tokenObj.access_token);
        return headers;
    }
  }

}