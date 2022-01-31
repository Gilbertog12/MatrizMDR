import { Injectable, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SpinnerComponent } from '../../controls';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class ControlsService {

  private spinnerComponentRef: MatDialogRef<SpinnerComponent>;
  public statusLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // display(value: boolean) {
  //   this.status.next(value);
  // }
  
  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  openSpinner() {
    this.statusLoader.next(true);
    // const spinner = this.dialog.open(SpinnerComponent, {
    //   disableClose: true,
    //   width: '150px',
    //   data: {}
    // });
    return false;
    // return spinner;
  }

  closeSpinner(spinner: boolean) {
    this.statusLoader.next(false);
    // setTimeout(() => {
    //   spinner.close(true);
    // });
    // setTimeout(() => {
    //   spinner.close(true);
    // });
  }

  private configSucces: MatSnackBarConfig = {
    panelClass: ['text-succes'],
    duration: 6000
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['text-danger'],
    duration: 6000
  };

  private configWarning: MatSnackBarConfig = {
    panelClass: ['text-warning'],
    duration: 6000
  };

  public snackbarSucces(message) {
    this.snackBar.open(message, 'Cerrar', this.configSucces);
  }

  public snackbarError(message) {
    this.snackBar.open(message, 'Cerrar', this.configError);
  }

  public snackbarWarning(message) {
    this.snackBar.open(message, 'Cerrar', this.configWarning);
  }

}
