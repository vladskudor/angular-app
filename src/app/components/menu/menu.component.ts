import {Component , OnInit , OnDestroy , ViewChild , ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {ServiceService} from '../service/service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit , OnDestroy{
  @ViewChild('menu') menu: ElementRef;
  public media: any = window.matchMedia('(max-width:625px)');
  public text: any = ['c', 'a', 'r', 's'];
  public val: any = 0;
  public title = '';
  public valueContent: any;
  constructor(public svc: ServiceService, public router: Router) {
    this.menu = {} as ElementRef;
  }

  ngOnInit(): void {
    console.log(this.menu);
    setInterval(() => {
      this.valueContent = this.text[this.val] + ' ';
      if (this.val === this.text.length){
        this.title = '';
        this.val = 0;
        this.valueContent = this.text[this.val];
      }
      this.val++;
      this.title = this.title + this.valueContent + ' ';
    } , 300);
  }

  ngOnDestroy(): void{

  }

  submenuState(): void{
    this.menu.nativeElement.style.top = '-25px';
    this.menu.nativeElement.style.left = '-45px';
    this.menu.nativeElement.style.zIndex = '1';
    this.menu.nativeElement.style.background = '#000';
  }


}
