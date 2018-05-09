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
        // const { url } = this.props.thumbnails.medium;
        const urlYoutube = "https://www.youtube.com/embed/";
        const urlVideo = urlYoutube.concat(idVideo);

        return (
            <div className="singleItemOthers">
                <p>{title}</p>
                <Link to="#" className="noLineThree"><iframe title={title} alt={description} src={urlVideo} allowFullScreen="allowFullScreen" ></iframe></Link>
                {/* <div>
                    <iframe title={title} alt={description} src={urlVideo} allowFullScreen="allowFullScreen" ></iframe>
                </div> */}
                <div>
                    <i onClick={this.favoritize} className="fa fa-star"></i>
                </div>
            </div>
        )
    }
}

export default YoutubeVideo;