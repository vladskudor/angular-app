import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Subscription , Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  public animationBetweenTransitions: boolean = false;
  constructor(public router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = localStorage.getItem('user');
    const users = localStorage.getItem('users');
    const body = document.body;
    if (!user && !users) {
      this.router.navigate(['/auth']);
    }
    if (!user) {
      return;
    }
    body.style.display = 'none';
    setTimeout(() => {
      body.style.display = '';
    } , 100);
    return true;
  }
}
