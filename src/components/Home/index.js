import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Navbar from '../Navbar'
import ReactSlider from '../ReactSlick'
import Footer from '../Footer'
import './index.css'
import '../styles.css'
import SliderListItem from '../SliderListItem'

import {HomeFirstContainer, SliderLoaderContainer} from './styledComponent'

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
  in_progress: 'IN_PROGRESS',
  home: 'HOME',
  failure: 'FAILURE',
}

const apiStatusListOfTrending = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiStatusListOfTopRated = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiStatusListOfOriginal = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    isShowMenu: false,
    apiStatus: apiStatusList.initial,
    apiStatusOfTrending: apiStatusListOfTrending.initial,
    apiStatusOfTopRated: apiStatusListOfTopRated.initial,
    apiStatusOfOriginal: apiStatusListOfOriginal.initial,
    trendingList: [],
    topRatedList: [],
    originalList: [],
    showInput: false,
    inputSearch: '',
  }

  componentDidMount() {
    this.getTheOriginalData()
    this.getTheTrendingData()
    this.getTheTopRatedData()
  }

  getTheTrendingData = async () => {
    this.setState({apiStatusOfTrending: apiStatusListOfTrending.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingUrl =
      'https://api.themoviedb.org/3/trending/all/week?api_key=639ba2e19fa297642eec1cefb28ef177'
    const options = {
      method: 'GET',
      header: `Bearer ${jwtToken}`,
    }
    const response = await fetch(trendingUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(
        each =>
          each.poster_path !== null &&
          each.backdrop_path !== null &&
          each.id !== null && {
            id: each.id,
            posterPath: each.poster_path,
            backdropPath: each.backdrop_path,
            title: each.title,
            name: each.name,
          },
      )
      this.setState({
        apiStatusOfTrending: apiStatusListOfTrending.in_progress,
        trendingList: [...updatedData],
      })
    } else {
      this.setState({apiStatusOfTrending: apiStatusListOfTrending.failure})
    }
  }

  getTheTopRatedData = async () => {
    this.setState({apiStatusOfTopRated: apiStatusListOfTopRated.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const topRatedUrl =
      'https://api.themoviedb.org/3/movie/top_rated?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US'
    const options = {
      method: 'GET',
      header: `Bearer ${jwtToken}`,
    }
    const response = await fetch(topRatedUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(
        each =>
          each.poster_path !== null &&
          each.backdrop_path !== null &&
          each.id !== null && {
            id: each.id,
            posterPath: each.poster_path,
            backdropPath: each.backdrop_path,
            title: each.title,
            name: each.name,
          },
      )
      this.setState({
        apiStatusOfTopRated: apiStatusListOfTopRated.success,
        topRatedList: [...updatedData],
      })
    } else {
      this.setState({apiStatusOfTopRated: apiStatusListOfTopRated.failure})
    }
  }

  getTheOriginalData = async () => {
    this.setState({
      apiStatusOfOriginal: apiStatusListOfOriginal.in_progress,
      apiStatus: apiStatusList.in_progress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const originalUrl =
      'https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177'
    const options = {
      method: 'GET',
      header: `Bearer ${jwtToken}`,
    }
    const response = await fetch(originalUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(
        each =>
          each.poster_path !== null &&
          each.backdrop_path !== null &&
          each.id !== null && {
            id: each.id,
            posterPath: each.poster_path,
            backdropPath: each.backdrop_path,
            title: each.title,
            name: each.name,
          },
      )
      this.setState({
        apiStatusOfOriginal: apiStatusListOfOriginal.success,
        apiStatus: apiStatusList.success,
        originalList: [...updatedData],
      })
    } else {
      this.setState({apiStatusOfOriginal: apiStatusListOfOriginal.failure})
    }
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

  renderTheTrendingSlider = () => {
    const {trendingList} = this.state
    const settings = {slidesToShow: 4, slidesToScroll: 1}
    return (
      <Slider {...settings}>
        {trendingList.map(each => (
          <SliderListItem key={each.id} each={each} />
        ))}
      </Slider>
    )
  }

  renderTheTopRatedSlider = () => {
    const {topRatedList} = this.state
    const settings = {slidesToShow: 4, slidesToScroll: 1}
    return (
      <Slider {...settings}>
        {topRatedList.map(each => (
          <SliderListItem key={each.id} each={each} />
        ))}
      </Slider>
    )
  }

  renderTheOriginalSlider = () => {
    const {originalList} = this.state
    const settings = {slidesToShow: 4, slidesToScroll: 1}
    return (
      <Slider {...settings}>
        {originalList.map(each => (
          <SliderListItem key={each.id} each={each} />
        ))}
      </Slider>
    )
  }

  renderTheSliderLoading = () => (
    <SliderLoaderContainer>
      <Loader
        type="TailSpin"
        color=" #D81F26"
        height={50}
        width={50}
        className="spin"
      />
    </SliderLoaderContainer>
  )

  renderTheApiStatusOfTrending = () => {
    const {apiStatusOfTrending} = this.state
    switch (apiStatusOfTrending) {
      case apiStatusListOfTrending.success:
        return this.renderTheTrendingSlider()
      case apiStatusListOfTrending.in_progress:
        return this.renderTheSliderLoading()
      case apiStatusListOfTrending.failure:
        return this.renderTheSliderFailure()

      default:
        return null
    }
  }

  renderTheHomePage = () => {
    const {originalList} = this.state
    console.log(originalList)
    const arrayLength = originalList.length
    const randomItem =
      originalList[Math.floor(Math.random() * (arrayLength - 1))]
    const {name, backdropPath} = randomItem

    const settings = {slidesToShow: 4, slidesToScroll: 1}
    return (
      <div>
        <HomeFirstContainer path={backdropPath}>
          <>
            <div className="details">
              <h1 className="home-heading">{name}</h1>
              <p className="home-para">overview</p>
              <button type="button" className="play-button">
                Play
              </button>
            </div>

            <div>
              <div className="img-bottom-style"> </div>
            </div>
          </>
        </HomeFirstContainer>
        <div className="trending-top-originals-container">
          <div className="slider-container">
            <h1 className="trending-heading">Trending</h1>
            {this.renderTheApiStatusOfTrending()}
          </div>
          <div className="slider-container">
            <h1 className="trending-heading">Top Rated</h1>
            {this.renderTheTopRatedSlider()}
          </div>
          <div className="slider-container">
            <h1 className="trending-heading">Originals</h1>
            {this.renderTheOriginalSlider()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  renderTheApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.success:
        return this.renderTheHomePage()
      case apiStatusList.in_progress:
        return this.renderTheLoader()
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
        <div className="home-bg-container">{this.renderTheApiStatus()}</div>
      </>
    )
  }
}

export default Home

// 639ba2e19fa297642eec1cefb28ef177 //
