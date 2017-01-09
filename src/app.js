import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import SearchResults from "./components/search_results";
import {getStorage} from "./utils";

class App extends Component {
  storage = getStorage('localStorage');
  state = {};

  videoSearch (term) {
    this.setState({ term });
  }

  addMovie(data) {
    this.storage.setItem(data.imdbID, data);
    this.setState({term: ''});

    console.log(`${JSON.stringify(data)}`);
  }

  clearMovies() {
    this.storage.clear();

    this.setState({term: null});
  }

  removeVideo(d) {
    console.log(`video ${d.imdbID} was removed`);
  }

  renderContent () {
    if (this.state.term) {
      return <SearchResults term={this.state.term}
                            onAddMovie={data => this.addMovie(data)}/>
    } else {
      const videos = [];

      for (let i = 0; i < this.storage.length; i++) {
        videos.push(this.storage.getItem(this.storage.key(i)));
      }

      return <VideoList videos={videos}
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
