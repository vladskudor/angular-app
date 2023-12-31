import {Inject, Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NavigationEnd, Router, Scroll, ActivatedRoute} from '@angular/router';
import {LogoServiceService} from './logo-service.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {
  public adminPermission: boolean = false;
  public formControlLogin: FormControl;
  public formControlPassword: FormControl;
  public formControlMotor: FormControl;
  public formControlAccelereation: FormControl;
  public formControlSpeed: FormControl;
  public formControlHorsePower: FormControl;

  public login: string;
  public password: string;
  public user: any;
  public users: any = [];
  public editUser: any;
  public ip: any;

  public userExist: any;
  public modal = false;
  public message = false;

  public logotypes: any;
  public logo: any;
  public img: SafeResourceUrl;
  public error: any = false;
  public loading = false;
  public showCars = false;
  public repeatMessage: boolean = true;

  public cars: any = [];
  public curCar: any;
  public mark: any;
  public carCurrent: any;
  public model: any = [];
  public currentModel: any;
  public gear: any;
  public currentGear: any;
  public motors: any;
  public motor: any;
  public acceleration: any;
  public speed: any;
  public horsePower: any;

  public car1: any;
  public car2: any;
  public selectedCar: any;
  public carTest1: any;
  public carTest2: any;

  public date: Date = new Date();


  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private http: HttpClient,
    public svcLogo: LogoServiceService,
    public sanitizer: DomSanitizer
  ) {

  }

  public enterData(): void {
    this.formControlLogin = new FormControl('', [Validators.minLength(8), Validators.email]);
    this.formControlLogin.valueChanges.subscribe((changes) => {
      this.login = changes;
    });
    this.formControlPassword = new FormControl('', [Validators.minLength(8), Validators.maxLength(16)]);
    this.formControlPassword.valueChanges.subscribe((changes) => {
      this.password = changes;
    });
  }

  public enterDataMotor(): void {
    this.motors = [
      {motor: 1.0},
      {motor: 1.1},
      {motor: 1.2},
      {motor: 1.3},
      {motor: 1.4},
      {motor: 1.5},
      {motor: 1.6},
      {motor: 1.7},
      {motor: 1.8},
      {motor: 1.9},
      {motor: 2.0},
      {motor: 2.1},
      {motor: 2.2},
      {motor: 2.3},
      {motor: 2.4},
      {motor: 2.5},
      {motor: 2.6},
      {motor: 2.7},
      {motor: 2.8},
      {motor: 2.9},
      {motor: 3.0},
      {motor: 3.1},
      {motor: 3.2},
      {motor: 3.3},
      {motor: 3.4},
      {motor: 3.5},
      {motor: 3.6},
      {motor: 3.7},
      {motor: 3.8},
      {motor: 3.9},
      {motor: 4.0},
      {motor: 4.1},
      {motor: 4.2},
      {motor: 4.3},
      {motor: 4.4},
      {motor: 4.5},
      {motor: 4.6},
      {motor: 4.7},
      {motor: 4.8},
      {motor: 4.9},
      {motor: 5.0}
    ];
    this.formControlMotor = new FormControl();
    this.formControlMotor.valueChanges.subscribe((changes) => {
      this.motor = changes;
    });

    this.formControlAccelereation = new FormControl();
    this.formControlAccelereation.valueChanges.subscribe((changes) => {
      this.acceleration = changes;
    });

    this.formControlSpeed = new FormControl();
    this.formControlSpeed.valueChanges.subscribe((changes) => {
      this.speed = changes;
    });


    this.formControlHorsePower = new FormControl();
    this.formControlHorsePower.valueChanges.subscribe((changes) => {
      this.horsePower = changes;
    });
  }

  public getUsers(): void {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      this.users = users;
    }
    if (!users) {
      this.http.get('http://localhost:4200/api/users').subscribe((data) => {
        this.users = data;
      });
    }
  }

  public getUser(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.user = user;
    }
    if (!user) {
      this.user = false;
    }
  }

  public getIp(): void {
    this.http.get(`https://api.ip2loc.com/yPw3PKm7dXHwf8j2J6H5JJmGzVP1csPz`).subscribe((dataIp) => {
      this.ip = dataIp;
    });
  }

  public authSent(): void {
    this.users.some((someUser) => {
      if (this.login === someUser.email) {
        this.userExist = true;
        alert('User already exist');
        return;
      }
      if (this.login === someUser.email) {
        this.userExist = false;
      }
    });

    if (this.userExist) {
      window.location.reload();
      return;
    }

    if (this.login === '') {
      // alert('Fill in the input field');
      return;
    }

    if (this.formControlLogin.invalid || this.formControlPassword.invalid) {
      // alert('Form invalid');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      users = [];
    }
    const user = {
      email: this.login,
      password: this.password,
      id: Math.random(),
      ip: this.ip,
      img: this.img,
      likeCars: [],
      timeAuth: this.date,
      messages: [{
        name: 'Admin',
        message: 'Hello! If you like my program, write me something.'
      }]
    };
    // document.cookie = `${user.email}=${user.password}`;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.router.navigate(['/about', this.login, this.password]);
    this.modal = true;
    // const cookie = document.cookie;
  }

  public sendlogData(): void {
  /* this.users.forEach((user) => {
      if (this.login === user.email && this.password === user.password) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/main', this.login, this.password]);
        this.modal = true;
      }
      if (this.login !== user.email && this.password !== user.password) {
        this.error = true;
        return;
      }
    });
  */
    const users = localStorage.getItem('users');

    if (!users && !this.users) {
      return;
    }
    this.router.navigate(['/main' , this.login , this.password]);
  }


  public saveChangesOfUser(): void {
    localStorage.setItem('user', JSON.stringify(this.user));
    /*this.users.forEach((curEditUser) => {
      if (this.user.email === curEditUser.email && this.user.password === curEditUser.password) {
        curEditUser.email = this.user.email;
        curEditUser.password = this.user.password;
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    });
    */
    this.editUser.email = this.user.email;
    this.editUser.password = this.user.password;
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  public removeUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('car1');
    localStorage.removeItem('car2');
    this.user = false;
    this.router.navigate(['/login']);
  }

  public getAuto(): void {
    this.http.get('https://api.auto.ria.com/categories/1/marks').subscribe((cars: any = []) => {
      this.cars = cars.map((m: any) => {
        return {name: m.name.toUpperCase() , value: m.value};
      });
    });
    this.loading = true;
  }

  public currentCar(car): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.cars.forEach((currentCar) => {
      currentCar.logo = '';
      if (car.value === currentCar.value) {
        this.selectedCar = currentCar;
        this.carCurrent = currentCar;
        this.curCar = currentCar.value;
      }
    });
    this.http.get(`https://api.auto.ria.com/categories/1/marks/${this.curCar}/models`).subscribe((model: any = []) => {
      this.model = model.map((m: any) => {
        return {name: m.name.toUpperCase()}
      });
    });
  }

  public modelCar(model): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.model.forEach((curModel) => {
      if (curModel.value === model.value) {
        this.currentModel = curModel;
      }
    });
    this.getGearBoxes();
  }

  public getGearBoxes(): void {
    this.http.get('https://api.auto.ria.com/categories/2/gearboxes').subscribe((gear) => {
      this.gear = gear;
    });
  }

  public getGear(gears): void {
    this.gear.forEach((curGear) => {
      if (curGear === gears) {
        this.currentGear = curGear;
      }
    });
    this.router.navigate(['/current-car']);
  }

  public getMotorsOfCars(): void {
    this.overflowAuto();
    if (this.motor == null || this.acceleration == null || this.horsePower == null) {
      alert('You need enter data');
      return;
    }

    this.logotypes = this.svcLogo.logotypes;

    // for (let i = 0; i < this.logotypes.length; i++) {
    //   if (this.carCurrent.name === this.logotypes[i].name){
    //     this.logo = this.logotypes[i].image.source;
    //   }
    // }

    for (const logo of this.logotypes) {
      if (this.carCurrent.name === logo.name) {
        this.logo = logo.image.source;
      }
    }

    const completeCar = {
      name: this.carCurrent.name,
      model: this.currentModel.name,
      logo: this.logo,
      gear: this.currentGear.name,
      motor: this.motor,
      acceleration: this.acceleration,
      speed: this.speed,
      horsePower: this.horsePower
    };

    let car1 = JSON.parse(localStorage.getItem('car1'));
    let car2 = JSON.parse(localStorage.getItem('car2'));

    if (!car1) {
      car1 = [];
      this.car1 = car1;
      this.car1.push(completeCar);
      localStorage.setItem('car1', JSON.stringify(car1));
      this.router.navigate(['/main', this.user.email, this.user.password]);
    } else {
      car2 = [];
      this.car2 = car2;
      this.car2.push(completeCar);
      localStorage.setItem('car2', JSON.stringify(car2));
      this.router.navigate(['/compare-cars']);
    }
  }

  public likeCar(model): void {
    this.model.forEach((curModel) => {
      if (curModel.value === model.value) {
        this.currentModel = curModel;
      }
    });
    const likeCarUser = {
      mark: this.carCurrent.name,
      model: this.currentModel,
      logo: '',
      info: () => {
        console.log('Mark: ' + this.mark, 'Model: ' + this.model);
      }
    };

    this.users.forEach((user) => {
      if (user.email === this.user.email && user.password === this.user.password) {
        this.user = user;
        this.user.likeCars.push(likeCarUser);
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    });
    this.getGearBoxes();
  }

  public overflowAuto(): void {
    document.body.style.overflow = 'auto';
  }

  public overflowHidden(): void {
    document.body.style.overflow = 'hidden';
  }

  public navigateTo(path): void {
    localStorage.removeItem('car');
    localStorage.removeItem('car1');
    localStorage.removeItem('car2');
    this.router.navigate([`${path}`, this.user.email, this.user.password]);
  }

  public playGame(): void {
    const carTest1 = localStorage.getItem('car1');
    const carTest2 = localStorage.getItem('car2');
    localStorage.setItem('carTest1', carTest1);
    localStorage.setItem('carTest2', carTest2);
    this.router.navigate(['/game', `${JSON.stringify(this.car1)}`, `${JSON.stringify(this.car2)}`]);
  }

  public handleFileInput(file: FileList): void {
    const urlToBlob = window.URL.createObjectURL(file.item(0));
    this.img = this.sanitizer.bypassSecurityTrustUrl(urlToBlob);
  }
}
