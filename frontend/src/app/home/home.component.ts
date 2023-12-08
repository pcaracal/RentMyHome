import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

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
    image: string
  }[] = [];

  constructor() {
  }

  ngOnInit() {
    this.setHomes();
  }

  setHomes() {
    // TODO: Replace this with api call to backend for home info, for now its just cats
    const cats: number[] = [100, 101, 102, 200, 201, 202, 203, 204, 205, 207, 208, 226, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 406, 407, 408, 409, 410, 411, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 497, 498, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599];

    let index = 1;
    cats.forEach(cat => {
      this.homes.push({
        id: cat,
        name: 'Home ' + cat,
        price: cat * 1000,
        description: 'Home ' + cat + ' description',
        image: 'https://http.cat/' + cat + '.jpg',
      });

      index++;
    });
  }
}