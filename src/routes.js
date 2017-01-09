import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/app";
import VideoList from "./components/video_list";
import SearchResults from "./components/search_results";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={VideoList}/>
    <Route path="search" component={SearchResults}/>
  </Route>
);
