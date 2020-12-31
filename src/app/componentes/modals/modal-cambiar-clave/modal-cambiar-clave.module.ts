import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatDialogModule,
          MatInputModule,
          MatFormFieldModule,
          MatButtonModule,
          MatSelectModule,
          MatIconModule,
          MatDialogRef } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalCambiarClaveComponent } from './modal-cambiar-clave.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ModalCambiarClaveComponent],
  entryComponents: [ModalCambiarClaveComponent],
  exports: [ModalCambiarClaveComponent],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class ModalCambiarClaveModule { }
