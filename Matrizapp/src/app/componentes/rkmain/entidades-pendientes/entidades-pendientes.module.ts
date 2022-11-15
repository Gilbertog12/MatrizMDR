import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntidadesPendientesComponent } from './entidades-pendientes.component';

@NgModule({
  imports: [
    CommonModule
  ],

  declarations: [EntidadesPendientesComponent],
    entryComponents: [EntidadesPendientesComponent],
    exports: [EntidadesPendientesComponent]
})
export class EntidadesPendientesModule { }
