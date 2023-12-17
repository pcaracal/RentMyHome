import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    DatePipe
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  // stripe thing
  paymentHandler: any = null;
  stripeAPIKey: string = 'pk_test_51OO43KAjte1PgIiQDiM43Emt9SSsH8UH0IRyDgWgpS6Wq4Hvd97hEMSyhi7OvHSSjfpkLGVgxcmhG0IHWVcDhVm300b2Dl9SNY';

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            // console.log(stripeToken);
            // alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: this.stripeAPIKey,
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        // TODO: Send token to backend for processing
      },
    });
    paymentHandler.open({
      name: 'Sandcat AG Room Rental',
      description: 'Room Rental',
      amount: amount * 100,
    });
  }


  rentId: number = -1;
  bookings: {
    id: number,
    fk_room_id: number,
    fk_user_id: number,
    start_date: string,
    end_date: string,
  }[] = [];

  calendarData: {
    days: {
      date: number,
      booked: boolean,
      today: boolean,
      past: boolean,
      isOtherMonth: boolean,
      dateDate: number,
      dateMonth: number
      dateYear: number
    }[],
    month: string,
    year: number
  } = {} as any;

  weeks: {
    days: {
      date: number,
      dateDate: number,
      dateMonth: number,
      dateYear: number,
      booked: boolean,
      today: boolean,
      past: boolean,
      isOtherMonth: boolean,
    }[]
  }[] = [];

  hasSelectedDate: boolean = false;
  selectedDate: number = 0;
  amountOfDays: number = 1;
  maxAmountOfDays: number = 7;
  selectedMonth: number = 0;
  selectedYear: number = 0;

  tempAmountOfDays: number = 1;


  constructor(private apiService: ApiService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.invokeStripe();

    let url = window.location.href.split('/');
    let id = url.indexOf('rent');

    if (id === -1 || url[id + 1] === undefined) {
      this.router.navigate(['/']);
    }

    this.rentId = parseInt(url[id + 1]);

    this.apiService.getBookings(this.rentId).subscribe((data: any) => {
      this.bookings = data;
      this.bookings.push({
        id: 0,
        fk_room_id: 0,
        fk_user_id: 0,
        start_date: '2000-01-01',
        end_date: new Date(new Date().getTime()).toISOString().split('T')[0],
      });

      this.setCalendarData();

      this.calendarData.days.forEach((day, index) => {
        if (index % 7 === 0) {
          this.weeks.push({
            days: []
          });
        }
        this.weeks[this.weeks.length - 1].days.push(day);
      });


      this.cdr.detectChanges();
      this.selectedDate = this.calendarData.days[0].dateDate;
    });
  }


  setCalendarData() {
    let today = new Date();
    let start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 6);
    let end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 35 - today.getDay());

    this.calendarData.days = [];
    this.calendarData.month = start.toLocaleString('default', {month: 'long'});
    this.calendarData.year = start.getFullYear();

    let day = start;
    while (day <= end) {
      this.calendarData.days.push({
        date: day.getDate(),
        booked: this.isBooked(day),
        today: this.isToday(day),
        past: this.isPast(day),
        isOtherMonth: day.getMonth() !== today.getMonth(),
        dateDate: day.getDate(),
        dateMonth: day.getMonth() !== today.getMonth() ? today.getMonth() + 1 : today.getMonth(),
        dateYear: day.getMonth() === 11 && today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear()
      });
      day.setDate(day.getDate() + 1);
    }
    this.selectedYear = this.calendarData.year;
  }

  isBooked(day: Date) {
    for (let booking of this.bookings) {
      let start = new Date(booking.start_date);
      start.setDate(start.getDate() - 1);
      let end = new Date(booking.end_date);
      if (day >= start && day <= end) {
        return true;
      }
    }
    return false;
  }

  isToday(day: Date) {
    let today = new Date();
    return day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear();
  }

  isPast(day: Date) {
    let today = new Date();
    return day < today;
  }

  isDayInSelection(month: number, day: number) {
    let start = new Date(this.calendarData.year, this.selectedMonth, this.selectedDate);
    let end = new Date(start);
    end.setDate(start.getDate() + this.amountOfDays - 1);
    let date = new Date(this.calendarData.year, month, day);
    if (start.getMonth() !== end.getMonth()) {
      if (date.getMonth() === start.getMonth()) {
        return date >= start && date <= new Date(this.calendarData.year, start.getMonth() + 1, 0);
      } else if (date.getMonth() === end.getMonth()) {
        return date >= new Date(this.calendarData.year, end.getMonth(), 1) && date <= end;
      }
    }
    return date >= start && date <= end;
  }

  selectDate(year: number, month: number, day: number) {
    if (this.isBooked(new Date(this.calendarData.year, month, day))) {
      return;
    }
    this.hasSelectedDate = true;
    this.selectedYear = this.calendarData.year;

    if (month === 12 && this.calendarData.month === "December") {
      this.selectedYear++;
    }

    this.selectedMonth = month;
    this.selectedDate = day;

    let previousAmountOfDays = this.amountOfDays;

    let nextBooking = this.getNextBooking(new Date(this.calendarData.year, month, day));
    let start = new Date(this.calendarData.year, month, day);
    if (nextBooking == null) {
      this.maxAmountOfDays = 7;
      return;
    }
    let daysToNextBooking = Math.round((nextBooking.getTime() - start.getTime()) / (1000 * 3600 * 24));
    if (daysToNextBooking < 7) {
      this.maxAmountOfDays = daysToNextBooking + 1;
      if (previousAmountOfDays > this.maxAmountOfDays) {
        this.amountOfDays = this.maxAmountOfDays;
      }
    } else {
      this.maxAmountOfDays = 7;
    }
    this.tempAmountOfDays = this.amountOfDays;
  }

  getNextBooking(fromDate: Date) {
    let nextBooking = null;
    for (let booking of this.bookings) {
      let start = new Date(booking.start_date);
      start.setDate(start.getDate() - 1);
      if (start > fromDate && (nextBooking == null || start < nextBooking)) {
        nextBooking = start;
      }
    }
    return nextBooking;
  }


  closeCalendar() {
    this.router.navigate(['/rent/' + this.rentId]);
  }

  changeAmountOfDays(amount: Event) {
    this.amountOfDays = parseInt((amount.target as HTMLInputElement).value);
    this.tempAmountOfDays = this.amountOfDays;
    console.log(this.amountOfDays);
  }

  handleBook() {
    let date = new Date(this.selectedYear, this.selectedMonth, this.selectedDate);
    let currentYear = new Date().getFullYear();
    if (date.getFullYear() - currentYear === 2) {
      date.setFullYear(currentYear + 1);
    }

    let start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    let end = new Date(date.getTime());
    end.setDate(end.getDate() + this.amountOfDays - 1);
    let endStr = end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate();

    console.log(start);
    console.log(endStr);
    console.log("------------------");

    this.postBooking(start, endStr, this.rentId);

    // this.makePayment(this.amountOfDays * 100);
  }

  postBooking(start: string, end: string, room: number) {
    this.apiService.postBooking({
      start_date: start,
      end_date: end,
      room_id: 0,
      user_id: 0
    }, room).subscribe((data: any) => {
      window.location.reload();
      console.log(data);
    });
  }
}