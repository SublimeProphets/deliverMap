import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainnavigationComponent } from './mainnavigation.component';

describe('MainnavigationComponent', () => {
  let component: MainnavigationComponent;
  let fixture: ComponentFixture<MainnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
