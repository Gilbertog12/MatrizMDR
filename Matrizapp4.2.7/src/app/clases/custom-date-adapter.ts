import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatNativeDateModule, NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';

export class CustomDateAdapter extends NativeDateAdapter {

    format(date: Date, displayFormat: any): string {
        if (displayFormat === 'input') {
           const day = date.getUTCDate();
           const month = date.getUTCMonth() + 1;
           const year = date.getFullYear();
           // Return the format as per your requirement
           return `${year}-${month}-${day}`;
        } else {
           return date.toDateString();
        }
     }

}
