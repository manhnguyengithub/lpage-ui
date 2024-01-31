import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnMoneyComponent } from './return-money.component';

describe('TemplateComponent', () => {
  let component: ReturnMoneyComponent;
  let fixture: ComponentFixture<ReturnMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnMoneyComponent]
    });
    fixture = TestBed.createComponent(ReturnMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
