import Component from '@ember/component';
/**
 * Yields credit card field input components that can be used to build a credit card form.
 *
 * **Example: Build a Credit Card Form**
 *
 * ```hbs
 * <SquarePaymentForm as |PaymentForm|>
 *   <PaymentForm.CreditCardFields as |Fields|>
 *     <div>
 *       <label>Card Number</label>
 *       <Fields.NumberInput>
 *     </div>
 *     <div>
 *       <label>Expiration</label>
 *       <Fields.ExpirationDateInput/>
 *     </div>
 *     <div>
 *       <label>CVV</label>
 *       <Fields.CvvInput/>
 *     </div>
 *     <div>
 *       <label>Postal</label>
 *       <Fields.PostalCodeInput/>
 *     </div>
 *   </PaymentForm.CreditCardFields/>
 * </SquarePaymentForm>>
 *
 * {{!-- or, if you're using < Ember 3.4 --}}
 *
 * {{#square-payment-form as |PaymentForm|}}
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
 * @yield {Hash} Fields
 * @yield {SquarePaymentFormCreditCardCVVInput} Fields.CvvInput
 * @yield {SquarePaymentFormCreditCardExpirationDateInput} Fields.ExpirationDateInput
 * @yield {SquarePaymentFormCreditCardNumberInput} Fields.NumberInput
 * @yield {SquarePaymentFormCreditCardPostalCodeInput} Fields.PostalCodeInput
 */
export default class SquarePaymentFormCreditCardFields extends Component {
    /**
     * Passed down unique identifier for the current Square Payment Form; used to prevent
     * render multiple Payment Forms in a single document without running into duplicate
     * DOM IDs.
     * @private
     */
    formId: string;
    /**
     * Generated HTML ID referenced by the parent Payment Form component to reference an
     * instance of this input.
     * @private
     */
    readonly uniqueFieldsIdentifier: string;
}
