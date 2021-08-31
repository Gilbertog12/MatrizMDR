import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public showDashboard: Boolean = true;

  public dashboardData: any = {
    ENVIAR_A_VALIDAR: 0,
    POR_VALIDAR: 0,
    Rechazados: 0,
    POR_APROBAR: 0,
  };

  constructor() { 

    
  }

  ngOnInit() {
    
  }

}
