import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentRequestComponent } from './stripe-payment-request.component';

describe('StripePaymentRequestComponent', () => {
  let component: StripePaymentRequestComponent;
  let fixture: ComponentFixture<StripePaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripePaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
