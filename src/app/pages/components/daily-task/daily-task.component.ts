import { Component, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css'],
})
export class DailyTaskComponent implements DoCheck {
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private us: UserService,
    private common: CommonService
  ) {}

  nForm!: FormGroup;
  enteredLabel = '';
  name = '';
  date = '';
  dailyTasks: any[] = [];
  todaysDate = new Date();
  isDisabled1: boolean = true;
  userData: any[] = [];
  selectemp = '';
  isDisabled: boolean = true;
  userId: any;
  userName!: string;
  dd: any = localStorage.getItem('token');
  userf: User[] = [];
  selectedValue=''
 

  ngOnInit() {
    this.nForm = this.fb.group({
      tasks: ['',[Validators.required,Validators.pattern('[a-zA-Z]+[a-zA-Z0-9-&*+-_$#@!()%~^= ]*')]],
      selll:['']
    });
    this.us.getAll().subscribe((res: any) => {
      this.userData = res;
      this.userf = this.userData.filter((user: any) => {
        return this.userId == user._id;
      });
      this.selectedValue=this.userf[0].Project[0]
    });

    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });

    
  }

  
  ngDoCheck(): void {
    this.decodeToken(this.dd);
  }

  decodeToken(token: string) {
    try {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.userID;
      this.userf = this.userData.filter((user: any) => {
        return this.userId == user._id;
      });
      
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  onAddTask() {
    if (this.enteredLabel) {
      this.dailyTasks.push(this.enteredLabel);
      this.nForm.controls['tasks'].reset();
    }
    //this.isDisabled1=false;
  }

  alertt() {
    alert('Your tasks added successfully');
  }

  onSubmit() {
    this.nForm.reset();
    this.dailyTasks = [];
  }

  addTasks() {
    const obj = {
      name: this.userf[0].Name,
      date: this.todaysDate,
      tasks: this.dailyTasks,
      projects:this.selectedValue
    };

    this.api.addTasks(obj).subscribe((res: any) => {
      console.log(res);
      window.alert(res.message);
    });

    // this.nForm.reset();
    this.dailyTasks = [];
    //this.isDisabled1=true;
  }

  deleteTask(value: any) {
    if (confirm('do you want to delete task')) this.dailyTasks.splice(value, 1);
    // if(this.dailyTasks.length<=0){
    //   this.isDisabled1=true;
    // }
  }

  edit(value: any, id: any) {
    console.log(value);
    this.nForm.controls['tasks'].setValue(value);
    this.dailyTasks.splice(id, 1);
  }

  // checkvalidity(){
  //   if(this.name.length<=0)
  //   this.isDisabled1=true
  //   if(this.name.length>0 && this.dailyTasks.length>0)
  //   this.isDisabled1=false
  // }
}
