import { TestBed, inject } from '@angular/core/testing';

import { PurchaseGroupService } from './purchase-group.service';

describe('PurchaseGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseGroupService]
    });
  });

  it('should be created', inject([PurchaseGroupService], (service: PurchaseGroupService) => {
    expect(service).toBeTruthy();
  }));
});
