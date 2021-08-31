import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RkapprovalsComponent } from './rkapprovals.component';

const routes: Routes = [{path: '', component: RkapprovalsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RkapprovalsRoutingModule { }
