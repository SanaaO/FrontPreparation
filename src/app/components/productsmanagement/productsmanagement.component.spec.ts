import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsmanagementComponent } from './productsmanagement.component';

describe('ProductsmanagementComponent', () => {
  let component: ProductsmanagementComponent;
  let fixture: ComponentFixture<ProductsmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsmanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
