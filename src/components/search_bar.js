import React, {Component, PropTypes} from "react";

class SearchBar extends Component {
  static propTypes = {
    term: PropTypes.string,
    onSearchTermChange: PropTypes.func.isRequired
  };

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
