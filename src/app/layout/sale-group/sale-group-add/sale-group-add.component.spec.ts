import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleGroupAddComponent } from './sale-group-add.component';

describe('SaleGroupAddComponent', () => {
  let component: SaleGroupAddComponent;
  let fixture: ComponentFixture<SaleGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
