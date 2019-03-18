declare class SqPaymentForm {
  constructor(configuration: SqPaymentFormConfiguration)

  build: () => void
  destroy: () => void
  isSupportedBrowser: () => boolean
  recalculateSize: () => void
  requestCardNonce: () => void
}

interface SqPaymentFormCallbacks {
  cardNonceResponseReceived: SqPaymentFormCallbackOnCardNonceResponseReceived
  createPaymentRequest?: () => SqPaymentFormPaymentRequest
  inputEventReceived?: (inputEvent: SqPaymentFormInputEvent) => void
  methodsSupported?: (methods: SqPaymentFormSupportedMethodFlags) => void
  paymentFormLoaded?: () => void
  unsupportedBrowserDetected?: () => void
  shippingContactChanged?: (
    shippingContact: SqPaymentFormContact,
    done: (paymentDetailsUpdate?: SqPaymentFormPaymentDetailsUpdate) => void
  ) => void
}

type SqPaymentFormCallbackOnCardNonceResponseReceived = (
  errors: SqPaymentFormError[],
  nonce?: string,
  cardData?: SqPaymentFormCardData,
  billingContact?: SqPaymentFormContact,
  shippingContact?: SqPaymentFormContact,
  shippingOption?: SqPaymentFormShippingOption
) => void;

declare enum SqPaymentFormCardBrand {
  americanExpress = 'americanExpress',
  discover = 'discover',
  discoverDiners = 'discoverDiners',
  JCB = 'JCB',
  masterCard = 'masterCard',
  unionPay = 'unionPay',
  unknown = 'unknown',
  visa = 'visa'
}

interface SqPaymentFormCardData {
  billing_postal_code: string
  card_brand: SqPaymentFormCardBrand
  digital_wallet_type: string
  exp_month: string
  exp_year: string
  last_4: string
}

interface SqPaymentFormConfiguration {
  applePay?: SqPaymentFormElement
  applicationId: string
  autoBuild: false
  callbacks: SqPaymentFormCallbacks
  cardNumber?: SqPaymentFormElement
  cvv?: SqPaymentFormElement
  expirationDate?: SqPaymentFormElement
  googlePay?: SqPaymentFormElement
  inputClass: string
  inputStyles?: SqPaymentFormInputStyle[]
  locationId?: string
  masterpass?: SqPaymentFormElement
  postalCode?: SqPaymentFormElement
}

interface SqPaymentFormContact {
  familyName: string
  givenName: string
  email: string
  country: string
  countryName: string
  region: string
  city: string
  addressLines: string[]
  postalCode: string
  phone: string
}

interface SqPaymentFormContactError {
  addressLines: string
  city: string
  region: string
  country: string
  postalCode: string
}

interface SqPaymentFormElement {
  elementId: string
  placeholder?: string
}

interface SqPaymentFormError {
  field?: string
  message: string
  type: SqPaymentFormErrorType
}

declare enum SqPaymentFormErrorType {
  invalidApplicationId = 'INVALID_APPLICATION_ID',
  missingApplicationId = 'MISSING_APPLICATION_ID',
  missingCardData = 'MISSING_CARD_DATA',
  tooManyRequests = 'TOO_MANY_REQUESTS',
  unauthorized = 'UNAUTHORIZED',
  unsupportedCardBrand = 'UNSUPPORTED_CARD_BRAND',
  unknown = 'UNKNOWN',
  validationError = 'VALIDATION_ERROR'
}

interface SqPaymentFormInputEvent {
  eventType: SqPaymentFormInputEventType
  field: SqPaymentFormInputField
  cardBrand?: SqPaymentFormCardBrand
  postalCodeValue?: string
}

declare enum SqPaymentFormInputEventType {
  submit = 'submit',
  emptyStateChanged = 'emptyStateChanged',
  focusClassAdded = 'focusClassAdded',
  focusClassRemoved = 'focusClassRemoved',
  errorClassAdded = 'errorClassAdded',
  errorClassRemoved = 'errorClassRemoved',
  cardBrandChanged = 'cardBrandChanged',
  postalCodeChanged = 'postalCodeChanged'
}

declare enum SqPaymentFormInputField {
  cardNumber = 'cardNumber',
  giftCard = 'giftCard',
  cvv = 'cvv',
  expirationDate = 'expirationDate',
  postalCode = 'postalCode'
}

interface SqPaymentFormInputStyle {
  mediaMinWidth?: string
  mediaMaxWidth?: string
  backgroundColor?: string
  boxShadow?: string
  color?: string
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  lineHeight?: string
  padding?: string
  placeholderColor?: string
  placeholderFontWeight?: string,
  _webkitFontSmoothing: string,
  _mozOsxFontSmoothing: string
}

interface SqPaymentFormLineItem {
  amount: string
  label: string
  pending?: boolean
}

interface SqPaymentFormPaymentDetailsUpdate {
  error?: string
  lineItems: SqPaymentFormLineItem[]
  shippingContactErrors?: any[]
  shippingOption: SqPaymentFormShippingOption
  total: SqPaymentFormLineItem
}

interface SqPaymentFormPaymentRequest {
  countryCode: string
  currencyCode: string
  lineItems: SqPaymentFormLineItem[]
  shippingContact?: SqPaymentFormContact
  requestBillingInfo: boolean
  requestShippingAddress: boolean
  total: SqPaymentFormLineItem
}

interface SqPaymentFormShippingErrors {
  addressLines: string
  city: string
  country: string
  region: string
  postalCode: string
}

interface SqPaymentFormShippingOption {
  id: string
  label: string
  amount: string
}

interface SqPaymentFormSupportedMethodFlags {
  applePay: boolean
  googlePay: boolean
  masterpass: boolean
}