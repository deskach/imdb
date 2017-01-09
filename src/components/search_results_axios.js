import _ from "lodash";
import React, {Component, PropTypes} from "react";
import axios from "axios";
import SearchItem from "./search_item";

//TODO - remove this file when react-refetch is supported
class SearchResults extends Component {
  static propTypes = {
    term: PropTypes.string.isRequired,
    onAddMovie: PropTypes.func.isRequired,
    onNext: PropTypes.func,
    onPrev: PropTypes.func,
    page: PropTypes.number,
  };

  state = {
    data: undefined
  };
  isActive = true; //TODO: get rid of me by using a cancallable promise

  componentWillReceiveProps(nextProps) {
    if (this.props.term === nextProps.term && this.props.page === nextProps.page) {
      return;
    }

    if (nextProps.term && nextProps.term.length > 1 && nextProps.page) {
      let url = encodeURI(`https://www.omdbapi.com/?s=${nextProps.term}&r=json&type=movie`);

      if (nextProps.page) {
        url += `&page=${this.props.page}`;
      }

      _.throttle(() => {
        axios.get(url)
          .then(data => {
            const value = data.data.Search || null;

            if (this.isActive) {
              this.setState({data: value});
            }
          })
      }, 300)();
    }
  }

  onAdd(data) {
    // Update data with imdbRating before returning
    const url = encodeURI(`https://www.omdbapi.com/?t=${data.Title}&y=${data.Year}r=json&type=movie`);

    axios.get(url)
      .then(result => {
        const imdbRating = result.data.imdbRating;

        if (this.isActive) {
          this.props.onAddMovie({...data, imdbRating});
        }
      });
  }

  render() {
    const {data} = this.state;
    let items = [];

    if (data) {
      items = data.map(d => (
        <SearchItem title={d.Title}
                    key={d.imdbID}
                    onClick={this.onAdd.bind(this, d)}
        />
      ));
    }

    return (
      <div>
        {items}
        <div className="pagination">
          <button className="btn btn-default btn-add fleft"
                  onClick={this.props.onPrev}>
            Previous
          </button>
          <button className="btn btn-default btn-add fright"
                  onClick={this.props.onNext}>
            Next
          </button>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.isActive = false;
  }
}

export default SearchResults;