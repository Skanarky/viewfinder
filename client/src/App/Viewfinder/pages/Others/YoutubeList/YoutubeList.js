
import React from "react";
import { connect } from "react-redux";
import YoutubeVideo from "./YoutubeVideo/YoutubeVideo.js";

import { addFavorite } from "./../../../../../redux/favorites.js";

class YoutubeList extends React.Component {
    render = () => {
        // console.log(this.props);
        const { data, loading, errMsg, addFavorite } = this.props;

        const presentVideos = data.map((video, i) => <YoutubeVideo key={video.id.videoId} 
        idVideo={video.id.videoId} index={i} videoFull={video} addFavorite={addFavorite} {...video.snippet}></YoutubeVideo>);
        
        if (loading) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>... loading YouTube</div>
            )
        } else if (errMsg) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>{errMsg}</div>
            )
        } else {
            return (
                <div className="othersContain">
                    {presentVideos}
                </div>
            )
        }
    }
}

function stateToProps(globalState) {
    return globalState.videos;
}

export default connect(stateToProps, { addFavorite })(YoutubeList);