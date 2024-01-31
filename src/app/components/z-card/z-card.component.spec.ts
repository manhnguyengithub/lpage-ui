import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZCardComponent } from './z-card.component';

describe('TemplateComponent', () => {
  let component: ZCardComponent;
  let fixture: ComponentFixture<ZCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZCardComponent]
    });
    fixture = TestBed.createComponent(ZCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
