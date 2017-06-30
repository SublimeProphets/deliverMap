import { TestBed, inject } from '@angular/core/testing';

import { GmcoordinatesService } from './gmcoordinates.service';

describe('GmcoordinatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmcoordinatesService]
    });
  });

  it('should be created', inject([GmcoordinatesService], (service: GmcoordinatesService) => {
    expect(service).toBeTruthy();
  }));
});
