import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionsManagersComponent } from './subdivisions-managers.component';

describe('SubdivisionsManagersComponent', () => {
  let component: SubdivisionsManagersComponent;
  let fixture: ComponentFixture<SubdivisionsManagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivisionsManagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionsManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
