import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionsListComponent } from './subdivisions-list.component';

describe('SubdivisionsListComponent', () => {
  let component: SubdivisionsListComponent;
  let fixture: ComponentFixture<SubdivisionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubdivisionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
