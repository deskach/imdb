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

  componentWillUpdate() {
    if (this.props.term && this.props.term.length > 1) {
      const url = `http://www.omdbapi.com/?s=${this.props.term}&plot=short&r=json`;

      axios.get(url)
        .then(data => {
          const value = data.data.Search || null;

          this.setState({data: value});
        });
    }
  }

  onAdd(data) {
    this.props.onAddMovie(data);
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
}

export default SearchResults;