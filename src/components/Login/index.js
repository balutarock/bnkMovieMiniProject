import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  loginSuccess = requestToken => {
    Cookies.set('jwt_token', requestToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.push('/')
  }

  loginFailed = loginData => {
    this.setState({errorMsg: loginData.status_message})
    const {history} = this.props
    history.push('/login')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const tokenUrl =
      'https://api.themoviedb.org/3/authentication/token/new?api_key=639ba2e19fa297642eec1cefb28ef177'
    const response = await fetch(tokenUrl)
    const data = await response.json()
    const requestToken = data.request_token

    const loginUrl =
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=639ba2e19fa297642eec1cefb28ef177'
    const userDetails = {
      username,
      password,
      request_token: requestToken,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }

    const loginResponse = await fetch(loginUrl, options)
    const loginData = await loginResponse.json()
    if (loginResponse.ok === true) {
      this.loginSuccess(loginData.request_token)
    } else {
      this.loginFailed(loginData)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="log-in-bg-container">
        <div className="logo-heading-container">
          <img
            src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1627541130/movie%20app%20mini%20project/Group_7399_xsp0dx.png"
            alt="movie-logo"
            className="movie-logo-css"
          />
        </div>
        <div className="form-container">
          <form className="sing-in-container" onSubmit={this.onSubmitForm}>
            <h1 className="sign-in-heading">Sign in</h1>
            <div className="label-input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                placeholder="User name"
                className="input-ele"
                onChange={this.onChangeUserName}
                value={username}
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="input-ele"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            {errorMsg === '' ? null : (
              <p className="error-msg">username not correct</p>
            )}
            <div className="button-container">
              <button className="sign-in-button" type="submit">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
