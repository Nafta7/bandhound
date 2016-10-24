import fixtureData from '!json!../../test/fixtures/mixtape-data-one.json'
import { getSimilarArtists, getSimilarArtistsTopTracks } from './lastfm-api'
import fetchTopTracks from './youtube-api'

const isDev = true
const timerValue = 500

function getMixtapeFixture(artist, page = 1, limit = 2) {
  let tailSize = (page - 1) * limit
  let totalSize = page * limit
  var p = new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = fixtureData.data.slice(tailSize, totalSize)
      resolve(data)
    }, timerValue)
  })

  return p
}

function getMixtapeData(artist, page, limit){
  return getSimilarArtists(artist, page, limit)
    .then(getSimilarArtistsTopTracks)
    .then(fetchTopTracks)
}

function getMixtape(artist, page, limit) {
  if (isDev) {
    return getMixtapeFixture(artist, page, limit)
  } else {
    return getMixtapeData(artist, page, limit)
  }
}

export { getMixtape }
