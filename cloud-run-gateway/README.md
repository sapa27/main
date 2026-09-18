# sapa27 Cloud Run Production Service

Production architecture:

`Browser -> Cloud Run -> GAS`

CR-7 removes GitHub Pages from the runtime chain. GitHub is used only as the source repository and CI/CD trigger.

## CR-7 Runtime Decoupling

- Canonical frontend source: `frontend/`
- Production browser origin: `https://sapa27-gateway-asxuzzwspa-eu.a.run.app`
- Browser API path: same-origin `/api/router`
- Cloud Run to GAS: server-to-server JSON POST
- Browser has no GAS URL, GAS parent origin, JSONP, iframe bridge, or GitHub Pages transport configuration.
- The frontend transport is `frontend/cloud-run-transport.js`.
- CR-6 nested API classification, bounded read cache, stale-while-revalidate, write invalidation epochs, and deferred bundle expansion remain enabled.
- CR-5 mobile Meeting protections remain enabled.

The initial CR-7 deployment enables the legacy GAS RPC only as a server-side emergency fallback while the deploy smoke test proves that production GAS accepts direct JSON POST. The smoke gate fails unless `/health` reports `gas-direct-json` without degradation. After that proof, the fallback is removed in CR-7 final.

Deployment marker: `CR-7-proven-server-rpc-final-smoke-20260918`
