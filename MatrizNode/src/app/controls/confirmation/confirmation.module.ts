import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ConfirmationComponent } from './confirmation.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule
  ],
  declarations: [ConfirmationComponent],
  entryComponents: [ConfirmationComponent],
  exports: [ConfirmationComponent]
})

export class ConfirmationModule { }
