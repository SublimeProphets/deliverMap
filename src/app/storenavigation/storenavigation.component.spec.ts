import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorenavigationComponent } from './storenavigation.component';

describe('StorenavigationComponent', () => {
  let component: StorenavigationComponent;
  let fixture: ComponentFixture<StorenavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorenavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorenavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
