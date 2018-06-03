'use strict'

const { isErrorReason } = require('./api-errors')

class Cache {
  constructor({ storage, bucketName }) {
    Object.assign(this, { storage, bucketName })
  }

  async initialize({ location }) {
    await this.storage.createBucket(this.bucketName, {
      location,
      storageClass: 'regional',
      versioning: { enabled: true },
    })
  }

  async initializeIfNeeded(options) {
    try {
      await this.initialize(options)
    } catch (e) {
      if (!isErrorReason(e, 'conflict')) {
        throw e
      }
    }
  }

  async get(key, { maxAgeSeconds }) {
    throw Error('Not implemented')
  }

  async getVersion(key, asOfDate) {
    throw Error('Not implemented')
  }

  async delete(key) {
    throw Error('Not implemented')
  }

  async put(key) {
    throw Error('Not implemented')
  }

  async drop(key) {
    throw Error('Not implemented')
  }

  async dropAll() {
    throw Error('Not implemented')
  }
}

module.exports = Cache
