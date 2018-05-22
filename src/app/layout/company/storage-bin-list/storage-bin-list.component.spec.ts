import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageBinListComponent } from './storage-bin-list.component';

describe('StorageBinListComponent', () => {
  let component: StorageBinListComponent;
  let fixture: ComponentFixture<StorageBinListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageBinListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageBinListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
