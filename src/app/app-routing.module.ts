import { ComponentesComponent } from './componentes/componentes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LayoutComponent } from './layout/layout.component';
// import { DashboardComponent } from './dashboard/dashboard.component';

// Page Layouts
// import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';
import { AuthGuard } from './shared';
import { MatFormFieldModule } from '@angular/material';

const AppRoutes: Routes = [
  // {
  //   path: '',
  //   loadChildren: './plan-entrenamiento/plan-entrenamiento.module#PlanEntrenamientoModule',
  //   canActivate: [AuthGuard]
  // },
  { path: '', component: ComponentesComponent, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  // { path: '**', loadChildren: './login/login.module#LoginModule' }
  // { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
  // { path: 'app', component: LayoutComponent },
  // { path: 'extra', loadChildren: './extra-pages/extra-pages.module#ExtraPagesModule' },
  // { path: 'fullscreen', component: PageLayoutFullscreenComponent },
  // { path: '**', redirectTo: '/app/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {useHash: true}),
  MatFormFieldModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
// export const AppRoutingModule = RouterModule.forRoot(AppRoutes, {useHash: false});
