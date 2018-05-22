import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageBinEditComponent } from './storage-bin-edit.component';

describe('StorageBinEditComponent', () => {
  let component: StorageBinEditComponent;
  let fixture: ComponentFixture<StorageBinEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageBinEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageBinEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
