import _ from "lodash";
import React, {Component, PropTypes} from "react";
import axios from "axios";
import SearchItem from "./search_item";
import {getStorage} from "../utils";

//TODO - remove this file when react-refetch is supported
class SearchResults extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  storage = getStorage('localStorage');
  state = {
    data: undefined,
  };
  isActive = true; //TODO: get rid of me by using a cancellable promise

  componentWillReceiveProps(nextProps) {
    const {term, page} = this.props.location.query;
    const newTerm = nextProps.location.query.term;
    const newPage = nextProps.location.query.page;

    if (term === newTerm && page === newPage) {
      return;
    }

    if (newTerm && newTerm.length > 1) {
      let url = encodeURI(`https://www.omdbapi.com/?s=${newTerm}&r=json&type=movie`);

      if (newPage) {
        url += `&page=${newPage}`;
      }

      this.setState({data: null});

      _.throttle(() => {
        axios.get(url)
          .then(data => {
            const value = data.data.Search || [];

            if (this.isActive) {
              this.setState({data: value});
            }
          })
      }, 300)();
    }
  }

  onAddMovie(data) {
    // Update data with imdbRating before returning
    const url = encodeURI(`https://www.omdbapi.com/?t=${data.Title}&y=${data.Year}r=json&type=movie`);

    axios.get(url)
      .then(result => {
        const imdbRating = result.data.imdbRating;

        if (this.isActive) {
          this.storage.setItem(data.imdbID, JSON.stringify({
            ...data,
            imdbRating
          }));

          this.context.router.push('');
        }
      });
  }

  onNext() {
    let {term, page} = this.props.location.query;
    const newPage = parseInt(page) + 1;

    this.context.router.push(`search?term=${term}&page=${newPage}`)
  }

  onPrev() {
    let {term, page} = this.props.location.query;
    let newPage = parseInt(page) - 1;

    if (newPage > 0) {
      this.context.router.push(`search?term=${term}&page=${newPage}`)
    }
  }

  render() {
    const {data} = this.state;
    let items = [];

    if (data) {
      items = data.map(d => (
        <SearchItem title={d.Title}
                    key={d.imdbID}
                    onClick={this.onAddMovie.bind(this, d)}
        />
      ));
    } else if (data === null) {
      items = <div>Loading...</div>;
    }

    return (
      <div>
        {items}
        <div className="pagination">
          <button className="btn btn-default btn-add fleft"
                  onClick={_ => this.onPrev()}>
            Previous
          </button>
          <button className="btn btn-default btn-add fright"
                  onClick={_ => this.onNext()}>
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