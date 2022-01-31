import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RkdComponent } from './rkd.component';

const routes: Routes = [{path: '', component: RkdComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RkdRoutingModule { }
