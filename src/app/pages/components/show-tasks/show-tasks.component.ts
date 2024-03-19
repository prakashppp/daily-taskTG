import { AfterViewChecked, Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { Emp } from '../../model/employee';
import { User } from '../../model/user';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
})
export class ShowTasksComponent {
  constructor(
    private api: ApiService,
    private common: CommonService,
    private us: UserService
  ) {}
  data: Emp[] = [];
  fdata: Emp[] = [];
  fdatar!: Emp;
  // fdate!: Date;
  fdate: string = '';
  isDisabled: boolean = true;
  nameToSearch = '';
  userId: any;
  userf: User[] = [];
  dd: any = localStorage.getItem('token');
  userData: any[] = [];
  month = new Date().getMonth() + 1;
  date =
    new Date().getDate() + '-' + this.month + '-' + new Date().getFullYear();
  arrayText: any;

  ngOnInit() {
    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });

    this.us.getAll().subscribe((res: any) => {
      this.userData = res;
    });

    this.decodeToken(this.dd);
    this.api.getAll().subscribe((ress: any) => {
      if (this.isDisabled == false) {
        this.data = ress;
        this.fdata = ress;
      } else {
        this.us.getAll().subscribe((res: any) => {
          this.userData = res;

          this.userf = this.userData.filter((user: any) => {
            return this.userId == user._id;
          });

          this.data = ress.filter((daddd: any) => {
            return daddd.name == this.userf[0].Name;
          });

          this.fdata = ress.filter((daddd: any) => {
            return daddd.name == this.userf[0].Name;
          });
        });
      }
    });
  }

  ngDoCheck(): void {
    this.decodeToken(this.dd);

    // this.api.getAll().subscribe((res: any) => {
    //   if (this.isDisabled == false) {
    //     this.data = res;
    //     this.fdata = res;
    //   } else {
    //     this.data = res.filter((daddd: any) => {
    //       return daddd.name == this.userf[0].Name;
    //     });
    //     this.fdata = res.filter((daddd: any) => {
    //       return daddd.name == this.userf[0].Name;
    //     });
    //   }
    // });
  }

  unUpdtedUsers: Emp[] = [];
  // ngAfterViewChecked(): void {
  //   this.arrayText = this.fdata
  //     .map((obj: any) => {
  //       let taskIndex = 1;
  //       const tasksText = obj.tasks
  //         .map((task: string) => {
  //           return `${taskIndex++}: ${task}`;
  //         })
  //         .join('\n');
  //       return `Name: ${obj.name} \nTasks:\n${tasksText}\n`;
  //     })
  //     .join('\n');
  // }

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

  search() {
    // if(this.nameToSearch){
    //   this.fdata=this.data;
    // }
    if (!this.nameToSearch && !this.fdate) {
      this.fdata = this.data;
    } else {
      this.fdata = this.data.filter((item) => {
        let date = new Date(item.date);
        let DDate = date.toLocaleDateString(); // Convert date to local string
        let date2 = new Date(this.fdate);
        let LDate = date2.toLocaleDateString();

        if (this.nameToSearch == '') {
          console.log(LDate.length);
          return DDate == LDate;
        } else if (this.nameToSearch.length >= 0 && this.fdate.length <= 0) {
          return item.name
            .toLocaleLowerCase()
            .startsWith(this.nameToSearch.toLocaleLowerCase());
        } else
          return (
            (!this.nameToSearch ||
              item.name
                .toLowerCase()
                .startsWith(this.nameToSearch.toLowerCase())) &&
            (!DDate || LDate === DDate)
          );
      });
    }
  }

  showAll() {
    this.fdata = this.data;
  }
  ffData: Emp[] = [];
  sendEmail() {
    function filterByName(arr1: any, arr2: any) {
      const namesSet = new Set(arr2.map((obj: any) => obj.name));
      const filteredArr = arr1.filter((obj: any) => !namesSet.has(obj.Name));
      return filteredArr;
    }

    this.ffData = this.data.filter((item) => {
      let date = new Date(item.date);
      let DDate = date.toLocaleDateString();
      let date2 = new Date();
      let LDate = date2.toLocaleDateString();
      return DDate == LDate;
    });

    const filteredArray = filterByName(this.userData, this.ffData);

    const unuu = filteredArray
      .map((data: any) => {
        return ` ${data.Name} \n`;
      })
      .join('');

    this.arrayText = this.ffData
      .map((obj: any) => {
        let taskIndex = 1;
        const tasksText = obj.tasks
          .map((task: string) => {
            return `${taskIndex++}: ${task}`;
          })
          .join('\n');
        return `Name: ${obj.name} \nTasks:\n${tasksText}\n`;
      })
      .join('\n');

    const obj = {
      to: 'prakashjagtap738760@gmail.com',
      subject: `${this.date} daily tasks`,
      text: `Daily Task Updates:\n\n${this.arrayText} \n Names: \n${unuu} `,
    };

    this.us.sendEmail(obj).subscribe((res) => {
      window.alert(res.status);
    });
  }
}
