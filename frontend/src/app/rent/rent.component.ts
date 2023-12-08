import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [],
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss'
})
export class RentComponent implements OnInit {
  rent_id: number = -1;

  constructor() {
  }

  ngOnInit() {
    this.rent_id = parseInt(<string>window.location.href.split('/').pop());
  }
}
