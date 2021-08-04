import {Component} from 'react'
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import './styles.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
  ],
}

class ReactSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {netflixOriginals: []}
  }

  componentDidMount() {
    this.fetchNetflixOriginalsData()
  }

  fetchNetflixOriginalsData = () => {
    const {url} = this.props
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({netflixOriginals: response.results})
      })
  }

  renderSlider = () => {
    const {netflixOriginals} = this.state

    return (
      <Slider {...settings}>
        {netflixOriginals.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

          return (
            <Link to={`/SpecificMovieDetails/${movie.id}`} key={movie.id}>
              <div className="image-container">
                <img
                  className="each-image"
                  alt="img"
                  src={movieImage}
                  width="100%"
                  height="100%"
                />
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {netflixOriginals} = this.state

    return (
      <div className="slick-app-container">
        <div style={{width: '100%'}}>
          {netflixOriginals.length ? (
            this.renderSlider()
          ) : (
            <p style={{textAlign: 'center'}}>Loading...................</p>
          )}

          <Slider {...settings}> </Slider>
        </div>
      </div>
    )
  }
}

export default withRouter(ReactSlider)

// 'https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177', //
