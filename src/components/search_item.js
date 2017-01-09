import React, {Component, PropTypes} from "react";

export default class SearchItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <div key={this.props.key} className="search-item">
        <span className="search-label">{this.props.title}</span>
        <button className="btn btn-success btn-add fright"
                onClick={this.props.onClick}>
          ADD
        </button>
        <br/>
      </div>
    )
  }
}
