import {Component} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import {HiOutlineSearch, HiMenu} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'
import NavContext from '../../Context/NavContext'

class Header extends Component {
  render() {
    const {match} = this.props
    const {path} = match
    const activeHome = path === '/' ? 'active' : 'non-active'
    const activePopular = path === '/popular' ? 'active' : 'non-active'
    const activeAccount = path === '/account' ? 'active' : 'non-active'

    return (
      <NavContext.Consumer>
        {value => {
          const {isShowMenu, onChangeMenu} = value
          const onClickMenuIcon = () => {
            onChangeMenu()
          }
          const onClickWrongIcon = () => {
            onChangeMenu()
          }
          return (
            <div className="nav-bg-main-c">
              <nav className="nav-bg-container">
                <div className="log-home-popular-container">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1628099153/movie%20app%20mini%20project/580b57fcd9996e24bc43c529_d5ju8c.png"
                      alt="website logo"
                      className="navbar-movie-logo-css"
                    />
                  </Link>
                  <Link to="/" className="link">
                    <p className={`nav-home ${activeHome}`}>Home</p>
                  </Link>
                  <Link to="/popular" className="link">
                    <p className={`nav-home ${activePopular}`}>Popular</p>
                  </Link>
                </div>
                <div className="search-menu-c">
                  <Link to="/search">
                    <button
                      type="button"
                      className="button"
                      testid="searchButton"
                    >
                      <HiOutlineSearch className="search-icon" />
                    </button>
                  </Link>
                  <div className="search-account-container">
                    <button
                      type="button"
                      className="button"
                      onClick={onClickMenuIcon}
                    >
                      <HiMenu className="hi-menu" />
                    </button>
                    <Link to="/account">
                      <img
                        src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1627560313/movie%20app%20mini%20project/Avatar_j86jd5.jpg"
                        alt="profile"
                        className="avatar"
                      />
                    </Link>
                  </div>
                </div>
              </nav>
              {isShowMenu && (
                <div className="menu-list-container">
                  <div className="popular-account-container">
                    <Link to="/" className="link">
                      <p className={`m-nav-home ${activeHome}`}>Home</p>
                    </Link>
                    <Link to="/popular" className="link">
                      <p className={`m-nav-home ${activePopular}`}>Popular</p>
                    </Link>
                    <Link to="/account" className="link">
                      <p className={`m-nav-home ${activeAccount}`}>Account</p>
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="button"
                    onClick={onClickWrongIcon}
                  >
                    <IoIosCloseCircle className="w-icon" />
                  </button>
                </div>
              )}
            </div>
          )
        }}
      </NavContext.Consumer>
    )
  }
}

export default withRouter(Header)
