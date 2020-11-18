import { TestBed } from '@angular/core/testing';

import { UvasService } from './uvas.service';

describe('UvasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UvasService = TestBed.get(UvasService);
    expect(service).toBeTruthy();
  });
});
