import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  getUsername = e => {
    this.setState({username: e.target.value})
  }

  getPassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmitSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async e => {
    const {username, password} = this.state
    e.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="login-main-container">
        <div className="login-image-card">
          <img
            src="https://res.cloudinary.com/dbqkeyfhb/image/upload/v1680334634/Login_Rectangle_iqbga2.jpg"
            alt="login rectangle"
            className="website login"
          />
        </div>
        <div className="login-credentials-card">
          <div className="login-card">
            <img
              src="https://res.cloudinary.com/dbqkeyfhb/image/upload/v1680336804/LoginTextBookImage_yrohyn.jpg"
              alt="login website logo"
            />
            <form className="form-control" onSubmit={this.submitForm}>
              <label htmlFor="username">Username*</label>
              <input
                type="text"
                placeholder="username"
                value={username}
                id="username"
                onChange={this.getUsername}
              />
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                placeholder="password"
                value={password}
                id="password"
                onChange={this.getPassword}
              />
              {showError && <p className="error-msg">{errorMsg}</p>}
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
