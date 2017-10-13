import axios from 'axios'
import get from 'lodash.get'
import slugg from 'slugg'
const credentials = require('../../credentials.json')

const key = `key=${credentials.youtube.apiKey}`
const baseUrl = `https://www.googleapis.com/youtube/v3/search?`
const partsParam = `part=snippet`
const fieldsParam = `fields=items(id, snippet(title))`
const allowedParam = `videoEmbeddable=true&videoSyndicated=true&type=video`
const params = `${partsParam}&${fieldsParam}&${allowedParam}`

function fetchTrack(options) {
  const artist = options.artist
  const track = options.track
  const searchParams = `q=${slugg(artist)}-${slugg(track)}`
  const url = `${baseUrl}&${searchParams}&${params}&${key}`
  let song = null
  let videoId

  if (!artist || !track) return

  return axios
    .get(url)
    .then(data => {
      videoId = get(data, 'data.items[0].id.videoId')
      song = {
        artist: artist,
        track: track,
        videoId
      }
      return song
    })
    .catch(err => {
      // TODO: Proper handle of the error
      console.log(err)
    })
}

function fetchTopTracks(topTracksData) {
  let tracks = axios
    .all(
      topTracksData.map(item => {
        return fetchTrack({ artist: item[0].artist.name, track: item[0].name })
      })
    )
    .then(values => values.filter(x => x))

  return tracks
}

export default fetchTopTracks
