import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emp } from '../model/employee';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  addTasks(data: any) {
    return this._http
      .post(environment.localUrl+'emp/tasks', data)
  }


  getAll():Observable<Emp> {
    return this._http.get<Emp>(environment.localUrl+'emp/getAll');
  }

}
