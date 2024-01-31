import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IphonePopUpComponent } from './iphone-pop-up.component';

describe('TemplateComponent', () => {
  let component: IphonePopUpComponent;
  let fixture: ComponentFixture<IphonePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IphonePopUpComponent]
    });
    fixture = TestBed.createComponent(IphonePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
