import {NgModule} from '@angular/core';
import {RouterModule , Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {LoginComponent} from './components/login/login.component';
import {AuthComponent} from './components/auth/auth.component';
import {GuardGuard} from './components/guard/guard.guard';
import {PermissionAdminPanelGuard} from './components/guard/permission-admin-panel.guard'
import {CurrentCarComponent} from './components/current-car/current-car.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {CompareCarsComponent} from './components/compare-cars/compare-cars.component';
import {GameComponent} from './components/game/game.component';
import {AboutComponent} from './components/about/about.component';
import {MeganeComponent} from './components/megane/megane.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';


const appRoutes: Routes = [
  {path: '' , component: MeganeComponent},
  {path: 'auth' , component: AuthComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'about/:login/:password' , component: AboutComponent , canActivate: [GuardGuard]},
  {path: 'profile' , component: ProfileComponent , canActivate: [GuardGuard]},
  {path: 'game/:carTest1/:carTest2' , component: GameComponent , canActivate: [GuardGuard]},
  {path: 'edit' , component: EditUserComponent , canActivate: [GuardGuard]},
  {path: 'current-car' , component: CurrentCarComponent , canActivate: [GuardGuard]},
  {path: 'compare-cars' , component: CompareCarsComponent , canActivate: [GuardGuard]},
  {path: 'megane' , component: MeganeComponent},
  {path: 'main/:login/:password' , component: MainComponent},
  {path: 'admin-panel' , component: AdminPanelComponent , canActivate: [PermissionAdminPanelGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class Router {

}
