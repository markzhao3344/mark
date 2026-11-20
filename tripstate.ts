import { applyPatch } from 'fast-json-patch/index.mjs';

type TripState = {
  version: number;
  flight: { arrival: string };
  hotel: { nonRefundableCost: number };
};

export function updateArrival(state: TripState, version: number, arrival: string): TripState {
  return applyPatch(state, [
    { op: 'test', path: '/version', value: version },
    { op: 'replace', path: '/flight/arrival', value: arrival },
    { op: 'replace', path: '/version', value: version + 1 },
  ], true, false).newDocument;
}
