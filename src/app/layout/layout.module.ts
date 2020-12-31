import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    LayoutRoutingModule,
    SharedModule,
  ],
  declarations: [LayoutComponent]
})

export class LayoutModule {}
