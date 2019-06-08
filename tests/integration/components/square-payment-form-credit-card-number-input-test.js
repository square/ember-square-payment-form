import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | square-payment-form-credit-card-number-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<SquarePaymentFormCreditCardNumberInput @formId="123"/>`);

    const formElement = document.getElementById('sq-123-credit-card-number-input');
    assert.ok(formElement, 'form ID should propagate to the number input');
  });

  test('it passes the placeholder data attribute through', async function(assert) {
    await render(hbs`
      <SquarePaymentFormCreditCardNumberInput
        @formId="123"
        @placeholder="4242 4242 4242 4242"
      />
    `);

    const formElement = document.getElementById('sq-123-credit-card-number-input');
    assert.equal(
      formElement.dataset.placeholder,
      '4242 4242 4242 4242',
      'placeholder data attribute is passed through'
    );
  });
});
