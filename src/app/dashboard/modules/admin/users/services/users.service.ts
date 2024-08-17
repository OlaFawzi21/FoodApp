import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(myParams: any): Observable<any> {
    return this.httpClient.get('Users/', { params: myParams });
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete('Users/' + id);
  }
}
