import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared';
import { RkmainComponent } from './rkmain/rkmain.component';


@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss']
})
export class ComponentesComponent implements OnInit {

  constructor(private autentication: AuthenticationService) { }

  ngOnInit() {
    this.verificarSesion();
  }

  verificarSesion() {
    let _atts = [];
    _atts.push({name: 'scriptName', value: 'coemdr'});
    _atts.push({name: 'action', value: 'SESSION'});

    const promiseView = new Promise((resolve, reject) => {
      this.autentication.generic(_atts)
      .subscribe(
        (data) => {
          const result = data.success;
      });
    });
  }

}
