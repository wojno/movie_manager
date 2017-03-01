import React from 'react'
import MyMovies from '../components/my_movies';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux'
import { requestMyMovies, fetchMyMovies } from '../actions'


class Hello extends React.Component {
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
        this.isLoading(isFetching, movies)
    )
  }
}

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state
  const f = {
    isFetching: state.isFetching,
    movies: state.movies
  }

  return f
}

export default connect(mapStateToProps)(Hello)
