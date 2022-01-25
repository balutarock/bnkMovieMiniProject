import {Link} from 'react-router-dom'

const SliderListItem = props => {
  const {each} = props
  const {
    id,
    backdropPath,
    firstAirDate,
    name,
    overview,
    popularity,
    voteAverage,
    voteCount,
    posterPath,
  } = each
  const movieImage = `https://image.tmdb.org/t/p/original/${posterPath}`
  return (
    <Link to={`/SpecificMovieDetails/${id}`}>
      <div className="image-container" key={id}>
        <img
          className="each-image"
          alt={id}
          src={movieImage}
          width="100%"
          height="100%"
        />
      </div>
    </Link>
  )
}

export default SliderListItem
