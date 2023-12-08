import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AboutComponent} from "./about/about.component";
import {RentComponent} from "./rent/rent.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {
    path: 'rent', component: RentComponent,
    children: [
      {
        path: '**',
        component: RentComponent
      }
    ]
  },
  {path: '**', redirectTo: 'home'},
];