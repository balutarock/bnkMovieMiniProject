import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch, HiMenu} from 'react-icons/hi'
import {IoIosCloseCircle} from 'react-icons/io'
import Navbar from '../Navbar'
import Footer from '../Footer'
import {
  FailureContainer,
  FailureImage,
  TryAgainButton,
  FailurePara,
} from './styledComponent'
import './index.css'
import NavContext from '../../Context/NavContext'

const apiStatusList = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SearchedResults extends Component {
  state = {
    apiStatus: apiStatusList.initial,
    pageNo: 1,
    list: [],
    input: '',
  }

  componentDidMount() {
    this.getTheSearchedListAndUpdateState()
  }

  onChangeInput = event => {
    this.setState({input: event.target.value})
  }

  onClickSearch = () => {
    this.setState(
      prevState => ({input: prevState.input}),
      this.getTheSearchedListAndUpdateState,
    )
  }

  getTheSearchedListAndUpdateState = async () => {
    this.setState({apiStatus: apiStatusList.in_progress})
    const {input, pageNo} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const urlForSearchedList = `https://api.themoviedb.org/3/search/movie?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US&query=${input}&page=${pageNo}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(urlForSearchedList, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        totalPages: data.total_pages,
      }))
      this.setState({apiStatus: apiStatusList.success, list: [...updatedData]})
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderTheLoader = () => (
    <div className="h-loader-container" testid="loader">
      <div className="l">
        <Loader
          type="TailSpin"
          color=" #D81F26"
          height={70}
          width={70}
          className="spin"
        />
      </div>
    </div>
  )

  renderMatchNotFound = () => {
    const {input} = this.state
    return (
      <div className="no-match-c">
        <img
          src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1627896995/movie%20app%20mini%20project/Group_7394_sbnlxy.png"
          alt="no movies"
          className="match-img"
        />
        <p className="no-match-para">
          Your search for {input} did not find any matches.
        </p>
      </div>
    )
  }

  renderTheSearchResults = () => {
    const {list, pageNo} = this.state
    return (
      <div className="searched-results-c">
        {list.length === 0 ? (
          this.renderMatchNotFound()
        ) : (
          <ul className="searchedList-ul">
            {list.map(each => (
              <Link to={`/movies/${each.id}`}>
                <li key={each.id} className="searched-li">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${each.posterPath}`}
                    alt={each.title}
                    className="img-li"
                  />
                </li>
              </Link>
            ))}
          </ul>
        )}
        <div className="page-function">
          <button
            type="button"
            className="left-button"
            onClick={this.onClickLeftArrow}
          >
            <MdKeyboardArrowLeft className="left-icons" />
          </button>
          <p className="page-para">
            {pageNo} of {list[0].totalPages}
          </p>
          <button
            type="button"
            className="right-button"
            onClick={this.onClickRightArrow}
          >
            <MdKeyboardArrowRight className="left-icons" />
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  onClickRightArrow = () => {
    const {list, pageNo} = this.state
    if (pageNo < list[0].totalPages) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo + 1}),
        this.getTheSearchedListAndUpdateState,
      )
    }
  }

  onClickLeftArrow = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getTheSearchedListAndUpdateState,
      )
    }
  }

  onClickSearchTryAgainButton = () => {
    this.setState({}, this.getTheSearchedListAndUpdateState)
  }

  renderTheFailure = () => (
    <FailureContainer>
      <FailureImage
        src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1643298392/movie%20app%20mini%20project/Background-Complete_rlcxnf.png"
        alt="failure view"
      />
      <FailurePara>Something went wrong. Please try again</FailurePara>
      <TryAgainButton onClick={this.onClickSearchTryAgainButton}>
        Try Again
      </TryAgainButton>
    </FailureContainer>
  )

  renderTheFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.in_progress:
        return this.renderTheLoader()
      case apiStatusList.success:
        return this.renderTheSearchResults()
      case apiStatusList.failure:
        return this.renderTheFailure()
      default:
        return null
    }
  }

  renderTheNavBar = (isShowMenu, onChangeMenu) => {
    const {input} = this.state
    const {match} = this.props
    const {path} = match
    const activeHome = path === '/' ? 'active' : 'non-active'
    const activePopular = path === '/popular' ? 'active' : 'non-active'
    const activeAccount = path === '/account' ? 'active' : 'non-active'
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
                alt="movie-logo"
                className="navbar-movie-logo-css"
              />
            </Link>
            <Link to="/" className="link">
              <p className="nav-home">Home</p>
            </Link>
            <Link to="/popular" className="link">
              <p className="nav-home">Popular</p>
            </Link>
          </div>
          <div className="search-menu-c">
            <div className="input-wrong-co">
              <div className="search-container">
                <input
                  type="search"
                  className="input-s"
                  onChange={this.onChangeInput}
                  value={input}
                  placeholder="Title"
                />
                <button
                  type="button"
                  className="button"
                  onClick={this.onClickSearch}
                  testid="searchButton"
                >
                  <HiOutlineSearch className="search-icon" />
                </button>
              </div>
            </div>
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
            <button type="button" className="button" onClick={onClickWrongIcon}>
              <IoIosCloseCircle className="w-icon" />
            </button>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <NavContext.Consumer>
        {value => {
          const {isShowMenu, onChangeMenu} = value
          return (
            <>
              {this.renderTheNavBar(isShowMenu, onChangeMenu)}
              <div className="bg-searchedList">{this.renderTheFunction()}</div>
            </>
          )
        }}
      </NavContext.Consumer>
    )
  }
}

export default SearchedResults
