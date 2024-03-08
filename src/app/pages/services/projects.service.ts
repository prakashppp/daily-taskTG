import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private _http: HttpClient) {}

  createProject(data: any) {
    return this._http.post<any>(
      'http://localhost:3000/project/createProject',
      data
    );
  }

  getAll():Observable<Project> {
    return this._http.get<Project>('http://localhost:3000/project/getAll');
  }

  updateProject(data: any, id: number) {
    return this._http.patch(
      'http://localhost:3000/project/updateProject/' + id,
      data
    );
  }

  deleteProject(id: number) {
    return this._http.delete(
      'http://localhost:3000/project/deleteProject/' + id
    );
  }
}
