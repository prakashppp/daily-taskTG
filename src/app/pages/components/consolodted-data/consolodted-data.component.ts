import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
} from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../model/project';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Emp } from '../../model/employee';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-consolodted-data',
  templateUrl: './consolodted-data.component.html',
  styleUrls: ['./consolodted-data.component.css'],
})
export class ConsolodtedDataComponent {
  constructor(
    private ps: ProjectsService,
    private us: UserService,
    private api: ApiService
  ) {}

  projectData: Project[] = [];
  projectName = '';
  empName = '';
  userData: User[] = [];
  userDataf: User[] = [];
  fDate!: Date;
  sDate!: Date;
  taskData: Emp[] = [];
  taskDataf: Emp[] = [];

  ngOnInit() {
    this.ps.getAll().subscribe((res: any) => {
      this.projectData = res;

      this.us.getAll().subscribe((res: any) => {
        this.userData = res;

        // this.userDataf = this.userData.filter((user: any) => {
        //   return user.Project == this.projectData[1].name;
        // });

        this.userDataf = this.userData.filter((user: any) => {
          return user.Project.includes(this.projectData[1].name);
        });

        this.projectName=this.projectData[1].name

        this.api.getAll().subscribe((res: any) => {
          this.taskData = res;

          this.taskDataf = this.taskData.filter((task: any) => {
            return task.name == this.userDataf[0].Name && task.projects==this.projectName;
          });

          // this.taskDataf = this.taskData.filter((task: any) => {
          //   return task.name == this.userDataf[0].Name && task.projects==this.projectName;
          // });
        });
      });
    });
  }

  search() {
    this.userDataf = this.userData.filter((user: any) => {
        // return user.Project == this.projectName;
        return user.Project.includes(this.projectName);
    });

    this.api.getAll().subscribe((res: any) => {
      this.taskData = res;

      this.taskDataf = this.taskData.filter((task: any) => {
        return task.name == this.userDataf[0].Name && task.projects==this.projectName;
      });
    });
  }

  search2() {
    if (this.fDate && this.sDate) {
      const datee1 = new Date(this.fDate);
      const date1 = datee1.toLocaleDateString();
      const datee2 = new Date(this.sDate);
      datee2.setDate(datee2.getDate() + 1);
      const date2 = datee2.toLocaleDateString();

      this.taskDataf = this.taskData.filter((task: any) => {
        const datee3 = new Date(task.date);
        const date3 = datee3.toLocaleDateString();
        // console.log(date3);
              
        return datee3 >= datee1 && datee3 <= datee2 && task.name==this.empName && task.projects==this.projectName;
        

      });
    } else {
      this.taskDataf = this.taskData.filter((task: any) => {
        return task.name == this.empName && task.projects==this.projectName ;
      });
      
    }
  }

  getEmpName(data: any) {
    this.empName = data;
    console.log(this.empName)
    console.log(this.projectName)
    this.taskDataf = this.taskData.filter((task: any) => {
      return task.name == this.empName && task.projects==this.projectName;
    });
    this.search2();
  }
}
