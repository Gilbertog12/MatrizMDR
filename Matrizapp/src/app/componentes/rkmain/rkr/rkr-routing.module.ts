import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RkrComponent } from './rkr.component';

const routes: Routes = [{path: '', component: RkrComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RkrRoutingModule { }
