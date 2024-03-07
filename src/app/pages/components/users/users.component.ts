import { Component, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { ProjectsService } from '../../services/projects.service';
import { User } from '../../model/user';
import { Project } from '../../model/project';

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
    private ps:ProjectsService
  ) {}

  userData: User[] = [];
  userDataf:User[]=[]
  mform!: FormGroup;
  showAdd: boolean = false;
  showupdate: boolean = false;
  userObj = new User();
  userType = '';
  isDisabled: any;
  searchName=""
  project=""
  projectData:Project[]=[]

  ngOnInit() {
    this.mform = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Email: [
        '',
        [
          Validators.required,
          // Validators.pattern('^[a-z0-9.]+@technogrowth.com$'),
        ],
      ],
      Mobile: [
        '',
        [Validators.required, Validators.pattern('^[7-9][0-9]{9}$')],
      ],
      UserType: ['', Validators.required],
      Project:['',Validators.required]
      
    });
    this.getAll();

    this.common.isDisabled.subscribe((res) => {
        this.isDisabled = res;
    });

    this.ps.getAll().subscribe((res:any)=>{
      this.projectData=res;
    })
  }

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
      this.userDataf=res;
    });
  }

  createUser(data: any) {
    this.us.createUser(data).subscribe((res) => {
      // window.alert('User added successfully');
      window.alert(res.message)
      this.mform.reset();
      this.userType='';
      this.project=''
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
   // this.mform.controls['UserType'].setValue(data.UserType);
    this.userType=data.UserType
    this.project=data.Project
  }

  updateUser() {
    this.userObj.Name = this.mform.value.Name;
    this.userObj.Email = this.mform.value.Email;
    this.userObj.Mobile = this.mform.value.Mobile;
    this.userObj.UserType = this.mform.value.UserType;
    this.userObj.Project = this.mform.value.Project;

    this.us.updateUser(this.userObj, this.userObj.id).subscribe(() => {
      window.alert('User Updated');
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
