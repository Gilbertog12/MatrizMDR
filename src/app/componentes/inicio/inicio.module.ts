import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { Routes, RouterModule } from '@angular/router';
import { MatTreeModule } from '@angular/material/tree';

// const routes: Routes = [{path: '', component: InicioComponent}];

@NgModule({
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatTreeModule
  ],
  declarations: [InicioComponent]
})
export class InicioModule { }
