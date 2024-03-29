import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RkmainRoutingModule } from './rkmain-routing.module';
import { RkmainComponent } from './rkmain.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ConfirmationModule } from '../../controls/confirmation/confirmation.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatBadgeModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { RkpendModule } from './rkpend/rkpend.module';
import { RKporaprobarmodule } from './rkporaprobar/rkporaprobar.module';

import { Rkvalidarmodule } from './rkvalidar/rkvalidar.module';

import { LeyendaModule } from '../../leyenda/leyenda.module';


import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RkhelpComponent } from '../../rkhelp/rkhelp.component';
import { rkHelpModule } from '../../rkhelp/rkhelp.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RkpendaprobModule } from './rkpendaprob/rkpendaprob.module';
// import { cajadashboardModule } from '../../rkmain/cajasdashboard/cajasdashboard.module';
import { CajaslinkModule } from '../../cajaslink/cajaslink.module';
import { CajaslinkComponent } from '../../cajaslink/cajaslink.component';
import { ChartsModule } from 'ng2-charts';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { AddModule } from '../../AddPages/add.module';
import { EntidadesPendientesComponent } from './entidades-pendientes/entidades-pendientes.component';
import { EntidadesPendientesModule } from './entidades-pendientes/entidades-pendientes.module';




//


@NgModule({
  imports: [
    CommonModule,
    RkmainRoutingModule,
    MatTreeModule,
    ConfirmationModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    AddModule,
    RkpendModule,
    Rkvalidarmodule,
    RKporaprobarmodule,
    RkpendaprobModule,
    LeyendaModule,
    PdfViewerModule,
    ChartsModule,
    DragDropModule,
    ScrollingModule,
    NotificacionesModule,
    MatBadgeModule,
    EntidadesPendientesModule

    // CajaslinkModule,    
    // cajadashboardModule
    

    
  ],
  declarations: [RkmainComponent,  DashboardComponent,CajaslinkComponent],
  
  exports:[
    RkmainComponent
  ]
})
export class RkmainModule { }