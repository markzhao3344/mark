import assert from 'node:assert/strict';
import { updateArrival } from './tripstate.ts';

const state = {
  version: 7,
  flight: { arrival: '2026-12-01T18:00:00Z' },
  hotel: { nonRefundableCost: 120 },
};
const original = structuredClone(state);
const next = updateArrival(state, 7, '2026-12-01T20:00:00Z');
assert.equal(next.version, 8);
assert.equal(next.flight.arrival, '2026-12-01T20:00:00Z');
assert.equal(next.hotel.nonRefundableCost, 120);
assert.deepEqual(state, original);
assert.throws(() => updateArrival(next, 7, '2026-12-01T21:00:00Z'), {
  name: 'TEST_OPERATION_FAILED',
});
assert.equal(next.version, 8);
assert.equal(next.flight.arrival, '2026-12-01T20:00:00Z');
console.log('PASS: valid update increments version; original and hotel cost unchanged.');
console.log('PASS: stale version is rejected without changing the current state.');
