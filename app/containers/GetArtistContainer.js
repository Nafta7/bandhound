import React from 'react'
import GetArtist from '../components/GetArtist'
import PropTypes from 'prop-types'
import PlayerControls from '../components/PlayerControls'

class GetArtistContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      artist: ''
    }

    this.handleSubmitArtist = this.handleSubmitArtist.bind(this)
    this.handleUpdateArtist = this.handleUpdateArtist.bind(this)
  }

  handleSubmitArtist(e) {
    e.preventDefault()
    if (this.state.artist.trim() === '') return
    this.context.router.history.push(`/discovery/${this.state.artist}`)
  }

  handleUpdateArtist(e) {
    this.setState({
      artist: e.target.value
    })
  }

  render() {
    return (
      <GetArtist
        type={this.props.type}
        onSubmitArtist={this.handleSubmitArtist}
        onUpdateArtist={this.handleUpdateArtist}
        artist={this.state.artist}
      />
    )
  }
}

GetArtistContainer.defaultProps = {
  type: PropTypes.string
}

GetArtistContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default GetArtistContainer
