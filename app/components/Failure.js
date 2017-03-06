import React from 'react'

const PropTypes = React.PropTypes

function Failure({ message }) {
  return (
    <div className={`message`}>
      <p>
        Well this is embarrassing...
      </p>
      <p className='message-text'>
        {message}.
      </p>
    </div>
  )
}

Failure.propTypes = {
  message: PropTypes.string.isRequired
}

export default Failure
