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
import { MatInputModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddrkaModule } from './addrka/addrka.module';
import { AddrkpModule } from './addrkp/addrkp.module';
import { AddrksModule } from './addrks/addrks.module';
import { AddrkcModule } from './addrkc/addrkc.module';
import { AddrktModule } from './addrkt/addrkt.module';
import { AddrkdModule } from './addrkd/addrkd.module';
import { AddrkrModule } from './addrkr/addrkr.module';
import { AddrkyModule } from './addrky/addrky.module';
import { RkpendModule } from './rkpend/rkpend.module';
import { RKporaprobarmodule } from './rkporaprobar/rkporaprobar.module';

import { Rkvalidarmodule } from './rkvalidar/rkvalidar.module';

import { LeyendaModule } from '../../leyenda/leyenda.module';


import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RkhelpComponent } from '../../rkhelp/rkhelp.component';
import { rkHelpModule } from '../../rkhelp/rkhelp.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RkpendaprobModule } from './rkpendaprob/rkpendaprob.module';

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
    AddrkaModule,
    AddrkpModule,
    AddrksModule,
    AddrkcModule,
    AddrktModule,
    AddrkdModule,
    AddrkrModule,
    AddrkyModule,
    RkpendModule,
    
    Rkvalidarmodule,
    RKporaprobarmodule,
    RkpendaprobModule,
    LeyendaModule,
    PdfViewerModule,
    

    
  ],
  declarations: [RkmainComponent,  DashboardComponent],

  exports:[
    RkmainComponent
  ]
})
export class RkmainModule { }