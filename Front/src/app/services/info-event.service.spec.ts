import { TestBed } from '@angular/core/testing';

import { InfoEventService } from './info-event.service';

describe('InfoEventService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoEventService = TestBed.get(InfoEventService);
    expect(service).toBeTruthy();
  });
});
