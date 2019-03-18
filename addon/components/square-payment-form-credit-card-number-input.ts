import Component from '@ember/component';
import { layout } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';

// @ts-ignore: Ignore import of compiled template
import template from '../templates/components/square-payment-form-credit-card-number-input';

const DEFAULT_PLACEHOLDER = '• • • •  • • • •  • • • •  • • • •';

/**
 * Renders a placeholder element that gets replaced with a secure Square `<iframe>` tag by the SqPaymentForm JS
 * library. The `<iframe>` then renders an `<input>` tag for the credit card number.
 *
 * When accepting credit card payments, you **must** have this component inside your form.
 *
 * This component may only be used in *yielded* form, where it is yielded by the
 * `SquarePaymentFormCreditCardFields` component as the `NumberInput` property.
 *
 * **Example: Render a credit card number input inside the payment form**
 * ```hbs
 * <SquarePaymentForm as |PaymentForm|>
 *   <PaymentForm.CreditCardFields as |Fields|>
 *     <Fields.NumberInput/>
 *   </PaymentForm.CreditCardFields>
 * </SquarePaymentForm>
 *
 * {{!-- or, if you're using < Ember 3.4 --}}
 *
 * {{#square-payment-form as |PaymentForm|}}
 *   {{#PaymentForm.CreditCardFields as |Fields|}}
 *     {{Fields.NumberInput}}
 *   {{/PaymentForm.CreditCardFields}}
 * {{/square-payment-form}}
 * ```
 */
@layout(template)
export default class SquarePaymentFormCreditCardNumberInput extends Component {
  /**
   * Greyed-out string that shows up in the credit card number input field before a customer
   * begins typing in their credit card number.
   *
   * **Default Value:** `• • • •  • • • •  • • • •  • • • •`
   *
   * **Example: Replace the Default Placeholder**
   *
   * ```hbs
   * <SquarePaymentForm as |PaymentForm|>
   *   <PaymentForm.CreditCardFields as |Fields|>
   *     <div>
   *       <label>Credit Card Number</label>
   *       <Fields.NumberInput @placeholder="Credit Card Number"/>
   *     </div>
   *   </PaymentForm.CreditCardFields/>
   * </SquarePaymentForm>>
   *
   * {{!-- or, if you're using < Ember 3.4 --}}
   *
   * {{#square-payment-form as |PaymentForm|}}
   *   {{#PaymentForm.CreditCardFields as |Fields|}}
   *     <div>
   *       <label>Credit Card Number</label>
   *       {{Fields.NumberInput placeholder="Credit Card Number"}}
   *     </div>
   *   {{/PaymentForm.CreditCardFields}}
   * {{/square-payment-form}}
   * ```
   */

  placeholder?: string;

  /**
   * Passed down unique identifier for the current Square Payment Form; used to prevent
   * render multiple Payment Forms in a single document without running into duplicate
   * DOM IDs.
   * @private
   */
  formId!: string;

  /**
   * Renders the placeholder property to a data attribute so the parent component can
   * inject it into the SqPaymentForm build cycle.
   * @private
   */
  @computed('placeholder')
  get placeholderAttribute() {
    return this.placeholder || DEFAULT_PLACEHOLDER;
  }

  /**
   * Generated HTML ID referenced by the parent Payment Form component to reference an
   * instance of this input.
   * @private
   */
  @computed('formId')
  get uniqueCcInputId() {
    return `sq-${this.formId}-credit-card-number-input`;
  }
};
