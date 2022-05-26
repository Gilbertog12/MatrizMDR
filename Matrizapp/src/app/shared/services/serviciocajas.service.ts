import { Injectable, EventEmitter } from '@angular/core';
import Swal2 from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ServiciocajasService {

  Recargar$ = new EventEmitter<boolean>();
  RecargarDetalle$ = new EventEmitter<boolean>();
  notificaciones$ = new EventEmitter<boolean>();
  arbol$ = new EventEmitter<any>();

  constructor() {
    
   }


   
  caja1: any [] = [];
  caja12: any [] = [];
  caja3: any [] = [];
  caja4: any [] = [];
  Posiciones: any [] = [];
  valores: any [] = [];
  public permiso: string = 'NYYYY';

  obtenerPosiciones() {

    this.Posiciones.forEach((elemento) => {
      return this.valores.push(elemento);
    });
  }

}
