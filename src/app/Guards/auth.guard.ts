import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../pages/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private common: CommonService, private router: Router) {}
  isDisabled!: boolean;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.common.isDisabled.subscribe((res) => {
      this.isDisabled = res;
    });
    const token: string = localStorage.getItem('token')!;
   
    if (token) {
      if (!this.isDisabled) {
        return true;
      } else {
        this.router.navigate([this.router.url]);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
