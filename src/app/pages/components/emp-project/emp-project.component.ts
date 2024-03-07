import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-emp-project',
  templateUrl: './emp-project.component.html',
  styleUrls: ['./emp-project.component.css'],
})
export class EmpProjectComponent {
  isDisabled: boolean = true;
  userData: any[] = [];
  userDataf: any[] = [];

  constructor(
    private common: CommonService,
    private us: UserService,
    private ac: ActivatedRoute
  ) {}
  ngOnInit() {
    this.us.getAll().subscribe((res: any) => {
      this.userData = res;

      this.ac.params.subscribe((params) => {
        if (params['name']) {
          const projectName = params['name'].toLowerCase();
          this.userDataf = this.userData.filter((user) => {
            //return user.Project === params['name'];
            return user.Project === projectName;
          });
        }
      });
    });

    // this.drestoData = this.restoData.filter((item) => {
    //   return item.Name.toLowerCase().startsWith(this.searchName.toLowerCase()); //includes
    // });

    // this.ac.params.subscribe(params=>{
    //   if(params['name']){
    //     console.log(params['name'])
    //     let i=0
    //     this.userDataf=this.userData.filter(user=> user[i++].Project.toLowerCase().includes(params['name'].toLowerCase()));
    //   }
    // })

    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });
  }

  // ngAfterViewChecked(): void {
  //   this.us.getAll().subscribe((res:any)=>{
  //     this.userData=res;
  //   })

  //   console.log(this.userData);

  //   this.ac.params.subscribe(params=>{
  //     if(params['name']){
  //       console.log(params['name'])
  //       this.userDataf=this.userData.filter(user=> user.Project?.toLowerCase().includes(params['name'].toLowerCase()));
  //     }
  //   })
  // }

  //   this.router.params.subscribe(params => {
  //     if (params['searchItem']) {

  //       this.foods = this.fs.getAll().filter(food => food.name.toLowerCase().includes(params['searchItem'].toLowerCase()));
  //       if (this.foods.length == 0)
  //         this.sss = "" + params['searchItem'];
  //       else
  //         this.sss = "";
  //     }

  //     else if (params['tag'] == 'All')
  //       this.foods = this.fs.getAll()
  //     else if (params['tag'])
  //       this.foods = this.fs.getAll().filter(food => food.tags?.includes(params['tag']))
  //       //this.foods=this.fs.getAllFoodByTag(params['tag']);

  //     else
  //       this.foods = this.fs.getAll();
  //   })

  // }
}
