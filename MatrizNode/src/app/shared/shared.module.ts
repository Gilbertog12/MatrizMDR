import { NgModule } from '@angular/core';

import { EChartsDirective } from './echarts.directive';
import { SlimScrollDirective } from './slim-scroll.directive';
import { NumberOnlyDirective } from './number-only.directive';

@NgModule({
  imports: [],
  declarations: [
    EChartsDirective,
    SlimScrollDirective,
    NumberOnlyDirective
  ],
  exports: [
    EChartsDirective,
    SlimScrollDirective,
    NumberOnlyDirective
  ]
})

export class SharedModule {}
