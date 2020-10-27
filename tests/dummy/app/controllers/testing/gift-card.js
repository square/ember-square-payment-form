import Controller from '@ember/controller';

export default Controller.extend({
  nonceResponse: null,

  actions: {
    handleCardNonceResponse(errors, nonce, cardData) {
      this.set('nonceResponse', {
        errors: JSON.stringify(errors, null, '  '),
        nonce,
        cardData: JSON.stringify(cardData, null, '  ')
      });
    }
  }
});
