import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class DataService {

  constructor(public httpClient: HttpClient) { }
  getRootNodes()
  {
    return '';
  }

  //See that return an array of object with two properties:"name" and "isExpandable"
  getChildren(node)
  {
    return this.httpClient.get('' + node);
  }

}