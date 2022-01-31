import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RkyComponent } from './rky.component';

const routes: Routes = [{path: '', component: RkyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RkyRoutingModule { }
