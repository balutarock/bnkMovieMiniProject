import {Component} from 'react'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  searching: 'SEARCHING',
}

class SearchedResults extends Component {
  state = {
    apiStatus: apiStatusList.initial,
    searchedList: {totalPages: 1, results: []},
    pageNo: 1,
    showInput: true,
  }

  componentDidMount() {
    this.getTheSearchedListAndUpdateState()
  }

  getTheSearchedListAndUpdateState = async () => {
    const {location} = this.props
    const {search} = location
    const se = search.slice(3)
    const {pageNo} = this.state
    this.setState({apiStatus: apiStatusList.inProgress})
    const urlForSearchedList = `https://api.themoviedb.org/3/search/movie?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US&query=${se}&page=${pageNo}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(urlForSearchedList, options)
    if (response.ok === true) {
      const data = await response.json()
      const totalPages = data.total_pages
      const updateData = data.results.map(each => ({
        id: each.id,
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIds: each.genre_ids,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))
      this.setState({
        searchedList: {totalPages, results: [...updateData]},
        apiStatus: apiStatusList.searching,
      })
    }
  }

  renderTheLoader = () => (
    <div className="h-loader-container">
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
    const {inputSearch} = this.state
    return (
      <div className="no-match-c">
        <img
          src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1627896995/movie%20app%20mini%20project/Group_7394_sbnlxy.png"
          alt="no-matches"
          className="match-img"
        />
        <p className="no-match-para">
          {`Your search for ${inputSearch} did not find any matches.`}
        </p>
      </div>
    )
  }

  renderTheSearchResults = () => {
    const {searchedList, pageNo} = this.state
    return (
      <div className="searched-results-c">
        {searchedList.results.length === 0 ? (
          this.renderMatchNotFound()
        ) : (
          <>
            <ul className="searchedList-ul">
              {searchedList.results.map(each => (
                <Link to={`/SpecificMovieDetails/${each.id}`} key={each.id}>
                  <li key={each.id} className="searched-li">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${each.posterPath}`}
                      alt={each.id}
                      className="img-li"
                    />
                  </li>
                </Link>
              ))}
            </ul>
            <div className="page-function">
              <button
                type="button"
                className="left-button"
                onClick={this.onClickLeftArrow}
              >
                <MdKeyboardArrowLeft className="left-icons" />
              </button>
              <p className="page-para">{`${pageNo}  of  ${searchedList.totalPages}`}</p>
              <button
                type="button"
                className="right-button"
                onClick={this.onClickRightArrow}
              >
                <MdKeyboardArrowRight className="left-icons" />
              </button>
            </div>
            <Footer />
          </>
        )}
      </div>
    )
  }

  updateIsShow = () => {
    this.setState(prevState => ({isShowMenu: !prevState.isShowMenu}))
  }

  updateSearch = value => {
    this.setState({inputSearch: value})
  }

  isShowInput = () => {
    this.setState(prevState => ({showInput: !prevState.showInput}))
  }

  changeTheSearchInput = value => {
    this.setState({inputSearch: value})
    this.getTheSearchedListAndUpdateState(value)
  }

  onClickRightArrow = () => {
    const {searchedList, pageNo} = this.state
    const {totalPages} = searchedList
    if (pageNo < totalPages) {
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

  onClickedEnterButton = value => {
    this.setState({inputSearch: value})
  }

  renderTheFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.inProgress:
        return this.renderTheLoader()
      case apiStatusList.searching:
        return this.renderTheSearchResults()
      default:
        return null
    }
  }

  render() {
    const {isShowMenu, showInput} = this.state
    const {location} = this.props
    const {search} = location
    const se = search.slice(3)
    return (
      <>
        <Navbar
          updateIsShow={this.updateIsShow}
          isShowMenu={isShowMenu}
          isShowInput={this.isShowInput}
          showInput={showInput}
          search={se}
          changeTheSearchInput={this.changeTheSearchInput}
          onClickedEnterButton={this.onClickedEnterButton}
        />
        <div className="bg-searchedList">{this.renderTheFunction()}</div>
      </>
    )
  }
}

export default SearchedResults
