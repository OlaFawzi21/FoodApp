import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  loading: boolean = false;

  constructor(
    private _loading: LoaderService
  ){ }

  ngOnInit() {
    this.listenToLoading();
  }

  
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
