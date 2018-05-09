import React from "react";

import { connect } from "react-redux";
import { deleteImage } from "./../../.././../../../../../redux/images.js";
// import Image from "./Image/Image.js";

class ImagesList extends React.Component {

    handleClick = (event) => {
        const { deleteImage, idImage } = this.props;
        deleteImage(idImage);
    }

    render = () => {
        const { imageUrl, errMsg, loading, index, idImage, shortDescription } = this.props;

        if (loading) {
            return (
                <div style={{ color: "rgba(218, 238, 253, 0.95)" }}>... loading Images</div>
            )
        } else if (errMsg) {
            return (
                <div style={{ color: "rgba(218, 238, 253, 0.95)" }}>{errMsg}</div>
            )
        } else {
            return (
                <div className="exampleImgs">
                    <div key={idImage + index}>
                        <img className="imgLesson" src={imageUrl} alt={shortDescription} />
                        <button onClick={this.handleClick}>DELETE</button>
                    </div>
                </div>
            )
        }
    }
}

function stateToProps(globalState) {
    return globalState.images;
}

export default connect(stateToProps, { deleteImage })(ImagesList);