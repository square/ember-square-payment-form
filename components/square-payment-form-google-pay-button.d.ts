import Component from '@ember/component';
/**
 * Different color styles for the Google Pay button, per Google's documentation at
 * https://developers.google.com/pay/api/web/reference/object#ButtonOptions
 */
declare enum GooglePayLanguages {
    en = "en",
    es = "es",
    fr = "fr",
    ja = "ja"
}
/**
 * Different color styles for the Google Pay button, per Google's documentation at
 * https://developers.google.com/pay/api/web/reference/object#ButtonOptions
 */
declare enum GooglePayStyles {
    black = "black",
    white = "white"
}
/**
 * Different button types for the Google Pay button, per Google's documentation at
 * https://developers.google.com/pay/api/web/reference/object#ButtonOptions
 */
declare enum GooglePayTypes {
    long = "long",
    short = "short"
}
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
 * <SquarePaymentForm as |PaymentForm|>
 *   <PaymentForm.GooglePayButton/>
 *
 *   {{#unless PaymentForm.canShowGooglePay}}
 *     <p>Google Pay is not available here.</p>
 *   {{/unless}}
 * </SquarePaymentForm>
 *
 * {{!-- or, if you're using < Ember 3.4 --}}
 *
 * {{#square-payment-form as |PaymentForm|}}
 *   {{PaymentForm.GooglePayButton}}
 *
 *   {{#unless PaymentForm.canShowGooglePay}}
 *     <p>Google Pay is not available here.</p>
 *   {{/unless}}
 * {{/square-payment-form}}
 * ```
 *
 * *Note: you'll need to configure the SquarePaymentForm to implement Google Pay;*
 * *you can read more in the digital wallets guide.*
 */
export default class SquarePaymentFormGooglePayButton extends Component {
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
     * <SquarePaymentForm as |PaymentForm|>
     *   <PaymentForm.GooglePayButton @lang="fr"/>
     * <SquarePaymentForm/>
     *
     * {{!-- or, if you're using < Ember 3.4 --}}
     *
     * {{#square-payment-form as |PaymentForm|}}
     *   {{PaymentForm.GooglePayButton lang="fr"}}
     * {{/square-payment-form}}
     * ```
     * *Note: you'll need to configure the SquarePaymentForm to implement Google Pay;*
     * *you can read more in the digital wallets guide.*
     */
    lang: GooglePayLanguages;
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
     * <SquarePaymentForm as |PaymentForm|>
     *   <PaymentForm.GooglePayButton @style="white"/>
     * <SquarePaymentForm/>
     *
     * {{!-- or, if you're using < Ember 3.4 --}}
     *
     * {{#square-payment-form as |PaymentForm|}}
     *   {{PaymentForm.GooglePayButton style="white"}}
     * {{/square-payment-form}}
     * ```
     * *Note: you'll need to configure the SquarePaymentForm to implement Google Pay;*
     * *you can read more in the digital wallets guide.*
     */
    style: GooglePayStyles;
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
     * <SquarePaymentForm as |PaymentForm|>
     *   <PaymentForm.GooglePayButton @type="long"/>
     * <SquarePaymentForm/>
     *
     * {{!-- or, if you're using < Ember 3.4 --}}
     *
     * {{#square-payment-form as |PaymentForm|}}
     *   {{PaymentForm.GooglePayButton type="long"}}
     * {{/square-payment-form}}
     * ```
     * *Note: you'll need to configure the SquarePaymentForm to implement Google Pay;*
     * *you can read more in the digital wallets guide.*
     */
    type: GooglePayTypes;
    /**
     * Adds an ARIA label to describe the button since there's no text for a screenreader to use.
     * @private
     */
    label: string;
    /**
     * Generates a BEM-compliant CSS class to hide Google Pay when it's not supported.
     * @private
     */
    isSupported: boolean;
    /**
     * Generates a BEM-compliant CSS class derived from the lang property.
     * @private
     */
    readonly googlePayLangClass: string;
    /**
     * Generates a BEM-compliant CSS class derived from the style property.
     * @private
     */
    readonly googlePayStyleClass: string;
    /**
     * Generates a BEM-compliant CSS class derived from the type property.
     * @private
     */
    readonly googlePayTypeClass: string;
    /**
     * ID generated by the parent Payment Form component used to generate a reference to an
     * instance of this button.
     * @private
     */
    formId: string;
    /**
     * Generated HTML ID referenced by the parent Payment Form component to reference an
     * instance of this button.
     * @private
     */
    readonly uniqueGooglePayId: string;
}
export {};
