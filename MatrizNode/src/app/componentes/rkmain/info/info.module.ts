import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { InfoComponent } from './info.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
      CommonModule,
      MatDialogModule,
      MatFormFieldModule,
      FormsModule,
      MatInputModule,
      MatButtonModule
    ],
    declarations: [InfoComponent],
    entryComponents: [InfoComponent],
    exports: [InfoComponent]
  })

  export class InfoModule { }