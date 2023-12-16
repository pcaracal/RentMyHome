import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
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
    }[],
    month: string,
    year: number
  } = {} as any;

  weeks: {
    days: {
      date: number,
      dateDate: number,
      dateMonth: number,
      booked: boolean,
      today: boolean,
      past: boolean,
      isOtherMonth: boolean,
    }[]
  }[] = [];

  selectedDate: number = 0;
  amountOfDays: number = 1;
  maxAmountOfDays: number = 7;
  selectedMonth: number = 0;


  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    let url = window.location.href.split('/');
    let id = url.indexOf('rent');

    if (id === -1 || url[id + 1] === undefined) {
      this.router.navigate(['/']);
    }

    this.rentId = parseInt(url[id + 1]);
    this.bookings = this.apiService.getBookings(this.rentId);

    this.setCalendarData();

    this.calendarData.days.forEach((day, index) => {
      if (index % 7 === 0) {
        this.weeks.push({
          days: []
        });
      }
      this.weeks[this.weeks.length - 1].days.push(day);
    });

    this.selectedDate = this.calendarData.days[0].dateDate;
  }

  setCalendarData() {
    let today = new Date();
    let start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
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
        dateMonth: day.getMonth() !== today.getMonth() ? today.getMonth() + 1 : today.getMonth()
      });
      day.setDate(day.getDate() + 1);
    }
  }

  isBooked(day: Date) {
    for (let booking of this.bookings) {
      let start = new Date(booking.start_date);
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

    console.log("------")
    console.log("Start: " + start)
    console.log("End: " + end)
    if (start.getMonth() !== end.getMonth()) {
      if (date.getMonth() === start.getMonth()) {
        return date >= start && date <= new Date(this.calendarData.year, start.getMonth() + 1, 0);
      } else if (date.getMonth() === end.getMonth()) {
        return date >= new Date(this.calendarData.year, end.getMonth(), 1) && date <= end;
      }
    }

    return date >= start && date <= end;
  }

  selectDate(month: number, day: number) {
    if (this.isBooked(new Date(this.calendarData.year, month, day))) {
      return;
    }

    console.log("Selected date, month: " + day + ", " + month)
    this.selectedMonth = month;
    this.selectedDate = day;
  }
}