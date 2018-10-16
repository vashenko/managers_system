import { TestBed, inject } from '@angular/core/testing';

import { GoogleStreetViewService } from './google-street-view.service';

describe('GoogleStreetViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleStreetViewService]
    });
  });

  it('should be created', inject([GoogleStreetViewService], (service: GoogleStreetViewService) => {
    expect(service).toBeTruthy();
  }));
});
