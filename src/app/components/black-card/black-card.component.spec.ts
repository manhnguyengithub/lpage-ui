import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackCardComponent } from './black-card.component';

describe('TemplateComponent', () => {
  let component: BlackCardComponent;
  let fixture: ComponentFixture<BlackCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlackCardComponent]
    });
    fixture = TestBed.createComponent(BlackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
