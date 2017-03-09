import React from 'react'
import { bindActionCreators } from 'redux';
import MyMovies from '../components/my_movies';
import AddMovieForm from '../components/addMovieForm'
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import { fetchFormats, requestMyMovies,
         fetchMyMovies, addMovieToServer } from '../actions'


class MyMoviesContainer extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchMyMovies()
    this.props.fetchFormats()
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
    const { isFetching, movies, formats } = this.props
    return (
        <div>
          <AddMovieForm formats={this.props.formats}
                        addNewMovie={this.props.addMovieToServer}/>
          {this.isLoading(isFetching, movies)}
        </div>
    )
  }
}


function mapStateToProps(state){
  return ({
    isFetching: state.isFetching,
    movies: state.movies,
    formats: state.formats
  })
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addMovieToServer,
  fetchMyMovies,
  fetchFormats
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyMoviesContainer)
