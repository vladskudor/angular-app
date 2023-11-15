import {Component, OnInit, DoCheck} from '@angular/core';
import {ServiceService} from '../service/service.service';
import {LogoServiceService} from '../service/logo-service.service';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, DoCheck {
  public value: any;

  public car1: any;
  public car2: any;
  public records: any;

  public searchCarName: any;
  public searchCarModel: any;

  public hint = false;
  public scrollValue: boolean = false;

  public subscription: Subscription;

  public paramLogin: any;
  public paramPassword: any;

  constructor(public svc: ServiceService,
              private http: HttpClient,
              private router: Router,
              public activateRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.svc.overflowAuto();
    
    const user = localStorage.getItem('user');
    const users = localStorage.getItem('users');

    this.subscription = this.activateRoute.params.subscribe((param) => {
      this.paramLogin = param['login'];
      this.paramPassword = param['password'];
    });

    if (!user && !users) {
      document.location.reload();
    }

    setTimeout(() => {
      if (!this.svc.showCars) {
        this.hint = true;
      }
    }, 5000);

    const car1 = localStorage.getItem('car1');
    const car2 = localStorage.getItem('car2');
    if (car1) {
      this.car1 = JSON.parse(car1);
    }
    if (car2) {
      this.car2 = JSON.parse(car2);
    }

    if (car1 && car2) {
      this.router.navigate(['/compare-cars']);
    }

    setTimeout(() => {
      if (!this.svc.repeatMessage) {
        return;
      }
      this.svc.message = true;
    }, 5000);

    this.permission();
  }

  ngDoCheck(): void {
    if (this.records) {
      this.svc.overflowAuto();
    }

    if (window.scrollY) {
      this.scrollValue = true;
    }

    if (window.scrollY === 0) {
      this.scrollValue = false;
    }
  }

  permission(): void {
    let currentUser = localStorage.getItem('user');
    if(currentUser) {
      return;
    }

    this.svc.users.forEach((user) => {
      if (user.email === this.paramLogin && user.password === this.paramPassword) {
        this.svc.user = user;
      }
      if (user.email !== this.paramLogin || user.password !== this.paramPassword) {
        this.router.navigate(['/login']);
      }
    });

    if (this.svc.user) {
      localStorage.setItem('user', JSON.stringify(this.svc.user));
    }
  }

  enter(value): void {
    this.value = value;
  }

  scrollUp(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

