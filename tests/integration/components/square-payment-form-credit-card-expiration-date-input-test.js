import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | square-payment-form-credit-card-expiration-date-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<SquarePaymentFormCreditCardExpirationDateInput @formId="123"/>`);

    const formElement = document.getElementById('sq-123-credit-card-expiration-date-input');
    assert.ok(formElement, 'form ID should propagate to the expiration date input');
  });

  test('it passes the placeholder data attribute through', async function(assert) {
    await render(hbs`
      <SquarePaymentFormCreditCardExpirationDateInput
        @formId="123"
        @placeholder="12/24"
      />
    `);

    const formElement = document.getElementById('sq-123-credit-card-expiration-date-input');
    assert.equal(
      formElement.dataset.placeholder,
      '12/24',
      'placeholder data attribute is passed through'
    );
  });
});
