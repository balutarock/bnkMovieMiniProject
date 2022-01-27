import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import '../styles.css'
import SliderListItem from '../SliderListItem'

import {
  HomeFirstContainer,
  SliderLoaderContainer,
  HomeSecondContainer,
  HomeSliderFailureContainer,
  AlertError,
  RetryButton,
  FailureContainer,
  AlertImage,
} from './styledComponent'

const apiStatusListOfFirst = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
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
    apiStatusOfFirst: apiStatusListOfFirst.initial,
    apiStatusOfTrending: apiStatusListOfTrending.initial,
    apiStatusOfTopRated: apiStatusListOfTopRated.initial,
    apiStatusOfOriginal: apiStatusListOfOriginal.initial,
    randomObject: {},
    trendingList: [],
    topRatedList: [],
    originalList: [],
  }

  componentDidMount() {
    this.getTheMovieData()
    this.getTheTrendingData()
    this.getTheTopRatedData()
    this.getTheOriginalData()
  }

  getTheMovieData = async () => {
    this.setState({apiStatusOfFirst: apiStatusListOfFirst.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const originalApiUrl =
      'https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177'

    // ('https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177') //
    // 'https://api.themoviedb.org/3/movie/popular?api_key=639ba2e19fa297642eec1cefb28ef177&language=en-US&' //

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(originalApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const arrayLength = data.results.length
      const randomItem =
        data.results[Math.floor(Math.random() * (arrayLength - 1))]
      const updatedData = {
        id: randomItem.id,
        title: randomItem.name,
        backdropPath: randomItem.backdrop_path,
        overview: randomItem.overview,
      }
      this.setState({
        randomObject: {...updatedData},
        apiStatusOfFirst: apiStatusListOfFirst.success,
      })
    } else {
      this.setState({apiStatusOfFirst: apiStatusListOfFirst.failure})
    }
  }

  getTheTrendingData = async () => {
    this.setState({apiStatusOfTrending: apiStatusListOfTrending.in_progress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingNowApiUrl =
      'https://api.themoviedb.org/3/trending/all/week?api_key=639ba2e19fa297642eec1cefb28ef177'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingNowApiUrl, options)
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
        apiStatusOfTrending: apiStatusListOfTrending.success,
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
    })
    const jwtToken = Cookies.get('jwt_token')
    const originalApiUrl =
      'https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177'
    const options = {
      method: 'GET',
      header: `Bearer ${jwtToken}`,
    }
    const response = await fetch(originalApiUrl, options)
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
        originalList: [...updatedData],
      })
    } else {
      this.setState({apiStatusOfOriginal: apiStatusListOfOriginal.failure})
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

  renderTheTrendingSlider = () => {
    const {trendingList} = this.state
    const settings = {slidesToShow: 4, slidesToScroll: 4}
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
    const settings = {slidesToShow: 4, slidesToScroll: 4}
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
    const settings = {slidesToShow: 4, slidesToScroll: 4}
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

  onClickTrendingTryAgainButton = () => {
    this.setState({}, this.getTheTrendingData)
  }

  renderTheApiStatusOfTrending = () => {
    const {apiStatusOfTrending} = this.state
    switch (apiStatusOfTrending) {
      case apiStatusListOfTrending.success:
        return this.renderTheTrendingSlider()
      case apiStatusListOfTrending.in_progress:
        return this.renderTheSliderLoading()
      case apiStatusListOfTrending.failure:
        return this.renderTheSliderFailure(this.onClickTrendingTryAgainButton)

      default:
        return null
    }
  }

  onClickTopRatedTryAgainButton = () => {
    this.setState({}, this.getTheTopRatedData)
  }

  renderTheApiStatusOfTopRated = () => {
    const {apiStatusOfTopRated} = this.state
    switch (apiStatusOfTopRated) {
      case apiStatusListOfTopRated.success:
        return this.renderTheTopRatedSlider()
      case apiStatusListOfTopRated.in_progress:
        return this.renderTheSliderLoading()
      case apiStatusListOfOriginal.failure:
        return this.renderTheSliderFailure(this.onClickTopRatedTryAgainButton)

      default:
        return null
    }
  }

  renderTheHomeFirstContainer = () => {
    const {randomObject} = this.state
    const {title, backdropPath, overview} = randomObject
    return (
      <HomeFirstContainer path={backdropPath}>
        <>
          <div className="details">
            <h1 className="home-heading">{title}</h1>
            <h1 className="home-para">{overview}</h1>
            <button type="button" className="play-button">
              Play
            </button>
          </div>

          <div>
            <div className="img-bottom-style"> </div>
          </div>
        </>
      </HomeFirstContainer>
    )
  }

  renderTheHomeFirstLoading = () => (
    <SliderLoaderContainer h>
      <Loader
        type="TailSpin"
        color=" #D81F26"
        height={50}
        width={50}
        className="spin"
      />
    </SliderLoaderContainer>
  )

  onClickHomeFirstTryAgainButton = () => {
    this.setState({}, this.getTheMovieData)
  }

  renderTheSliderFailure = (func, isLong) => (
    <FailureContainer>
      <HomeSliderFailureContainer h={isLong}>
        <AlertImage
          src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1643303783/movie%20app%20mini%20project/alert-triangle_eeuzgc.png"
          alt="failure view"
        />
        <AlertError>Something went wrong. Please try again</AlertError>
        <RetryButton type="button" onClick={func}>
          Try Again
        </RetryButton>
      </HomeSliderFailureContainer>
    </FailureContainer>
  )

  renderTheHomeApiStatus = () => {
    const {apiStatusOfFirst} = this.state
    switch (apiStatusOfFirst) {
      case apiStatusListOfFirst.success:
        return this.renderTheHomeFirstContainer()
      case apiStatusListOfFirst.failure:
        return this.renderTheSliderFailure(
          this.onClickHomeFirstTryAgainButton,
          true,
        )
      case apiStatusListOfFirst.in_progress:
        return this.renderTheHomeFirstLoading()

      default:
        return null
    }
  }

  onClickOriginalTryAgainButton = () => {
    this.setState({}, this.getTheOriginalData)
  }

  renderTheOriginalApiStatus = () => {
    const {apiStatusOfOriginal} = this.state
    switch (apiStatusOfOriginal) {
      case apiStatusListOfOriginal.success:
        return this.renderTheOriginalSlider()
      case apiStatusListOfOriginal.failure:
        return this.renderTheSliderFailure(this.onClickOriginalTryAgainButton)
      case apiStatusListOfOriginal.in_progress:
        return this.renderTheSliderLoading()

      default:
        return null
    }
  }

  renderTheHomePage = () => (
    <div>
      {this.renderTheHomeApiStatus()}
      <HomeSecondContainer className="trending-top-originals-container">
        <div className="slider-container">
          <h1 className="trending-heading">Trending Now</h1>
          {this.renderTheApiStatusOfTrending()}
        </div>
        <div className="slider-container">
          <h1 className="trending-heading">Top Rated</h1>
          {this.renderTheApiStatusOfTopRated()}
        </div>
        <div className="slider-container">
          <h1 className="trending-heading">Originals</h1>
          {this.renderTheOriginalApiStatus()}
        </div>
      </HomeSecondContainer>
      <Footer />
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">{this.renderTheHomePage()}</div>
      </>
    )
  }
}

export default Home

// 639ba2e19fa297642eec1cefb28ef177 //
