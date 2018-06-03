'use strict'
/* eslint-disable no-process-env */

require('dotenv').config()

module.exports = {
  projectId: process.env.TEST_PROJECT_ID,
  bucketName: process.env.TEST_BUCKET_NAME,
  location: process.env.TEST_LOCATION,
}
