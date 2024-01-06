import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AboutComponent} from "./about/about.component";
import {RentComponent} from "./rent/rent.component";
import {BookingsComponent} from "./bookings/bookings.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'bookings', component: BookingsComponent},
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