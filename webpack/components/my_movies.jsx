import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import AddMovieForm from './addMovieForm'

class MyMovies extends React.Component {

  displayCard(movie){
    return (
      <Card>
        <CardHeader
          title={movie.title}
          subtitle={movie.format}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
        <CardText expandable={true}>
        Release Year: {movie.release_year}<br/>
        Run Time: {movie.length} <br/>
        </CardText>
      </Card>
    )
  }

  displayMovies(){
    return (
      <div>
        {this.props.movies.map((movie) => (this.displayCard(movie)))}
      </div>
    )
  }

  noMovies(){
    return "No Movies available"
  }

  render(props){
    return (
      <div>
        {
          this.props.movies.length > 0 ?
            this.displayMovies() : this.noMovies()
        }
      </div>
    )
  }
}

export default MyMovies;
