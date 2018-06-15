'use strict'

const crypto = require('crypto')
const { promisify } = require('util')
const gzip = promisify(require('zlib').gzip)
const { isErrorReason } = require('./api-errors')

class Cache {
  constructor({ storage, bucketName, defaultContentType }) {
    Object.assign(this, { storage, bucketName, defaultContentType })
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

  get bucket() {
    return this.storage.bucket(this.bucketName)
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

  async put(key, value, options = {}) {
    const { contentType = this.defaultContentType } = options

    const commonOpts = {
      gzip: true,
      // Disable resumable uploads, because they leak state across
      // processes, leading to unpredictable behavior.
      // https://github.com/googleapis/nodejs-storage/issues/217
      resumable: false,
    }

    // Create a new key.
    try {
      await this.bucket.file(key, { generation: 0 }).save(value, {
        contentType,
        ...commonOpts,
      })
      return
    } catch (e) {
      if (!isErrorReason(e, 'conditionNotMet')) {
        throw e
      }
    }

    // Update an existing key.
    const existing = this.bucket.file(key)
    const [{ md5Hash: oldHash }] = await existing.getMetadata()

    const newHash = crypto
      .createHash('md5')
      .update(await gzip(value))
      .digest('base64')
    if (oldHash === newHash) {
      // Setting the metadata has a side effect of updating the
      // `metageneration` and the `updated` date.
      await existing.setMetadata({})
    } else {
      await existing.save(value, { ...commonOpts })
    }
  }

  async drop(key) {
    throw Error('Not implemented')
  }

  async dropAll() {
    throw Error('Not implemented')
  }
}

module.exports = Cache
