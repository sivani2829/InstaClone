import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>

        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <div className="login-image">
          <img
            src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1684764945/Layer_2_jvmufv.png"
            alt="website login"
          />
        </div>
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="details-page">
            <img
              src="https://res.cloudinary.com/dmdr9a99a/image/upload/v1684765366/Standard_Collection_8_pzz6kt.png"
              className="login-website-logo-desktop-image"
              alt="website logo"
            />
            <h1 className="insta-heading">Insta Share</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>

            <button type="submit" className="login-button">
              Login
            </button>

            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
