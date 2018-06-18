import { TestBed, inject } from '@angular/core/testing';

import { AuthCrea911Service } from './auth-crea911.service';

describe('AuthCrea911Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCrea911Service]
    });
  });

  it('should be created', inject([AuthCrea911Service], (service: AuthCrea911Service) => {
    expect(service).toBeTruthy();
  }));
});
