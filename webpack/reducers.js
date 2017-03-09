import {
  REQUEST_MY_MOVIES,
  RECEIVE_MY_MOVIES,
  ADD_NEW_MOVIE,
  RECEIVE_FORMATS
} from './actions.js'

function my_movies(state = {
  isFetching: false,
  movies: []
}, action){
  switch (action.type){
    case REQUEST_MY_MOVIES:
      return Object.assign({}, state, { isFetching: true, movies: [] })
    case RECEIVE_MY_MOVIES:
      return Object.assign(
        {}, state, { isFetching: false, movies: action.movies }
      )
    default:
      return state
  }
}

function movies(state = { isFetching: false, movies: [] }, action) {
  switch (action.type) {
    case ADD_NEW_MOVIE:
      let movies = state.movies
      return Object.assign(
        {}, state, { isFetching: false, movies: [action.movie, ...movies] }
      )
    case RECEIVE_MY_MOVIES:
    case REQUEST_MY_MOVIES:
      return Object.assign({}, state, 
       my_movies(state, action)
      )
    case RECEIVE_FORMATS:
      return Object.assign({}, state, { formats: action.formats })
    default:
      return state
  }
}

export default movies
