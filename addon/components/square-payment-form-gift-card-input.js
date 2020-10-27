import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/square-payment-form-gift-card-input';

const DEFAULT_PLACEHOLDER = '• • • •  • • • •  • • • •  • • • •';

/**
 * Renders a placeholder element that gets replaced with a secure Square `<iframe>` tag by the SqPaymentForm JS
 * library. The `<iframe>` then renders an `<input>` tag for the gift card number.
 *
 * When accepting gift cards, you **must** have this component inside your form AND
 * not include any other components.
 *
 * This component may only be used in *yielded* form, where it is yielded by the
 * `SquarePaymentForm` component as the `GiftCardInput` property.
 *
 * **Example: Render a gift card input inside the payment form**
 * ```hbs
 * {{#square-payment-form as |PaymentForm|}}
 *   {{PaymentForm.GiftCardInput}}
 * {{/square-payment-form}}
 * ```
 *
 * @class SquarePaymentFormGiftCardInput
 */
export default Component.extend({
  layout,

  /**
   * Greyed-out string that shows up in the gift card input field before a customer begins
   * typing in their gift card number.
   *
   * **Default Value:** `• • • •  • • • •  • • • •  • • • •`
   *
   * **Example: Replace the Default Placeholder**
   *
   * ```hbs
   * {{#square-payment-form as |PaymentForm|}}
   *   {{PaymentForm.GiftCardInput placeholder="1234 5678 9012 3456"}}
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
  uniqueGiftCardInputId: computed('formId', function() {
    return `sq-${this.formId}-gift-card-input`;
  })
});
