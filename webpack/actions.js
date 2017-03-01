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

export function addMovieToServer(movie){
  return dispatch => {
    return fetch('/my_movies', {
        credentials: 'same-origin',
        method: 'POST',
        body: movie
      }
    )
    .then(response => response.json())
    .then(json =>
       dispatch(addNewMovie(movie))
       // show snackbar with json
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
