import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGroupComponent } from './purchase-group.component';

describe('PurchaseGroupComponent', () => {
  let component: PurchaseGroupComponent;
  let fixture: ComponentFixture<PurchaseGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
