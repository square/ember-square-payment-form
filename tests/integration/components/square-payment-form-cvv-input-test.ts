import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | square-payment-form-cvv-input', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('formId', 'abc');

    await render(hbs`{{square-payment-form-cvv-input formId=formId}}`);

    const placeholderElement = document.getElementById('sq-abc-cvv-input');
    assert.ok(placeholderElement, 'form ID should propagate to the postal input');
  });
});
