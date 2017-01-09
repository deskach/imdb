import React, {Component, PropTypes} from "react";
import axios from "axios";
import SearchItem from "./search_item";

//TODO - remove this file when react-refetch is supported
class SearchResults extends Component {
  static propTypes = {
    term: PropTypes.string.isRequired,
    onAddMovie: PropTypes.func.isRequired,
  };

  state = {
    data: undefined
  };
  isActive = true; //TODO: get rid of me by using a cancallable promise

  componentDidUpdate() {
    if (this.props.term && this.props.term.length > 1) {
      const url = encodeURI(`http://www.omdbapi.com/?s=${this.props.term}&r=json&type=movie`);

      axios.get(url)
        .then(data => {
          const value = data.data.Search || null;

          if (this.isActive) {
            this.setState({data: value});
          }
        });
    }
  }

  onAdd(data) {
    // Update data with imdbRating before returning
    const url = encodeURI(`http://www.omdbapi.com/?t=${data.Title}&y=${data.Year}r=json&type=movie`);

    axios.get(url)
      .then(result => {
        const imdbRating = result.data.imdbRating;

        if (this.isActive) {
          this.props.onAddMovie({...data, imdbRating});
        }
      });
  }

  render () {
    const {data} = this.state;
    if (data) {
      const items = data.map(d => (
        <SearchItem title={d.Title}
                    key={d.imdbID}
                    onClick={this.onAdd.bind(this, d)}
        />
      ));

      return <div>{items}</div>
    } else if (data === null) {
      return <div>Nothing found</div>
    }

    return <div>Loading...</div>
  }

  componentWillUnmount() {
    this.isActive = false;
  }
}

export default SearchResults;