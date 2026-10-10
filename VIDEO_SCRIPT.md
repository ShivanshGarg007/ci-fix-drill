# 3–5 Minute CI Recovery Video Script

**Target length:** about 4 minutes. Record your actual screen and narration. Replace the bracketed notes with real results before claiming validation passed.

## 0:00–0:25 — Introduction

“Hi, this is my CI pipeline recovery walkthrough for the ci-fix-drill repository. I reviewed the failed workflow, separated the infrastructure/configuration issue from the test assertion issues, then fixed the pipeline and documented the changes in this pull request.”

## 0:25–1:10 — Show the original Actions failure

“Here is the original failed GitHub Actions run. The Run tests step reported npm error enoent because it could not find package.json in the runner workspace. That happened because the test job did not check out the repository. GitHub Actions jobs use fresh runners, so a previous job's filesystem and installed dependencies are not automatically available.”

“Also, the test job did not declare needs: install, so the two jobs could run in parallel.”

## 1:10–1:55 — Explain the test failures

“Next, I inspected the test source. A 10 percent discount from 100 should return 90, but the test expected 100. The implementation was correct; the expectation was wrong.”

“The currency test used Jest's toBe matcher for an object. toBe checks object identity, while toEqual checks its structure and values. I also chose a stable two-decimal input to avoid a floating-point rounding edge case in the test.”

## 1:55–2:45 — Show the dependency and workflow fixes

“The package manifest declared lodash, but the committed lockfile did not contain that dependency, and the source code does not use it. I removed the unused dependency so the manifest matches the lockfile, and CI uses npm ci for reproducible installation.”

“The workflow now uses Node.js 18 consistently. The install job performs a clean install. The lint-and-test job waits for the install job, checks out the source, installs dependencies on its own runner, and then runs lint and unit tests. The workflow has read-only repository permissions and triggers for pushes to any branch and pull requests targeting main.”

## 2:45–3:35 — Show validation

“Here is the new GitHub Actions run for the recovery commit: [open the actual run]. The install job status is [read actual status], and the lint-and-test job status is [read actual status].”

“If no run is available yet, do not claim the pipeline is green. Enable GitHub Actions for the fork if GitHub prompts for it, then trigger a new push or workflow run and return here with the actual result.”

## 3:35–4:15 — Show the pull request and close

“Here is the recovery pull request: https://github.com/ShivanshGarg007/ci-fix-drill/pull/1. The changed files include the workflow, the corrected tests, the ESLint configuration, and the diagnosis notes.”

“The key lesson is to use lockfile-based installs, understand that CI jobs have isolated runner environments, express dependencies between jobs explicitly, and verify test assertions against the intended behavior.”

## Upload checklist

- Record a 3–5 minute screen-share using your own narration.
- Show the real Actions logs, changed code, and pull request.
- Only state statuses that are visible in the actual run.
- Upload the recording to Google Drive, set access to “Anyone with the link — Viewer” if your course permits it, and verify the link opens in a private browser window.
