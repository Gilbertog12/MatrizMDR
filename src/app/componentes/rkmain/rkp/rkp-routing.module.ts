import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RkpComponent } from './rkp.component';

const routes: Routes = [{path: '', component: RkpComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RkpRoutingModule { }
