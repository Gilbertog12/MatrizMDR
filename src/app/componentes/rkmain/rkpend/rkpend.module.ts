import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { RkpendComponent } from './rkpend.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from '@angular/cdk/drag-drop'
import { RkmainRoutingModule } from '../rkmain-routing.module';
import { FreshPipe } from '../../../fresh.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker'




@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    DragDropModule,
    RkmainRoutingModule,
    MatDatepickerModule,
    
    
    
    
  ],
  declarations: [RkpendComponent,    FreshPipe ],
  entryComponents: [RkpendComponent],
  exports: [RkpendComponent],
  
})

export class RkpendModule { }
