import React, {PropTypes} from "react";
import VideoItems from "./video_items";

class VideoList extends React.Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    onClear: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <span className="fleft label">Favourites</span>
        <div className="fright">
          <span className="fleft label">Sort:&nbsp;</span>
          <select id="sort" className="form-control" style={{width: 'auto'}}>
            <option>Alphabetically</option>
            <option>Rating</option>
            <option>Year</option>
          </select>
        </div>
        <br/>
        <VideoItems videos={this.props.videos}/>
        <button className="btn btn-success btn-add fright"
                onClick={this.props.onClear}>
          Clear
        </button>
      </div>
    );
  }
}

export default VideoList;
