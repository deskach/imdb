import React, {PropTypes} from "react";
import VideoItems from "./video_items";
import {SRT_TITLE, SRT_RATING, SRT_YEAR} from "./constants";
import {getStorage, strCmp, numCmp} from "../utils";

class VideoList extends React.Component {
  storage = getStorage('localStorage');
  state = {
    movies: [],
    sort: SRT_TITLE
  };

  onSortingChange(e) {
    const sort = e.target.value;

    this.setState({
      sort: sort,
      movies: this.getMovies(sort),
    });
    // console.log('State sort updated to' + e.target.value);
  }

  removeVideo(d) {
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      const item = this.storage.getItem(key);
      const data = JSON.parse(item);

      if (data.imdbID == d.imdbID) {
        this.storage.removeItem(d.imdbID);
        break;
      }
    }

    this.setState({movies: this.getMovies()});
  }

  clearMovies() {
    this.storage.clear();

    this.setState({
      movies: this.getMovies()
    });
  }

  getMovies(sort) {
    let movies = [];
    sort = sort || this.state.sort;

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      const item = this.storage.getItem(key);
      const data = JSON.parse(item);

      movies.push(data);
    }

    switch (sort) {
      case SRT_TITLE:
        movies.sort((a, b) => strCmp(a.Title, b.Title));
        break;
      case SRT_YEAR:
        movies.sort((a, b) => numCmp(parseInt(a.Year), parseInt(b.Year)));
        break;
      case SRT_RATING:
        movies.sort((a, b) => strCmp(a.imdbRating, b.imdbRating));
    }

    return movies;
  }

  componentWillMount() {
    this.setState({movies: this.getMovies()});
  }

  render() {
    return (
      <div className="video-list">
        <span className="fleft label">Favourites</span>
        <div className="fright">
          <span className="fleft label">Sort:</span>
          <select id="sort"
                  onChange={e => this.onSortingChange(e)}
                  className="form-control"
                  value={this.state.sort}
                  style={{width: 'auto'}}>
            <option value={SRT_TITLE}> Alphabetically</option>
            <option value={SRT_RATING}> Rating</option>
            <option value={SRT_YEAR}> Year</option>
          </select>
        </div>
        <br/>
        <VideoItems videos={this.state.movies}
                    onRemove={v => this.removeVideo(v)}

        />
        <button className="btn btn-primary fright"
                onClick={_ => this.clearMovies()}>
          Clear
        </button>
      </div>
    );
  }
}

export default VideoList;
