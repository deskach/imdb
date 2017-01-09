import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import SearchResults from "./components/search_results";
import {getStorage} from "./utils";
import {SRT_TITLE, SRT_YEAR, SRT_RATING} from "./components/constants";

function strCmp(a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }

  return 0;
}

function numCmp(a, b) {
  return a - b;
}

function getMovieList(storage, srt) {
  let movies = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    const item = storage.getItem(key);
    const data = JSON.parse(item);

    movies.push(data);
  }

  switch (srt) {
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

function deleteMovie(storage, id) {
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    const item = storage.getItem(key);
    const data = JSON.parse(item);

    if (data.imdbID == id) {
      storage.removeItem(id);
      break;
    }
  }
}

class App extends Component {
  storage = getStorage('localStorage');
  state = {
    movies: getMovieList(this.storage, SRT_TITLE),
    term: '',
    sort: SRT_TITLE
  };

  addMovie(data) {
    this.storage.setItem(data.imdbID, JSON.stringify(data));
    this.setState({
      term: '',
      movies: getMovieList(this.storage, this.state.sort)
    });

    // console.log(`${JSON.stringify(data)}`);
  }

  clearMovies() {
    this.storage.clear();

    this.setState({
      term: null,
      movies: getMovieList(this.storage, this.state.sort)
    });
  }

  removeVideo(d) {
    deleteMovie(this.storage, d.imdbID);
    this.setState({movies: getMovieList(this.storage, this.state.sort)});

    // console.log(`video ${d.imdbID} was removed`);
  }

  onSortingChange(e) {
    const sort = e.target.value;

    this.setState({
      sort: sort,
      movies: getMovieList(this.storage, sort),
    });
    // console.log('State sort updated to' + e.target.value);
  }

  renderContent () {
    if (this.state.term) {
      return <SearchResults term={this.state.term}
                            onAddMovie={data => this.addMovie(data)}/>
    } else {

      return <VideoList videos={this.state.movies}
                        onSortingChange={v => this.onSortingChange(v)}
                        onRemoveVideo={d => this.removeVideo(d)}
                        onClear={_ => this.clearMovies()}/>
    }
  }

  render () {
    return (
        <div>
          <SearchBar onSearchTermChange={term => this.setState({term})}
                     term={this.state.term}/>
          {this.renderContent()}
        </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
