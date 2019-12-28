import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  RXSubject: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  getValue() {
    return this.RXSubject.value;
  }

  setValue(data) {
    this.RXSubject.next(data);
    this.RXSubject.complete();
  }
}
