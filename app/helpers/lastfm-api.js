import axios from 'axios'
const credentials = require('../../credentials.json')

const baseUrl = `https://ws.audioscrobbler.com/2.0/?`
const getSimilarUrl = `${baseUrl}method=artist.getsimilar
  &api_key=${credentials.lastfm.apiKey}&format=json`
const getTopTracksUrl = `${baseUrl}method=artist.gettoptracks
  &api_key=${credentials.lastfm.apiKey}&limit=3&format=json&mbid=`

function getSimilarArtists(artist, page = 1, limit = 2) {
  let tailSize = (page - 1) * limit
  let totalSize = page * limit
  let similar
  return axios
    .get(`${getSimilarUrl}&limit=${totalSize}&artist=${artist}`)
    .then(data => {
      similar = data.data.similarartists
      if (!similar)
        return Promise.reject(new Error(`We couldn't find any similar artists`))

      similar = similar.artist
      similar = similar.slice(tailSize).map(artistData => {
        if (artistData.mbid) {
          return artistData.mbid
        }
      })
      return similar.filter(x => x)
    })
}

function getTopTracks(mbid) {
  return axios.get(`${getTopTracksUrl}${mbid}`).then(data => {
    if (!data.data.error) return data.data.toptracks.track
  })
}

function getSimilarArtistsTopTracks(artists) {
  return axios.all(
    artists.map(similar => {
      return getTopTracks(similar)
    })
  )
}

export { getSimilarArtists, getSimilarArtistsTopTracks }
