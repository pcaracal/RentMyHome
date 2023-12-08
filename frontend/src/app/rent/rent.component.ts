import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss'
})
export class RentComponent implements OnInit {
  rent_id: number = -1;

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
    this.rent_id = parseInt(<string>window.location.href.split('/').pop());
    this.rentData = this.apiService.getRoom(this.rent_id);
    this.bookings = this.apiService.getBookings(this.rent_id);
  }
}
