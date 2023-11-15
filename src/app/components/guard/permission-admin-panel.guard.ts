import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router , ActivatedRoute} from '@angular/router';
import { Observable  , Subscription} from 'rxjs';
import { ServiceService } from '../service/service.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionAdminPanelGuard implements CanActivate {
  public subscription: Subscription;
  public adminEmail: any;
  public adminPassword: any; 
  public permission: boolean = false;
  public user = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router , public activateRoute: ActivatedRoute , public svc: ServiceService) {
    let email: string = '00000000@gmail.com';
    let password: string = '00000000';

    if (this.user.email === email && this.user.password === password) {
      this.svc.adminPermission = true;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.svc.adminPermission) {
      alert('You are not administrator');
      return;
    }

    return true;
  }
  
}
