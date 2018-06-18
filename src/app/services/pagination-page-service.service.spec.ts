import { TestBed, inject } from '@angular/core/testing';

import { PaginationPageServiceService } from './pagination-page-service.service';

describe('PaginationPageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginationPageServiceService]
    });
  });

  it('should be created', inject([PaginationPageServiceService], (service: PaginationPageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
