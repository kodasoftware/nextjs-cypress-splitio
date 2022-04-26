# Javascript Application Boilerplate

A starter boilerplate template for creating Typescript application.

## Why use this?

If you need to create a JavaScript/NodeJS based application for your project then this is the starting point for you at what3words. This template provides the base structure and configuration for Typescript, with linting and prettier rules, testing is run with Mocha, Sinon and test coverage and reports is provided by Istanbul.

It is also very quick to setup the CI pipeline. The CI pipeline will automatically transpile the project, run tests and coverage, publish the package to NPM and tag the git repo with the version in the project `package.json`. No configuration necessary!

## Getting Started

1. Create a new git repo and use this project as a template
2. Clone your new git repository locally
3. Run the setup bash script which will inject your project name into the required files and clean up after itself. __This is irreversible!__
```bash
## The escaping of special characters is required here!!
./scripts/setup.sh "<PROJECT>"
```
4. Add the project to CircleCI
5. Ask [Chris][] or [Thomas][] to add the w3w service account user key to the CircleCI project for push access to the repo (for tagging).
6. Add your code __and tests__
7. Commit and enjoy!


##
[Chris]: https://github.com/c5haw
[Thomas]: https://github.com/tzlillington