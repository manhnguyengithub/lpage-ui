import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyFailComponent } from './notify-fail.component';

describe('HardNoticeComponent', () => {
  let component: NotifyFailComponent;
  let fixture: ComponentFixture<NotifyFailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifyFailComponent]
    });
    fixture = TestBed.createComponent(NotifyFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
