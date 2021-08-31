import { Component, OnInit, Inject, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'control-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  public selectedFile: File = null;
  public photoFileName: string;
  @Input() accept: string;
  @Input() image: any;
  @Input() titulo: string = '';
  @Output() onFileSelect: EventEmitter<File> = new EventEmitter();

  constructor() {

  }

  get tieneTitulo(): boolean {
    return this.titulo !== '';
  }

  ngOnInit() {
    // if (!this.image) {
    //   this.image = './assets/images/default.jpg';
    // }
  }

  @ViewChild('inputFile') nativeInputFile: ElementRef;

  private _files: File[];

  get fileCount(): number { return this._files && this._files.length || 0; }

  onNativeInputFileSelect($event) {
    const reader = new FileReader();
    this.selectedFile = $event.target.files[0];
    this.onFileSelect.emit(this.selectedFile);
    reader.onload = (e: any) => {
        this.image = e.target.result;
    };

    reader.readAsDataURL($event.target.files[0]);
      /*this.selectedFile = <File>$event.target.files[0];
      console.log(this.selectedFile);
      this._files = $event.srcElement.files;
      this.onFileSelect.emit(this._files);
      this.image  =  $event.target.files[0];*/
  }

  selectFile() {
      this.nativeInputFile.nativeElement.click();
  }

  uploadPhoto() {
    // this.photoFileName = UUID.UUID() + '.' + this.selectedFile.name.split('.')[1];
    // this.upload.pushUpload(this.selectedFile, this.photoFileName);
  }

}
