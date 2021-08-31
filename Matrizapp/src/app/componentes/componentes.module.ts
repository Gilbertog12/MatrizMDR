import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';

import { ComponentesRoutingModule } from './componentes-routing.module';
import { FiltroPipe } from './filtro.pipe';


@NgModule({
  imports: [
    CommonModule,
    ComponentesRoutingModule,
    MatTreeModule,
    
  ],
  declarations: []
})
export class ComponentesModule { }
