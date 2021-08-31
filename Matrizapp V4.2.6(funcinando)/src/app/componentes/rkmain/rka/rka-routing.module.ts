import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RkaComponent } from './rka.component';

const routes: Routes = [{path: '', component: RkaComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RkaRoutingModule { }
