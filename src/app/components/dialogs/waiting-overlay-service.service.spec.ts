import { TestBed, inject } from '@angular/core/testing';

import { WaitingOverlayServiceService } from './waiting-overlay-service.service';

describe('WaitingOverlayServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WaitingOverlayServiceService]
    });
  });

  it('should be created', inject([WaitingOverlayServiceService], (service: WaitingOverlayServiceService) => {
    expect(service).toBeTruthy();
  }));
});
