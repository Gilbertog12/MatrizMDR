import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RkcComponent } from './rkc.component';

const routes: Routes = [{path: '', component: RkcComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RkcRoutingModule { }
