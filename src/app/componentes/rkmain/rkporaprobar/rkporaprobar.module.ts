import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { RkporaprobarComponent } from './rkporaprobar.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FiltroPipe } from './filtro.pipe'
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
    MatSlideToggleModule
  ],
  declarations: [RkporaprobarComponent, FiltroPipe],
  entryComponents: [RkporaprobarComponent],
  exports: [RkporaprobarComponent]
})

export class RKporaprobarmodule { }