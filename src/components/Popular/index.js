import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import Footer from '../Footer'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  popular: 'POPULAR',
}

class Popular extends Component {
  state = {
    isShowMenu: false,
    pageNo: 1,
    popularList: {totalPages: 0, results: []},
    apiStatus: apiStatusList.initial,
    showInput: false,
  }

  componentDidMount() {
    this.getThePopularData()
  }

  getThePopularData = async () => {
    const {pageNo} = this.state
    this.setState({apiStatus: apiStatusList.inProgress})
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US&page=${pageNo}`,
    )
    const fetchedData = await response.json()
    if (response.ok === true) {
      const totalPages = fetchedData.total_results
      const data = fetchedData.results
      const updatedData = data.map(each => ({
        id: each.id,
        title: each.original_title,
        adult: each.adult,
        releaseDate: each.release_date,
        runtime: '145',
        overview: each.overview,
        genres: each.genre_ids,
        audio: each.original_language,
        ratingCount: each.vote_count,
        rating: each.vote_average,
        budget: '50000',
        popularity: each.popularity,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
      }))
      this.setState({
        popularList: {totalPages, results: [...updatedData]},
        apiStatus: apiStatusList.popular,
      })
    }
  }

  onClickLeftArrow = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo - 1}),
        this.getThePopularData,
      )
    }
  }

  onClickRightArrow = () => {
    const {popularList, pageNo} = this.state
    const {totalPages} = popularList
    if (pageNo < totalPages - 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo + 1}),
        this.getThePopularData,
      )
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader
        type="TailSpin"
        color=" #D81F26"
        height={70}
        width={70}
        className="spin"
      />
    </div>
  )

  renderThePopularList = () => {
    const {popularList, pageNo} = this.state
    return (
      <>
        <ul className="p-ul">
          {popularList.results.map(each => (
            <Link to={`/SpecificMovieDetails/${each.id}`} key={each.id}>
              <li className="p-li">
                <img
                  src={`https://image.tmdb.org/t/p/w500${each.posterPath}`}
                  alt={each.title}
                  className="p-poster"
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
          <p className="page-para">{`${pageNo}  of  ${popularList.totalPages}`}</p>
          <button
            type="button"
            className="right-button"
            onClick={this.onClickRightArrow}
          >
            <MdKeyboardArrowRight
              className="left-icons"
              onClick={this.onClickRightArrow}
            />
          </button>
        </div>
        <Footer />
      </>
    )
  }

  renderTheFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.inProgress:
        return this.renderLoader()
      case apiStatusList.popular:
        return this.renderThePopularList()
      default:
        return null
    }
  }

  updateIsShow = () => {
    this.setState(prevState => ({isShowMenu: !prevState.isShowMenu}))
  }

  updateSearch = value => {
    this.setState({search: value})
  }

  isShowInput = () => {
    this.setState(prevState => ({showInput: !prevState.showInput}))
  }

  changeTheSearchInput = value => {
    this.setState({search: value})
  }

  render() {
    const {isShowMenu, search, showInput} = this.state
    return (
      <>
        <Navbar
          updateIsShow={this.updateIsShow}
          isShowMenu={isShowMenu}
          isShowInput={this.isShowInput}
          showInput={showInput}
          search={search}
          changeTheSearchInput={this.changeTheSearchInput}
        />
        <div className="popular-bg-container">{this.renderTheFunction()}</div>
      </>
    )
  }
}

export default Popular
