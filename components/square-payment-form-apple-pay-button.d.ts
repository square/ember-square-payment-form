import Component from '@ember/component';
/**
 * Different button types for the Apple Pay button, per Apple's documentation at
 * https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons
 */
declare enum ApplePayTypes {
    plain = "plain",
    buy = "buy",
    donate = "donate",
    checkOut = "check-out",
    book = "book",
    subscribe = "subscribe"
}
/**
 * Different color styles for the Apple Pay button, per Apple's documentation at
 * https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons
 */
declare enum ApplePayStyles {
    black = "black",
    white = "white",
    whiteOutline = "white-outline"
}
/**
 * Renders an Apple Pay button for use in the Square Payment Form, pre-styled to meet
 * Apple's Human Interface Guidelines.
 *
 * It includes the ability to change the type of the button to suit donations, subscriptions,
 * or general purchases, as well as fields to localize the button copy or change the theme.
 *
 * **This component will only render in Safari when a customer can use Apple Pay.**
 *
 * If you need to adjust your content based on whether the Payment Form can accept Apple Pay or not,
 * you can use the `PaymentForm.canShowApplePay` property in your template, like so:
 *
 * ```hbs
 * <SquarePaymentForm as |PaymentForm|>
 *   <PaymentForm.ApplePayButton/>
 *
 *   {{#unless PaymentForm.canShowApplePay}}
 *     <p>Apple Pay is not available here.</p>
 *   {{/unless}}
 * </SquarePaymentForm>
 *
 * {{!-- or, if you're using < Ember 3.4 --}}
 *
 * {{#square-payment-form as |PaymentForm|}}
 *   {{PaymentForm.ApplePayButton}}
 *
 *   {{#unless PaymentForm.canShowApplePay}}
 *     <p>Apple Pay is not available here.</p>
 *   {{/unless}}
 * {{/square-payment-form}}
 * ```
 *
 * *Note: you'll need to configure the SquarePaymentForm to implement Apple Pay;*
 * *you can read more in the digital wallets guide.*
 */
export default class SquarePaymentFormApplePayButton extends Component {
    /**
     * HTML language code to set on the button.
     *
     * **Default Value**: `en-US`
     *
     * **Example: Render an Apple Pay button in French for Canadians**
     * ```hbs
     * <SquarePaymentForm as |PaymentForm|>
     *   <PaymentForm.ApplePayButton @lang="fr-CA"/>
     * <SquarePaymentForm/>
     *
     * {{!-- or, if you're using < Ember 3.4 --}}
     *
     * {{#square-payment-form as |PaymentForm|}}
     *   {{PaymentForm.ApplePayButton lang="fr-CA"}}
     * {{/square-payment-form}}
     * ```
     * *Note: you'll need to configure the SquarePaymentForm to implement Apple Pay;*
     * *you can read more in the digital wallets guide.*
     */
    lang: string;
    /**
     * Color style for the Apple Pay button, per [Apple's documentation](https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons).
     *
     * **Default Value**: `black` (black button with white text)
     *
     * **Supported Values**:
     *
     * | Value           | Description                                   |
     * | --------------- | --------------------------------------------- |
     * | `black`         | Black button with white text and no border    |
     * | `white`         | White button with black text and no border    |
     * | `white-outline` | White button with black text and black border |
     *
     * **Example: Render a white Apple Pay button with black text**
     * ```hbs
     * <SquarePaymentForm as |PaymentForm|>
     *   <PaymentForm.ApplePayButton @style="white"/>
     * <SquarePaymentForm/>
     *
     * {{!-- or, if you're using < Ember 3.4 --}}
     *
     * {{#square-payment-form as |PaymentForm|}}
     *   {{PaymentForm.ApplePayButton style="white"}}
     * {{/square-payment-form}}
     * ```
     * *Note: you'll need to configure the SquarePaymentForm to implement Apple Pay;*
     * *you can read more in the digital wallets guide.*
     */
    style: ApplePayStyles;
    /**
     * Button type for the Apple Pay button, per [Apple's documentation](https://developer.apple.com/documentation/apple_pay_on_the_web/displaying_apple_pay_buttons).
     * You should refer to Apple's [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/apple-pay/overview/buttons-and-marks/)
     * to determine which button type you should use.
     *
     * Some of the values (`check-out`, `book`, and `subscribe`) are only available on iOS 12.1+
     * and Safari 12.0+. If you use any of these types and a user views it on an old browser, it will
     * gracefully fall back to the `plain` button without you doing anything.
     *
     * **Default Value**: `plain` (Apple Pay logo centered on button)
     *
     * **Supported Values**:
     *
     * | Value           | Description                                     |
     * | --------------- | ----------------------------------------------- |
     * | `plain`         | Apple Pay logo                                  |
     * | `buy`           | "Buy with" followed by the Apple Pay logo       |
     * | `donate`        | "Donate with" followed by the Apple Pay logo    |
     * | `check-out`     | "Check out with" followed by the Apple Pay logo |
     * | `book`          | "Book with" followed by the Apple Pay logo      |
     * | `subscribe`     | "Subscribe with" followed by the Apple Pay logo |
     *
     * **Example: Render a 'Donate' button for a Non-Profit**
     * ```hbs
     * <SquarePaymentForm as |PaymentForm|>
     *   <PaymentForm.ApplePayButton @type="donate"/>
     * <SquarePaymentForm/>
     *
     * {{!-- or, if you're using < Ember 3.4 --}}
     *
     * {{#square-payment-form as |PaymentForm|}}
     *   {{PaymentForm.ApplePayButton type="donate"}}
     * {{/square-payment-form}}
     * ```
     * *Note: you'll need to configure the SquarePaymentForm to implement Apple Pay;*
     * *you can read more in the digital wallets guide.*
     */
    type: ApplePayTypes;
    /**
     * Adds an ARIA label to describe the button since there's no text for a screenreader to use.
     * @private
     */
    label: string;
    /**
     * Generates a BEM-compliant CSS class to hide Apple Pay when it's not supported.
     * @private
     */
    isSupported: boolean;
    /**
     * Generates a BEM-compliant CSS class derived from the style property.
     * @private
     */
    readonly applePayStyleClass: string;
    /**
     * Generates a BEM-compliant CSS class derived from the type property.
     * @private
     */
    readonly applePayTypeClass: string;
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
    readonly uniqueApplePayId: string;
}
export {};
