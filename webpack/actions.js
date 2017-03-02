import 'whatwg-fetch';

export const REQUEST_MY_MOVIES = 'REQUEST_MY_MOVIES'
export const RECEIVE_MY_MOVIES = 'RECEIVE_MY_MOVIES'
export const ADD_NEW_MOVIE = 'ADD_NEW_MOVIE'

export function requestMyMovies(){
  return {
    type: REQUEST_MY_MOVIES
  }
}

function receiveMyMovies(json){
  return {
    type: RECEIVE_MY_MOVIES,
    movies: json
  }
}

export function addNewMovie(movie){
  return {
    type: ADD_NEW_MOVIE,
    movie
  }
}

export function addMovieToServer(movie, token){
  return dispatch => {
    return fetch('/my_movies', {
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-CSRF-Token': token,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => response.json())
    .then(json => {
      if (json.status === 'created'){
        dispatch(addNewMovie(json.data))
      } else {
        alert('An error has occurred')
      }
      // show snackbar with json
      }
    )
  }
}

export function fetchMyMovies(){
  return dispatch => {
    dispatch(requestMyMovies())
    return fetch('/my_movies/', {credentials: 'same-origin'})
      .then(response => response.json())
      .then(json => 
          dispatch(receiveMyMovies(json))
          )
  }
}
