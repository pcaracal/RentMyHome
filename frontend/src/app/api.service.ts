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
    console.log('get bearerToken', sessionStorage.getItem('bearerToken') || '');
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
}