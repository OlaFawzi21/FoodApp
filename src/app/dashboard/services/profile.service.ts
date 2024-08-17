import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<any> {
    return this.http.get('Users/currentUser/');
  }

  updateCurrentUser(data: FormData): Observable<any> {
    return this.http.put('Users/', data);
  }
}
