import {
  INVALID_APPLICATION_ID_ERROR,
  MISSING_APPLICATION_ID_ERROR,
  MISSING_CARD_DATA_ERROR,
  TOO_MANY_REQUESTS_ERROR,
  UNAUTHORIZED_ERROR,
  UNSUPPORTED_CARD_BRAND_ERROR,
  UNKNOWN_ERROR,
  VALIDATION_ERROR,
  SUCCESS
} from './fixtures/card-nonce-response';

export {
  INVALID_APPLICATION_ID_ERROR,
  MISSING_APPLICATION_ID_ERROR,
  MISSING_CARD_DATA_ERROR,
  TOO_MANY_REQUESTS_ERROR,
  UNAUTHORIZED_ERROR,
  UNSUPPORTED_CARD_BRAND_ERROR,
  UNKNOWN_ERROR,
  VALIDATION_ERROR,
  SUCCESS
};

let mockedCardNonceResponse = null;

export function mockCardNonceResponse(response = UNKNOWN_ERROR) {
  mockedCardNonceResponse = response;
}

export function setupSqPaymentForm(hooks) {
  hooks.afterEach(function() {
    mockedCardNonceResponse = null;
  });
}

export function simulateRequestCardNonce(onCardNonceResponseReceived) {
  const cardNonceResponse = mockedCardNonceResponse || UNKNOWN_ERROR;
  const { errors, nonce, cardData, billingContact, shippingContact, shippingOption } = cardNonceResponse;
  onCardNonceResponseReceived(errors, nonce, cardData, billingContact, shippingContact, shippingOption);
}
