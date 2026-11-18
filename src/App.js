import {Component} from 'react'

const API_KEY = '3e37e3d97d2cf00bcf5dc67ca725e2e1'
const getPopularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
const getTopRatedMoviesURL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
const getUpcomingMoviesURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`

class App extends Component {
  state = {moviesList: [], searchInput: ''}

  componentDidMount() {
    this.getMovies(getPopularMoviesURL)
  }

  getMovies = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({moviesList: data.results || []})
      })
  }

  render() {
    const {moviesList, searchInput} = this.state
    return (
      <div>
        <h1>movieDB</h1>
        <h1>Popular</h1>
        <h1>Top Rated</h1>
        <h1>Upcoming</h1>

        <button
          type="button"
          onClick={() => this.getMovies(getPopularMoviesURL)}
        >
          Popular
        </button>
        <button
          type="button"
          onClick={() => this.getMovies(getTopRatedMoviesURL)}
        >
          Top Rated
        </button>
        <button
          type="button"
          onClick={() => this.getMovies(getUpcomingMoviesURL)}
        >
          Upcoming
        </button>

        <input
          type="text"
          value={searchInput}
          onChange={event => this.setState({searchInput: event.target.value})}
        />
        <button
          type="button"
          onClick={() => {
            const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=1`
            this.getMovies(searchURL)
          }}
        >
          Search
        </button>

        <ul>
          {moviesList.map(movie => (
            <li key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
              <p>{movie.vote_average}</p>
              <button type="button">View Details</button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
