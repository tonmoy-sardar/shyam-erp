import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrganizationEditComponent } from './purchase-organization-edit.component';

describe('PurchaseOrganizationEditComponent', () => {
  let component: PurchaseOrganizationEditComponent;
  let fixture: ComponentFixture<PurchaseOrganizationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrganizationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrganizationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
