import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class AddMovieForm extends React.Component {

  setMovie(func){
console.log('set movie name: ' + document.getElementById('name').value)
    let v =  {
      name: document.getElementById('name').value,
      //format: document.getElementById('format').value,
      rating: document.getElementById('rating').value
    }
console.log(func())
  }

  render(props){
    return (
      <Paper style={{padding: 10, margin: 10}}>
	<TextField
	  floatingLabelText="Find your movie . . . "
          id="name"
	/>
	<SelectField
          floatingLabelText="Frequency"
          value={null}
          onChange={this.handleChange}
          id="format"
        >
          <MenuItem value={1} primaryText="DVD" />
          <MenuItem value={2} primaryText="Streaming" />
          <MenuItem value={3} primaryText="VHS" />
        </SelectField>
	<TextField
	  floatingLabelText="Rating"
          id="rating"
	/>
        <RaisedButton
          label="Add"
          primary={true}
          onClick={() => this.props.addNewMovie(this.setMovie())}
        />
      </Paper>
    )
  }
}

AddMovieForm.propTypes = {
  addNewMovie: React.PropTypes.func
};

export default AddMovieForm
