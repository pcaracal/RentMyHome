import {Component, OnInit} from '@angular/core';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  rooms: {
    id: number,
    name: string,
    price: number,
    description: string,
    image: string,
    is_rented: boolean
  }[] = [];

  constructor(private router: Router, private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getRooms().pipe().subscribe(
      (data: any) => {
        this.rooms = data;
      },
      error => {
      },
      () => {
      }
    )
  }


  selectHome(id: number) {
    this.router.navigate(['/rent', id]).then(r => console.log(r));
  }
}