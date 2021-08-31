import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rkhelp',
  templateUrl: './rkhelp.component.html',
  styleUrls: ['./rkhelp.component.scss']
})
export class RkhelpComponent implements OnInit {

  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor() { }

  ngOnInit() {

    window.open( "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf",'_blank')
  }

}
