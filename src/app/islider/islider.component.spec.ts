import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ISliderComponent } from './islider.component';

describe('ISliderComponent', () => {
  let component: ISliderComponent;
  let fixture: ComponentFixture<ISliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ISliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ISliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
