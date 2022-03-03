import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppHeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { rkHelpModule } from '../../rkmain/rkhelp/rkhelp.module';
import { RkhelpComponent } from '../../rkmain/rkhelp/rkhelp.component';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    rkHelpModule
  ],
  declarations: [AppHeaderComponent],
  entryComponents: [AppHeaderComponent],
  exports: [AppHeaderComponent]
})

export class HeaderModule { }
