import { AfterViewChecked, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Emp } from '../../model/employee';

@Component({
  selector: 'app-con-child',
  templateUrl: './con-child.component.html',
  styleUrls: ['./con-child.component.css'],
})
export class ConChildComponent implements AfterViewChecked {
  constructor(private ar: ActivatedRoute, private api: ApiService) {}

  taskData: Emp[] = [];
  taskDataf: Emp[] = [];
  projectName = '';
  fDate!: Date;
  sDate!: Date;

  ngOnInit() {
    this.api.getAll().subscribe((res: any) => {
      this.taskData = res;
    });
  }

  ngAfterViewChecked(): void {
    this.ar.params.subscribe((par: any) => {
      this.projectName = par['projectName'];
    });

    this.taskDataf = this.taskData.filter((task: any) => {
      return task.name == this.projectName;
    });
    

    this.search();
  }

  search() {
    if (this.fDate && this.sDate) {
      const datee1 = new Date(this.fDate);
      const date1 = datee1.toLocaleDateString();
      const datee2 = new Date(this.sDate);
      const date2 = datee2.toLocaleDateString();

      this.taskDataf = this.taskData.filter((task: any) => {
        const datee3 = new Date(task.date);
        const date3 = datee3.toLocaleDateString();
        console.log(date3);
        return (
          date3 >= date1 && date3 <= date2 && task.name == this.projectName
        );
      });
    }
    else{
      this.taskDataf=this.taskData.filter((task:any)=>{
        return task.name==this.projectName
      })
    }
  }
}
