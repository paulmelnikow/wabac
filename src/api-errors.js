'use strict'

function isErrorReason(e, reason) {
  return e.errors.length === 1 && e.errors[0].reason === reason
}

module.exports = {
  isErrorReason,
}
