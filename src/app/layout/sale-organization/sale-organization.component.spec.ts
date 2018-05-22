import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrganizationComponent } from './sale-organization.component';

describe('SaleOrganizationComponent', () => {
  let component: SaleOrganizationComponent;
  let fixture: ComponentFixture<SaleOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
