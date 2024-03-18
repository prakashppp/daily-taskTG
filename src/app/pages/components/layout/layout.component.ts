import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { User } from '../../model/user';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  isDisabled: boolean = true;
  token: any = localStorage.getItem('token');
  userData: User[] = [];
  userf: User[] = [];
  userId: any;
  userName:any
  activeTab: string = 'tasks';
  constructor(private common: CommonService, private us: UserService) {}

  ngOnInit() {
    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });
    this.us.getAll().subscribe((res: any) => {
      this.userData = res;

      const decodedToken: any = jwtDecode(this.token);
      this.userId = decodedToken.userID;
      this.userf = this.userData.filter((user: any) => {
        return this.userId == user._id;
      });

      let parts = this.userf[0].Name.split(' ');
      let firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      let lastName =
        parts[parts.length - 1].charAt(0).toUpperCase() +
        parts[parts.length - 1].slice(1);
      this.userName = `${firstName} ${lastName}`;
    });
  }

  logout() {
    localStorage.removeItem('token');
  }
  // @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  // closeNavbar() {

  //   if (this.navbarToggler.nativeElement.classList.contains('collapse')) {
  //     this.navbarToggler.nativeElement.click();
  //   }
  // }

  isNavbarCollapsed = true;

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  handleNavItemClicked() {
    if (this.isNavbarCollapsed) {
      this.toggleNavbar();
    }
  }

  // isCollapsed = true;

  // toggleNavbar() {
  //   if (this.isCollapsed) {
  //     this.navbarToggler.nativeElement.click(); // Expand the navbar
  //   }
  //   this.isCollapsed = !this.isCollapsed; // Update the collapsed state
  // }
}
