import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RkyriesgopurotablerComponent } from './rkyriesgopurotabler.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  declarations: [RkyriesgopurotablerComponent],
  entryComponents: [RkyriesgopurotablerComponent],
  exports: [RkyriesgopurotablerComponent]
})

export class RkyriesgopurotablerModule { }
