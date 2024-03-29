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
  is_booked: boolean = false;

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


    this.apiService.getBookings(this.rent_id).pipe().subscribe(
        (data: any) => {
          this.bookings = data;
          console.log(this.bookings)
        }
    );

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
      const start = new Date(booking.start_date);
      const end = new Date(booking.end_date);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      if (tomorrow >= start && tomorrow <= end) {
        return true;
      }
    }
    return false;
  }

  clickRent() {
    this.router.navigate(['/rent/' + this.rent_id + '/calendar']);
  }
}
