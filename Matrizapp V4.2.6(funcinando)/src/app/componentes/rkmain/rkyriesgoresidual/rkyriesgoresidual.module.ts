import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RkyriesgoresidualComponent } from './rkyriesgoresidual.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [RkyriesgoresidualComponent],
  entryComponents: [RkyriesgoresidualComponent],
  exports: [RkyriesgoresidualComponent]
})

export class RkyriesgoresidualModule { }
