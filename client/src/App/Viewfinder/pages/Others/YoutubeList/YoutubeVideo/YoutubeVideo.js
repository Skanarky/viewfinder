import React from "react";
import { Link } from "react-router-dom";

class YoutubeVideo extends React.Component {

    favoritize = (event) => {
        // console.log(event);
        const { addFavorite, videoFull } = this.props;
        const favoriteVideo = { videoInfo: videoFull };
        addFavorite(favoriteVideo);
    }

    render = () => {
        // console.log(this.props);
        const { idVideo, title, description } = this.props;
        const { url } = this.props.thumbnails.medium;
        // for iframe
        // const urlYoutube = "https://www.youtube.com/embed/";
        //for img
        const urlYoutube = "https://www.youtube.com/watch?v=";
        const urlVideo = urlYoutube.concat(idVideo);

        return (
            <div className="singleItemOthers">
                {/* with img */}
                <Link to={urlVideo} target="_blank" className="noLineThree"><p>{title}</p></Link>
                <Link to={urlVideo} target="_blank" className="noLineThree"><img src={url} alt={description} /></Link>
                {/* with iframe */}
                {/* <p>{title}</p>
                <iframe title={title} alt={description} src={urlVideo} allowFullScreen="allowFullScreen" ></iframe> */}
                <div>
                    <i onClick={this.favoritize} className="fa fa-star"></i>
                </div>
            </div>
        )
    }
}

export default YoutubeVideo;