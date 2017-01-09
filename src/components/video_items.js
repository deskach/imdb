import React, {Component, PropTypes} from "react";
import VideoItem from "./video_item";

class VideoList extends Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  onRemove(data) {
    this.props.onRemove(data);
  }

  render() {
    const items = this.props.videos.map(d =>(
      <VideoItem title={d.Title}
                 key={d.imdbID}
                 onClick={this.onRemove.bind(this, d)}
      />
    ));

    return (
      <div className="video-items"> {items} </div>
    );
  }
}

export default VideoList;

