import Component from '@ember/component';
/**
 * Renders a placeholder element that gets replaced with a secure Square `<iframe>` tag by the SqPaymentForm JS
 * library. The `<iframe>` then renders an `<input>` tag for the CVV code.
 *
 * When accepting credit card payments, you **must** have this component inside your form.
 *
 * This component may only be used in *yielded* form, where it is yielded by the
 * `SquarePaymentFormCreditCardFields` component as the `CvvInput` property.
 *
 * **Example: Render a CVV input inside the payment form**
 * ```hbs
 * <SquarePaymentForm as |PaymentForm|>
 *   <PaymentForm.CreditCardFields as |Fields|>
 *     <Fields.CvvInput/>
 *   </PaymentForm.CreditCardFields>
 * </SquarePaymentForm>
 *
 * {{!-- or, if you're using < Ember 3.4 --}}
 *
 * {{#square-payment-form as |PaymentForm|}}
 *   {{#PaymentForm.CreditCardFields as |Fields|}}
 *     {{Fields.CvvInput}}
 *   {{/PaymentForm.CreditCardFields}}
 * {{/square-payment-form}}
 * ```
 */
export default class SquarePaymentFormCvvInput extends Component {
    /**
     * Greyed-out string that shows up in the CVV input field before a customer begins typing
     * in their CVV code.
     *
     * **Default Value:** `CVV`
     *
     * **Example: Replace the Default Placeholder**
     *
     * ```hbs
     * <SquarePaymentForm as |PaymentForm|>
     *   <PaymentForm.CreditCardFields as |Fields|>
     *     <div>
     *       <label>CVV</label>
     *       <Fields.CvvInput @placeholder="123"/>
     *     </div>
     *   </PaymentForm.CreditCardFields/>
     * </SquarePaymentForm>>
     *
     * {{!-- or, if you're using < Ember 3.4 --}}
     *
     * {{#square-payment-form as |PaymentForm|}}
     *   {{#PaymentForm.CreditCardFields as |Fields|}}
     *     <div>
     *       <label>CVV</label>
     *       {{Fields.CvvInput placeholder="123"}}
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
    formId: string;
    /**
     * Renders the placeholder property to a data attribute so the parent component can
     * inject it into the SqPaymentForm build cycle.
     * @private
     */
    readonly placeholderAttribute: string;
    /**
     * Generated HTML ID referenced by the parent Payment Form component to reference an
     * instance of this input.
     * @private
     */
    readonly uniqueCvvInputId: string;
}
