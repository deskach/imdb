import React, {Component} from "react";

class SearchBar extends Component {
  render(){
    return (
      <div className="search-bar">
        <input value={this.props.term}
               placeholder="Search for movie..."
               onChange={event => this.onInputChange(event.target.value)}/>
      </div>
    );
  }

  onInputChange(term){
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
