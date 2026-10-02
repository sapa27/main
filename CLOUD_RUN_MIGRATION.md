# Cloud Run migration gates

This branch introduces the migration boundary without changing the browser API contract.

## P0 — Frontend static migration

All runtime and page-controller assets used by normal routes are served from the Cloud Run container. The browser no longer calls GAS `getDeferredInclude` for these assets. GAS remains the data/API backend.

## P1 — API gateway consolidation

The browser continues to use the single same-origin ingress `POST /api/router`. The payload contract stays `{method,payload,timeoutMs}` and the response contract stays `gas-direct-json-v1`.

## P2 — Backend domain migration

Cloud Run now has a Google Sheets REST repository and an explicit domain-owner router. Domain cutover is intentionally fail-closed: adding a domain to `CLOUD_RUN_DOMAIN_OWNERS` requires a registered Cloud Run handler; otherwise the request returns `CLOUD_DOMAIN_OWNER_NOT_READY`. There is no hidden fallback to GAS for an enabled Cloud Run owner.

Planned order: Tracking → Meeting → Petitioner → People → Budget → Cases → Admin.

Before enabling the first owner, Production must provide `GOOGLE_SHEETS_SPREADSHEET_ID`, enable the Google Sheets API, and grant the Cloud Run runtime service account access to that spreadsheet. Auth/session parity must also be locked before write routes move.

Until those external prerequisites and per-domain parity tests pass, `CLOUD_RUN_DOMAIN_OWNERS` must remain empty and GAS remains the owner of backend domain methods.
