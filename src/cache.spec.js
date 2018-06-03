'use strict'

const Storage = require('@google-cloud/storage')
const { expect } = require('chai')
const Cache = require('./cache')
const { projectId, bucketName, location } = require('./test-config')

before('Delete the test bucket', async function() {
  const storage = new Storage({ projectId })
  try {
    await storage.bucket(bucketName).delete()
  } catch (e) {
    if (e.errors.length == 1 && e.errors[0].reason == 'notFound') {
      return
    } else {
      throw e
    }
  }
})

describe('Cache', function() {
  let storage
  let cache
  beforeEach(function() {
    storage = new Storage({ projectId })
    cache = new Cache({ storage, bucketName })
  })

  describe('initialize', function() {
    it('should create a versioned bucket', async function() {
      await cache.initialize({ location })

      const [metadata,] = await storage.bucket(bucketName).getMetadata()
      expect(metadata.versioning).to.deep.equal({ enabled: true })
    })
  })
})
