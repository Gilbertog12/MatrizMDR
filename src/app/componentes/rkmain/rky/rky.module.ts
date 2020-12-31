import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { RkyRoutingModule } from './rky-routing.module';
import { RkyComponent } from './rky.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RkycblandoModule } from '../rkycblando/rkycblando.module';
import { RkycduroModule } from '../rkycduro/rkycduro.module';
import { RkyepfModule } from '../rkyepf/rkyepf.module';
import { RkydocModule } from '../rkydoc/rkydoc.module';
import { RkyriesgopuroModule } from '../rkyriesgopuro/rkyriesgopuro.module';
import { RkyriesgopurotableModule } from '../rkyriesgopurotable/rkyriesgopurotable.module';
import { RkyriesgopurotablerModule } from '../rkyriesgopurotabler/rkyriesgopurotabler.module';
import { RkyriesgoresidualModule } from '../rkyriesgoresidual/rkyriesgoresidual.module';
import { RkyriesgoresidualtableModule } from '../rkyriesgoresidualtable/rkyriesgoresidualtable.module';
import { RkyriesgoresidualtablerModule } from '../rkyriesgoresidualtabler/rkyriesgoresidualtabler.module';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { RkpendaprobModule } from '../rkpendaprob/rkpendaprob.module';
import { Rkvalidarmodule } from '../rkvalidar/rkvalidar.module';
import { Rkarchivarmodule } from '../../../rkmain/rkarchivar/rkarchivar.module';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTabsModule,
    RkycblandoModule,
    RkycduroModule,
    RkyepfModule,
    RkydocModule,
    RkyriesgopuroModule,
    RkyriesgopurotableModule,
    RkyriesgopurotablerModule,
    RkyriesgoresidualModule,
    RkyriesgoresidualtableModule,
    RkyriesgoresidualtablerModule,
    RkyRoutingModule,
    MatDialogModule,
    MatButtonModule,
    RkpendaprobModule,
    Rkvalidarmodule,
    RkpendaprobModule,
    Rkarchivarmodule
  ],
  declarations: [RkyComponent]
})

export class RkyModule { }
