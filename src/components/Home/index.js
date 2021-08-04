import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import ReactSlider from '../ReactSlick'
import Footer from '../Footer'
import './index.css'
import '../styles.css'

const url = {
  trendingUrl:
    'https://api.themoviedb.org/3/trending/all/week?api_key=639ba2e19fa297642eec1cefb28ef177',
  topRatedUrl:
    'https://api.themoviedb.org/3/movie/top_rated?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US',
  originalUrl:
    'https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177',
}

const apiStatusList = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  home: 'HOME',
}

class Home extends Component {
  state = {
    isShowMenu: false,
    apiStatus: apiStatusList.home,
    showInput: false,
    randomItemObj: {},
    inputSearch: '',
  }

  componentDidMount() {
    this.getTheRandomOriginal()
  }

  getTheRandomOriginal = async () => {
    this.setState({apiStatus: apiStatusList.inProgress})
    const options = {
      method: 'GET',
    }
    const response = await fetch(url.originalUrl, options)
    console.log(response)
    const data = await response.json()
    const arrayLength = data.results.length
    const randomItem = data.results[Math.floor(Math.random() * arrayLength)]
    const updatedItem = {
      id: randomItem.id,
      backdropPath: randomItem.backdrop_path,
      firstAirDate: randomItem.first_air_date,
      name: randomItem.name,
      overview: randomItem.overview,
      popularity: randomItem.popularity,
      voteAverage: randomItem.vote_average,
      voteCount: randomItem.vote_count,
      posterPath: randomItem.poster_path,
    }
    this.setState({
      randomItemObj: {...updatedItem},
      apiStatus: apiStatusList.home,
    })
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

  renderTheHomePage = () => {
    const {randomItemObj} = this.state
    return (
      <div>
        <div
          className="home-first-section"
          style={{
            background: `url(https://image.tmdb.org/t/p/original${randomItemObj.backdropPath})`,
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <>
            <div className="details">
              <h1 className="home-heading">{randomItemObj.name}</h1>
              <p className="home-para">{randomItemObj.overview}</p>
              <button type="button" className="play-button">
                Play
              </button>
            </div>

            <div>
              <div className="img-bottom-style"> </div>
            </div>
          </>
        </div>

        <div className="trending-top-originals-container">
          <div className="slider-container">
            <h1 className="trending-heading">Trending Now</h1>
            <ReactSlider url={url.trendingUrl} />
          </div>
          <div className="slider-container">
            <h1 className="trending-heading">Top Rated</h1>
            <ReactSlider url={url.topRatedUrl} />
          </div>
          <div className="slider-container">
            <h1 className="trending-heading">Originals</h1>
            <ReactSlider url={url.originalUrl} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderTheFunction = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.inProgress:
        return this.renderTheLoader()
      case apiStatusList.home:
        return this.renderTheHomePage()
      default:
        return null
    }
  }

  render() {
    const {showInput, isShowMenu, inputSearch} = this.state
    return (
      <>
        <Navbar
          updateIsShow={this.updateIsShow}
          isShowMenu={isShowMenu}
          isShowInput={this.isShowInput}
          showInput={showInput}
          inputSearch={inputSearch}
          changeTheSearchInput={this.changeTheSearchInput}
        />
        <div className="home-bg-container">{this.renderTheFunction()}</div>
      </>
    )
  }
}

export default Home

// 639ba2e19fa297642eec1cefb28ef177 //
