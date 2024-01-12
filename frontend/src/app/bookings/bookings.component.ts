import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {
  isLoggedIn = false;

  bookings: {
    id: number,
    room_id: number,
    user_id: number,
    start_date: string,
    end_date: string,
    amount_of_days: number,
    has_extras: boolean,
    booking_extras: {
      id: number,
      booking_id: number,
      user_id: number,
      stripe_token_id: string,
      payment_amount: number,
      has_bedsheets: boolean,
      has_towels: boolean,
      has_cleaning: boolean,
      has_breakfast: boolean,
      has_lunch: boolean,
      has_dinner: boolean,
      has_parking: boolean,
      has_wifi: boolean,
      has_safe: boolean
    }
  }[] = [];

  constructor(private apiService: ApiService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  bedSheetsPrice: number = 10;
  towelsPrice: number = 5;
  cleaningPrice: number = 15;
  breakfastPrice: number = 5;
  lunchPrice: number = 10;
  dinnerPrice: number = 15;
  parkingPrice: number = 5;
  wifiPrice: number = 5;
  safePrice: number = 5;

  ngOnInit(): void {
    this.apiService.getVerify().subscribe((data: any) => {
      this.isLoggedIn = true;
    }, (error: any) => {
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    });

    // Get the bookings
    this.apiService.get_user_bookings().subscribe((data: any) => {
      for (let booking of data) {
        // Get the booking extras
        this.apiService.get_booking_extras(booking.id).subscribe((data2: any) => {
          booking.booking_extras = data2[0];
          booking.has_extras = booking.booking_extras.has_towels || booking.booking_extras.has_bedsheets || booking.booking_extras.has_cleaning || booking.booking_extras.has_breakfast || booking.booking_extras.has_lunch || booking.booking_extras.has_dinner || booking.booking_extras.has_parking || booking.booking_extras.has_wifi || booking.booking_extras.has_safe;
          booking.amount_of_days = this.getNumberOfDays(booking.start_date, booking.end_date);

          this.bookings.push(booking);
        }, (error: any) => {
          console.log(error);
        });

      }
    }, (error: any) => {
      console.log(error);
    });

    this.bookings.sort((a, b) => (a.id > b.id) ? 1 : -1);

    this.cdr.detectChanges();
  }

  getNumberOfDays(start_date: string, end_date: string) {
    let start = new Date(start_date);
    let end = new Date(end_date);
    return (end.getTime() - start.getTime()) / (1000 * 3600 * 24) + 1;
  }
}