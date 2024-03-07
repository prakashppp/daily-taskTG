import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emp } from '../model/employee';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  // addTasks(data: any) {
  //   this._http
  //     .post('http://localhost:3000/emp/tasks', data)
  //     .subscribe((res: any) => {
  //       //console.log(res.message);
  //     });
  // }

  addTasks(data: any) {
    return this._http
      .post('http://localhost:3000/emp/tasks', data)
  }


  getAll():Observable<Emp> {
    return this._http.get<Emp>('http://localhost:3000/emp/getAll');
  }

}
