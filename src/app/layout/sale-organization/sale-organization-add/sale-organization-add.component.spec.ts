import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrganizationAddComponent } from './sale-organization-add.component';

describe('SaleOrganizationAddComponent', () => {
  let component: SaleOrganizationAddComponent;
  let fixture: ComponentFixture<SaleOrganizationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleOrganizationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleOrganizationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
