import './index.css'

const Failure = props => {
  const {retryFunction} = props

  const retry = () => {
    retryFunction()
  }

  return (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1685941178/alert-triangle_ubqbxa.png"
        alt="failure view"
      />

      <p className="went-wrong-text">Something went wrong. Please try again</p>
      <button className="failure-retry-button" type="button" onClick={retry}>
        Try again
      </button>
    </div>
  )
}

export default Failure

// *************
