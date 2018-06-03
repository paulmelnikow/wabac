'use strict'

class Cache {
  constructor({ storage, bucketName }) {
    throw Error('Not implemented')
  }

  initialize() {
    throw Error('Not implemented')
  }

  get(key, { maxAgeSeconds }) {
    throw Error('Not implemented')
  }

  getVersion(key, asOfDate) {
    throw Error('Not implemented')
  }

  delete(key) {
    throw Error('Not implemented')
  }

  put(key) {
    throw Error('Not implemented')
  }

  drop(key) {
    throw Error('Not implemented')
  }

  dropAll() {
    throw Error('Not implemented')
  }
}

module.exports = Cache
