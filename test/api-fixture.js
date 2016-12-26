const fixtureData = require('./fixtures/mixtape-data-one.json')
import Constants from '../app/constants/Constants'

function getMixtape(artist, page = 1, limit = 2) {
  let tailSize = (page - 1) * limit
  let totalSize = page * limit
  var p = new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = fixtureData.data.slice(tailSize, totalSize)
      resolve(data)
    }, Constants.DEV_TIMER)
  })

  return p
}

module.exports = {
  getMixtape
}
