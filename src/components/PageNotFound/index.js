import './index.css'

const PageNotFound = props => {
  const onClickNetflixHomeButton = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-page">
      <div className="n-f-logo">
        <img
          src="https://res.cloudinary.com/dxnhvq8pl/image/upload/v1628099153/movie%20app%20mini%20project/580b57fcd9996e24bc43c529_d5ju8c.png"
          alt="movie-logo"
          className="navbar-movie-logo-css"
        />
      </div>

      <div className="not-found-section">
        <h1 className="n-f-heading">Lost Your way ?</h1>
        <p className="n-f-para">
          Sorry, we can’t find that page. You’ll find lots to explore on the
          home page
        </p>
        <button
          type="button"
          className="netflix-home-button"
          onClick={onClickNetflixHomeButton}
        >
          Netflix Home
        </button>
        <div className="n-f-error">
          <p className="err">Error code</p>
          <p className="er-code">NSES-404</p>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
