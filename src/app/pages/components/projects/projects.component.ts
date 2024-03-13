import {
  AfterViewChecked,
  Component,
  inject,
  TemplateRef,
} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import { ProjectsService } from '../../services/projects.service';
import { UserService } from '../../services/user.service';
import { Project } from '../../model/project';
import { User } from '../../model/user';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  constructor(
    private common: CommonService,
    private ps: ProjectsService,
    private fb: FormBuilder,
    private us: UserService,
    
  ) {}

  isDisabled: boolean = true;
  projectData: Project[] = [];
  projectDataf: Project[] = [];
  userData: User[] = [];
  mform!: FormGroup;
  showAdd: boolean = false;
  showupdate: boolean = false;
  projectObj = new Project();
  searchName = '';
  teamLead = '';

  ngOnInit() {
    this.mform = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z- ]*')]],
      teamLead: ['', Validators.required],
      startDate: ['', Validators.required],
      expectedEndDate: ['', Validators.required],
    });
    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });

    this.getAll();

    this.us.getAll().subscribe((res: any) => {
      this.userData = res;
    });
  }

  getAll() {
    this.ps.getAll().subscribe((res: any) => {
      this.projectData = res;
      this.projectDataf = res;
    });
  }

  filterName() {
    this.projectDataf = this.projectData.filter((item) => {
      return item.name.toLowerCase().startsWith(this.searchName.toLowerCase()); //includes
    });
  }

  clickAddProject() {
    this.showAdd = true;
    this.showupdate = false;
  }

  createProject(data: any) {
    this.ps.createProject(data).subscribe((res) => {
      // window.alert('User added successfully');
      window.alert('added');
      this.mform.reset();
      this.getAll();
    });
  }

  // sdate!: Date;
  // edit(data: any) {
  //   this.showAdd = false;
  //   this.showupdate = true;

  //   this.projectObj.id = data._id;
  //   this.mform.controls['name'].setValue(data.name);
  //   this.teamLead = data.teamLead;
  //   //this.sdate = data.startDate
  //   //this.mform.controls['startDate'].setValue(data.startDate);
  //   this.mform.controls['startDate'].setValue(this.sdate.toISOString());
  //   //this.mform.controls['expectedEndDate'].setValue(data.expectedEndDate);

  //   console.log(this.sdate);
  // }

  sdate!: Date;
edit(data: any) {
  this.showAdd = false;
  this.showupdate = true;

  this.projectObj.id = data._id;
  this.mform.controls['name'].setValue(data.name);
  this.teamLead = data.teamLead;
  //this.sdate=data.startDate
 console.log(data.startDate)

  this.mform.controls['startDate'].setValue(data.startDate);
  this.mform.controls['expectedEndDate'].setValue(data.expectedEndDate)
  
}

 
  updateProject() {
    this.projectObj.name = this.mform.value.name;
    this.projectObj.teamLead = this.mform.value.teamLead;
    this.projectObj.startDate = this.mform.value.startDate;
    this.projectObj.expectedEndDate = this.mform.value.expectedEndDate;

    this.ps.updateProject(this.projectObj, this.projectObj.id).subscribe(() => {
      window.alert('User Updated');
      this.getAll();
      this.mform.reset();
    });
  }

  deleteProject(data: any) {
    if (confirm('do you want to delete')) {
      this.ps.deleteProject(data._id).subscribe(() => {
        window.alert('Project Deleted');
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
