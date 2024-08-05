import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable( {
  providedIn: 'root'
} )
export class CategoryService {

  constructor( private httpClient: HttpClient ) { }

  getAllCategories(myParams: any) {
    return this.httpClient.get( 'Category/',{params: myParams} );
  }

  getCategory( id: number ) {
    return this.httpClient.get( 'Category/' + id );
  }

  addCategory( data: any ) {
    return this.httpClient.post( 'Category/', data );
  }

  updateCategory( id: number, data: any ) {
    return this.httpClient.put( 'Category/' + id, data );
  }

  DeleteCategory( id: number, data: any ) {
    return this.httpClient.put( 'Category/' + id, data );
  }


}
