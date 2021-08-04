import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  specificMovie: 'SPECIFICMOVIE',
}

class SpecificMovieDetails extends Component {
  state = {
    movieData: {},
    similarMoviesList: [],
    search: '',
    showInput: false,
    isShowMenu: false,
  }

  componentDidMount() {
    this.getTheData()
    this.getMoreLike()
  }

  getMoreLike = async () => {
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US&page=1`,
    )
    const data = await response.json()
    const fetchedData = data.results.map(each => ({
      id: each.id,
      posterPath: each.poster_path,
      title: each.title,
    }))
    this.setState({similarMoviesList: fetchedData})
  }

  getTheId = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return id
  }

  getTheData = async () => {
    this.setState({apiStatus: apiStatusList.inProgress})
    const id = this.getTheId()
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US`,
    )
    const data = await response.json()
    console.log(data)
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
    }
    const genresData = updatedData.genres.map(each => ({
      id: each.id,
      name: each.name,
    }))
    const audioData = updatedData.audio.map(each => ({
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
    }
    this.setState({
      movieData: {...finalUpdateData},
      apiStatus: apiStatusList.specificMovie,
    })
  }

  renderTheLoader = () => {
    const {isShowMenu, showInput, search} = this.state
    return (
      <div className="h-loader-container">
        <Navbar
          updateIsShow={this.updateIsShow}
          isShowMenu={isShowMenu}
          isShowInput={this.isShowInput}
          showInput={showInput}
          search={search}
          changeTheSearchInput={this.changeTheSearchInput}
          onClickedEnterButton={this.onClickedEnterButton}
        />

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
  }

  renderTheMovieDetails = () => {
    const {movieData} = this.state
    const {genres, audio} = movieData
    return (
      <div className="s-m-second-container">
        <div className="s-m-genres">
          <h1 className="genres">Genres</h1>
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
                alt={each.id}
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
              <p className="li p">{movieData.runtime} min</p>
              <svg
                className="sp p"
                width="46"
                height="25"
                viewBox="0 0 46 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.488 18.208C20.24 18.208 21.68 16.752 21.68 13.888V6.848H19.968V13.76C19.968 15.744 19.232 16.544 17.488 16.544C15.744 16.544 15.024 15.76 15.024 13.776V6.848H13.312V13.968C13.312 16.784 14.752 18.208 17.488 18.208ZM32.8033 18L28.4513 6.848H27.1233L22.7713 18H24.6273L25.5553 15.472H30.0193L30.9313 18H32.8033ZM27.7953 9.344L29.4593 13.92H26.1153L27.7953 9.344Z"
                  fill="white"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="45"
                  height="24"
                  rx="1.5"
                  stroke="white"
                />
              </svg>
              <p className="li p">{movieData.popularity}</p>
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

  updateIsShow = () => {
    this.setState(prevState => ({isShowMenu: !prevState.isShowMenu}))
  }

  updateSearch = value => {
    this.setState({search: value})
  }

  isShowInput = () => {
    this.setState(prevState => ({showInput: !prevState.showInput}))
  }

  changeTheSearchInput = () => {}

  renderTheFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.inProgress:
        return this.renderTheLoader()
      case apiStatusList.specificMovie:
        return this.renderTheSpecificMovieDetailsPage()
      default:
        return null
    }
  }

  render() {
    const {isShowMenu, search, showInput} = this.state
    return (
      <div className="specific-movie-bg-container">
        <Navbar
          updateIsShow={this.updateIsShow}
          isShowMenu={isShowMenu}
          isShowInput={this.isShowInput}
          showInput={showInput}
          search={search}
          changeTheSearchInput={this.changeTheSearchInput}
        />
        {this.renderTheFunction()}
      </div>
    )
  }
}

export default SpecificMovieDetails
