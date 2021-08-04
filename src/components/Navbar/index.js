import {Component} from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import {BsSearch} from 'react-icons/bs'
import {HiMenu} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'
import './index.css'

class Navbar extends Component {
  onClickMenuIcon = () => {
    const {updateIsShow} = this.props
    updateIsShow()
  }

  onClickWrongIcon = () => {
    const {updateIsShow} = this.props
    updateIsShow()
  }

  onClickSearch = () => {
    const {isShowInput} = this.props
    isShowInput()
  }

  onClickInputWrongIcon = () => {
    const {isShowInput} = this.props
    isShowInput()
  }

  onChangeInput = event => {
    const {changeTheSearchInput, history} = this.props
    history.push(`/search?q=${event.target.value}`)
    changeTheSearchInput(event.target.value)
  }

  onKeyDownInput = event => {
    const {onClickedEnterButton} = this.props
    onClickedEnterButton(event.key)
  }

  render() {
    const {showInput, inputSearch, match, isShowMenu} = this.props
    const {path} = match
    const activeHome = path === '/' ? 'active' : 'non-active'
    const activePopular = path === '/popular' ? 'active' : 'non-active'
    const activeAccount = path === '/account' ? 'active' : 'non-active'
    return (
      <div className="nav-bg-main-c">
        <nav className="nav-bg-container">
          <div className="log-home-popular-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1628099153/movie%20app%20mini%20project/580b57fcd9996e24bc43c529_d5ju8c.png"
                alt="movie-logo"
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
            {showInput === true ? (
              <div className="input-wrong-co">
                <div className="search-container">
                  <input
                    type="search"
                    className="input-s"
                    onChange={this.onChangeInput}
                    value={inputSearch}
                    placeholder="Title"
                  />
                  <BsSearch className="search-icon" />
                </div>

                <button
                  type="button"
                  className="button"
                  onClick={this.onClickInputWrongIcon}
                >
                  <IoIosCloseCircle className="w-icon" />
                </button>
              </div>
            ) : (
              <BsSearch className="search-icon" onClick={this.onClickSearch} />
            )}

            <div className="search-account-container">
              <button
                type="button"
                className="button"
                onClick={this.onClickMenuIcon}
              >
                <HiMenu className="hi-menu" />
              </button>
              <Link to="/account">
                <img
                  src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1627560313/movie%20app%20mini%20project/Avatar_j86jd5.jpg"
                  alt="avatar"
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
              onClick={this.onClickWrongIcon}
            >
              <IoIosCloseCircle className="w-icon" />
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Navbar)
