# CI Failure Diagnosis and Recovery

## Findings

| Area | Evidence / root cause | Repair |
|---|---|---|
| Dependency installation | The prior workflow used `npm install`; the package manifest also declared lodash while the lockfile contained no lodash entry. | Remove the unused lodash dependency and use `npm ci` so CI respects the committed lockfile. |
| Job ordering | The `test` job did not declare a dependency on `install`, allowing both jobs to run in parallel. | Add `needs: install`. |
| Fresh runner state | The test job had no checkout and no install step. Each job runs in a separate runner environment. | Checkout and run `npm ci` in the test job too. |
| Discount assertion | A 10% discount on 100 should yield 90, but the test expected 100. | Change expected result to 90. |
| Currency assertion | Jest's `toBe` checks object identity, not structural equality. The original 10.005 input also depends on floating-point rounding behavior. | Use stable input 10.01 and `toEqual` to compare the returned object by value. |

## Workflow design

The `install` job validates that dependencies can be installed reproducibly from the lockfile. The `test` job is gated by `needs: install`, then checks out and installs dependencies again because jobs do not share a filesystem. It runs both lint and unit tests.

The workflow has read-only repository permissions and runs for pushes to any branch and pull requests targeting `main`.

## Verification record

Use the GitHub Actions run associated with the recovery branch or pull request to record the actual result. Do not report a passing check until the run has completed successfully. The original observed run failed before tests started because the test job could not find `package.json`; the incorrect assertions above were identified by inspecting the test source, not from that run's log.
