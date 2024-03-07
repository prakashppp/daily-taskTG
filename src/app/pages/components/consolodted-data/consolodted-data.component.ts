import { AfterViewChecked, AfterViewInit, Component, DoCheck } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../model/project';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-consolodted-data',
  templateUrl: './consolodted-data.component.html',
  styleUrls: ['./consolodted-data.component.css'],
})
export class ConsolodtedDataComponent implements AfterViewChecked,DoCheck {
  constructor(private ps: ProjectsService, private us: UserService) {}

  projectData: Project[] = [];
  projectName = '';
  userData: User[] = [];
  userDataf: User[] = [];

  ngOnInit() {
    this.ps.getAll().subscribe((res: any) => {
      this.projectData = res;

      this.us.getAll().subscribe((res: any) => {
        this.userData = res;
       console.log(this.userData)
       console.log(this.projectName)
        this.userDataf = this.userData.filter((user: any) => {
          return user.Project == this.projectData[1].name;
        });
        console.log(this.userDataf)
      });
    });

   
    // this.us.getAll().subscribe((res: any) => {
    //   this.userData = res;
    //  console.log(this.userData)
    //  console.log(this.projectName)
    //   this.userDataf = this.userData.filter((user: any) => {
    //     return user.Project == this.projectData[1].name;
    //   });
    //   console.log(this.userDataf)
    // });

    
    
  }

 
  search() {
    this.userDataf = this.userData.filter((user: any) => {
      return user.Project == this.projectName;
    });
  }

  ngAfterViewChecked(): void {
    // this.search();

   
    // this.userDataf = this.userData.filter((user: any) => {
    //   return user.Project == this.projectName;
    // });
  }

  ngDoCheck(): void {
    // this.userDataf = this.userData.filter((user: any) => {
    //   return user.Project == "iskon";
    // });
  }
}
