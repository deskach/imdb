import React, {Component} from "react";
import SearchBar from "./search_bar";

class App extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  state = {
    term: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({term: nextProps.location.query.term || ''});
  }

  onSearch(term) {
    this.setState({term});

    this.context.router.push(`search?term=${term}&page=1`)
  }

  render() {
    return (
      <div>
        <SearchBar onSearchTermChange={term => this.onSearch(term)}
                   term={this.state.term}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
