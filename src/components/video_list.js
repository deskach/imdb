import React, {PropTypes} from "react";
import VideoItems from "./video_items";
import {SRT_TITLE, SRT_RATING, SRT_YEAR} from "./constants";

class VideoList extends React.Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    sort: PropTypes.string.isRequired,
    onClear: PropTypes.func.isRequired,
    onRemoveVideo: PropTypes.func.isRequired,
    onSortingChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="video-list">
        <span className="fleft label">Favourites</span>
        <div className="fright">
          <span className="fleft label">Sort:&nbsp;</span>
          <select id="sort"
                  onChange={this.props.onSortingChange}
                  className="form-control"
                  style={{width: 'auto'}}>
            <option value={SRT_TITLE}
                    selected={this.props.sort == SRT_TITLE}>
              Alphabetically
            </option>
            <option value={SRT_RATING}
                    selected={this.props.sort == SRT_RATING}>
              Rating
            </option>
            <option value={SRT_YEAR}
                    selected={this.props.sort == SRT_YEAR}>
              Year
            </option>
          </select>
        </div>
        <br/>
        <VideoItems videos={this.props.videos}
                    onRemove={this.props.onRemoveVideo}

        />
        <button className="btn btn-primary fright"
                onClick={this.props.onClear}>
          Clear
        </button>
      </div>
    );
  }
}

export default VideoList;
