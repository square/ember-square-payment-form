import Component from '@ember/component';
import { scheduleOnce } from '@ember/runloop';
import randomId from '../utils/random-id';
import template from '../templates/components/square-payment-form';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';

/**
 * Creates a Square Payment Form and yields form inputs to use inside of it.
 *
 * This component requires 3 arguments for basic use:
 * - **applicationId:** This can be found in your [Square Developer Dashboard](https://connect.squareup.com/apps)
 *  for the current Square app you're developing
 * - **locationId:** You can retrieve this from the [Square Connect v2 Locations API](https://docs.connect.squareupstaging.com/api/connect/v2#navsection-locations);
 *  or your [Square Developer Dashboard](https://connect.squareup.com/apps). It determines which Square location
 *  will receive credit for transactions made with this form.
 * - **onCardNonceResponseReceived:** This callback gives you a nonce to pass to your back-end server to make
 *   a "charge" request to Square.
 *
 * ..and one additional argument for digital wallets:
 *
 * - **createPaymentRequest:** This callback returns data to show information about the payment in the
 *   Apple Pay, Google Pay, and Masterpass interfaces.
 *
 * This is a basic usage of the form, without digital wallets:
 *
 * ```hbs
 * {{#square-payment-form
 *   applicationId="square-app-id"
 *   locationId="square-location-id"
 *   onCardNonceResponseReceived=(action "handleCardNonceRespone")
 *   as |PaymentForm|
 * }}
 *   {{#PaymentForm.CreditCardFields as |Fields|}}
 *     <div>
 *       <label>Card Number</label>
 *       {{Fields.NumberInput}}
 *     </div>
 *     <div>
 *       <label>Expiration</label>
 *       {{Fields.ExpirationDateInput}}
 *     </div>
 *     <div>
 *       <label>CVV</label>
 *       {{Fields.CvvInput}}
 *     </div>
 *     <div>
 *       <label>Postal</label>
 *       {{Fields.PostalCodeInput}}
 *     </div>
 *   {{/PaymentForm.CreditCardFields}}
 * {{/square-payment-form}}
 * ```
 *
 * You can see the other docs pages in the project for examples using digital wallets (Apple Pay, Google May, Masterpass).
 *
 * @class SquarePaymentForm
 * @yield {Hash} PaymentForm
 * @yield {SquarePaymentFormApplePayButton} PaymentForm.ApplePayButton
 * @yield {SquarePaymentFormCreditCardFields} PaymentForm.CreditCardFields
 * @yield {SquarePaymentFormGooglePayButton} PaymentForm.GooglePayButton
 * @yield {SquarePaymentFormMasterpassButton} PaymentForm.MasterpassButton
 * @yield {boolean} PaymentForm.canShowApplePay
 * @yield {boolean} PaymentForm.canShowDigitalWallets
 * @yield {boolean} PaymentForm.canShowMasterpass
 * @yield {Action} PaymentForm.requestCardNonce
 */
export default Component.extend({
  layout: template,

  // REQUIRED PARAMETERS

  /**
   * **Required**: ID of your Square application, found in the [Square Developer Dashboard](https://connect.squareup.com/apps).
   *
   * @argument applicationId
   * @type String
   * @required
   */
  applicationId: null,

  /**
   * **Required**: ID of the Square location transactions made with this form should be
   * attributed to; you can find this in the locations tab of your app on the
   * [Square Developer Dashboard](https://connect.squareup.com/apps).
   *
   * @argument locationId
   * @type String
   * @required
   */
  locationId: null,

  // OPTIONAL PARAMETERS

  /**
   * Class to add to all Payment Form input wrappers; default is "sq-input"
   *
   * @argument inputClass
   * @type String
   * @default square-payment-form-input
   */
  inputClass: 'square-payment-form-input',

  /**
   * An array CSS styles formatted as JS objects, where the styles at the
   * end of the array take precedence over the styles at the beginning.
   *
   * These styles are passed in at the form level because Square has to insert
   * them into the secure iframes that become form inputs, and normal CSS styling
   * can't apply.
   *
   * The following example value shows the set of properties you can use on each style object:
   *
   * ```js
   * [
   *  {
   *    backgroundColor: 'transparent', // input background-color
   *    boxShadow: '0px 0px rgba(0, 0, 0, 0.2)', // input box-shadow
   *    color: '#373F4A', // input color
   *    fontFamily: 'Helvetica', // input font-family
   *    fontSize: '24px', // input font-size
   *    fontWeight: '400', // input font-weight
   *    lineHeight: '32px', // input line-height
   *    padding: '8px', // input padding
   *
   *    placeholderColor: '#777', // placeholder color
   *    placeholderFontWeight: '400', // placeholder font-weight
   *
   *    // The following properties act as a CSS media query, allowing you to set
   *    // breakpoints based on the width of the viewport.
   *    mediaMaxWidth: '0px' // max. viewport width for styles to apply (default: infinite)
   *    mediaMinWidth: '0px' // min. viewport width for styles to apply (default: 0px)
   *  }
   * ]
   * ```
   *
   * You can also view the set of permitted styles on
   * [Square's technical reference](https://docs.connect.squareup.com/api/paymentform#datatype-inputstyleobjects).
   *
   * @argument inputStyles
   * @type Object
   */
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  inputStyles: [
    {
      fontSize: '16px',
      fontFamily: '"Helvetica Neue", "Helvetica", sans-serif',
      padding: '16px',
      color: '#373F4A',
      backgroundColor: 'transparent',
      lineHeight: '24px',
      placeholderColor: '#CCC',
      _webkitFontSmoothing: 'antialiased',
      _mozOsxFontSmoothing: 'grayscale'
    }
  ],

  /**
   * **Required**: callback that gets fired when a nonce is received from the SqPaymentForm JS library.
   * You can then pass this nonce to a your back-end server to make a "charge" request to Square.
   *
   * **Example**: Sample function to send the nonce to your server.
   *
   * ```js
   * (errors, nonce, cardData, billingContact, shippingContact, shippingOption) => {
    *   if (errors && errors.length > 0) {
    *     return alert('Error while processing credit card.');
    *   }
    *
    *   // Send nonce to your server
    *   fetch('https://example.com/charge', {
    *     body: JSON.stringify({ nonce }),
    *     method: 'POST'
    *   });
    * }
    * ```
   *
   * **Method Signature**
   *
   * Example:
   *
   * ```js
   * function(errors, nonce, cardData, billingContact, shippingContact, shippingOption) {
   *   // Handle callback
   * }
   * ```
   *
   * Schema:
   *
   * | Parameter         | Type           | Description                                                |
   * | ----------------- | -------------- | ---------------------------------------------------------- |
   * | `errors`          | Error[]        | An array of errors. Empty if nonce request succeeded.      |
   * | `nonce`           | string         | Nonce to send to back-end server to make charge request    |
   * | `cardData`        | CardData       | Basic credit card data, such as brand, last 4 digits, etc. |
   * | `billingContact`  | Contact        | Digital wallets only. Billing address / info for customer  |
   * | `shippingContact` | Contact        | Digital wallets only. Shipping address / info for customer |
   * | `shippingOption`  | ShippingOption | Apple Pay only. Shipping option selected by customer       |
   *
   * **Error Object**
   *
   * | Property  | Type   | Description                                                |
   * | --------- | ------ | ---------------------------------------------------------- |
   * | `field`   | string | An array of errors. Empty if nonce request succeeded.      |
   * | `message` | string | Nonce to send to back-end server to make charge request    |
   * | `type`    | string | Basic credit card data, such as brand, last 4 digits, etc. |
   *
   * **Error Types**
   *
   * | Error Type               | Description
   * | ------------------------ | ------------------------------------------------------------------------------------- |
   * | `INVALID_APPLICATION_ID` | The application ID provided when initializing the payment form is invalid             |
   * | `MISSING_APPLICATION_ID` | An application ID was not provided when initializing the payment form                 |
   * | `MISSING_CARD_DATA`      | One or more card data fields was not filled out in the payment form                   |
   * | `TOO_MANY_REQUESTS`      | Your application has generated too many nonce generation requests in too short a time |
   * | `UNAUTHORIZED`           | Your application is not authorized to use the Connect API to accept online payments   |
   * | `UNSUPPORTED_CARD_BRAND` | Card is not supported                                                                 |
   * | `UNKNOWN`                | An unknown error occurred                                                             |
   * | `VALIDATION_ERROR`       | The provided data is invalid                                                          |
   *
   * **Error Fields**
   *
   * Two errors can be associated with a particular field:
   *
   * - `UNSUPPORTED_CARD_BRAND` (`cardNumber`)
   * - `VALIDATION_ERROR` (`cardNumber`, `cvv`, `expirationDate`, or `cvv`)
   *
   * If the error can be associated with a field, it will be one of these values, as
   * listed above:
   *
   * - `cardNumber`: Credit card number is not valid
   * - `expirationDate`: Expiration date is not valid
   * - `postalCode`: Expiration date is not valid
   * - `cvv`: CVV is not valid
   *
   * **Contact Object (Digital Wallets Only)**
   *
   * | Property       | Type     | Description                                                                         |
   * | -------------- | -------- | ----------------------------------------------------------------------------------- |
   * | `familyName`   | string   | Last name of the contact                                                            |
   * | `givenName`    | string   | First name of the contact                                                           |
   * | `email`        | string   | Email address of the contact                                                        |
   * | `country`      | string   | A 2-letter string containing the ISO 3166-1 country code of the contact address     |
   * | `countryName`  | string   | The full country name of the contact. Read only.                                    |
   * | `region`       | string   | The applicable administrative region (e.g., province, state) of the contact address |
   * | `city`         | string   | The city name of the contact address                                                |
   * | `addressLines` | string[] | The street address lines of the contact address                                     |
   * | `postalCode`   | string   | The postal code of the contact address                                              |
   * | `phone`        | string   | The telephone number of the contact                                                 |
   *
   * **Shipping Option Object (Apple Pay Only)**
   *
   * | Name   | Type   | Description                                                                                     |
   * | ------ | ------ | ----------------------------------------------------------------------------------------------- |
   * | id     | string | A unique ID to reference this shipping option                                                   |
   * | label  | string | A short title for this shipping option. Shown in the Apple Pay interface                        |
   * | amount | string | The cost of this shipping option as a string representation of a float. The value can be "0.00" |
   *
   * @argument onCardNonceResponseReceived
   * @type Action
   * @required
   */
  onCardNonceResponseReceived: null,

  /**
   * **Required for Digital Wallets**: callback that gets fired when a digital wallet button is pressed.
   * This callback returns data to show information about the payment in the Apple Pay, Google Pay,
   * and Masterpass interfaces.
   *
   * This method **must** return a `PaymentRequest` object.
   *
   * **Example**: Sample function to create a payment request.
   *
   * ```js
   * function() {
   *   return {
   *     requestShippingAddress: true,
   *     requestBillingInfo: true,
   *     shippingContact: {
   *       familyName: "CUSTOMER LAST NAME",
   *       givenName: "CUSTOMER FIRST NAME",
   *       email: "mycustomer@example.com",
   *       country: "USA",
   *       region: "CA",
   *       city: "San Francisco",
   *       addressLines: [
   *         "1455 Market St #600"
   *       ],
   *       postalCode: "94103"
   *     },
   *     currencyCode: "USD",
   *     countryCode: "US",
   *     total: {
   *       label: "MERCHANT NAME",
   *       amount: "TOTAL AMOUNT",
   *       pending: false
   *     },
   *     lineItems: [
   *       {
   *         label: "Subtotal",
   *         amount: "SUBTOTAL AMOUNT",
   *         pending: false
   *       },
   *       {
   *         label: "Shipping",
   *         amount: "SHIPPING AMOUNT",
   *         pending: true
   *       },
   *       {
   *         label: "Tax",
   *         amount: "TAX AMOUNT",
   *         pending: false
   *       }
   *     ]
   *   }
   * }
   * ```
   *
   * **Payment Request Object (Digital Wallets Only)**
   *
   * | Property                 | Type       | Description                                                                                         |
   * | ------------------------ | ---------- | --------------------------------------------------------------------------------------------------- |
   * | `requestShippingAddress` |	boolean    | Lets customers select a shipping address in the digital wallet UI.                                  |
   * | `requestBillingInfo`     | boolean    | Lets customers select a billing address in the digital wallet UI.                                   |
   * | `shippingContact`        | Contact    | Optional. Default shipping information to display in the digital wallet UI.                         |
   * | `countryCode`            | string     | 2-letter ISO 3166-1 alpha-2 country code                                                            |
   * | `currencyCode`           | string     | 3-letter ISO 4217 currency code                                                                     |
   * | `lineItems`              | LineItem[] | List of items included in the transaction. Typically displayed in digital wallet UI.                |
   * | `total`                  | LineItem   | Merchant name, status, and total cost of the transaction. Typically displayed in digital wallet UI. |
   *
   * **Contact Object (Digital Wallets Only)**
   *
   * | Property       | Type     | Description                                                                         |
   * | -------------- | -------- | ----------------------------------------------------------------------------------- |
   * | `familyName`   | string   | Last name of the contact                                                            |
   * | `givenName`    | string   | First name of the contact                                                           |
   * | `email`        | string   | Email address of the contact                                                        |
   * | `country`      | string   | A 2-letter string containing the ISO 3166-1 country code of the contact address     |
   * | `countryName`  | string   | The full country name of the contact. Read only.                                    |
   * | `region`       | string   | The applicable administrative region (e.g., province, state) of the contact address |
   * | `city`         | string   | The city name of the contact address                                                |
   * | `addressLines` | string[] | The street address lines of the contact address                                     |
   * | `postalCode`   | string   | The postal code of the contact address                                              |
   * | `phone`        | string   | The telephone number of the contact                                                 |
   *
   * **Line Item Object (Digital Wallets Only)**
   *
   * | Name    | Type    | Description |
   * | ------- | ------- | ----------- |
   * | label   | string  | Human-readable string that explains the purpose of the amount. For a line item, this is typically the name of the charge or object purchased. For the total field, this is typically the merchant name. |
   * | amount  | string  | The cost of the object as a string representation of a float with 2 decimal places. (e.g., "15.00"). For a line item, this is typically the cost of the object, a subtotal, or additional charge (e.g., taxes, shipping). For the total field, this is the total charge of the transaction and should equal the sum of the line item amounts. |
   * | pending | boolean | Optional. A boolean indicating whether or not the value in the amount field represents an estimated or unknown cost. Typically, this field is false. |
   *
   * @argument createPaymentRequest
   * @type Action
   */
  createPaymentRequest: null,

  /**
   * Callback that gets fired when a customer selects a new shipping address in a Apple Pay.
   *
   * Use this callback to validate a the buyer shipping contact. If validation indicates a problem, return
   * an error message for the buyer. Update payment request details if a change in shipping address requires it.
   *
   * You **must** call `done` when using this callback.
   *
   * **Example**
   *
   * ```js
   * function (shippingContact, done) {
   *  var valid = true;
   *  var shippingErrors = {};
   *
   *  if (!shippingContact.postalCode) {
   *    shippingErrors.postalCode = "postal code is required";
   *    valid = false;
   *  }
   *  if (!shippingContact.addressLines) {
   *    shippingErrors.addressLines = "address lines are required";
   *    valid = false;
   *  }
   *
   *  if (!valid) {
   *    done({shippingContactErrors: shippingErrors});
   *    return;
   *  }
   *
   *  // Shipping address unserviceable.
   *  if (shippingContact.country !== 'US' || shippingContact.country !== 'CA') {
   *    done({error: 'Shipping to outside of the U.S. and Canada is not available.'});
   *    return;
   *  }
   *
   *  // Update total, lineItems, and shippingOptions for Canadian address.
   *  if (shippingContact.country === 'CA') {
   *    done({
   *      total: {
   *        label: "Total",
   *        amount: "UPDATED AMOUNT",
   *        pending: false
   *      },
   *     // Note: lineItems REPLACES the set of the line items in the PaymentRequest
   *      lineItems: [
   *        ...
   *
   *        {
   *          label: "Tax",
   *          amount: "UPDATED AMOUNT",
   *          pending: false
   *        }
   *      ],
   *      shippingOptions: [
   *        {
   *          id: "1",
   *          label: "SHIPPING LABEL",
   *          amount: "SHIPPING AMOUNT"
   *        }
   *      ]
   *    });
   *    return;
   *  }
   *
   *  // No changes are necessary.
   *  done();
   * }
   * ```
   *
   * **Parameters**
   *
   * | Name              | Type                           | Description |
   * | ----------------- | ------------------------------ | ----------- |
   * | `shippingContact` | RedactedShippingContact        | Redacted shipping contact that buyer selected in the Apple Pay payment sheet. |
   * | `done`            | function(PaymentDetailsObject) | Use to update the payment amount after taxes, service fees, or similar charges are recalculated. |
   *
   * **Payment Details Update Object (Digital Wallets Only)**
   *
   * | Name                  | Type             | Description |
   * | --------------------- | ---------------- | ----------- |
   * | `error`                 | string           | Optional. Use this error if the shipping address is valid but the item cannot be shipped to that address. |
   * | `shippingContactErrors` | ShippingErrors   | Optional. Allows for granular validation errors for addressLine, country, city, region and postal code. |
   * | `total`                 | LineItem         | Optional. Change the total amount of the transaction |
   * | `lineItems`             | LineItem[]       | Optional. To update the line items - most common updates are to add the cost of shipping and the sales tax based on the buyer’s shipping address. |
   * | `shippingOptions`       | ShippingOption[] | Optional. This is updated in response to the customer choosing a new shipping address |
   *
   * **Redacted Shipping Contact Object (Digital Wallets Only)**
   *
   * | Property       | Type     | Description                                                                         |
   * | -------------- | -------- | ----------------------------------------------------------------------------------- |
   * | `country`      | string   | A 2-letter string containing the ISO 3166-1 country code of the contact address     |
   * | `countryName`  | string   | The full country name of the contact. Read only.                                    |
   * | `region`       | string   | The applicable administrative region (e.g., province, state) of the contact address |
   * | `city`         | string   | The city name of the contact address                                                |
   * | `postalCode`   | string   | The postal code of the contact address                                              |
   *
   * **Line Item Object (Digital Wallets Only)**
   *
   * | Name      | Type    | Description |
   * | --------- | ------- | ----------- |
   * | `label`   | string  | Human-readable string that explains the purpose of the amount. For a line item, this is typically the name of the charge or object purchased. For the total field, this is typically the merchant name. |
   * | `amount`  | string  | The cost of the object as a string representation of a float with 2 decimal places. (e.g., "15.00"). For a line item, this is typically the cost of the object, a subtotal, or additional charge (e.g., taxes, shipping). For the total field, this is the total charge of the transaction and should equal the sum of the line item amounts. |
   * | `pending` | boolean | Optional. A boolean indicating whether or not the value in the amount field represents an estimated or unknown cost. Typically, this field is false. |
   *
   * **Shipping Errors Object (Apple Pay Only)**
   *
   * | Name      | Type    | Description |
   * | --------- | ------- | ----------- |
   * | `label`   | string  | Human-readable string that explains the purpose of the amount. For a line item, this is typically the name of the charge or object purchased. For the total field, this is typically the merchant name. |
   * | `amount`  | string  | The cost of the object as a string representation of a float with 2 decimal places. (e.g., "15.00"). For a line item, this is typically the cost of the object, a subtotal, or additional charge (e.g., taxes, shipping). For the total field, this is the total charge of the transaction and should equal the sum of the line item amounts. |
   * | `pending` | boolean | Optional. A boolean indicating whether or not the value in the amount field represents an estimated or unknown cost. Typically, this field is false. |
   *
   * @argument shippingContactChanged
   * @type Action
   */
  shippingContactChanged: null,

  /**
   * Callback that gets fired when a customer selects a new shipping option in Apple Pay.
   *
   * You can use this to recalculate and update fields such as taxes or the total cost. You **must** call
   * `done` when using this callback.
   *
   * **Example**
   *
   * ```js
   * function(shippingOption, done) {
   *   // Creates a new array of line items that includes only 1 line
   *   // item. The item for a shipping option. Production code would get the
   *   // array of line items from the original PaymentRequest and add/update a line
   *   // item for the shippingOption argument of this callback.
   *   const newLineItems = [{
   *     label: shippingOption.label,
   *     amount: shippingOption.amount,
   *     pending: false
   *   }];
   *   const newTotal = {
   *     label: "Total",
   *
   *     // TODO: total amount to be calc'd based on difference between old and new
   *     // amount of this shippingOption.amount if shippingOption.amount was updated.
   *     // -- OR --
   *     // Increase total amount if the line item for this shippingOption is new.
   *     amount: "SOME_AMOUNT + shippingOption.amount",
   *     pending: false
   *   };
   *
   *   done({
   *   // Note: newLineItems REPLACES the set of the line items in the PaymentRequest
   *   // newTotal REPLACES the original payment total.
   *   lineItems: newLineItems,
   *   total: newTotal
   * };
   * ```
    *
   * **Parameters**
   *
   * | Name             | Type                           | Description |
   * | ---------------- | ------------------------------ | ----------- |
   * | `shippingOption` | ShippingOption                 | The shipping option the buyer selected in the Apple Pay payment sheet. |
   * | `done`           | function(PaymentDetailsObject) | Use to update the payment amount after taxes, service fees, or similar charges are recalculated. |
   *
   * **Shipping Option Object (Apple Pay Only)**
   *
   * | Name   | Type   | Description                                                                                     |
   * | ------ | ------ | ----------------------------------------------------------------------------------------------- |
   * | id     | string | A unique ID to reference this shipping option                                                   |
   * | label  | string | A short title for this shipping option. Shown in the Apple Pay interface                        |
   * | amount | string | The cost of this shipping option as a string representation of a float. The value can be "0.00" |
   *
   * **Payment Details Update Object (Digital Wallets Only)**
   *
   * Note, this object has a limited selection of fields compared to the `shippingContactChanged` callback.
   *
   * | Name                  | Type             | Description |
   * | --------------------- | ---------------- | ----------- |
   * | `total`                 | LineItem         | Optional. Change the total amount of the transaction |
   * | `lineItems`             | LineItem[]       | Optional. To update the line items - most common updates are to add the cost of shipping and the sales tax based on the buyer’s shipping address. |
   *
   * @argument shippingOptionChanged
   * @type Action
   */
   shippingOptionChanged: null,

  // COMPONENT INTERNALS

  env: null,

  /**
   * Used to determine if Apple Pay is supported in the current environment.
   * @private
   */
  canShowApplePay: false,

  /**
   * Used to determine if Apple Pay is supported in the current environment.
   * @private
   */
  canShowGooglePay: false,

  /**
   * Used to determine if Apple Pay is supported in the current environment.
   * @private
   */
  canShowMasterpas: false,

  /**
   * Checks if the form is to configured to accept any digital wallet payment methods
   * @private
   */
  canShowDigitalWallets: computed('canShowApplePay', 'canShowGooglePay', 'canShowMasterpass', function() {
    return this.canShowApplePay || this.canShowGooglePay || this.canShowMasterpass;
  }),

  /**
   * Internal field that maintains the randomly generated form ID for inputs
   * associated with an instance of the payment form.
   * @private
   */
  formId: null,

  /**
   * Internal field that maintains the ID of the last used application and makes
   * sure that the form is rebuilt if it changes.
   * @private
   */
  oldApplicationId: null,

  /**
   * Internal field that maintains the ID of the last used location and makes
   * sure that the form is rebuilt if it changes.
   * @private
   */
  oldLocationId: null,

  /**
   * Internal field that maintains a reference to the current SqPaymentForm
   * instance that the component has built.
   * @private
   */
  paymentForm: null,

  init(...args) {
    this._super(...args);

    // Generate a random ID to allow multiple uses of the component on
    // the same page without running into any conflicts.
    this.set('formId', randomId());
  },

  /**
   * @private
   */
  didReceiveAttrs() {
    assert('applicationId is required to build the Square Payment Form', !!this.applicationId);
    assert('locationId is required to build the Square Payment Form', !!this.locationId);

    const applicationIdChanged = this.oldApplicationId !== this.applicationId;
    const locationIdChanged = this.oldLocationId !== this.locationId;

    // If this is a new application or location, make sure to re-initialize
    // the payment form.
    if (applicationIdChanged || locationIdChanged) {
      scheduleOnce('afterRender', this, function() {
        this.initializePaymentForm();
      });
    }

    this.setProperties({
      oldApplicationId: this.applicationId,
      oldLocationId: this.locationId
    });
  },

  /**
   * @private
   */
  willDestroyElement(...args) {
    this._super(...args);

    // Clear old location state
    this.set('oldLocationId', null);

    // Cleanup the form when the component is no longer on screen.
    this.teardownPaymentForm();
  },

  /**
   * @private
   */
  initializePaymentForm() {
    // If there is an existing form (possibly due to runloop effects),
    // tear it down and clear the current state.
    this.teardownPaymentForm();
    const paymentFormConfig = {
      applicationId: this.applicationId,
      apiWrapper: 'emberjs',
      autoBuild: false,
      env: this.env,
      inputClass: this.inputClass,
      inputStyles: this.inputStyles,
      locationId: this.locationId,
      callbacks: {
        cardNonceResponseReceived: (...args) => {
          if (this.onCardNonceResponseReceived) {
            this.onCardNonceResponseReceived(...args);
          }
        },
        methodsSupported: methods => {
          const methodNames = Object.keys(methods);

          if (methodNames.includes('applePay')) {
            this.set('canShowApplePay', methods.applePay);
          }

          if (methodNames.includes('googlePay')) {
            this.set('canShowGooglePay', methods.googlePay);
          }

          if (methodNames.includes('masterpass')) {
            this.set('canShowMasterpass', methods.masterpass);
          }
        }
      }
    };

    if (document.getElementById(`sq-${this.formId}-credit-card-fields`)) {
      const creditCardNumberInputEl = document.getElementById(`sq-${this.formId}-credit-card-number-input`);
      if (creditCardNumberInputEl) {
        paymentFormConfig.cardNumber = {
          elementId: `sq-${this.formId}-credit-card-number-input`,
          placeholder: creditCardNumberInputEl.dataset.placeholder
        };
      } else {
        assert('Missing square-payment-form-credit-card-number-input. Did you yield the component properly?', false);
      }

      const creditCvvInputEl = document.getElementById(`sq-${this.formId}-credit-card-cvv-input`);
      if (creditCvvInputEl) {
        paymentFormConfig.cvv = {
          elementId: `sq-${this.formId}-credit-card-cvv-input`,
          placeholder: creditCvvInputEl.dataset.placeholder
        };
      } else {
        assert('Missing square-payment-form-credit-card-cvv-input. Did you yield the component properly?', false);
      }

      const creditCardExpirationDateInputEl = document.getElementById(`sq-${this.formId}-credit-card-expiration-date-input`);
      if (creditCardExpirationDateInputEl) {
        paymentFormConfig.expirationDate = {
          elementId: `sq-${this.formId}-credit-card-expiration-date-input`,
          placeholder: creditCardExpirationDateInputEl.dataset.placeholder
        };
      } else {
        assert('Missing square-payment-form-credit-card-expiration-date-input. Did you yield the component properly?', false);
      }

      const creditCardPostalCodeInputEl = document.getElementById(`sq-${this.formId}-credit-card-postal-code-input`);
      if (creditCardPostalCodeInputEl) {
        paymentFormConfig.postalCode = {
          elementId: `sq-${this.formId}-credit-card-postal-code-input`,
          placeholder: creditCardPostalCodeInputEl.dataset.placeholder
        };
      } else {
        paymentFormConfig.postalCode = false;
      }
    }

    const applePayElementId = `sq-${this.formId}-apple-pay-button`;
    if (document.getElementById(applePayElementId)) {
      paymentFormConfig.applePay = { elementId: applePayElementId };

      if (this.createPaymentRequest) {
        paymentFormConfig.callbacks.createPaymentRequest = this.createPaymentRequest.bind(this);
      } else {
        assert('createPaymentRequest action is required for Apple Pay.', false);
      }
    }

    const googlePayElementId = `sq-${this.formId}-google-pay-button`;
    if (document.getElementById(googlePayElementId)) {
      paymentFormConfig.googlePay = { elementId: googlePayElementId };

      if (this.createPaymentRequest) {
        paymentFormConfig.callbacks.createPaymentRequest =
          paymentFormConfig.callbacks.createPaymentRequest || this.createPaymentRequest.bind(this);
      } else {
        assert('createPaymentRequest action is required for Google Pay.', false);
      }
    }

    const masterpassElementId = `sq-${this.formId}-masterpass-button`;
    if (document.getElementById(masterpassElementId)) {
      paymentFormConfig.masterpass = { elementId: masterpassElementId };

      if (this.createPaymentRequest) {
        paymentFormConfig.callbacks.createPaymentRequest =
          paymentFormConfig.callbacks.createPaymentRequest || this.createPaymentRequest.bind(this);
      } else {
        assert('createPaymentRequest action is required for Masterpass.', false);
      }
    }
    const newPaymentForm = new SqPaymentForm(paymentFormConfig);
    this.set('paymentForm', newPaymentForm);
    newPaymentForm.build();
  },

  /**
   * Checks to see if there is an existing payment form, and if so, removes
   * its event bindings and removes the internal payment form reference.
   * @private
   */
  teardownPaymentForm() {
    // Safety check to make sure that there is a payment form to destroy;
    // otherwise, skip this step.
    if (this.paymentForm) {
      this.paymentForm.destroy();
      this.set('paymentForm', null);
    }

    return undefined;
  },

  actions: {
    /**
     * Tells the SqPaymentForm library to generate a card nonce.
     * @private
     */
    requestCardNonce() {
      this.paymentForm && this.paymentForm.requestCardNonce();
    }
  }
});
