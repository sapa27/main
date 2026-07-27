# Production Current Transport Lock

This document keeps the original filename for package-script compatibility only. The active rule is Production Current, not a new release phase.

## Active transport

Browser and critical-login runtime must use Vercel proxy only:

- `/api/login`
- `/api/gas`

## Disabled legacy behavior

The legacy GAS bridge, JSONP API, and fast-login paths are retained only as disabled compatibility stubs. They must return `LEGACY_TRANSPORT_DISABLED` and must not call `google.script.run`, hidden iframe bridge, JSONP, or the disabled bridge call as a working router transport.

## Single owner lock

- `AppTransport.run` owns browser transport.
- `AppPageKit.apiRunner` owns page API calls.
- `apiRouter` owns backend routing.
- `AppDirtyRefreshOwner` owns dirty refresh.
- `AppTransport.inFlightOnly` owns client in-flight dedupe.
- backend/router cache only owns read cache.

Legacy browser cache owner aliases and stale cache-named helpers must not be recreated.
