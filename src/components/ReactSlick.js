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

const ReactSlider = props => {
  const renderSlider = () => {
    const {dataList} = props

    return (
      <Slider>
        {dataList.map(movie => {
          const movieImage = `https://image.tmdb.org/t/p/original/${movie.posterPath}`
          return (
            <Link to={`/SpecificMovieDetails/${movie.id}`}>
              <div className="image-container" key={movie.id}>
                <img
                  className="each-image"
                  alt={movie.id}
                  src={movieImage}
                  width="100%"
                  height="100%"
                  key={movie.id}
                />
              </div>
            </Link>
          )
        })}
      </Slider>
    )
  }

  const {dataList} = props
  return (
    <div className="slick-app-container">
      <div style={{width: '100%'}}>
        {dataList.length ? (
          renderSlider()
        ) : (
          <p style={{textAlign: 'center'}}>Loading...................</p>
        )}

        <Slider {...settings}> </Slider>
      </div>
    </div>
  )
}

export default withRouter(ReactSlider)

// 'https://api.themoviedb.org/3/discover/tv?api_key=639ba2e19fa297642eec1cefb28ef177', //
