'use strict'

const Storage = require('@google-cloud/storage')
const { expect } = require('chai')
const Cache = require('./cache')
const { isErrorReason } = require('./api-errors')
const { projectId, bucketName, location } = require('./test-config')

require('chai').use(require('chai-as-promised'))

before('Delete the test bucket', async function() {
  this.timeout(10000)
  const storage = new Storage({ projectId })
  try {
    await storage.bucket(bucketName).delete()
  } catch (e) {
    if (!isErrorReason(e, 'notFound')) {
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

  describe('Initialization', function() {
    describe('initialize', function() {
      it('should create a versioned bucket', async function() {
        this.timeout(10000)
        await cache.initialize({ location })

        const [metadata] = await storage.bucket(bucketName).getMetadata()
        expect(metadata.versioning).to.deep.equal({ enabled: true })
      })

      it('should error when bucket already exists', async function() {
        this.timeout(10000)
        await expect(cache.initialize({ location })).to.be.rejectedWith(
          'You already own this bucket. Please select another name.'
        )
      })
    })

    describe('initializeIfNeeded', function() {
      it('should not error when bucket already exists', async function() {
        this.timeout(10000)
        await cache.initializeIfNeeded({ location })
      })
    })
  })
})
