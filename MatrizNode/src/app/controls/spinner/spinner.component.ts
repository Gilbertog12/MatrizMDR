import { Component,
          OnInit,
          Inject,
          ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnInit {

  // private subscription: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {

  }
 
}
