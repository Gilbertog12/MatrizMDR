import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RktComponent } from './rkt.component';

const routes: Routes = [{path: '', component: RktComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RktRoutingModule { }
