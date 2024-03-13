import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CalenderComponent } from './components/calender/calender.component';
import { EmpProjectComponent } from './components/emp-project/emp-project.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ShowTasksComponent } from './components/show-tasks/show-tasks.component';
import { UsersComponent } from './components/users/users.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './components/layout/layout.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ConsolodtedDataComponent } from './components/consolodted-data/consolodted-data.component';
import { ConChildComponent } from './components/con-child/con-child.component';
import { MatSelectModule } from '@angular/material/select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    DailyTaskComponent,
    ProjectsComponent,
    CalenderComponent,
    EmpProjectComponent,
    NavbarComponent,
    PagenotfoundComponent,
    ShowTasksComponent,
    UsersComponent,
    LayoutComponent,
    ConsolodtedDataComponent,
    ConChildComponent,
      
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    MatSelectModule,
    NgbModule
  ]
})
export class HomeModule { }
