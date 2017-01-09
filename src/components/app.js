import React, {Component} from "react";
import SearchBar from "./search_bar";
import {getStorage} from "../utils";

class App extends Component {
  storage = getStorage('localStorage');
  state = {
    term: '',
    page: 1,
  };

  updatePage(n) {
    const page = this.state.page + n;
    console.log(`new page is ${page}`);

    if (page > 0) {
      this.setState({page});
    }
  }

  addMovie(data) {
    this.storage.setItem(data.imdbID, JSON.stringify(data));
    // process to VideoList via router.push to refresh it
    // console.log(`${JSON.stringify(data)}`);
  }

  /*
   renderContent () {
   //TODO: refactore this function into routing
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
   */

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.setState({term})}
                   term={this.state.term}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
