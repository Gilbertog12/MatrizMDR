import { Component, Input, OnInit } from '@angular/core';
import { APPCONFIG } from '../../config';
import { Router } from '@angular/router';
import { AuthenticationService, ControlsService, HttpMethodService } from '../../shared';

@Component({
  selector: 'my-app-sidenav',
  styles: [],
  templateUrl: './sidenav.component.html'
})

export class AppSidenavComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private autentication: AuthenticationService,
    private methodService: HttpMethodService,
    private controlService: ControlsService){

    }
  AppConfig;
  

  ngOnInit() {
    this.AppConfig = APPCONFIG;
  }

  toggleCollapsedNav() {
    this.AppConfig.navCollapsed = !this.AppConfig.navCollapsed;
  }

  goToDashboard() {
    this.router.navigate(['/rkmain']);
  }

  logout() {
    this.authenticationService.logout();
  }
}
