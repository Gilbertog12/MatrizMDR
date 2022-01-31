import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { RkapprovalsRoutingModule } from './rkapprovals-routing.module';
import { RkapprovalsComponent } from './rkapprovals.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RkcstdjobModule } from '../rkcstdjob/rkcstdjob.module';
import { RkcequipModule } from '../rkcequip/rkcequip.module';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    RkapprovalsRoutingModule,
    MatCheckboxModule
  ],
  declarations: [RkapprovalsComponent]
})
export class RkapprovalsModule { }