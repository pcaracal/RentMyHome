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
    fk_user_id: number
    address: string,
    city: string,
    zip: string,
    is_rented: boolean
  } = {} as any;

  owner: {
    id: number,
    name: string,
    email: string
  } = {} as any;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.rent_id = parseInt(<string>window.location.href.split('/').pop());
    this.rentData = this.apiService.getHome(this.rent_id);
    this.owner = this.apiService.getUsers()[this.rentData.fk_user_id - 1];
  }
}
