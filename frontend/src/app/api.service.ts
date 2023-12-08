import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
  }

  getHomes() { // TODO: /api/homes
    // TODO: Replace this with api call to backend for home info, for now its just cats
    const cats: number[] = [100, 101, 102, 200, 201, 202, 203, 204, 205, 207, 208, 226, 300, 301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 406, 407, 408, 409, 410, 411, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 497, 498, 499, 500, 501, 502, 503, 504, 506, 507, 508, 509, 510, 511, 521, 522, 523, 525, 530, 599];

    let homes: any = [];

    let index = 1;
    cats.forEach(cat => {
      homes.push({
        id: index,
        name: 'Home ' + cat,
        price: cat,
        description: 'Home ' + cat + ' description',
        image: 'https://http.cat/' + cat + '.jpg',
        fk_user_id: this.getUsers()[index % 4].id
      });
      index++;
    });

    return homes;
  }

  getUsers() { // TODO: /api/users
    let users: any = [];

    const usernames: string[] = ["User1", "User2", "User3", "User4"];
    for (let i = 0; i < usernames.length; i++) {
      users.push({
        id: i + 1,
        name: usernames[i]
      });
    }

    return users;
  }
}