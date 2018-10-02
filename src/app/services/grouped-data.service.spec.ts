import { TestBed, inject } from '@angular/core/testing';

import { GroupedDataService } from './grouped-data.service';

describe('GroupedDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupedDataService]
    });
  });

  it('should be created', inject([GroupedDataService], (service: GroupedDataService) => {
    expect(service).toBeTruthy();
  }));
});
