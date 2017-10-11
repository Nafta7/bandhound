import React from 'react'
import Loading from './Loading'

const MoreButton = props => {
  if (props.isLoading) {
    return <Loading size="small" />
  } else {
    const classy = props.reachEnd ? ' hidden' : ''
    return (
      <button
        className={`btn btn-fit btn-load-more ${classy}`}
        onClick={props.handleLoadMoreClick}
      >
        Load more
      </button>
    )
  }
}

export default MoreButton
