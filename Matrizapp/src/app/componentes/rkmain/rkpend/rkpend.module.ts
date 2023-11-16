import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatIcon, MatIconModule } from '@angular/material';
import { RkpendComponent } from './rkpend.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from '@angular/cdk/drag-drop'
// import { RkmainRoutingModule } from '../rkmain-routing.module';
import { FiltroPipe } from './filtro.pipe'
import {MatDatepickerModule} from '@angular/material/datepicker'

import { MatSlideToggleModule } from '@angular/material/slide-toggle';




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
    MatDatepickerModule,
    MatSlideToggleModule,
    MatIconModule
    

    
    
    
    
  ],
  declarations: [RkpendComponent,    FiltroPipe ],
  entryComponents: [RkpendComponent],
  exports: [RkpendComponent],
  
})

export class RkpendModule { }
