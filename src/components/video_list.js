import React from 'react';
import VideoItems from './video_items';

const VideoList = (props) => {
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
        <VideoItems videos={props.videos}/>
      </div>
  );
};

export default VideoList;
