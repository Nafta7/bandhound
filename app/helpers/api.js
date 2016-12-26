import { getSimilarArtists, getSimilarArtistsTopTracks } from './lastfm-api'
import fetchTopTracks from './youtube-api'

function getMixtape(artist, page, limit){
  return getSimilarArtists(artist, page, limit)
    .then(getSimilarArtistsTopTracks)
    .then(fetchTopTracks)
}

export { getMixtape }
