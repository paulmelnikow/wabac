'use strict'

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
