import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrganizationAddComponent } from './purchase-organization-add.component';

describe('PurchaseOrganizationAddComponent', () => {
  let component: PurchaseOrganizationAddComponent;
  let fixture: ComponentFixture<PurchaseOrganizationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrganizationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrganizationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
