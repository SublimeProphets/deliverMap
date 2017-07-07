import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTableListComponent } from './clients-table-list.component';

describe('ClientsTableListComponent', () => {
  let component: ClientsTableListComponent;
  let fixture: ComponentFixture<ClientsTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
