import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrganizationComponent } from './purchase-organization.component';

describe('PurchaseOrganizationComponent', () => {
  let component: PurchaseOrganizationComponent;
  let fixture: ComponentFixture<PurchaseOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
