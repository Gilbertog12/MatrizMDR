import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RkpendModule } from '../componentes/rkmain/rkpend/rkpend.module';
import { Rkvalidarmodule } from '../componentes/rkmain/rkvalidar/rkvalidar.module';
import { RKporaprobarmodule } from '../componentes/rkmain/rkporaprobar/rkporaprobar.module';
import { RkpendaprobModule } from '../componentes/rkmain/rkpendaprob/rkpendaprob.module';

@NgModule({
  imports: [
    CommonModule,
    RkpendModule,
    Rkvalidarmodule,
    RKporaprobarmodule,
    RkpendaprobModule,
  ],
  declarations: []
})
export class CajaslinkModule { }
