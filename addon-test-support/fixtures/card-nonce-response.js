export const INVALID_APPLICATION_ID_ERROR = {
  errors: [
    {
      type: 'INVALID_APPLICATION_ID',
      message: 'The application ID provided when initializing the payment form is invalid'
    }
  ]
};

export const MISSING_APPLICATION_ID_ERROR = {
  errors: [
    {
      type: 'MISSING_APPLICATION_ID',
      message: 'An application ID was not provided when initializing the payment form.'
    }
  ]
};

export const MISSING_CARD_DATA_ERROR = {
  errors: [
    {
      type: 'MISSING_CARD_DATA',
      message: 'One or more card data fields was not filled out in the payment form.'
    }
  ]
};

export const TOO_MANY_REQUESTS_ERROR = {
  errors: [
    {
      type: 'TOO_MANY_REQUESTS',
      message: 'Your application has generated too many nonce generation requests in too short a time. Try again later.'
    }
  ]
};

export const UNAUTHORIZED_ERROR = {
  errors: [
    {
      type: 'UNAUTHORIZED',
      message: 'Your application is not authorized to use the Connect API to accept online payments.'
    }
  ]
};

export const UNSUPPORTED_CARD_BRAND_ERROR = {
  errors: [
    {
      type: 'UNSUPPORTED_CARD_BRAND',
      message: 'Card is not supported',
      field: 'cardNumber'
    }
  ]
};

export const UNKNOWN_ERROR = {
  errors: [
    {
      type: 'UNKNOWN',
      message: 'An unknown error occured'
    }
  ]
};

export const VALIDATION_ERROR = {
  errors: [
    {
      type: 'VALIDATION_ERROR',
      message: 'Card number is not valid',
      field: 'cardNumber'
    },
    {
      type: 'VALIDATION_ERROR',
      message: 'CVV is not valid',
      field: 'cvv'
    },
    {
      type: 'VALIDATION_ERROR',
      message: 'Expiration date is not valid',
      field: 'expirationDate'
    },
    {
      type: 'VALIDATION_ERROR',
      message: 'Postal code is not valid',
      field: 'postalCode'
    }
  ]
};

export const SUCCESS = {
  nonce: 'card-nonce',
  cardData: {},
  billingContact: {},
  shippingContact: {},
  shippingOption: {}
};
