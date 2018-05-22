import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleGroupEditComponent } from './sale-group-edit.component';

describe('SaleGroupEditComponent', () => {
  let component: SaleGroupEditComponent;
  let fixture: ComponentFixture<SaleGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
