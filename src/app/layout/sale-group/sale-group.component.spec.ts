import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleGroupComponent } from './sale-group.component';

describe('SaleGroupComponent', () => {
  let component: SaleGroupComponent;
  let fixture: ComponentFixture<SaleGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
