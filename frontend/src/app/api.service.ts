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
          image: 'https://http.cat/100.jpg'
        };
      case 2:
        return {
          id: 2,
          name: 'Room 2',
          price: 200,
          description: 'Room 2 description',
          image: 'https://http.cat/101.jpg'
        };
      case 3:
        return {
          id: 3,
          name: 'Room 3',
          price: 300,
          description: 'Room 3 description',
          image: 'https://http.cat/102.jpg'
        };
      case 4:
        return {
          id: 4,
          name: 'Room 4',
          price: 400,
          description: 'Room 4 description',
          image: 'https://http.cat/200.jpg'
        };
      case 5:
        return {
          id: 5,
          name: 'Room 5',
          price: 500,
          description: 'Room 5 description',
          image: 'https://http.cat/201.jpg'
        };
      default:
        return {
          id: -1,
          name: 'Room not found.',
          price: -1,
          description: '-',
          image: 'https://http.cat/404.jpg'
        };
    }
  }

  getBookings(id: number) { // TODO: /api/bookings
    switch (id) {
      case 1:
        return [
          {
            id: 1,
            fk_room_id: 1,
            fk_user_id: 1,
            start_date: '2023-12-01',
            end_date: '2023-12-02',
          },
          {
            id: 2,
            fk_room_id: 1,
            fk_user_id: 1,
            start_date: '2023-12-04',
            end_date: '2023-12-18',
          }
        ];
      case 2:
        return [
          {
            id: 3,
            fk_room_id: 2,
            fk_user_id: 1,
            start_date: '2023-12-01',
            end_date: '2023-12-02',
          },
          {
            id: 4,
            fk_room_id: 2,
            fk_user_id: 1,
            start_date: '2023-12-04',
            end_date: '2023-12-10',
          }
        ];
      case 3:
        return [
          {
            id: 5,
            fk_room_id: 3,
            fk_user_id: 1,
            start_date: '2023-12-01',
            end_date: '2023-12-02',
          },
          {
            id: 6,
            fk_room_id: 3,
            fk_user_id: 1,
            start_date: '2023-12-04',
            end_date: '2023-12-10',
          }
        ];
      case 4:
        return [
          {
            id: 7,
            fk_room_id: 4,
            fk_user_id: 1,
            start_date: '2023-12-01',
            end_date: '2023-12-02',
          },
          {
            id: 8,
            fk_room_id: 4,
            fk_user_id: 1,
            start_date: '2023-12-04',
            end_date: '2023-12-10',
          }
        ];
      case 5:
        return [
          {
            id: 9,
            fk_room_id: 5,
            fk_user_id: 1,
            start_date: '2023-12-01',
            end_date: '2023-12-02',
          },
          {
            id: 10,
            fk_room_id: 5,
            fk_user_id: 1,
            start_date: '2023-12-04',
            end_date: '2023-12-10',
          }
        ];
      default:
        return []
    }
  }
}