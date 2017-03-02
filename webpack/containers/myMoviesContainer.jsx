import React from 'react'
import { bindActionCreators } from 'redux';
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
    this.props.fetchMyMovies()
  }
  addNewMovie(movie){
    this.props.addNewMovieToServer(movie)
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
        <div>
          <AddMovieForm addNewMovie={this.props.addMovieToServer}/>
          {this.isLoading(isFetching, movies)}
        </div>
    )
  }
}


function mapStateToProps(state){
  return ({
    isFetching: state.isFetching,
    movies: state.movies
  })
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addMovieToServer,
  fetchMyMovies
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyMoviesContainer)
