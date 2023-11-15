import {Component, OnInit , DoCheck} from '@angular/core';
import {ServiceService} from './components/service/service.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit , DoCheck{
  constructor(public svc: ServiceService , private http: HttpClient) {

  }
  ngOnInit(): void{
    // document.oncontextmenu = () => {
    //   alert('The context menu is disabled');
    //   return false;
    // };
    this.svc.getIp();
    this.svc.getUser();
    console.log(this.svc.user);
    this.svc.getUsers();
    this.svc.getAuto();
  }

  ngDoCheck(): void{
    // if (this.svc.showCars){
    //   this.svc.overflowAuto();
    // }
    // if (!this.svc.showCars){
    //   this.svc.overflowHidden();
    // }
  }
}
