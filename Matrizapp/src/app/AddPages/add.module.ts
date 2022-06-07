import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddrkaComponent } from './addrka/addrka.component';
import { AddrkyComponent } from './addrky/addrky.component';
import { AddrkyprobabilidadComponent } from './addrkyprobabilidad/addrkyprobabilidad.component';
import { AddrkyseveridadComponent } from './addrkyseveridad/addrkyseveridad.component';
import { MatTreeModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatDialogModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatAccordion, MatExpansionModule, MatListModule, MatChipsModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RkmessagesModule } from '../componentes/rkmain/rkmessages/rkmessages.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterModule } from '@josee9988/filter-pipe-ngx';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatStepperModule} from '@angular/material/stepper';




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
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    DragDropModule,
    CommonModule,
    MatTreeModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    RkmessagesModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule,
    FilterModule,
    NgxMatSelectSearchModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatListModule,
    MatChipsModule,
    MatProgressBarModule,
    MatStepperModule




  ],
  declarations: [
      AddrkaComponent,
     
      AddrkyComponent,
     
      AddrkyprobabilidadComponent,
      AddrkyseveridadComponent
    
    ],

    exports: [
        AddrkaComponent,
       
        AddrkyComponent,
      
        AddrkyprobabilidadComponent,
        AddrkyseveridadComponent
    ],

    entryComponents:[
      AddrkaComponent,
     
      AddrkyComponent,
      
      AddrkyprobabilidadComponent,
      AddrkyseveridadComponent
    ]
})
export class AddModule { }