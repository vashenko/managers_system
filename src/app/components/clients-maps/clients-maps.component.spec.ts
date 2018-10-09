import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsMapsComponent } from './clients-maps.component';

describe('ClientsMapsComponent', () => {
  let component: ClientsMapsComponent;
  let fixture: ComponentFixture<ClientsMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
