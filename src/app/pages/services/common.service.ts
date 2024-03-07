import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {
    var data = localStorage.getItem('data');
    this.isDisabled = new BehaviorSubject<any>(data ? JSON.parse(data) : null);
  }

  isDisabled = new BehaviorSubject(true);

  setIsDisabled(value: boolean) {
    this.isDisabled.next(value);
    localStorage.setItem('data', JSON.stringify(value));
  }
}










// isLoggedIn = new BehaviorSubject(false)
// setIsLoggedIn(value:boolean){
//   this.isLoggedIn.next(value)
// }
