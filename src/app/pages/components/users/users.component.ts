import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { ProjectsService } from '../../services/projects.service';
import { User } from '../../model/user';
import { Project } from '../../model/project';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(
    private us: UserService,
    private fb: FormBuilder,
    private common: CommonService,
    private ps: ProjectsService
  ) {}

  toppings = new FormControl('');
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  selectedToppings: string[] = [];

  userData: User[] = [];
  userDataf: User[] = [];
  mform!: FormGroup;
  showAdd: boolean = false;
  showupdate: boolean = false;
  userObj = new User();
  userType = '';
  isDisabled: any;
  searchName = '';
  project = '';
  projectData: Project[] = [];
  selectedOptions: string[] = [];
  sel:string[]=[]

  ngOnInit() {
    this.mform = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9.]+@technogrowth.com$'),
        ],
      ],
      Mobile: [
        '',
        [Validators.required, Validators.pattern('^[7-9][0-9]{9}$')],
      ],
      UserType: ['', Validators.required],
      Project:['',Validators.required]
      //Project: this.fb.array([], Validators.required),
    });
    this.getAll();

    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });

    this.ps.getAll().subscribe((res: any) => {
      this.projectData = res;
    });
  }

  // get projectFormArray() {
  //   return this.mform.get('Project') as FormArray;
  // }

  // // This function will be triggered whenever the selection changes
  // onSelectionChange(event:any) {
  //   const selectedOptions = event.target.value; // Get the selected options
  //   this.projectFormArray.clear(); // Clear existing selections
  //  console.log(selectedOptions)
  //   // Push the selected options into the form array
  //   selectedOptions.forEach((option:any) => {
  //     this.projectFormArray.push(this.fb.control(option));
  //   });
   
  // }
 

  
  filterName() {
    this.userDataf = this.userData.filter((item) => {
      return item.Name.toLowerCase().startsWith(this.searchName.toLowerCase()); //includes
    });
  }

  clickAddUser() {
    this.showAdd = true;
    this.showupdate = false;
  }

  getAll() {
    this.us.getAll().subscribe((res: any) => {
      this.userData = res;
      this.userDataf = res;
    });
  }

  createUser(data: any) {
    console.log(data)
    this.us.createUser(data).subscribe((res) => {
      // window.alert('User added successfully');
      window.alert(res.message);
      this.mform.reset();
      this.userType = '';
      this.project = '';
      this.getAll();
    });
  }

  edit(data: any) {
    this.showAdd = false;
    this.showupdate = true;

    this.userObj.id = data._id;
    this.mform.controls['Name'].setValue(data.Name);
    this.mform.controls['Email'].setValue(data.Email);
    this.mform.controls['Mobile'].setValue(data.Mobile);
    this.userType = data.UserType;
    console.log('ddd'+data.project)
    this.mform.controls['Project'].setValue(data.Project)
   

    // const projectFormArray = this.mform.get('Project') as FormArray;
    // projectFormArray.clear();

    // data.Project.forEach((projectItem: string) => {
    //   const projectFormControl = this.fb.control(
    //     projectItem,
    //     Validators.required
    //   );
    //   projectFormArray.push(projectFormControl);
    // });
  }

  updateUser() {
    this.userObj.Name = this.mform.value.Name;
    this.userObj.Email = this.mform.value.Email;
    this.userObj.Mobile = this.mform.value.Mobile;
    this.userObj.UserType = this.mform.value.UserType;
    this.userObj.Project = this.mform.value.Project;
    console.log(this.userObj.UserType);
    console.log(this.userObj.Project);
    
    

    this.us.updateUser(this.userObj, this.userObj.id).subscribe((res:any) => {
      //window.alert('User Updated');
      window.alert(res.message);
      this.getAll();
      this.mform.reset();
    });
  }

  deleteUser(data: any) {
    if (confirm('do you want to delete')) {
      this.us.deleteUser(data._id).subscribe(() => {
        window.alert('User Deleted');
        this.getAll();
      });
    }
  }
  resett() {
    this.mform.reset();
  }

  //modal
  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
