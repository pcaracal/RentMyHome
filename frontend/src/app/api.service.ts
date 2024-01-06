import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  private _bearerToken: string = '';

  get bearerToken(): string {
    // console.log('get bearerToken', sessionStorage.getItem('bearerToken') || '');
    return sessionStorage.getItem('bearerToken') || '';
  }

  set bearerToken(value: string) {
    sessionStorage.setItem('bearerToken', value);
  }

  getRooms() {
    return this.http.get(this._apiUrl + '/rooms');
  }

  getBookings(id: number) {
    return this.http.get(this._apiUrl + '/bookings/' + id);
  }

  getBookingsSync(id: number) {
    let bookings: {
      id: number,
      fk_room_id: number,
      fk_user_id: number,
      start_date: string,
      end_date: string,
    }[] = [];

    this.http.get(this._apiUrl + '/bookings/' + id).subscribe(
        (data: any) => {
          for (let booking of data) {
            bookings.push(booking);
          }
        }
    )

    return bookings;
  }

  postBooking(booking: any, id: number) {
    const httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken,
        'Content-Type': 'application/json'
      }
    };
    return this.http.post(this._apiUrl + '/bookings/' + id, booking, httpOptions);
  }

  postLogin(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }

    return this.http.post(this._apiUrl + '/login', body);
  }

  postRegister(username: string, password: string) {
    const body = {
      username: username,
      password: password
    }

    return this.http.post(this._apiUrl + '/register', body);
  }

  getVerify() {
    const httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken,
        'Content-Type': 'application/json'
      }
    };
    return this.http.get(this._apiUrl + '/verify', httpOptions);
  }

  postBookingExtras(booking_id: number,
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
                    has_safe: boolean) {

    const body = {
      booking_id: booking_id,
      user_id: 0,
      stripe_token_id: stripe_token_id,
      payment_amount: payment_amount,
      has_bedsheets: has_bedsheets,
      has_towels: has_towels,
      has_cleaning: has_cleaning,
      has_breakfast: has_breakfast,
      has_lunch: has_lunch,
      has_dinner: has_dinner,
      has_parking: has_parking,
      has_wifi: has_wifi,
      has_safe: has_safe,
    }

    const httpOptions = {
      headers: {
        'Authorization': 'Bearer ' + this.bearerToken,
        'Content-Type': 'application/json'
      }
    };
    return this.http.post(this._apiUrl + '/booking_extras', body, httpOptions);
  }
}