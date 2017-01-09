import React, {Component, PropTypes} from 'react';
import axios from 'axios';

//TODO - remove this file when react-refetch is supported
class SearchResults extends Component {
  static propTypes = {
    term: PropTypes.string.isRequired,
  };

  state = {data: null};

  componentDidMount() {
    const url = `http://www.omdbapi.com/?i=${this.props.term}&plot=short&r=json`;

    axios.get(url)
      .then(data => {
        this.setState({data});
      });
  }

  render () {
    if(this.state.data) {
      return <div>{JSON.stringify(this.state.data)}</div>
    }

    return <div>Loading...</div>
  }
}

export default SearchResults;