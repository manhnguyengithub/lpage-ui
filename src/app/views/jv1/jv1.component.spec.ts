import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jv1Component } from './jv1.component';

describe('Jv1Component', () => {
  let component: Jv1Component;
  let fixture: ComponentFixture<Jv1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Jv1Component]
    });
    fixture = TestBed.createComponent(Jv1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
