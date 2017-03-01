import React from 'react'
import MyMovies from '../components/my_movies';
import AddMovieForm from '../components/addMovieForm'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import { requestMyMovies, fetchMyMovies, addMovieToServer } from '../actions'


class MyMoviesContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(fetchMyMovies())
  }

  isLoading(isFetching, movies){
    if (isFetching){
      return <h3>Loading . . .</h3>
    } else {
      return <MyMovies movies={movies}/>
    }
  }

  render(props){
    const { isFetching, movies } = this.props
    return (
        <AddMovieForm addNewMovie={this.addNewMovie}/>,
        this.isLoading(isFetching, movies)
    )
  }
}

function addNewMovie(movie){
console.log("try adding ...")
console.log(movie)
  dispatch(addMovieToServer(movie))
}

function mapStateToProps(state, ownProps) {
  const { selectedSubreddit, postsBySubreddit } = state
  const f = {
    isFetching: state.isFetching,
    movies: state.movies
  }

  return f
}

export default connect(mapStateToProps)(MyMoviesContainer)
