import { TestBed } from '@angular/core/testing';

import { CheckOutFormServiceService } from './check-out-form-service.service';

describe('CheckOutFormServiceService', () => {
  let service: CheckOutFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOutFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
