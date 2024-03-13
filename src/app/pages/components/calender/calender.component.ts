import { Component, inject } from '@angular/core';
import { User } from '../../model/user';
import { Emp } from '../../model/employee';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { ApiService } from '../../services/api.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent {
  model!: NgbDateStruct;
  date!:Date
  
  isDisabled: boolean = true;
  userData: User[] = [];
  userName = '';
  // fdate!: string;
  fdate!:Date
  taskData: Emp[] = [];
  taskDataf: Emp[] = [];
 
  constructor(
    private common: CommonService,
    private us: UserService,
    private api: ApiService,
    private calendar: NgbCalendar
  ) {}

  selectToday() {
		this.model = this.calendar.getToday();
	} 

  ngOnInit() {
    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });

    this.us.getAll().subscribe((res: any) => {
      this.userData = res;
    });

    this.api.getAll().subscribe((res: any) => {
      this.taskData = res;
    });
   
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
   
    // events: [
    //   //{ title: 'Meeting', start: new Date() }
    // ],
    dateClick: this.handleDateClick.bind(this),
    
  };
  
 
  handleDateClick(eventInfo:any) {
    //alert('Clicked on date: ' + eventInfo.dateStr);
    this.fdate=eventInfo.date.toLocaleDateString()
    this.search();
  }

 
  search() {
    if (this.userName) {
      this.taskDataf = this.taskData.filter((item) => {
        let date = new Date(item.date);
        let DDate = date.toLocaleDateString(); // Convert date to local string
        let date2 = new Date(this.fdate);
        let LDate = date2.toLocaleDateString();

        return (
          (!this.userName ||
            item.name
              .toLowerCase()
              .includes(this.userName.toLowerCase())) &&
          (!DDate || LDate === DDate)
          
        );
      });

    }
    // else{
    // window.alert('Select name to search')
    // this.fdate=''
    // }
  }
}
