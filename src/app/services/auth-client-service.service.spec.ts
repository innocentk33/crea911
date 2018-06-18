import { TestBed, inject } from '@angular/core/testing';

import { AuthClientServiceService } from './auth-client-service.service';

describe('AuthClientServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthClientServiceService]
    });
  });

  it('should be created', inject([AuthClientServiceService], (service: AuthClientServiceService) => {
    expect(service).toBeTruthy();
  }));
});
