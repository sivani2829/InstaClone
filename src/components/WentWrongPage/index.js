import './index.css'

const WentWrongPage = props => {
  const {retryFunction} = props

  const retryClicked = () => {
    retryFunction()
  }
  return (
    <div className="something-went-wrong-image-container">
      <img
        className="something-went-wrong-image"
        src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1685029149/Group_7522_1_pjl4iz.png"
        alt="failure view"
      />
      <p className="something-went-wrong-text">
        Something went wrong. Please try again
      </p>
      <button className="try-again-button" type="button" onClick={retryClicked}>
        Try again
      </button>
    </div>
  )
}

export default WentWrongPage

// ********** */
