import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import {
  FailureContainer,
  FailureImage,
  TryAgainButton,
  FailurePara,
} from './styledComponent'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    pageNo: 1,
    popularList: [],
    apiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getThePopularData()
  }

  getThePopularData = async () => {
    this.setState({apiStatus: apiStatusList.in_Progress})
    const jwtToken = Cookies.get('jwt_token')
    const {pageNo} = this.state
    const popularMoviesApiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US&page=${pageNo}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(popularMoviesApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.results.map(each => ({
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
        totalPages: data.total_pages,
      }))
      this.setState({
        popularList: [...updatedData],
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
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

    if (pageNo < popularList[0].totalPages - 1) {
      this.setState(
        prevState => ({pageNo: prevState.pageNo + 1}),
        this.getThePopularData,
      )
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
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
          {popularList.map(each => (
            <Link to={`/movies/${each.id}`}>
              <li className="p-li" key={each.id}>
                <img
                  src={`https://image.tmdb.org/t/p/original/${each.posterPath}`}
                  alt={each.title}
                  className="p-poster"
                />
              </li>
            </Link>
          ))}
        </ul>
        {popularList.length !== 0 && (
          <div className="page-function">
            <button
              type="button"
              className="left-button"
              onClick={this.onClickLeftArrow}
            >
              <MdKeyboardArrowLeft className="left-icons" />
            </button>
            <p className="page-para">
              {pageNo} of {popularList[0].totalPages}
            </p>
            <button
              type="button"
              className="right-button"
              onClick={this.onClickRightArrow}
            >
              <MdKeyboardArrowRight className="left-icons" />
            </button>
          </div>
        )}
        <Footer />
      </>
    )
  }

  onClickPopularTryAgainButton = () => {
    this.setState({}, this.getThePopularData)
  }

  renderTheFailure = () => (
    <FailureContainer>
      <FailureImage
        src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1643298392/movie%20app%20mini%20project/Background-Complete_rlcxnf.png"
        alt="failure view"
      />
      <FailurePara>Something went wrong. Please try again</FailurePara>
      <TryAgainButton onClick={this.onClickPopularTryAgainButton}>
        Try Again
      </TryAgainButton>
    </FailureContainer>
  )

  renderTheFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.in_Progress:
        return this.renderLoader()
      case apiStatusList.success:
        return this.renderThePopularList()
      case apiStatusList.failure:
        return this.renderTheFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="popular-bg-container">{this.renderTheFunction()}</div>
      </>
    )
  }
}

export default Popular
