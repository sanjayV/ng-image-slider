import { TestBed, inject } from '@angular/core/testing';

import { NgImageSliderService } from './ng-image-slider.service';

describe('NgImageSliderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgImageSliderService]
    });
  });

  it('should be created', inject([NgImageSliderService], (service: NgImageSliderService) => {
    expect(service).toBeTruthy();
  }));
});
