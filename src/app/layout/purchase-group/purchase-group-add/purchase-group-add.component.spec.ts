import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGroupAddComponent } from './purchase-group-add.component';

describe('PurchaseGroupAddComponent', () => {
  let component: PurchaseGroupAddComponent;
  let fixture: ComponentFixture<PurchaseGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
