# CI Fix Drill — Pipeline Recovery

This repository demonstrates diagnosing and repairing a broken Node.js CI pipeline with GitHub Actions.

## What was broken

- The dependency step used `npm install`, which can update the lockfile during CI instead of enforcing the committed dependency tree.
- The test job had no `needs: install` dependency, so it could run before the install job finished.
- GitHub Actions jobs run on separate, fresh runners. The test job had neither a checkout step nor dependency installation, so it could not run the repository's tests.
- The committed `package.json` declared `lodash`, but the lockfile had no lodash package entry and the source did not use lodash.
- The discount test expected the original price after a 10% discount, and the currency test used Jest's identity matcher for an object.

## What was fixed

- Use `npm ci` to install exactly the dependencies represented in the lockfile.
- Check out source and install dependencies independently in each job, then use `needs: install` to enforce the intended job order.
- Run lint and tests in the test job.
- Remove the unused lodash dependency so the manifest and existing lockfile agree.
- Correct the discount expectation and compare the formatted currency object by value with `toEqual`.
- Add an ESLint configuration that enables Node.js and Jest globals.

## Run locally

Requires Node.js 18 and npm.

```bash
npm ci
npm run lint
npm test
```

The GitHub Actions workflow runs on pushes to branches and pull requests targeting `main`. Use the Actions run linked from the recovery pull request as the authoritative record of the result.
