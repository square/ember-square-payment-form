# Quickstart

In this guide, we'll build a basic payment form, like the one shown here:

<div class="form-wrapper">
  <h3>Thanks for choosing Square's Coffee House!</h3>
  <p>Your total is <b>$20.00</b>.</p>
  {{square-payment-form-styled
    acceptCreditCards=true
    applicationId="square-app-id"
    locationId="square-location-id"
    onCardNonceResponseReceived=(action (mut response))
  }}
</div>

## Install the Addon

```sh
ember install ember-square-payment-form
```

*If you're using Yarn, add `yarn` before `ember install` to use your project's version of
Ember CLI instead of the global:*

```sh
yarn ember install ember-square-payment-form
```

## Get your Application ID & Location ID

To use the Square Payment Form, you need an application ID and a location ID:

- The **application ID** tells us which developer is using the form the take payments.
- The **location ID** tells us which merchant location should receive payments accepted
by the form.

Here's how you get them:

1. Launch your [Square Developer Dashboard](https://connect.squareup.com/apps)
2. Create a new application, or open an existing application
3. Copy your *sandbox* application ID at the bottom of the Credentials page.
4. Open the Locations tab of your application
5. Copy a *sandbox* location ID at the bottom of the page.

## Add a Component for your Payment Page

Let's make a component for our payment page. We want for it to:

- Show our company name
- Show the customer how much money they're about to spend
- Show the payment form

### Generate a new component with Ember CLI

```sh
ember g component payment-page
```

*or, if you're using Yarn:*

```sh
yarn ember g component payment-page
```

### Customize the component

In the `payment-page` Handlebars file, let's add some content:

```hbs
<h3>Thank you for choosing Square's coffee house!</h3>
<p>Your total is <b>{{this.total}}</b>.</p>
```

## Add the Square Payment Form

Now that we have a component for our payment page, let's add the
Square Payment Form to it so that we can take a payment.

### Add the SquarePaymentFormStyled component

Let's add the `SquarePaymentFormStyled` component to our Handlebars file
so we can get a nicely styled form out-of-the-box.

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

### Set up the card nonce callback

In your payment-page component's Javascript file, it should look something
like this currently:

```js
import Component from '@ember/component';

export default Component.extend({

});
```

Let's add a new action, `handleCardNonceResponse`, to match our reference
to it in the Handlebars file.

The action should alert the customer if their credit card information is
wrong, or send the nonce to your server to call Square's charge endpoint
if the card information is valid.

For quickstart purposes, we're just going to show that we received a nonce.

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

...and you're done!

## Next Steps

You can now get a nonce with the Square Payment Form and use to charge a customer. Now, you'll
need to implement the server-side component with the [Transactions API Setup Guide](https://docs.connect.squareup.com/payments/transactions/setup).

If you want to use Apple Pay, Google Pay, or Masterpass, check out the {{link-to "Digital Wallets guide" "docs.digital-wallets"}}.