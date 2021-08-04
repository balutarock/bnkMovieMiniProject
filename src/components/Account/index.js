import {Component} from 'react'
import {withRouter} from 'react-router'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {HiMenu} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

class Account extends Component {
  state = {isShowMenu: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onClickMenu = () => {
    this.setState(prevState => ({isShowMenu: !prevState.isShowMenu}))
  }

  onClickWrongIcon = () => {
    this.setState(prevState => ({isShowMenu: !prevState.isShowMenu}))
  }

  render() {
    const {isShowMenu} = this.state
    return (
      <div className="account-bg-container">
        <nav className="nav-bg-ac-container">
          <div className="a-log-home-popular-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1628099153/movie%20app%20mini%20project/580b57fcd9996e24bc43c529_d5ju8c.png"
                alt="movie-logo"
                className="navbar-movie-logo-css"
              />
            </Link>
            <Link to="/" className="link">
              <p className="nav-home">Home</p>
            </Link>
            <Link to="/myList" className="link">
              <p className="nav-home">MyList</p>
            </Link>
          </div>
          <button type="button" className="button" onClick={this.onClickMenu}>
            <HiMenu className="hi-m" />
          </button>
          <Link to="/account">
            <img
              src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1627560313/movie%20app%20mini%20project/Avatar_j86jd5.jpg"
              alt="avatar"
              className="avatar"
            />
          </Link>
        </nav>
        {isShowMenu && (
          <div className="menu-list-container">
            <div className="popular-account-container">
              <Link to="/" className="link">
                <p className="a-home">Home</p>
              </Link>
              <Link to="/popular" className="link">
                <p className="a-home">Popular</p>
              </Link>
              <Link to="/account" className="link">
                <p className="a-home">Account</p>
              </Link>
            </div>
            <button
              type="button"
              className="button"
              onClick={this.onClickWrongIcon}
            >
              <IoIosCloseCircle className="a-wrong-icon" />
            </button>
          </div>
        )}
        <div className="a-card-container">
          <div className="a-c">
            <h1 className="a-heading">Account</h1>
            <hr />

            <div className="membership-c">
              <p className="m-heading">MemberShip </p>
              <div>
                <p className="email">balutarock71117@gmail.com </p>
                <p className="password">Password **********</p>
              </div>
            </div>
            <hr />
            <div className="p-c">
              <p className="m-heading">Plan details</p>
              <div className="premium-c">
                <p className="premium">Premium</p>

                <p className="c">Ultra HD</p>
              </div>
            </div>
            <hr />
            <div className="b-c">
              <button
                type="button"
                className="logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Account)
