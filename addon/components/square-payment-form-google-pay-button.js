import Component from '@ember/component';
import { computed } from '@ember/object';

const ROOT_CLASS_NAME = 'square-payment-form__google-pay-button';

/**
 * Different color styles for the Google Pay button, per Google's documentation at
 * https://developers.google.com/pay/api/web/reference/object#ButtonOptions
 */
export const GooglePayLanguages = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  ja: 'ja'
};

/**
 * Different color styles for the Google Pay button, per Google's documentation at
 * https://developers.google.com/pay/api/web/reference/object#ButtonOptions
 */
export const GooglePayStyles = {
  black: 'black',
  white: 'white'
};

/**
 * Different button types for the Google Pay button, per Google's documentation at
 * https://developers.google.com/pay/api/web/reference/object#ButtonOptions
 */
export const GooglePayTypes = {
  long: 'long',
  short: 'short'
};

/**
 * Renders a Google Pay button for use in the Square Payment Form, pre-styled to meet
 * Google's branding guidelines.
 *
 * It includes the ability to change the theme of the button and localize the button copy.
 *
 * **This component will only render when a customer can use Google Pay.**
 *
 * If you need to adjust your content based on whether the Payment Form can accept Google Pay or not,
 * you can use the `PaymentForm.canShowGooglePay` property in your template, like so:
 *
 * ```hbs
 * {{#square-payment-form as |PaymentForm|}}
 *   {{PaymentForm.GooglePayButton}}
 *
 *   {{#unless PaymentForm.canShowGooglePay}}
 *     <p>Google Pay is not available here.</p>
 *   {{/unless}}
 * {{/square-payment-form}}
 * ```
 *
 * *Note: you'll need to configure the SquarePaymentForm to implement Google Pay;*
 * *you can read more in the digital wallets guide.*
 *
 * @class SquarePaymentFormGooglePayButton
 */
export default Component.extend({
  attributeBindings: [
    'uniqueGooglePayId:id',
    'label:aria-label'
  ],
  classNames: [
    ROOT_CLASS_NAME
  ],
  classNameBindings: [
    'googlePayLangClass',
    'googlePayStyleClass',
    'googlePayTypeClass',
    'isSupported::square-payment-form-element--hidden'
  ],
  tagName: 'button',

  /**
   * HTML language code to set on the button.
   *
   * **Default Value**: `en`
   *
   * **Supported Values**:
   *
   * | Value | Description |
   * | ----- | ----------- |
   * | `en`  | English     |
   * | `es`  | Spanish     |
   * | `fr`  | French      |
   * | `ja`  | Japanese    |
   *
   * **Example: Render a Google Pay button in French for Canadians**
   * ```hbs
   * {{#square-payment-form as |PaymentForm|}}
   *   {{PaymentForm.GooglePayButton lang="fr"}}
   * {{/square-payment-form}}
   * ```
   * *Note: you'll need to configure the SquarePaymentForm to implement Google Pay;*
   * *you can read more in the digital wallets guide.*
   *
   * @argument lang
   * @type String
   */
  lang: GooglePayLanguages.en,

  /**
   * Color style for the Google Pay button.
   *
   * **Default Value**: `black` (black button with white text)
   *
   * **Supported Values**:
   *
   * | Value   | Description                  |
   * | ------- | ---------------------------- |
   * | `black` | Black button with white text |
   * | `white` | White button with black text |
   *
   * **Example: Render a white Google Pay button with black text**
   * ```hbs
   * {{#square-payment-form as |PaymentForm|}}
   *   {{PaymentForm.GooglePayButton style="white"}}
   * {{/square-payment-form}}
   * ```
   * *Note: you'll need to configure the SquarePaymentForm to implement Google Pay;*
   * *you can read more in the digital wallets guide.*
   *
   * @argument style
   * @type String
   */
  style: GooglePayStyles.black,

  /**
   * Button type for the Google Pay button; determines whether or not to show text alongside
   * the Google Pay logo on the button.
   *
   * **Default Value**: `short` (Google Pay logo centered on button)
   *
   * **Supported Values**:
   *
   * | Value   | Description                                |
   * | ------- | ------------------------------------------ |
   * | `short` | Google Pay logo                            |
   * | `long`  | "Buy with" followed by the Google Pay logo |
   *
   * **Example: Render a button with both text and Google Pay logo**
   * ```hbs
   * {{#square-payment-form as |PaymentForm|}}
   *   {{PaymentForm.GooglePayButton type="long"}}
   * {{/square-payment-form}}
   * ```
   * *Note: you'll need to configure the SquarePaymentForm to implement Google Pay;*
   * *you can read more in the digital wallets guide.*
   *
   * @argument type
   * @type String
   */
  type: GooglePayTypes.short,

  // ADDON INTERNALS

  /**
   * Adds an ARIA label to describe the button since there's no text for a screenreader to use.
   * @private
   */
  label: 'Pay with Google Pay',

  /**
   * Generates a BEM-compliant CSS class to hide Google Pay when it's not supported.
   * @private
   */
  isSupported: false,

  /**
   * Generates a BEM-compliant CSS class derived from the lang property.
   * @private
   */
  googlePayLangClass: computed('lang', function() {
    return `${ROOT_CLASS_NAME}--lang-${this.lang}`;
  }),

  /**
   * Generates a BEM-compliant CSS class derived from the style property.
   * @private
   */
  googlePayStyleClass: computed('style', function() {
    return `${ROOT_CLASS_NAME}--style-${this.style}`;
  }),

  /**
   * Generates a BEM-compliant CSS class derived from the type property.
   * @private
   */
  googlePayTypeClass: computed('type', function() {
    return `${ROOT_CLASS_NAME}--type-${this.type}`;
  }),

  /**
   * ID generated by the parent Payment Form component used to generate a reference to an
   * instance of this button.
   * @private
   */
  formId: null,

  /**
   * Generated HTML ID referenced by the parent Payment Form component to reference an
   * instance of this button.
   * @private
   */
  uniqueGooglePayId: computed('formId', function() {
    return `sq-${this.formId}-google-pay-button`;
  })
});
