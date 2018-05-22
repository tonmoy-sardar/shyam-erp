import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrganizationMappingComponent } from './purchase-organization-mapping.component';

describe('PurchaseOrganizationMappingComponent', () => {
  let component: PurchaseOrganizationMappingComponent;
  let fixture: ComponentFixture<PurchaseOrganizationMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrganizationMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrganizationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
