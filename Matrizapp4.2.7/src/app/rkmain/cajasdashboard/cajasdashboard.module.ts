import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajasdashboardComponent } from './cajasdashboard.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [CajasdashboardComponent],
    imports: [ CommonModule,
        RouterModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatCheckboxModule,
        DragDropModule,
        MatDatepickerModule,],
    exports: [CajasdashboardComponent],
    entryComponents:[CajasdashboardComponent],
    providers: [],
})
export class cajadashboardModule {}