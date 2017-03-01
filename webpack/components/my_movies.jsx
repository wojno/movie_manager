import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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

  render(props){
    console.log(this.props)
    return (
      <div>
      {this.props.movies.map((movie) => (
        this.displayCard(movie)
      ))}
      </div>
    )
  }
}

export default MyMovies;
