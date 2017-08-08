# Kalzate Data Model

[![MIT License](https://img.shields.io/npm/l/es6-lib-template.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Dependency Status](https://david-dm.org/semantic-release/semantic-release/caribou.svg)](https://david-dm.org/semantic-release/semantic-release/caribou)
[![devDependency Status](https://david-dm.org/semantic-release/semantic-release/caribou/dev-status.svg)](https://david-dm.org/semantic-release/semantic-release/caribou#info=devDependencies)
[![Build Status](https://travis-ci.org/semantic-release/semantic-release.svg?branch=caribou)](https://travis-ci.org/semantic-release/semantic-release)
[![Coverall Status](https://coveralls.io/repos/semantic-release/semantic-release/badge.svg?branch=caribou&service=github)](https://coveralls.io/github/semantic-release/semantic-release?branch=caribou)
[![Coverage Status](https://img.shields.io/codecov/c/github/danilorossi/es6-lib-template.svg?style=flat-square)](https://codecov.io/github/danilorossi/es6-lib-template)

## Why should I use it ?

Using this boilerplate will ease your workflow. It does include a set of well known, common good practices and provides all projects using it a common base where to start from.

## Getting started

We do recommend using Docker to make sure all members in the team are using the same environment, but if that's not an option, switch to the [Local Setup](#local_setup) section. Otherwise, read the instructions below depending on your host operative system to start working with Docker.

For committing to Github, please fill the `.gitconfig.template` file with your Github account info at the root path and rename it to `.gitconfig`. Consider also the same for `.npmrc.template` if it is required to publish to a private npm registry. Then, create the Docker image (just for the first time) and run it.

### Unix (Linux & OSX)

Create the Docker image by running `./scripts/docker/unix/create_image.sh` and use it by running `./scripts/docker/unix/run_image.sh`

### Windows

Create the Docker image by running `.\scripts\docker\win\create_image.bat` and use it by running `.\scripts\docker\win\run_image.bat`

## Local Setup

Before running this boilerplate locally, make sure the following dependencies are found in your system.

* [Nodejs](https://nodejs.org/en/download/) >= v6
* NPM (ships with Nodejs) or [Yarn](https://yarnpkg.com/lang/en/docs/install/) >= 0.24

Then, run either `yarn` or `npm install` to install all local dependencies.

## Usage

* `npm run build` : Use it for building your project, it produces a ready to ship, production ready, distributable artifact.
* `npm run test` : Use it to run your unit & integration test suites. It does also generates a coverage report
* `npm run watch:test`: Same as running your tests but keep it running whenever your source code or tests are updated
* `npm run lint`: Make it sure your code does compile to Airbnb styling conventions
* `npm run validate`: This runs the build, test and lint process. If any of them fail it will fail too. This is very handy for using on your CI tool.
* `npm run semantic-release`: It releases a new version based on semantic versioning by automatically pushing to Github, incrementing package version and publishing to the npm registry
