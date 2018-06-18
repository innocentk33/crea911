import { TestBed, inject } from '@angular/core/testing';

import { AuthCreatifServiceService } from './auth-creatif-service.service';

describe('AuthCreatifServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCreatifServiceService]
    });
  });

  it('should be created', inject([AuthCreatifServiceService], (service: AuthCreatifServiceService) => {
    expect(service).toBeTruthy();
  }));
});
