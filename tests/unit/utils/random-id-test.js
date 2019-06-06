import randomId from 'dummy/utils/random-id';
import { module, test } from 'qunit';

module('Unit | Utility | random-ids', function() {
  test('it generates an id', function(assert) {
    const result = randomId();
    assert.ok(result, 'id exists');
  });

  test('does not generate the same id when called repeatedly', function(assert) {
    const results = Array.from(Array(10), randomId);
    const resultSet = new Set(results);
    assert.equal(resultSet.size, results.length, 'no duplicates exist');
  });
});
