import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import {
  FailureContainer,
  FailureImage,
  TryAgainButton,
  FailurePara,
} from './styledComponent'
import './index.css'
import Footer from '../Footer'

const apiStatusList = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SpecificMovieDetails extends Component {
  state = {
    movieData: {},
    similarMoviesList: [],
  }

  componentDidMount() {
    this.getTheData()
  }

  getTheId = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return id
  }

  getTheData = async () => {
    this.setState({apiStatus: apiStatusList.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const id = this.getTheId()
    const moviesUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US`
    const options = {
      method: 'GET',
      Authorization: `Bearer ${jwtToken}`,
    }
    const moreLikeUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US&page=1`

    const responseOfMovies = await fetch(moviesUrl, options)
    const responseOfMoreLike = await fetch(moreLikeUrl, options)
    if (responseOfMovies.ok === true && responseOfMoreLike.ok === true) {
      const data = await responseOfMovies.json()
      const dataOfMoreLike = await responseOfMoreLike.json()
      const updatedData = {
        id: data.id,
        title: data.original_title,
        adult: data.adult,
        releaseDate: data.release_date,
        runtime: data.runtime,
        overview: data.overview,
        genres: data.genres,
        audio: data.spoken_languages,
        ratingCount: data.vote_count,
        rating: data.vote_average,
        budget: data.budget,
        popularity: data.popularity,
        backdropPath: data.backdrop_path,
        posterPath: data.poster_path,
      }
      const genresData =
        updatedData.genres &&
        updatedData.genres.map(each => ({
          id: each.id,
          name: each.name,
        }))
      const audioData =
        updatedData.audio &&
        updatedData.audio.map(each => ({
          id: each.iso_639_1,
          name: each.name,
        }))
      const finalUpdateData = {
        id: data.id,
        title: data.original_title,
        adult: data.adult,
        releaseDate: data.release_date,
        runtime: data.runtime,
        overview: data.overview,
        genres: genresData,
        audio: audioData,
        ratingCount: data.vote_count,
        rating: data.vote_average,
        budget: data.budget,
        popularity: data.popularity,
        backdropPath: data.backdrop_path,
        posterPath: data.poster_path,
      }
      const fetchedData = dataOfMoreLike.results.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        movieData: {...finalUpdateData},
        similarMoviesList: [...fetchedData],
        apiStatus: apiStatusList.success,
      })
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  renderTheLoader = () => (
    <div className="h-loader-container">
      <div className="l" testid="loader">
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

  renderTheMovieDetails = () => {
    const {movieData} = this.state
    const {genres, audio} = movieData
    return (
      <div className="s-m-second-container">
        <div className="s-m-genres">
          <h1 className="genres">genres</h1>
          <ul className="ul">
            {genres &&
              genres.map(each => (
                <li key={each.id} className="li">
                  {each.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="s-m-genres">
          <h1 className="genres">Audio Available</h1>
          <ul className="ul">
            {audio &&
              audio.map(each => (
                <li key={each.id} className="li">
                  {each.name}
                </li>
              ))}
          </ul>
        </div>
        <div>
          <h1 className="genres">Rating Count</h1>
          <p className="li">{movieData.ratingCount}</p>
          <h1 className="genres">Rating Average</h1>
          <p className="li">{movieData.rating}</p>
        </div>
        <div>
          <h1 className="genres">Budget</h1>
          <p className="li">{movieData.budget}</p>
          <h1 className="genres">Release Date</h1>
          <p className="li">{movieData.releaseDate}</p>
        </div>
      </div>
    )
  }

  renderTheSimilarMovies = () => {
    const {similarMoviesList} = this.state
    return (
      <div className="more-like-container">
        <h1 className="m-l-t">More like this</h1>
        <ul className="s-m-l-container">
          {similarMoviesList.map(each => (
            <li key={each.id}>
              <img
                src={`https://image.tmdb.org/t/p/original/${each.posterPath}`}
                alt={each.title}
                className="li-img"
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderTheSpecificMovieDetailsPage = () => {
    const {movieData} = this.state
    const hours = Math.floor(movieData.runtime / 60)
    const min = movieData.runtime % 60
    return (
      <>
        <div
          className="s-m-first-container"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieData.backdropPath})`,
          }}
        >
          <div className="s-m-details">
            <h1 className="s-m-heading">{movieData.title}</h1>
            <div className="time-container">
              <p className="li p">
                {hours}h {min}m
              </p>
              {movieData.adult === true ? (
                <h1 className="content-type">A</h1>
              ) : (
                <h1 className="outline-content">U/A</h1>
              )}
              <p className="li p">{movieData.releaseDate.split('-')[0]}</p>
            </div>
            <p className="s-m-para">{movieData.overview}</p>
            <button type="button" className="s-m-play-button">
              Play
            </button>
          </div>
          <div>
            <div className="s-m-img-bottom-style"> </div>
          </div>
        </div>
        {this.renderTheMovieDetails()}
        {this.renderTheSimilarMovies()}
      </>
    )
  }

  onClickMoviesTryAgainButton = () => {
    this.setState({}, this.getTheData)
  }

  renderTheFailure = () => (
    <FailureContainer>
      <FailureImage
        src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1643298392/movie%20app%20mini%20project/Background-Complete_rlcxnf.png"
        alt="failure view"
      />
      <FailurePara>Something went wrong. Please try again</FailurePara>
      <TryAgainButton onClick={this.onClickMoviesTryAgainButton}>
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
        return this.renderTheSpecificMovieDetailsPage()
      case apiStatusList.failure:
        return this.renderTheFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-movie-bg-container">
        <Header />
        {this.renderTheFunction()}
        <Footer />
      </div>
    )
  }
}

export default SpecificMovieDetails
