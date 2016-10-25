import axios from 'axios'
import credentials from '!json!../../credentials.json'

const baseUrl = `http://ws.audioscrobbler.com/2.0/?`
const getSimilarUrl = `${baseUrl}method=artist.getsimilar
  &api_key=${credentials.lastfm.apiKey}&format=json`
const getTopTracksUrl = `${baseUrl}method=artist.gettoptracks
  &api_key=${credentials.lastfm.apiKey}&limit=3&format=json&mbid=`

function getSimilarArtists(artist, page = 1, limit = 2) {
  let tailSize = (page - 1) * limit
  let totalSize = page * limit
  return axios.get(`${getSimilarUrl}&limit=${totalSize}&artist=${artist}`)
    .then(data => {
      return data.data.similarartists.artist.slice(tailSize).map(x => x.mbid)
    })
}

function getTopTracks(mbid) {
  return axios.get(`${getTopTracksUrl}${mbid}`)
    .then(data => {
      if (data.data.error)
        return null
      else
        return data.data.toptracks.track
    })
}

function getSimilarArtistsTopTracks (artists){
  return axios.all(artists.map(similar => {
    return getTopTracks(similar)
  }))
}

export { getSimilarArtists, getSimilarArtistsTopTracks }
