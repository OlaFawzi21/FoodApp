import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CategoryService } from './../services/category.service';

@Component( {
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
} )
export class CategoriesComponent {

  data: any;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = false;
  disabled = false;

  pageEvent: PageEvent;

  constructor( private categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories({pageSize: 10 , pageNumber : 1}).subscribe( {
      next: ( res ) => {
        console.log( res );
        this.data = res;
      },
      error: ( err ) => { },
      complete: () => { }
    } );
  }



  handlePageEvent( e: PageEvent ) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions( setPageSizeOptionsInput: string ) {
    if ( setPageSizeOptionsInput ) {
      this.pageSizeOptions = setPageSizeOptionsInput.split( ',' ).map( str => +str );
    }
  }
}
