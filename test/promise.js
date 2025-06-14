'use strict';

const assert = require('assert');
const common = require('./common');

module.exports = common.runTest(test);

async function test (binding) {
  assert.strictEqual(binding.promise.isPromise({}), false);

  const resolving = binding.promise.resolvePromise('resolved');
  await assert.strictEqual(binding.promise.isPromise(resolving), true);
  resolving.then(common.mustCall()).catch(common.mustNotCall());

  const rejecting = binding.promise.rejectPromise('error');
  await assert.strictEqual(binding.promise.isPromise(rejecting), true);
  rejecting.then(common.mustNotCall()).catch(common.mustCall());

  assert(binding.promise.promiseReturnsCorrectEnv());

  const onFulfilled = (value) => value * 2;
  const result = binding.promise.thenMethodOnFulfilled(onFulfilled);
  assert.strictEqual(result.isPromise, true);
  const finalValue = await result.promise;
  assert.strictEqual(finalValue, 84);
}
