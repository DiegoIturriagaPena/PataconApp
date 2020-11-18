import { TestBed } from '@angular/core/testing';

import { LstorageService } from './lstorage.service';

describe('LstorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LstorageService = TestBed.get(LstorageService);
    expect(service).toBeTruthy();
  });
});
