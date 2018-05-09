
import React from "react";

import { connect } from "react-redux";
import { deleteComment } from "./../../../../../../../../../redux/comments.js";

class Comment extends React.Component {

    handleClick = (event) => {
        const { deleteComment, idComment } = this.props;
        deleteComment(idComment);
    }

    render = () => {
        // console.log(this.props);
        const { textComment, loadingComment, errMsgComment } = this.props;
        if (loadingComment) {
            return (
                <div style={{ color: "rgba(218, 238, 253, 0.95)" }}>... loading Comments</div>
            )
        } else if (errMsgComment) {
            return (
                <div style={{ color: "rgba(218, 238, 253, 0.95)" }}>{errMsgComment}</div>
            )
        } else {
            return (
                <li>
                    <h6> {textComment} </h6>
                    <button onClick={this.handleClick}>Delete</button>
                </li>
            )
        }
    }
}

export default connect(null, { deleteComment })(Comment);
// export default Comment;