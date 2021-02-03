import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { RkvalidarComponent } from './rkvalidar.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { rkReasonRejectModule } from '../../../rk-reason-reject/rkReasonReject.module';
import { FiltroPipe } from '../rkvalidar/filtro.pipe';
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
    rkReasonRejectModule,
    MatSlideToggleModule  ],
  declarations: [RkvalidarComponent,FiltroPipe],
  entryComponents: [RkvalidarComponent],
  exports: [RkvalidarComponent]
})

export class Rkvalidarmodule { }