import { TestBed, inject } from '@angular/core/testing';

import { PurchaseOrganizationService } from './purchase-organization.service';

describe('PurchaseOrganizationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseOrganizationService]
    });
  });

  it('should be created', inject([PurchaseOrganizationService], (service: PurchaseOrganizationService) => {
    expect(service).toBeTruthy();
  }));
});
