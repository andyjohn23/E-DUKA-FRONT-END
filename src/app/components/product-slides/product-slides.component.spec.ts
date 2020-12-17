import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSlidesComponent } from './product-slides.component';

describe('ProductSlidesComponent', () => {
  let component: ProductSlidesComponent;
  let fixture: ComponentFixture<ProductSlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSlidesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
