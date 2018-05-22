import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageBinAddComponent } from './storage-bin-add.component';

describe('StorageBinAddComponent', () => {
  let component: StorageBinAddComponent;
  let fixture: ComponentFixture<StorageBinAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageBinAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageBinAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
