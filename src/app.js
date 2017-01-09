import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import SearchResults from "./components/search_results";
import {getStorage} from "./utils";

function getMovieList(storage) {
  let movies = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    const item = storage.getItem(key);
    const data = JSON.parse(item);

    movies.push(data);
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
    movies: getMovieList(this.storage)
  };

  videoSearch (term) {
    this.setState({ term });
  }

  addMovie(data) {
    this.storage.setItem(data.imdbID, JSON.stringify(data));
    this.setState({
      term: '',
      movies: getMovieList(this.storage)
    });

    console.log(`${JSON.stringify(data)}`);
  }

  clearMovies() {
    this.storage.clear();

    this.setState({term: null, movies: getMovieList(this.storage)});
  }

  removeVideo(d) {
    deleteMovie(this.storage, d.imdbID);
    this.setState({movies: getMovieList(this.storage)});

    // console.log(`video ${d.imdbID} was removed`);
  }

  renderContent () {
    if (this.state.term) {
      return <SearchResults term={this.state.term}
                            onAddMovie={data => this.addMovie(data)}/>
    } else {

      return <VideoList videos={this.state.movies}
                        onRemoveVideo={d => this.removeVideo(d)}
                        onClear={_ => this.clearMovies()}/>
    }
  }

  render () {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
        <div>
          <SearchBar onSearchTermChange={videoSearch} term={this.state.term}/>
          {this.renderContent()}
        </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
