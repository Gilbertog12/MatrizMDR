import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatIconModule, MatCardModule } from '@angular/material';
import { PhotoComponent } from './photo.component';
//import {AngularFireModule} from 'angularfire2';

/*export const firebaseConfig = {
  apiKey: "AIzaSyCOsjBux4p4nxOGLE3I_aDhNdGAkGrxQ98",
  authDomain: "citric-replica-187517.firebaseapp.com",
  databaseURL: "https://citric-replica-187517.firebaseio.com",
  projectId: "citric-replica-187517",
  storageBucket: "citric-replica-187517.appspot.com",
  messagingSenderId: "656824055685"
};*/

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    // AngularFireModule.initializeApp(firebaseConfig)
  ],
  declarations: [PhotoComponent],
  entryComponents: [PhotoComponent],
  exports: [PhotoComponent],
})
export class PhotoModule { }
