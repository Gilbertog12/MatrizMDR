import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

import { RktRoutingModule } from './rkt-routing.module';
import { RktComponent } from './rkt.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

import { RkcstdjobModule } from '../rkcstdjob/rkcstdjob.module';
import { RkcequipModule } from '../rkcequip/rkcequip.module';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { RkpendaprobModule } from '../rkpendaprob/rkpendaprob.module';
import { Rkvalidarmodule } from '../rkvalidar/rkvalidar.module';
import { Rkarchivarmodule } from '../../../rkmain/rkarchivar/rkarchivar.module';
import { cajadashboardModule } from '../../../rkmain/cajasdashboard/cajasdashboard.module';



@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    FormsModule,
    RkcstdjobModule,
    RkcequipModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    RktRoutingModule,
    MatDialogModule,
    MatButtonModule,
    RkpendaprobModule,
    Rkvalidarmodule,
    RkpendaprobModule,
    Rkarchivarmodule,
    cajadashboardModule
    
  ],
  declarations: [RktComponent]
})
export class RktModule { }