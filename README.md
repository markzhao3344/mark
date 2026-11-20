# AI Travel OS: TripState prototype

An early prototype for a planned travel system that helps replan hotel check-ins, transport, activities, and budgets when a flight changes.

## Implemented

`tripstate.ts` uses JSON Patch to update a flight arrival, test the expected state version, and increment the version. Validation runs on a copy of the state. A stale version throws an error; the caller's state and non-refundable hotel cost remain unchanged.

This is an in-memory state update primitive. It is not yet a scheduling engine, database concurrency solution, or booking integration.

## Run the checks

Requires Node.js 24 or later.

```sh
npm ci --ignore-scripts
node verify.mjs
```

The checks cover a valid arrival update and rejection of a stale version, including protection of the original state and hotel cost.

## Planned MVP

- TypeScript backend with PostgreSQL for shared TripState storage.
- Scheduling engine, API endpoints, conflict detection, and a simple dashboard.
- Simulated flight updates first; read-only booking integrations later. Any real cancellation, booking change, or payment requires user approval.

I am applying for Poke's free month of Devin Max to help build this MVP. This repository records the small prototype completed so far.
