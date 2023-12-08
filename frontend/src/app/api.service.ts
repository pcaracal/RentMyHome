import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  getRooms() { // TODO: /api/homes
    // TODO: Replace this with api call to backend for home info, for now its just cats
    const cats: number[] = [100, 101, 102, 200, 201];

    let rooms: any = [];

    for (let i = 1; i <= 5; i++) {
      rooms.push(this.getRoom(i));
    }


    return rooms;
  }

  getRoom(id: number) {// TODO: /api/room/:id
    switch (id) {
      case 1:
        return {
          id: 1,
          name: 'Room 1',
          price: 100,
          description: 'Room 1 description',
          image: 'https://http.cat/100.jpg',
          is_rented: false
        };
      case 2:
        return {
          id: 2,
          name: 'Room 2',
          price: 200,
          description: 'Room 2 description',
          image: 'https://http.cat/101.jpg',
          is_rented: true
        };
      case 3:
        return {
          id: 3,
          name: 'Room 3',
          price: 300,
          description: 'Room 3 description',
          image: 'https://http.cat/102.jpg',
          is_rented: false
        };
      case 4:
        return {
          id: 4,
          name: 'Room 4',
          price: 400,
          description: 'Room 4 description',
          image: 'https://http.cat/200.jpg',
          is_rented: true
        };
      case 5:
        return {
          id: 5,
          name: 'Room 5',
          price: 500,
          description: 'Room 5 description',
          image: 'https://http.cat/201.jpg',
          is_rented: false
        };
      default:
        return {
          id: -1,
          name: 'Room 0',
          price: 0,
          description: 'Room 0 description',
          image: 'https://http.cat/404.jpg',
          is_rented: true
        };
    }

  }
}