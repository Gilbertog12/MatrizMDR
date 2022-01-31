import { ComponentesComponent } from './componentes.component';
import { AuthGuard } from './../shared/guard/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ComponentesComponent,
    children: [
      {path: 'inicio', loadChildren: './inicio/inicio.module#InicioModule', canActivate: [AuthGuard]},
      {path: 'rkmain', loadChildren: './rkmain/rkmain.module#RkmainModule', canActivate: [AuthGuard]}
      // {path: 'adicional', loadChildren: './adicional/adicional.module#AdicionalModule', canActivate: [AuthGuard]},
      // {path: 'categoria', loadChildren: './categoria/categoria.module#CategoriaModule', canActivate: [AuthGuard]},
      // {path: 'estado-producto', loadChildren: './estado-producto/estado-producto.module#EstadoProductoModule'},
      // {path: 'producto', loadChildren: './producto/producto.module#ProductoModule', canActivate: [AuthGuard]},
      // {path: 'tipo-adicional', loadChildren: './tipo-adicional/tipo-adicional.module#TipoAdicionalModule', canActivate: [AuthGuard]},
      // {path: 'unidad-medida', loadChildren: './unidad-medida/unidad-medida.module#UnidadMedidaModule', canActivate: [AuthGuard]},
      // {path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule', canActivate: [AuthGuard]},
      // {path: 'cupon', loadChildren: './cupon/cupon.module#CuponModule', canActivate: [AuthGuard]},
      // {path: 'pedido', loadChildren: './pedido/pedido.module#PedidoModule', canActivate: [AuthGuard]},
      // {path: 'estado-pedido', loadChildren: './estado-pedido/estado-pedido.module#EstadoPedidoModule'}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentesRoutingModule { }
