import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | square-payment-form-apple-pay', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <SquarePaymentFormApplePayButton
        @formId="123"
      />
    `);

    const buttonEl = find('button');

    assert.ok(buttonEl, 'button exists');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button'),
      'default button class exists'
    );
    assert.equal(
      buttonEl.id,
      'sq-123-apple-pay-button',
      'button ID is computed from formId parameter'
    );
    assert.equal(
      buttonEl.lang,
      'us',
      'default language is set'
    );
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--style-black'),
      'default button style class exists'
    );
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--type-plain'),
      'default button type class exists'
    );
    assert.ok(
      buttonEl.classList.contains('square-payment-form-element--hidden'),
      'button is "hidden" by default'
    );
  });

  test('it handles all Apple Pay button styles', async function(assert) {
    this.set('style', 'black');

    await render(hbs`
      <SquarePaymentFormApplePayButton
        @formId="123"
        @style={{this.style}}
      />
    `);

    let buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--style-black'),
      'black button style renders'
    );

    this.set('style', 'white');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--style-white'),
      'white button style renders'
    );

    this.set('style', 'white-outline');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--style-white-outline'),
      'white outline button style renders'
    );
  });

  test('it handles all Apple Pay button types', async function(assert) {
    this.set('type', 'plain');

    await render(hbs`
      <SquarePaymentFormApplePayButton
        @formId="123"
        @type={{this.type}}
      />
    `);

    let buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--type-plain'),
      'plain button type renders'
    );

    this.set('type', 'buy');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--type-buy'),
      'buy button type renders'
    );

    this.set('type', 'donate');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--type-donate'),
      'donate button type renders'
    );

    this.set('type', 'check-out');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--type-check-out'),
      'check-out button type renders'
    );

    this.set('type', 'book');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--type-book'),
      'book button type renders'
    );

    this.set('type', 'subscribe');
    buttonEl = find('button');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__apple-pay-button--type-subscribe'),
      'subscribe button type renders'
    );
  });

  test('it passes the lang attribute through', async function(assert) {
    await render(hbs`
      <SquarePaymentFormApplePayButton
        @formId="123"
        @lang="fr_CA"
      />
    `);

    assert.equal(
      find('button').lang,
      'fr_CA',
      'lang attribute passes through'
    );
  });

  test('it shows the button when isSupported is true', async function(assert) {
    await render(hbs`
      <SquarePaymentFormApplePayButton
        @isSupported={{true}}
      />
    `);

    assert.notOk(
      find('button').classList.contains('square-payment-form-element--hidden'),
      'hidden class does not exist'
    );
  });
});
