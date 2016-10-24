import axios from 'axios'
import credentials from '!json!../../credentials.json'

const key = `key=${credentials.youtube.apiKey}`
const baseUrl = `https://www.googleapis.com/youtube/v3/search?`
const partsParam = `part=snippet`
const fieldsParam = `fields=items(id, snippet(title))`
const allowedParam = `videoEmbeddable=true&videoSyndicated=true&type=video`
const params = `${partsParam}&${fieldsParam}&${allowedParam}`

function fetchTrack(options) {
  const artist = options.artist || 'hopesfall'
  const track = options.track || 'Waitress'
  const searchParams = `q=${artist} - ${track}`
  const url = `${baseUrl}&${searchParams}&${params}&${key}`

  return axios.get(url)
    .then(data => {
      return {
        artist: artist,
        track: track,
        videoId: data.data.items[0].id.videoId
      }
    })
    .catch(err => {
      console.log(err);
    })
}

function fetchTopTracks(topTracksData){
  return axios.all(topTracksData.map(item => {
    if (item)
      return fetchTrack({artist: item[0].artist.name, track: item[0].name })
    else
      return null
    
  }))
}


export default fetchTopTracks
