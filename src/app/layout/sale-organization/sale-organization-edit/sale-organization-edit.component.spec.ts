import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrganizationEditComponent } from './sale-organization-edit.component';

describe('SaleOrganizationEditComponent', () => {
  let component: SaleOrganizationEditComponent;
  let fixture: ComponentFixture<SaleOrganizationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleOrganizationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrganizationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
