// @ts-ignore This check fails in ts:precompile despite working.
import randomId from 'dummy/utils/random-id';
import { module, test } from 'qunit';

module('Unit | Utility | random-ids', function() {

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = randomId();
    assert.ok(result);
  });
});
