import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableViewComponent } from './data-table-view.component';

describe('DataTableViewComponent', () => {
  let component: DataTableViewComponent;
  let fixture: ComponentFixture<DataTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
