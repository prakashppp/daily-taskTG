import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../model/project';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private _http: HttpClient) {}

  createProject(data: any) {
    return this._http.post<any>(
      environment.localUrl+'project/createProject',
      data
    );
  }

  getAll():Observable<Project> {
    return this._http.get<Project>(environment.localUrl+'project/getAll');
  }

  updateProject(data: any, id: number) {
    return this._http.patch(
      environment.localUrl+'project/updateProject/' + id,
      data
    );
  }

  deleteProject(id: number) {
    return this._http.delete(
      environment.localUrl+'project/deleteProject/' + id
    );
  }
}
