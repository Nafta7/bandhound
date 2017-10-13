import React from 'react'
import Failure from '../components/Failure'

// Taken from https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    console.log(error)
    // Display fallback UI
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="container">
          <Failure message="Something went wrong in our servers" />
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
