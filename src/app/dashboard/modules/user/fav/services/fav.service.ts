import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavService {
  constructor(private http: HttpClient) {}

  onAddFav(id: number): Observable<any> {
    return this.http.post('userRecipe', { recipeId: id });
  }

  onDeleteFav(id: number): Observable<any> {
    return this.http.delete(`userRecipe/${id}`);
  }

  onViewFav(myParams: any): Observable<any> {
    return this.http.get('userRecipe', { params: myParams });
  }
}
