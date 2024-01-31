import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopeeCardComponent } from './shopee-card.component';

describe('TemplateComponent', () => {
  let component: ShopeeCardComponent;
  let fixture: ComponentFixture<ShopeeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopeeCardComponent]
    });
    fixture = TestBed.createComponent(ShopeeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
