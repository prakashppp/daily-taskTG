import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isDisabled: boolean = true;
  constructor(private common:CommonService){}

  ngOnInit(){
    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });
  }

  logout(){
    localStorage.removeItem('token')
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
