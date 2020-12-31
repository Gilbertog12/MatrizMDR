import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RkycblandoComponent } from './rkycblando.component';
import { MatSelectModule } from '@angular/material/select';
import { FilterModule } from '@josee9988/filter-pipe-ngx';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,     
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FilterModule

  ],
  declarations: [RkycblandoComponent],
  entryComponents: [RkycblandoComponent],
  exports: [RkycblandoComponent]
})

export class RkycblandoModule { }
