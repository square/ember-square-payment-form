import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | square-payment-form-masterpass-button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <SquarePaymentFormMasterpassButton
        @formId="123"
      />
    `);

    const buttonEl = find('button');

    assert.ok(buttonEl, 'button exists');
    assert.ok(
      buttonEl.classList.contains('square-payment-form__masterpass-button'),
      'default button class exists'
    );
    assert.equal(
      buttonEl.id,
      'sq-123-masterpass-button',
      'button ID is computed from formId parameter'
    );
    assert.equal(
      buttonEl.attributes['aria-label'].value,
      'Pay with Masterpass',
      'adds aria-label attribute to describe the button'
    );
    assert.ok(
      buttonEl.classList.contains('square-payment-form-element--hidden'),
      'button is "hidden" by default'
    );
  });

  test('it shows the button when isSupported is true', async function(assert) {
    await render(hbs`
      <SquarePaymentFormMasterpassButton
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
