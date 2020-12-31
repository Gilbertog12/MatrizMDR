import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { RkcRoutingModule } from './rkc-routing.module';
import { RkcComponent } from './rkc.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RkcstdjobModule } from '../rkcstdjob/rkcstdjob.module';
import { RkcequipModule } from '../rkcequip/rkcequip.module';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { RkpendaprobModule } from '../rkpendaprob/rkpendaprob.module';
import { Rkvalidarmodule } from '../rkvalidar/rkvalidar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    RkcstdjobModule,
    RkcequipModule,
    MatInputModule,
    MatFormFieldModule,
    RkcRoutingModule,
    MatDialogModule,
    MatButtonModule,
    RkpendaprobModule,
    Rkvalidarmodule,
    RkpendaprobModule,
    DragDropModule,
    

    
  ],
  declarations: [RkcComponent]
})
export class RkcModule { }