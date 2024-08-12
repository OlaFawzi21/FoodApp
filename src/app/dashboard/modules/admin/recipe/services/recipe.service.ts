import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

constructor(private httpClient:HttpClient) { }
getAllRecipe( myParams: any ): Observable<any> {
  return this.httpClient.get( 'Recipe/', { params: myParams } );
}

getRecipe( id: number ): Observable<any> {
  return this.httpClient.get( 'Recipe/' + id );
}

addRecipe( data: any ): Observable<any> {
  return this.httpClient.post( 'Recipe/', data );
}

updateRecipe( id: number, data: any ): Observable<any> {
  return this.httpClient.put( 'Recipe/' + id, data );
}

deleteRecipe( id: number): Observable<any> {
  return this.httpClient.delete( 'Recipe/' + id );
}

  allTag(): Observable<any> {
    return this.httpClient.get('tag/');
  }
}
