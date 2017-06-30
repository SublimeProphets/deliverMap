import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfonavigationComponent } from './infonavigation.component';

describe('InfonavigationComponent', () => {
  let component: InfonavigationComponent;
  let fixture: ComponentFixture<InfonavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfonavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfonavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
