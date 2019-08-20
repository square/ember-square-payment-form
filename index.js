'use strict';
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const join = require('path').join;

function jsUrlForEnvironment(config) {
  if (config.squarePaymentForm) {
    if (config.squarePaymentForm.jsUrl) {
      return config.squarePaymentForm.jsUrl;
    } else if (config.squarePaymentForm.environment === 'sandbox') {
      return 'https://js.squareupsandbox.com/v2/paymentform';
    }
  }

  // If we're in development or test mode, we probably want to use sandbox instead
  // of production.
  if (config.environment === 'development' || config.environment === 'test') {
    return 'https://js.squareupsandbox.com/v2/paymentform';
  } else {
    return 'https://js.squareup.com/v2/paymentform';
  }
}

module.exports = {
  name: require('./package').name,
  contentFor(type, config) {
    if (type === 'head') {
      return `<script type="text/javascript" src="${jsUrlForEnvironment(config)}"></script>`;
    }
  },
  treeForPublic: function() {
    const imagesDir = new Funnel(join(this.root, 'vendor/images'), {
      include: ['*.svg'],
      destDir: '/assets/square-payment-form-images'
    });

    return mergeTrees([imagesDir]);
  }
};

