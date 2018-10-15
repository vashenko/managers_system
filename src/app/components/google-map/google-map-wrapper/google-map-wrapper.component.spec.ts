import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapWrapperComponent } from './google-map-wrapper.component';

describe('GoogleMapWrapperComponent', () => {
  let component: GoogleMapWrapperComponent;
  let fixture: ComponentFixture<GoogleMapWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleMapWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
