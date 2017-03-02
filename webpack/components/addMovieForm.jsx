import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class AddMovieForm extends React.Component {

  resetForm(){
    document.getElementById('title').value = ''
    //document.getElementById('format').value = ''
    document.getElementById('rating').value = ''
  }

  saveMovie(){
    let token = document.head.querySelector("[name=csrf-token]").content;
    let movie =  {
      my_movie: {
        movie: {
          title: document.getElementById('title').value
        },
        //format: document.getElementById('format').value,
        rating: document.getElementById('rating').value,
        format_id: 52806113
      }
    }
    this.props.addNewMovie(movie, token)
    this.resetForm()
  }



  render(props){
    return (
      <Paper style={{padding: 10, margin: '10px, 0'}}>
	<TextField
	  floatingLabelText="Movie Title"
          id="title"
	/>
	<TextField
	  floatingLabelText="Rating"
          id="rating"
	/>
        <RaisedButton
          label="Add"
          primary={true}
          onClick={this.saveMovie.bind(this)}
        />
      </Paper>
    )
  }
}

AddMovieForm.propTypes = {
  addNewMovie: React.PropTypes.func
};

export default AddMovieForm
