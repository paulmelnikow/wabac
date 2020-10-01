# wabac

[![version](https://img.shields.io/npm/v/wabac.svg?style=flat-square)][npm]
[![license](https://img.shields.io/npm/l/wabac.svg?style=flat-square)][npm]
[![build](https://img.shields.io/circleci/project/github/paulmelnikow/wabac.svg?style=flat-square)][build]
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)][prettier]

[npm]: https://npmjs.com/wabac
[build]: https://circleci.com/gh/paulmelnikow/wabac/tree/master
[prettier]: https://prettier.io/
[lerna]: https://lernajs.io/

A versioned cache backed by cloud storage.

## Install

```
$ npm install --save wabac
```

## Usage

Follow the [Google Cloud Storage quickstart][quickstart]. In particular, you
must [set up authentication with a service account][auth] and set the
`GOOGLE_APPLICATION_CREDENTIALS` access variable.

[quickstart]: https://github.com/googleapis/nodejs-storage#quickstart
[auth]: https://cloud.google.com/docs/authentication/getting-started

## Development

Designate a name for your test bucket. **Be careful! The tests will destroy
this bucket.**

Create a `.env`:

```sh
GOOGLE_APPLICATION_CREDENTIALS=...
TEST_LOCATION=us-east1
TEST_PROJECT_ID=your-project-here
TEST_BUCKET_NAME=careful-because-what-you-specify-will-get-wiped-out-by-the-tests
```

## License

This project is licensed under the MIT license.
