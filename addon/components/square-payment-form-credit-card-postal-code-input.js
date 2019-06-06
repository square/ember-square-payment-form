import Component from '@ember/component';
import { computed } from '@ember/object';

// @ts-ignore: Ignore import of compiled template
import template from '../templates/components/square-payment-form-credit-card-postal-code-input';

const DEFAULT_PLACEHOLDER = '12345';

/**
 * Renders a placeholder element that gets replaced with a secure Square `<iframe>` tag by the SqPaymentForm JS
 * library. The `<iframe>` then renders an `<input>` tag for the postal code.
 *
 * When accepting **US**-issued credit cards, you **must** have this component inside your form.
 * For cards issued in all other countries, this component is *optional*.
 *
 * This component may only be used in *yielded* form, where it is yielded by the
 * `SquarePaymentFormCreditCardFields` component as the `PostalCodeInput` property.
 *
 * **Example: Render a postal code input inside the payment form**
 * ```hbs
 * {{#square-payment-form as |PaymentForm|}}
 *   {{#PaymentForm.CreditCardFields as |Fields|}}
 *     {{Fields.PostalCodeInput}}
 *   {{/PaymentForm.CreditCardFields}}
 * {{/square-payment-form}}
 * ```
 *
 * @class SquarePaymentFormCreditCardPostalCodeInput
 */
export default Component.extend({
  layout: template,

  /**
   * Greyed-out string that shows up in the postal code input field before a customer begins
   * typing in their postal code.
   *
   * **Default Value:** `12345`
   *
   * **Example: Replace the Default Placeholder**
   *
   * ```hbs
   * {{#square-payment-form as |PaymentForm|}}
   *   {{#PaymentForm.CreditCardFields as |Fields|}}
   *     <div>
   *       <label>Postal</label>
   *       {{Fields.PostalCodeInput placeholder="55555"}}
   *     </div>
   *   {{/PaymentForm.CreditCardFields}}
   * {{/square-payment-form}}
   * ```
   *
   * @argument placeholder
   * @type String
   */
  placeholder: null,

  /**
   * Passed down unique identifier for the current Square Payment Form; used to prevent
   * render multiple Payment Forms in a single document without running into duplicate
   * DOM IDs.
   * @private
   */
  formId: null,

  /**
   * Renders the placeholder property to a data attribute so the parent component can
   * inject it into the SqPaymentForm build cycle.
   * @private
   */
  placeholderAttribute: computed('placeholder', function() {
    return this.placeholder || DEFAULT_PLACEHOLDER;
  }),

  /**
   * Generated HTML ID referenced by the parent Payment Form component to reference an
   * instance of this input.
   * @private
   */
  uniquePostalInputId: computed('formId', function() {
    return `sq-${this.formId}-credit-card-postal-code-input`;
  })
});
