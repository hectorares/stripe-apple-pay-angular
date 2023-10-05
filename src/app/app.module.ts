import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { StripePaymentRequestComponent } from './stripe-payment-request/stripe-payment-request.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StripePaymentRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('YOUR_STRIPE_PUBLISHABLE_KEY'), // replace with your Stripe publishable key,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
