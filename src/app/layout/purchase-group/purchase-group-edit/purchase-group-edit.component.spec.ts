import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseGroupEditComponent } from './purchase-group-edit.component';

describe('PurchaseGroupEditComponent', () => {
  let component: PurchaseGroupEditComponent;
  let fixture: ComponentFixture<PurchaseGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
