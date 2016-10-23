import axios from 'axios'
import fetchTopTracks from './youtube-api'
import credentials from '!json!../../credentials.json'

const baseUrl = `http://ws.audioscrobbler.com/2.0/?`
const getSimilarUrl = `${baseUrl}method=artist.getsimilar
  &api_key=${credentials.lastfm.apiKey}&limit=5&format=json&artist=`
const getTopTracksUrl = `${baseUrl}method=artist.gettoptracks
  &api_key=${credentials.lastfm.apiKey}&limit=3&format=json&mbid=`

function getSimilarArtists(artist) {
  return axios.get(`${getSimilarUrl}${artist}`)
    .then(data => {
      return data.data.similarartists.artist.map(x => x.mbid)
    })
}

function getTopTracks(mbid) {
  return axios.get(`${getTopTracksUrl}${mbid}`)
    .then(data => {
      return data.data.toptracks.track
    })
}

function getSimilarArtistsTopTracks (artists){
  return axios.all(artists.map(similar => {
    return getTopTracks(similar)
  }))
}

export { getSimilarArtists, getSimilarArtistsTopTracks }
