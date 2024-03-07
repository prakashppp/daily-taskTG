import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  createUser(data: any) {
    return this._http.post<any>('http://localhost:3000/user/createUser', data);
  }

  getAll():Observable<User> {
    return this._http.get<User>('http://localhost:3000/user/getAll');
  }

  updateUser(data: any, id: number) {
    return this._http.patch(
      'http://localhost:3000/user/updateUser/' + id,
      data
    );
  }

  deleteUser(id: number) {
    return this._http.delete('http://localhost:3000/user/deleteUser/' + id);
  }

  loginUser(data: any): Observable<any> {
    return this._http.post<any>('http://localhost:3000/user/login', data);
  }

  sendEmail(data: any): Observable<any> {
    return this._http.post<any>('http://localhost:3000/user/sendEmail', data);
  }
}
