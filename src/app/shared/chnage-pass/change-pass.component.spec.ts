import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassComponent } from './change-pass.component';

describe('ChnagePassComponent', () => {
  let component: ChangePassComponent;
  let fixture: ComponentFixture<ChangePassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePassComponent],
    });
    fixture = TestBed.createComponent(ChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
