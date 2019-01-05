'use strict'

const { Storage } = require('@google-cloud/storage')
const chai = require('chai')
const { expect } = require('chai')
const randomstring = require('randomstring')
const Cache = require('./cache')
const { isErrorReason } = require('./api-errors')
const { projectId, bucketName, location } = require('./test-config')

// require('request-debug')(require('request'));

chai.use(require('chai-as-promised'))
chai.use(require('chai-datetime'))

before('Delete the test bucket', async function() {
  const bucket = new Storage({ projectId }).bucket(bucketName)
  try {
    await bucket.deleteFiles({ versions: true })
    await bucket.delete()
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
        await cache.initialize({ location })

        const [metadata] = await storage.bucket(bucketName).getMetadata()
        expect(metadata.versioning).to.deep.equal({ enabled: true })
      })

      it('should error when bucket already exists', async function() {
        await expect(cache.initialize({ location })).to.be.rejectedWith(
          'You already own this bucket. Please select another name.'
        )
      })
    })

    describe('initializeIfNeeded', function() {
      it('should not error when bucket already exists', async function() {
        await cache.initializeIfNeeded({ location })
      })
    })
  })

  describe('put', function() {
    let key
    let data
    let cachedFile
    beforeEach(function() {
      key = `http://example.com/${randomstring.generate()}.html`
      data = randomstring.generate()
      cachedFile = storage.bucket(bucketName).file(key)
    })

    context('A new key', function() {
      it('should create the object and assign the content type', async function() {
        const contentType = 'application/imagined'

        // Act.
        await cache.put(key, data, { contentType })

        // Assert.
        const [contents] = await cachedFile.download()
        expect(contents.toString()).to.equal(data)

        const [
          { contentType: actualContentType },
        ] = await cachedFile.getMetadata()
        expect(actualContentType).to.equal(contentType)
      })
    })

    context('An existing key', function() {
      beforeEach(async function() {
        await cache.put(key, data)
      })

      context('with new contents', function() {
        const newData = randomstring.generate()
        it('updates the contents', async function() {
          await cache.put(key, newData)

          const [contents] = await cachedFile.download()
          expect(contents.toString()).to.equal(newData)
        })
      })

      context('with identical contents', function() {
        it('preserves the generation and updates the date', async function() {
          const beforeUpdate = new Date()

          const [
            { generation: beforeGeneration },
          ] = await cachedFile.getMetadata()

          await cache.put(key, data)

          const afterUpdate = new Date()

          const [
            { generation: afterGeneration, updated },
          ] = await cachedFile.getMetadata()

          expect(afterGeneration).to.equal(beforeGeneration)
          expect(new Date(updated)).to.be.withinDate(beforeUpdate, afterUpdate)
        })
      })
    })
  })
})
