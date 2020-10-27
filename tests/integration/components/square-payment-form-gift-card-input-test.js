import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | square-payment-form-gift-card-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`<SquarePaymentFormGiftCardInput @formId="123"/>`);

    const formElement = document.getElementById('sq-123-gift-card-input');
    assert.ok(formElement, 'form ID should propagate to the postal code input');
  });

  test('it passes the placeholder data attribute through', async function(assert) {
    await render(hbs`
      <SquarePaymentFormGiftCardInput
        @formId="123"
        @placeholder="1234 5678 9012 3456"
      />
    `);

    const formElement = document.getElementById('sq-123-gift-card-input');
    assert.equal(
      formElement.dataset.placeholder,
      '1234 5678 9012 3456',
      'placeholder data attribute is passed through'
    );
  });
});
