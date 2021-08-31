import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { InputFileComponent } from './input-file.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [InputFileComponent],
  entryComponents: [InputFileComponent],
  exports: [InputFileComponent]
})
export class InputFileModule { }
