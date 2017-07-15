import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSetStarredComponent } from './client-set-starred.component';

describe('ClientSetStarredComponent', () => {
  let component: ClientSetStarredComponent;
  let fixture: ComponentFixture<ClientSetStarredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSetStarredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSetStarredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
