import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';

class AddMovieForm extends React.Component {

  constructor(props){
    super(props);
    this.state = { selectedFormat: null };
  }

  resetForm(){
    document.getElementById('title').value = ''
    document.getElementById('format').value = ''
    this.setState({selectedFormat: null})
    document.getElementById('rating').value = ''
  }

  saveMovie(){
    let token = document.head.querySelector("[name=csrf-token]").content;
    let movie =  {
      my_movie: {
        movie: {
          title: document.getElementById('title').value
        },
        format_id: this.state.selectedFormat,
        rating: document.getElementById('rating').value,
      }
    }
    this.props.addNewMovie(movie, token)
    this.resetForm()
  }

  setupFormats(){
    let availableFormats = []
    this.props.formats.map((format) => (availableFormats.push(
      {
        text: format.name,
        value: format.id
      }
    )))
    return availableFormats
  }

  onNewRequest(selected){
    this.setState({selectedFormat: selected.value})
  }

  render(props){
    let movieFormats = this.setupFormats(this.props.formats);
    return (
      <Paper style={{padding: 10, margin: '10px, 0'}}>
	<TextField
	  floatingLabelText="Movie Title"
          id="title"
	/>
        <AutoComplete
          id="format"
	  floatingLabelText="Format"
	  filter={AutoComplete.noFilter}
	  openOnFocus={true}
	  dataSource={movieFormats}
          onNewRequest={this.onNewRequest.bind(this)}
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
  addNewMovie: React.PropTypes.func,
  formats: React.PropTypes.array
};

AddMovieForm.defaultProps = {
  formats: []
}

export default AddMovieForm
