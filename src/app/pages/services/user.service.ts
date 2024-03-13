import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { environment } from 'src/app/environment/environment';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  createUser(data: any) {
    return this._http.post<any>(environment.localUrl+'user/createUser', data);
  }

  getAll():Observable<User> {
    return this._http.get<User>(environment.localUrl+'user/getAll');
  }

  updateUser(data: any, id: number) {
    return this._http.patch(
      environment.localUrl+'user/updateUser/' + id,
      data
    );
  }

  deleteUser(id: number) {
    return this._http.delete(environment.localUrl+'user/deleteUser/' + id);
  }

  loginUser(data: any): Observable<any> {
    return this._http.post<any>(environment.localUrl+'user/login', data);
  }

  sendEmail(data: any): Observable<any> {
    return this._http.post<any>(environment.localUrl+'user/sendEmail', data);
  }
}
