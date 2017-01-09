import React, {Component, PropTypes} from "react";

export default class VideoItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    rating: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const {title, year, rating} = this.props;
    const caption = `${title} (${year}) IMDB: ${rating}`;

    return (
      <div key={this.props.title} className="search-item">
        <span className="search-label">
          {caption}
        </span>
        <button className="btn btn-warning btn-add fright"
                onClick={this.props.onClick}>
          REMOVE
        </button>
        <br/>
      </div>
    )
  }
}

