import React, { Component, PropTypes } from 'react';
import { connect, PromiseState } from 'react-refetch'

class SearchResults extends Component {
  static propTypes = {
    term: PropTypes.string.isRequired,
    movieFetch: PropTypes.instanceOf(PromiseState).isRequired,
  };

  render () {
    const { movieFetch } = this.props;

    if (movieFetch.pending) {
      return <div>Loading...</div>;
    } else if (movieFetch.rejected) {
      return <div> Failure </div>;
    } else if (movieFetch.fulfilled) {
      return <div>Success</div>
    }
  }
}

export default connect(props => {
  return {
    movieFetch: {
      url: `http://www.omdbapi.com/?s=${props.term}&type=movie`,
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    },
  }
})(SearchResults)

