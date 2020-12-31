import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RkmainComponent } from './rkmain.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RkaComponent } from './rka/rka.component';


const routes: Routes = [
  { path: '',
    component: RkmainComponent,
    children: [
      { path: 'rka/:id', loadChildren: './rka/rka.module#RkaModule'},
      { path: 'rkp/:id/:pid', loadChildren: './rkp/rkp.module#RkpModule'},
      { path: 'rks/:id/:pid/:sid', loadChildren: './rks/rks.module#RksModule'},
      { path: 'rkc/:id/:pid/:sid/:cid', loadChildren: './rkc/rkc.module#RkcModule'},
      { path: 'rkt/:id/:pid/:sid/:cid/:tid', loadChildren: './rkt/rkt.module#RktModule'},
      { path: 'rkd/:id/:pid/:sid/:cid/:tid/:did', loadChildren: './rkd/rkd.module#RkdModule'},
      { path: 'rkr/:id/:pid/:sid/:cid/:tid/:did/:rid', loadChildren: './rkr/rkr.module#RkrModule'},
      { path: 'rky/:id/:pid/:sid/:cid/:tid/:did/:rid/:yid', loadChildren: './rky/rky.module#RkyModule'},
      { path: 'rkapprovals/:key/:status/:version', loadChildren: './rkapprovals/rkapprovals.module#RkapprovalsModule'},
      {path:'cargando',component:DashboardComponent},
      // {path:'rka/:id',component:RkaComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RkmainRoutingModule { }
