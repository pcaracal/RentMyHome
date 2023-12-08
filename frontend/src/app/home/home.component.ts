import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  homes: {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
    fk_user_id: number,
  }[] = [];

  users: {
    id: number,
    name: string
  }[] = [];

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
    this.users = this.apiService.getUsers();
    this.homes = this.apiService.getHomes();
  }


  selectHome(id: number) {
    this.router.navigate(['/rent', id]).then(r => console.log(r));
  }
}