import React, {Component} from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import SearchResults from "./components/search_results";
import {getStorage, strCmp, numCmp} from "./utils";
import {SRT_TITLE, SRT_YEAR, SRT_RATING} from "./components/constants";

class App extends Component {
  storage = getStorage('localStorage');
  state = {
    movies: [],
    term: '',
    page: 1,
    sort: SRT_TITLE
  };

  componentWillMount() {
    this.setState({movies: this.getMovies()});
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

  addMovie(data) {
    this.storage.setItem(data.imdbID, JSON.stringify(data));
    this.setState({
      term: '',
      page: 1,
      movies: this.getMovies()
    });

    // console.log(`${JSON.stringify(data)}`);
  }

  clearMovies() {
    this.storage.clear();

    this.setState({
      term: null,
      page: 1,
      movies: this.getMovies()
    });
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

  onSortingChange(e) {
    const sort = e.target.value;

    this.setState({
      sort: sort,
      movies: this.getMovies(sort),
    });
    // console.log('State sort updated to' + e.target.value);
  }

  updatePage(n) {
    const page = this.state.page + n;
    console.log(`new page is ${page}`);

    if (page > 0) {
      this.setState({page});
    }
  }

  renderContent () {
    if (this.state.term) {
      return <SearchResults term={this.state.term}
                            page={this.state.page}
                            onNext={() => this.updatePage(1)}
                            onPrev={() => this.updatePage(-1)}
                            onAddMovie={data => this.addMovie(data)}/>
    } else {

      return <VideoList videos={this.state.movies}
                        sort={this.state.sort}
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
