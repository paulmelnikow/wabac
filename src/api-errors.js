'use strict'

function isErrorReason(e, reason) {
  if (e.errors === undefined) {
    // Handle download errors.
    return e.reason
  } else {
    // Handle most other errors.
    return e.errors.length === 1 && e.errors[0].reason === reason
  }
}

module.exports = {
  isErrorReason,
}
