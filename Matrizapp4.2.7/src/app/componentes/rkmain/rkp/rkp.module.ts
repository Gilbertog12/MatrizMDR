import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

import { RkpRoutingModule } from './rkp-routing.module';
import { RkpComponent } from './rkp.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { RkpendaprobModule } from '../rkpendaprob/rkpendaprob.module';
import { Rkvalidarmodule } from '../rkvalidar/rkvalidar.module';
import { cajadashboardModule } from '../../../rkmain/cajasdashboard/cajasdashboard.module';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    RkpRoutingModule,
    MatDialogModule,
    MatButtonModule,
    RkpendaprobModule,
    Rkvalidarmodule,
    RkpendaprobModule,
    cajadashboardModule
  ],
  declarations: [RkpComponent]
})
export class RkpModule { }