import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddrkaComponent } from './addrka/addrka.component';
import { AddrkcComponent } from './addrkc/addrkc.component';
import { AddrkpComponent } from './addrkp/addrkp.component';
import { AddrkdComponent } from './addrkd/addrkd.component';
import { AddrksComponent } from './addrks/addrks.component';
import { AddrkyComponent } from './addrky/addrky.component';
import { AddrktComponent } from './addrkt/addrkt.component';
import { AddrkrComponent } from './addrkr/addrkr.component';
import { AddrkyprobabilidadComponent } from './addrkyprobabilidad/addrkyprobabilidad.component';
import { AddrkyseveridadComponent } from './addrkyseveridad/addrkyseveridad.component';
import { MatTreeModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatButtonModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RkmessagesModule } from '../componentes/rkmain/rkmessages/rkmessages.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterModule } from '@josee9988/filter-pipe-ngx';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    DragDropModule,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    DragDropModule,
    CommonModule,
    MatTreeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RkmessagesModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    DragDropModule,
    FilterModule,
    NgxMatSelectSearchModule
  ],
  declarations: [
      AddrkaComponent,
      AddrkcComponent,
      AddrkpComponent,
      AddrkdComponent,
      AddrksComponent,
      AddrkyComponent,
      AddrktComponent,
      AddrkrComponent,
      AddrkyprobabilidadComponent,
      AddrkyseveridadComponent
    
    ],

    exports: [
        AddrkaComponent,
        AddrkcComponent,
        AddrkpComponent,
        AddrkdComponent,
        AddrksComponent,
        AddrkyComponent,
        AddrktComponent,
        AddrkrComponent,
        AddrkyprobabilidadComponent,
        AddrkyseveridadComponent
    ],

    entryComponents:[
      AddrkaComponent,
      AddrkcComponent,
      AddrkpComponent,
      AddrkdComponent,
      AddrksComponent,
      AddrkyComponent,
      AddrktComponent,
      AddrkrComponent,
      AddrkyprobabilidadComponent,
      AddrkyseveridadComponent
    ]
})
export class AddModule { }