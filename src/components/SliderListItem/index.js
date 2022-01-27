import {Link} from 'react-router-dom'

const SliderListItem = props => {
  const {each} = props
  const {id, posterPath, name} = each
  const movieImage = `https://image.tmdb.org/t/p/original/${posterPath}`
  return (
    <Link to={`/movies/${id}`}>
      <div className="image-container" key={id}>
        <img
          className="each-image"
          alt={name}
          src={movieImage}
          width="100%"
          height="100%"
        />
      </div>
    </Link>
  )
}

export default SliderListItem
