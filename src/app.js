import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import SearchResults from './components/search_results';

class App extends Component {
  videos = [];
  state = {};

  videoSearch (term) {
    this.setState({ term });
  }

  renderContent () {
    if (this.state.term) {
      return <SearchResults term={this.state.term}/>
    } else {
      return <VideoList videos={this.videos}/>
    }
  }

  render () {
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

    return (
        <div>
          <SearchBar onSearchTermChange={videoSearch}/>
          {this.renderContent()}
        </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
