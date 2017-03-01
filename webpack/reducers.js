import {
  REQUEST_MY_MOVIES,
  RECEIVE_MY_MOVIES
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
    case RECEIVE_MY_MOVIES:
    case REQUEST_MY_MOVIES:
      return Object.assign({}, state, 
       my_movies(state, action)
      )
    default:
      return state
  }
}

export default movies
