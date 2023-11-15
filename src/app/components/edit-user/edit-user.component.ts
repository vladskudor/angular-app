import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ServiceService} from '../service/service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  constructor(public svc: ServiceService ,
              private router: Router) { }

  ngOnInit(): void {
    this.svc.users.forEach((curEditUser) => {
      if (this.svc.user.email === curEditUser.email && this.svc.user.password === curEditUser.password) {
        this.svc.editUser = curEditUser;
      }
    });
  }
}
