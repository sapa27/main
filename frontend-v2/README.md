# Rebuild V2

Production-candidate frontend for the parliamentary committee case management system.

Runtime architecture:

Browser -> Cloud Run -> GAS Direct JSON

Key guarantees:
- no GitHub Pages runtime
- no browser-to-GAS transport
- no deferred page scripts
- no runtime page-controller registration
- static route registry with build/startup assertion
- route-bound request cancellation
- bounded read cache and request dedupe
- Meeting is a static route rendered synchronously before data fetches

Canary candidate: r2 meeting-stability build.

Main canary trigger: r2 validated build.

Health split canary: r2 validated gateway.
