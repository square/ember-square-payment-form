import Component from '@ember/component';
import { computed } from '@ember/object';
import template from '../templates/components/square-payment-form-credit-card-expiration-date-input';

const DEFAULT_PLACEHOLDER = 'MM/YY';

/**
 * Renders a placeholder element that gets replaced with a secure Square `<iframe>` tag by the SqPaymentForm JS
 * library. The `<iframe>` then renders an `<input>` tag for the credit card expiration date.
 *
 * When accepting credit card payments, you **must** have this component inside your form.
 *
 * This component may only be used in *yielded* form, where it is yielded by the
 * `SquarePaymentFormCreditCardFields` component as the `ExpirationDateInput` property.
 *
 * **Example: Render an expiration date input inside the payment form**
 * ```hbs
 * {{#square-payment-form as |PaymentForm|}}
 *   {{#PaymentForm.CreditCardFields as |Fields|}}
 *     {{Fields.ExpirationDateInput}}
 *   {{/PaymentForm.CreditCardFields}}
 * {{/square-payment-form}}
 * ```
 *
 * @class SquarePaymentFormCreditCardExpirationDateInput
 */
export default Component.extend({
  layout: template,

  /**
   * Greyed-out string that shows up in the expiration date input field before a customer
   * begins typing in their expiration date.
   *
   * **Default Value:** `MM/YY`
   *
   * **Example: Replace the Default Placeholder**
   *
   * ```hbs
   * {{#square-payment-form as |PaymentForm|}}
   *   {{#PaymentForm.CreditCardFields as |Fields|}}
   *     <div>
   *       <label>Expiration Date</label>
   *       {{Fields.ExpirationDateInput placeholder="00/00"}}
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
  uniqueExpirationInputId: computed('formId', function() {
    return `sq-${this.formId}-credit-card-expiration-date-input`;
  })
});
