import { TestBed } from '@angular/core/testing';

import { HouseholdService } from './household.service';

describe('HouseholdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HouseholdService = TestBed.get(HouseholdService);
    expect(service).toBeTruthy();
  });
});
