import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { StripeService } from 'ngx-stripe';
import {
  StripeElementsOptions,
  PaymentRequestPaymentMethodEvent,
  PaymentIntent,
  PaymentRequestShippingAddressEvent,
} from '@stripe/stripe-js';

@Component({
  selector: 'app-stripe-payment-request',
  templateUrl: './stripe-payment-request.component.html',
  styleUrls: ['./stripe-payment-request.component.css']
})
export class StripePaymentRequestComponent {
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
  paymentRequestOptions = {
    country: 'US',  
    currency: 'usd', 
    total: {
      label: 'Demo Total',
      amount: 25,  // Ensure this is in the smallest currency denomination (i.e., cents for USD)
    },
    requestPayerName: true,
    requestPayerEmail: true,
  };
  

  constructor(
    private http: HttpClient,
    private stripeService: StripeService
  ) { }

  onPaymentMethod(ev: PaymentRequestPaymentMethodEvent) {
    this.createPaymentIntent()
      .pipe(
        switchMap((pi) => {
          return this.stripeService
            .confirmCardPayment(
              pi.client_secret,
              { payment_method: ev.paymentMethod.id },
              { handleActions: false }
            )
            .pipe(
              switchMap((confirmResult) => {
                if (confirmResult.error) {
                  // Report to the browser that the payment failed,
                  // prompting it to re-show the payment interface,
                  // or show an error message and close the payment.
                  ev.complete('fail');
                  return of({
                    error: new Error('Error Confirming the payment'),
                  });
                } else {
                  // Report to the browser that the confirmation was
                  // successful, prompting it to close the browser
                  // payment method collection interface.
                  ev.complete('success');
                  // Let Stripe.js handle the rest of the payment flow.
                  return this.stripeService.confirmCardPayment(
                    pi.client_secret
                  );
                }
              })
            );
        })
      )
      .subscribe((result) => {
        if (result.error) {
          // The payment failed -- ask your customer for a new payment method.
        } else {
          // The payment has succeeded.
        }
      });
  }


  onShippingAddressChange(ev: PaymentRequestShippingAddressEvent) {
    alert('onShippingAddressChange');
    if (ev.shippingAddress.country !== 'US') {
      ev.updateWith({ status: 'invalid_shipping_address' });
    } else {
      // Replace this with your own custom implementation if needed
      fetch('/calculateShipping', {
        data: JSON.stringify({
          shippingAddress: ev.shippingAddress,
        }),
      } as any)
        .then((response) => response.json())
        .then((result) =>
          ev.updateWith({
            status: 'success',
            shippingOptions: result.supportedShippingOptions,
          })
        );
    }
  }

  createPaymentIntent(): Observable<PaymentIntent> {
    // Replace this with your own custom implementation
    // to perform a Payment Intent Creation
    // You will need your own Server to do that
    return this.http.post<PaymentIntent>(
      '/create-payment-intent',
      { amount: this.paymentRequestOptions.total.amount }
    );
  }

  onNotAvailable() {
    console.log('Payment Request (including Apple Pay) is not available');
  }
  
  
}
