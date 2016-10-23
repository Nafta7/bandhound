import fixtureData from '!json!../../test/fixtures/mixtape-data-one.json'
import { getSimilarArtists, getSimilarArtistsTopTracks } from './lastfm-api'
import fetchTopTracks from './youtube-api'

const isDev = true

function getMixtapeFixture(artist) {
  var p = new Promise((resolve, reject) => {
    resolve(fixtureData.data)
  })

  return p
}

function getMixtapeData(artist){
  return getSimilarArtists(artist)
    .then(getSimilarArtistsTopTracks)
    .then(fetchTopTracks)
}

function getMixtape(artist) {
  if (isDev) {
    return getMixtapeFixture(artist)
  } else {
    return getMixtapeData(artist)
  }
}

export { getMixtape }
