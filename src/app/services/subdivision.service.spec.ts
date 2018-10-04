import { TestBed, inject } from '@angular/core/testing';

import { SubdivisionService } from './subdivision.service';

describe('SubdivisionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubdivisionService]
    });
  });

  it('should be created', inject([SubdivisionService], (service: SubdivisionService) => {
    expect(service).toBeTruthy();
  }));
});
