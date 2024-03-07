import { Component, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../pages/services/user.service';
import { CommonService } from '../pages/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private comman: CommonService,
    private us: UserService,
    private router: Router
  ) {}

  loginf!: FormGroup;

  ngOnInit() {
    this.loginf = this.fb.group({
      Email: ['',[Validators.required,Validators.pattern("^[a-z0-9.]+@technogrowth.com$")]],
      Password: ['',Validators.required],
    });
  }

  
  loginUser(data: any) {
    this.us.loginUser(data).subscribe((res) => {
      //localStorage.setItem('token', res.token);
      if (res.UserType == "Admin"){
        this.comman.setIsDisabled(false);
      }
      else this.comman.setIsDisabled(true)
      if (res.status === 'login successful') {
          this.router.navigate(['/home']);
          localStorage.setItem('token', res.token);
      }
      window.alert(res.status)
      this.loginf.reset()
      
    });
  }
}
