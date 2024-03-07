import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowTasksComponent } from './components/show-tasks/show-tasks.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CalenderComponent } from './components/calender/calender.component';
import { UsersComponent } from './components/users/users.component';
import { EmpProjectComponent } from './components/emp-project/emp-project.component';
import { Auth2Guard } from '../Guards/auth2.guard';
import { AuthGuard } from '../Guards/auth.guard';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ConsolodtedDataComponent } from './components/consolodted-data/consolodted-data.component';
import { ConChildComponent } from './components/con-child/con-child.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'daily-task',
        component: DailyTaskComponent,
        canActivate: [Auth2Guard],
      },
      {
        path: 'show-task',
        component: ShowTasksComponent,
        canActivate: [Auth2Guard],
      },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      {
        path: 'project',
        component: ProjectsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'emp-projects/:name',
        component: EmpProjectComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'calender',
        component: CalenderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'con-data',
        component: ConsolodtedDataComponent,
        canActivate: [AuthGuard],
        children: [
          // { path: '', redirectTo: 'con-child/radhe radhe', pathMatch: 'full' },
          {
            path: 'con-child/:projectName',
            component: ConChildComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
      { path: '', redirectTo: '/home/show-task', pathMatch: 'full' },
      { path: '**', component: PagenotfoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
