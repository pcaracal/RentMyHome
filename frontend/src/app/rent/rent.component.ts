import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {NavigationEnd, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {CalendarComponent} from "../calendar/calendar.component";
import {filter} from "rxjs";

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    NgIf,
    CalendarComponent
  ],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss'
})
export class RentComponent implements OnInit {
  rent_id: number = -1;
  showCalendar: boolean = false;

  rentData: {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
  } = {} as any;

  bookings: {
    id: number,
    fk_room_id: number,
    fk_user_id: number,
    start_date: string,
    end_date: string,
  }[] = [];

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    let url = window.location.href.split('/');
    let id = url.indexOf('rent');

    if (id === -1 || url[id + 1] === undefined) {
      this.router.navigate(['/']);
    }

    this.rent_id = parseInt(url[id + 1]);

    this.apiService.getRooms().subscribe(
      (data: any) => {
        for (let room of data) {
          if (room.id === this.rent_id) {
            this.rentData = room;
            break;
          }
        }
      }
    )


    this.bookings = this.apiService.getBookingsSync(this.rent_id);


    this.showCalendar = url.pop() === 'calendar';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url.split('/');
      const id = url.indexOf('calendar');
      this.showCalendar = id !== -1;
    });
  }

  isBooked() {
    for (let booking of this.bookings) {
      let start = new Date(booking.start_date);
      let end = new Date(booking.end_date);
      let today = new Date();
      if (today >= start && today <= end) {
        return true;
      }
    }
    return false;
  }

  clickRent() {
    this.router.navigate(['/rent/' + this.rent_id + '/calendar']);
  }
}
