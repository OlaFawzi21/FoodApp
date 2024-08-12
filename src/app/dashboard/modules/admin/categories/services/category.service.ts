import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class CategoryService {

  constructor( private httpClient: HttpClient ) { }

  getAllCategories( myParams: any ): Observable<any> {
    return this.httpClient.get( 'Category/', { params: myParams } );
  }

  getCategory( id: number ): Observable<any> {
    return this.httpClient.get( 'Category/' + id );
  }

  addCategory( data: any ): Observable<any> {
    return this.httpClient.post( 'Category/', data );
  }

  updateCategory( id: number, data: any ): Observable<any> {
    return this.httpClient.put( 'Category/' + id, data );
  }

  deleteCategory( id: number): Observable<any> {
    return this.httpClient.delete( 'Category/' + id );
  }


}
