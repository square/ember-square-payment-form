import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | square-payment-form-credit-card-cvv-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<SquarePaymentFormCreditCardCvvInput @formId="123"/>`);

    const formElement = document.getElementById('sq-123-credit-card-cvv-input');
    assert.ok(formElement, 'form ID should propagate to the cvv input');
  });

  test('it passes the placeholder data attribute through', async function(assert) {
    await render(hbs`
      <SquarePaymentFormCreditCardCvvInput
        @formId="123"
        @placeholder="123"
      />
    `);

    const formElement = document.getElementById('sq-123-credit-card-cvv-input');
    assert.equal(
      formElement.dataset.placeholder,
      '123',
      'placeholder data attribute is passed through'
    );
  });
});
