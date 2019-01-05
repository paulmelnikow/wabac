# wabac

A versioned cache backed by cloud storage.

## Install

```
$ yarn add -D wabac
```

## Usage

Follow the [Google Cloud Storage quickstart][quickstart]. In particular, you
must [set up authentication with a service account][auth] and set the
`GOOGLE_APPLICATION_CREDENTIALS` access variable.

```js
```

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
