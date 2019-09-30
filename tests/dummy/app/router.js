import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('testing', function() {
    this.route('card-only');
  });

  this.route('examples', function() {
    this.route('light');
    this.route('dark');
    this.route('unstyled');
  });

  docsRoute(this, function() {
    this.route('caveats');
    this.route('get-started');
    this.route('digital-wallets');
  });

  this.route('not-found', { path: '/*path' });
});

export default Router;
