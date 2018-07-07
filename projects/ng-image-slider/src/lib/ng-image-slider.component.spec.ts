import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgImageSliderComponent } from './ng-image-slider.component';

describe('NgImageSliderComponent', () => {
  let component: NgImageSliderComponent;
  let fixture: ComponentFixture<NgImageSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgImageSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgImageSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
