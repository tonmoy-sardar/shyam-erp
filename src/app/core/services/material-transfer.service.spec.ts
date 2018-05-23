import { TestBed, inject } from '@angular/core/testing';

import { MaterialTransferService } from './material-transfer.service';

describe('MaterialTransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialTransferService]
    });
  });

  it('should be created', inject([MaterialTransferService], (service: MaterialTransferService) => {
    expect(service).toBeTruthy();
  }));
});
