# Introduction

The Square Payment Form Ember addon lets you take payments securely and easily
in your Ember app using a familiar, component-based syntax.

*Note: this SDK is in beta. We'll be improving it as we work towards GA - please
leave feedback for our team!*

<div class="form-wrapper">
  {{square-payment-form-styled
    acceptCreditCards=true
    applicationId="square-app-id"
    locationId="square-location-id"
    onCardNonceResponseReceived=(action (mut response))
  }}
</div>

## Taking a Payment With Square

Taking online payments with Square is a 2-step process:

1. **Securely collect credit card information** using the Square Payment Form to generate a *nonce* (unique, PCI-compliant identifier for credit cards)
2. **Call Square's "Charge" endpoint** with an amount and nonce on your backend server

...and that's it!

Implementing Square Payment Form Ember addon will complete step 1. After you can generate a nonce in your Ember app,
you'll need to implement the server-side component to charge customers. You can read the [Transactions API Setup Guide](https://docs.connect.squareup.com/payments/transactions/setup) to learn how to do step 2.

## Prerequisites

To get started with the Square Payment Form, you need to do the following:

- [Create a Square Developer account](https://connect.squareup.com/apps)
- [Create an application](https://connect.squareup.com/apps/new)  and agree to our [developer terms of service](https://squareup.com/us/en/legal/general/developers)
- Get an application ID and location ID from your application to develop with

## Sandbox Support

**Sandbox is currently supported for credit card-only forms, but not for digital wallets.**

If you try to enable digital wallets while developing on localhost and / or using
sandbox credentials, the buttons to use them will be hidden. You can read more about
how to enable / test digital wallets in the digital wallets guide.

## Let's Get Started!

Start with our [Getting Started guide](/docs/get-started) to start generating nonces you can use to
charge customers.

Take a look at our examples for inspiration:

- [Styled Payment Form - Light Theme](/examples/light)
- [Styled Payment Form - Dark Theme](/examples/dark)
- [Unstyled Payment Form](/examples/unstyled)
