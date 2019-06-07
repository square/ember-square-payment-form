import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | square-payment-form-google-pay-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <SquarePaymentFormGooglePayButton
        @formId="123"
      />
    `);

    const buttonEl = find('button');

    assert.ok(buttonEl, 'button exists');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button'),
      'default button class exists'
    );
    assert.equal(
      buttonEl.id,
      'sq-123-google-pay-button',
      'button ID is computed from formId parameter'
    );
    assert.equal(
      buttonEl.attributes['aria-label'].value,
      'Pay with Google Pay',
      'adds aria-label attribute to describe the button'
    );
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--lang-en'),
      'default button lang class exists'
    );
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--style-black'),
      'default button style class exists'
    );
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--type-short'),
      'default button type class exists'
    );
    assert.ok(
      buttonEl.classList.contains('square-payment-form-element--hidden'),
      'button is "hidden" by default'
    );
  });

  test('it handles all Google Pay button styles', async function(assert) {
    this.set('style', 'black');

    await render(hbs`
      <SquarePaymentFormGooglePayButton
        @formId="123"
        @style={{this.style}}
      />
    `);

    let buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--style-black'),
      'black button style renders'
    );

    this.set('style', 'white');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--style-white'),
      'white button style renders'
    );
  });

  test('it handles all Google Pay button types', async function(assert) {
    this.set('type', 'short');

    await render(hbs`
      <SquarePaymentFormGooglePayButton
        @formId="123"
        @type={{this.type}}
      />
    `);

    let buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--type-short'),
      'short button type renders'
    );

    this.set('type', 'long');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--type-long'),
      'long button type renders'
    );
  });

  test('it handles all Google Pay button languages', async function(assert) {
    this.set('lang', 'en');

    await render(hbs`
      <SquarePaymentFormGooglePayButton
        @formId="123"
        @lang={{this.lang}}
      />
    `);

    let buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--lang-en'),
      '"en" button lang class exists'
    );

    this.set('lang', 'es');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--lang-es'),
      '"es" button lang class exists'
    );

    this.set('lang', 'fr');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--lang-fr'),
      '"fr" button lang class exists'
    );

    this.set('lang', 'jp');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__google-pay-button--lang-jp'),
      '"jp" button lang class exists'
    );
  });

  test('it shows the button when isSupported is true', async function(assert) {
    await render(hbs`
      <SquarePaymentFormGooglePayButton
        @formId="123"
        @isSupported={{true}}
      />
    `);

    assert.notOk(
      find('button').classList.contains('square-payment-form-element--hidden'),
      'hidden class does not exist'
    );
  });
});
