'use strict';
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const join = require('path').join;

module.exports = {
  name: require('./package').name,
  contentFor(type, config) {
    if (type === 'head') {
      return '<script type="text/javascript" src="https://js.squareup.com/v2/paymentform"></script>';
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

