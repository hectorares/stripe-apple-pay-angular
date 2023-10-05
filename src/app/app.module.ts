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
    NgxStripeModule.forRoot('pk_test_51NuTQ5GuTV1P0VRgwOXKTafl5dyCQnNtvhnUl07pMIMzb4g8oLiTvSlhI72WYNmFtuPZ7ZZYp8zl7ozfcygqMiCS00R0gU4oPx'), // replace with your Stripe publishable key,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
