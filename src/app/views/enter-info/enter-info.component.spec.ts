import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterInfoComponent } from './enter-info.component';

describe('EnterAddressComponent', () => {
  let component: EnterInfoComponent;
  let fixture: ComponentFixture<EnterInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterInfoComponent]
    });
    fixture = TestBed.createComponent(EnterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
