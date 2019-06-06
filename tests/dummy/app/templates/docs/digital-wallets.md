# Digital Wallets

Apple Pay, Google Pay, and Masterpass are all "digital wallets" which customers can
use to make payments on websites without using a number on their physical credit card.

This guide will walk you through how to use digital wallets with the Square Payment Form.

## Prerequisites

- You've installed the Square Payment Form Ember addon using the {{link-to "Get Started guide" "docs.get-started"}}
- You've set up a Square account and have access to your production application ID and location ID(s) in the [Square Developer Dashboard](https://connect.squareup.com/apps)
- You've enabled your Square account for credit card processing ([squareup.com/activate](https://squareup.com/activate))

### Additional requirements for Apple Pay

- **You're using the Safari browser**; other browsers do not support Apple Pay
- You've registered your domain for Apple Pay the [Square Developer Dashboard](https://connect.squareup.com/apps); if not, follow Step 1 from the [Apple Pay for Web documentation](https://docs.connect.squareup.com/payments/sqpaymentform/digitalwallet/applepay-setup#step-1-register-your-domain-with-apple) then come back here

## How digital wallets work with the Payment Form

The workflow for using a digital wallet is a simple, 5-step process:

1. Customer clicks a digital wallet button ("Pay with Apple Pay")
2. The Square Payment Form asks your application what items the customer is buying, and how much they cost.
3. The Square Payment Form tells the digital wallet to prompt the customer to pay for the given items.
4. Customer pays for the items using a digital wallet.
5. Square Payment Form generates a nonce and sends it to your application.

--------------------

You need to implement 2 callbacks to handle basic digital wallet usage:

- `createPaymentRequest`: called when the Square Payment Form asks what items the customer is buying
- `onCardNonceResponseReceived`: called when the Square Payment Form generates a nonce

## How to Implement Digital Wallets

We'll show how to implement digital wallets using our `payment-page` component
from the {{link-to "Get Started guide" "docs.get-started"}}. We already implemented
`onCardNonceResponseReceived`, so we'll focus on how to implement `createPaymentRequest`
here instead.

Here's our finished `payment-page.hbs` template file from the guide:

```hbs
<h3>Thank you for choosing Square's coffee house!</h3>
<p>Your total is <b>{{this.total}}</b>.</p>
{{square-payment-form-styled
  acceptCreditCards=true
  applicationId="my-app-id"
  locationId="my-location-id"
  onCardNonceResponseReceived=(action "handleCardNonceResponse")
}}
```

And here's our finished `payment-page.js` component JS file from the guide:

```js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    handleCardNonceResponse(errors, nonce) {
      if (errors && errors.length > 0) {
        alert('Error while processing credit card.');
      } else {
        alert('Got nonce: ' + nonce);
      }
    }
  }
});
```

### Implement the createPaymentRequest callback

The `createPaymentRequest` callback should return a JS object that
describes what the customer is buying and requests any info you want them to provide. The
callback provides no parameters and must return a payment request object that includes the
following properties:

- `countryCode` - 2-digit country code of the customer (ISO 3166-1), i.e. `US`
- `currencyCode` - 3-letter currency code (ISO 4217), i.e. `USD`
- `lineItems` - object with a `label` property that describes the item and `amount` that describes
  how much the item costs; i.e. `{ label: 'Subtotal', amount: '10.00' }`
- `total` - object with merchant name and total payment amount: `{ label: 'Merchant Name', amount: '10.00' }`

Let's add a simple `handleCreatePaymentRequest` implementation to our form:

```js
import Component from '@ember/component';

export default Component.extend({
  actions: {
    handleCardNonceResponse(errors, nonce) {
      if (errors && errors.length > 0) {
        alert('Error while processing credit card.');
      } else {
        alert('Got nonce: ' + nonce);
      }
    }
  },
  handleCreatePaymentRequest() {
    return {
      countryCode: "US",
      currencyCode: "USD",
      lineItems: [
        {
          label: "Subtotal",
          amount: "10.00"
        }
      ],
      total: {
        label: "Merchant Name",
        amount: "10.00",
        pending: false
      }
    }
  }
});
```

### Enable a digital wallet in your component

Now that we've made our callback, we can turn on digital wallets in our template
by setting any of the following properties to `true`:

- `acceptApplePay`
- `acceptGooglePay`
- `acceptMasterpass`

Let's turn on Google Pay by adding the `acceptGooglePay` property below:

```hbs
<h3>Thank you for choosing Square's coffee house!</h3>
<p>Your total is <b>{{this.total}}</b>.</p>
{{square-payment-form-styled
  acceptCreditCards=true
  acceptGooglePay=true
  applicationId="my-app-id"
  locationId="my-location-id"
  onCardNonceResponseReceived=(action "handleCardNonceResponse")
}}
```

...and that's all you need to do! Nonces can be handled exactly the same way they are
in the non-digital wallet implementation, so there's no extra server-side work you need to do.

### For custom forms

To use digital wallets inside a custom payment form, you simply pass the `createPaymentRequest`
and `onCardNonceResponseReceived` callbacks to the `SquarePaymentForm` component as actions instead
of the `SquarePaymentFormStyled` component, and use the yielded digital wallet buttons in your form.

The Square Payment Form Ember addon contains 3 components for digital wallets:

- `SquarePaymentFormApplePayButton`: yielded as `PaymentForm.ApplePayButton`
- `SquarePaymentFormGooglePayButton` : yielded as `PaymentForm.GooglePayButton`
- `SquarePaymentFormMasterpassButton`: yielded as `PaymentForm.MasterpassButton`

Each of them render a button for the digital wallet they're named after. Here's how you would implement
the template for Google Pay, for example:

```hbs
{{#square-payment-form
  applicationId="my-app-id"
  locationId="my-location-id"
  createPaymentRequest=(action "handleCreatePaymentRequest")
  onCardNonceResponseReceived=(action "handleCardNonceResponseReceived")
  as |PaymentForm|
}}
  {{PaymentForm.GooglePayButton}}
{{/square-payment-form}}
```

### More questions?

For more information about digital wallets and how to implement them with Square, check out
our [documentation](https://docs.connect.squareup.com/payments/sqpaymentform/what-it-does).