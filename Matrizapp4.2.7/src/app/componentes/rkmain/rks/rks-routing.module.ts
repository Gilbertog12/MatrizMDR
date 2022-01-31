import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RksComponent } from './rks.component';

const routes: Routes = [{path: '', component: RksComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RksRoutingModule { }
