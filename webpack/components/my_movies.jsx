import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import AddMovieForm from './addMovieForm'
import Calendar from 'material-ui/svg-icons/action/today'
import Time from 'material-ui/svg-icons/image/timelapse'
import NoIcon from 'material-ui/svg-icons/alert/error'

class MyMovies extends React.Component {

  ratingAvatar(rating){
    return !!rating ? rating : '?'
  }

  displayCard(movie){
    return (
      <Card key={movie.id}>
        <CardHeader
          title={movie.title}
          subtitle={movie.format}
          avatar={<Avatar>{this.ratingAvatar(movie.rating)}</Avatar>}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
        <Calendar /> Release Year: {movie.release_year}<br/>
        <Time/> Run Time: {movie.length} <br/>
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
    return (
      <Card key={1138} >
        <CardHeader
          title="No Movies added yet."
          subtitle="Add your movies above"
          avatar={<NoIcon style={{height: 40, width: 40}}/>}
          actAsExpander={false}
        />
      </Card>
    )
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
