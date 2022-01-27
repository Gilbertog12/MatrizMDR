import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { NotificacionesComponent } from './notificaciones.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatButtonModule, MatInputModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    CdkTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [NotificacionesComponent],
  entryComponents: [NotificacionesComponent],
  exports: [NotificacionesComponent],
})
export class NotificacionesModule { }
