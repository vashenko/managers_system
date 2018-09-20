import { TestBed, inject } from '@angular/core/testing';

import { DateServiceService } from './date-service.service';

describe('DateServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateServiceService]
    });
  });

  it('should be created', inject([DateServiceService], (service: DateServiceService) => {
    expect(service).toBeTruthy();
  }));
});
