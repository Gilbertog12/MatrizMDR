import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiciocajasService {


  Recargar$ = new EventEmitter<boolean>()

  constructor() { }


  caja1: any []= [];
  caja12: any []= [];
  caja3: any []= [];
  caja4: any []= [];
  Posiciones: any []= [];
  valores: any []= [];

  obtenerPosiciones(){

    this.Posiciones.forEach(elemento =>{
      return this.valores.push(elemento)
    })
  }
  
  

}
