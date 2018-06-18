import { TestBed, inject } from '@angular/core/testing';

import { ApiServicesCrea911Service } from './api-services-crea911.service';

describe('ApiServicesCrea911Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiServicesCrea911Service]
    });
  });

  it('should be created', inject([ApiServicesCrea911Service], (service: ApiServicesCrea911Service) => {
    expect(service).toBeTruthy();
  }));
});
