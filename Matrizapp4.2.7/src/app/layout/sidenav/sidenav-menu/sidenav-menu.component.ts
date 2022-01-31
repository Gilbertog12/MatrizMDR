import { Component, Input, OnInit } from '@angular/core';
import { HttpMethodService, ControlsService } from '../../../shared';

@Component({
  selector: 'my-app-sidenav-menu',
  styles: [],
  templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent implements OnInit {

  public menu: any[] = [];
  public htmlMenu: string = '';
  constructor(private methodService: HttpMethodService,
              private controlService: ControlsService){}

  ngOnInit() {
    // obtener menu

    this.menu = [];// JSON.parse(localStorage.getItem('menuPTEL'));
    this.htmlMenu = `<li>
                        <a mat-button href="#/inicio">
                          <i class="nav-icon material-icons">home</i>
                            <span class="nav-text">Inicio</span>
                          </a>
                      </li>
                       ${this.crearMenu(this.menu, 1)}`;

    // if (!localStorage.getItem('menu')) {
    //   this.controlService.openSpinner();
    //   this.methodService.GET<any>(`/api/menu/`)
    //   .subscribe(
    //     (menu) => {
    //       localStorage.setItem('menu', JSON.stringify(menu.data));
    //       this.menu = menu.data;
    //       this.controlService.closeSpinner();
    //     },
    //     (error) => {
    //       this.controlService.closeSpinner();
    //       this.controlService.snackbarError('Ha ocurrido un error al consultar menu, consulte su administrador.');
    //     });
    // }
  }

  private crearMenu(lista, nivel): string {

    let html = '';
    lista.forEach((item) => {

      if (item.hijos !== null && item.hijos.length > 0 && item.es_padre) {
        if (nivel === 1) {
            html += `<li>
                      <a mat-button href="${ item.view }">
                        <i class="nav-icon material-icons">${ item.icono }</i>
                        <span class="nav-text">${ item.etiqueta }</span>
                      </a>
                      <ul>
                        ${this.crearMenu(item.hijos, 2)}
                      </ul>
                    </li>`;
        } else if (nivel === 2) {
            html += `<li>
                      <a mat-button class="md-button prepend-icon" href="${ item.view }">
                        <span class="nav-text">${ item.etiqueta }</span>
                      </a>
                      <ul>
                        ${this.crearMenu(item.hijos, 2)}
                      </ul>
                    </li>`;
        }
      } else if (!item.es_padre) {
        if (nivel === 1) {
          html += `<li>
                    <a mat-button href="#${item.view}">
                      <i class="nav-icon material-icons">${ item.icono }</i>
                      <span class="nav-text">${ item.etiqueta }</span>
                    </a>
                  </li>`;
        } else if (nivel === 2) {
          html += `<li>
                    <a mat-button class="md-button prepend-icon" href="#${item.view}">
                      <span class="nav-text">${ item.etiqueta }</span>
                    </a>
                  </li>`;
        }
      }

    });

    return html;

  }

}
