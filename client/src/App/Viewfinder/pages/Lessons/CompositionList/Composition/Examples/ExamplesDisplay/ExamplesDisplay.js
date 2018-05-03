import React from "react";
// import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { addFavorite } from "../../../.././../../../../redux/favorites.js";
import { addComment, getComments } from "../../../.././../../../../redux/comments.js";
// import { editImage } from "../../../.././../../../../redux/images.js";
// import { addComment, getComments, deleteComment } from "./../../../../../redux/comments.js";

import Comment from "./Comment/Comment.js";

// import Examples from "../Examples/Examples.js";
// import ImagesList from "./ImagesList/ImagesList.js";

class ExamplesDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isCommenting: false,
            comment: {
                textComment: ""
            }
        }
        this.state = this.initialState;
    };

    handleChange = (event) => {
        // console.log(event);
        const { value, name } = event.target;
        this.setState(prevState => {
            return {
                comment: {
                    ...prevState.comment,
                    [name]: value
                }
            }
        });
    }

    componentDidMount() {
        const { getComments } = this.props;
        getComments();
        // getNotes();
    }

    // componentWillReceiveProps = (newProps) => {
    //     // console.log(newProps.likes)
    //     if (this.props.likes !== newProps.likes) {
    //         const { editImage, exampleImageId, likes } = newProps;
    //         editImage(exampleImageId, { likes: likes + 1 });
    //     }
    // }

    toggleComment = (event) => {
        this.setState({ ...this.state, isCommenting: !this.state.isCommenting });
    }

    toggleCommentBack = (event) => {
        this.setState({ ...this.state, isCommenting: false });
    }

    handleClickLike = (event) => {
        // console.log(event);
        const { editImageTrigger, exampleImageId, likes } = this.props;
        editImageTrigger(exampleImageId, { likes: likes + 1 });
    }

    favoritize = (event) => {
        // console.log(event);
        const { addFavorite, exampleImageId } = this.props;
        const favoriteImage = { imageId: exampleImageId };
        addFavorite(favoriteImage);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { textComment } = this.state.comment;
        const { addComment, exampleImageId } = this.props;
        addComment({
            textComment,
            imageId: exampleImageId
        });
        this.setState({ ...this.state, comment: this.initialState.comment });
    }

    render = () => {
        // console.log(this.props);
        const { isCommenting } = this.state;
        const { textComment } = this.state.comment;

        // loading, err, id
        const { shortDescription, exampleImageId,
            index, imageUrl, likes } = this.props;
        // console.log(likes);

        const { data, loading, errMsg } = this.props;
        const presentComments = data.filter(comment => comment.imageId === exampleImageId).map((comment, i) =>
            <Comment key={comment._id + i}
                idComment={comment._id} index={i} loadingComment={loading} errMsgComment={errMsg}
                {...comment}></Comment>);
        return (
            <div key={exampleImageId + index}>
                <div>User Name {exampleImageId.charAt(exampleImageId.length - 1)}</div>
                <img className="imgLesson" src={imageUrl} alt={shortDescription} />
                <div>
                    <div>Likes: {likes > 0 ? likes : 0}</div>
                    <i onClick={this.handleClickLike} className="fa fa-thumbs-up"></i>
                    <i onClick={this.favoritize} className="fa fa-star"></i>
                    <i onClick={this.toggleComment} className="fa fa-comment"></i>
                </div>
                {isCommenting ?
                    <div className="viewComments">
                        <button onClick={this.toggleCommentBack}>Back</button>
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleChange} name="textComment"
                                value={textComment} type="text" placeholder="Comment (min 5 char.)" />
                            <button disabled={textComment.length < 5}>Post</button>
                        </form>
                        <ol>Comments:
                        {presentComments}
                        </ol>
                    </div>
                    : ""}
            </div>
        )
    }
}

function stateToProps(globalState) {
    return globalState.comments;
}

export default connect(stateToProps, { addFavorite, addComment, getComments })(ExamplesDisplay);