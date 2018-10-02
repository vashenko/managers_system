import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionTableComponent } from './direction-table.component';

describe('DirectionTableComponent', () => {
  let component: DirectionTableComponent;
  let fixture: ComponentFixture<DirectionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
