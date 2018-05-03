import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { addImage, getImages } from "./../../.././../../../../redux/images.js";
// import { addComment, getComments, deleteComment } from "./../../../../../redux/comments.js";

import Examples from "../Examples/Examples.js";
// import CommentDisplay from "./CommentDisplay/CommentDisplay.js";
import ImagesList from "./ImagesList/ImagesList.js";

class Assignment extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isViewingExamples: false,
            input: {
                imgUrlUpload: "",
                noteText: ""
            }
        }
        this.state = this.initialState;
    };

    handleChange = (event) => {
        // console.log(event);
        const { value, name } = event.target;
        this.setState(prevState => {
            return {
                input: {
                    ...prevState.input,
                    [name]: value
                }
            }
        });
    }

    // handleClick = (event) => {
    //     const { deleteIssue, deleteComment, id } = this.props;
    //     const { data } = this.props;
    //     deleteIssue(id);
    //     data.filter(comment => comment.issueId === id).map((comment, i) => deleteComment(comment._id));
    // }

    // toggleComment = (event) => {
    //     this.setState({ ...this.state, isCommenting: !this.state.isCommenting });
    // }

    // toggleCommentBack = (event) => {
    //     this.setState({ ...this.state, isCommenting: false });
    // }

    // handleClickUpVote = (event) => {
    //     const { editIssue, id, upVotes } = this.props;
    //     editIssue(id, { upVotes: upVotes + 1 });
    // }
    // handleClickDownVote = (event) => {
    //     const { editIssue, id, downVotes } = this.props;
    //     editIssue(id, { downVotes: downVotes + 1 });
    // }

    componentDidMount = () => {
        const { getImages } = this.props;
        getImages();
    }

    handleSubmitUpload = (event) => {
        event.preventDefault();
        const { imgUrlUpload } = this.state.input;
        // need userId later
        const { addImage, idAssignment, idLessonComposition } = this.props;
        const imgUpload = {
            assignId: idAssignment,
            lessonId: idLessonComposition,
            imageUrl: imgUrlUpload,
            likes: 0
        }
        addImage(imgUpload);
        this.setState({ ...this.state, input: this.initialState.input });
    }

    toggleViewingExamples = (event) => {
        this.setState({ ...this.state, isViewingExamples: !this.state.isViewingExamples });
    }

    render = () => {
        // console.log(this.props);
        // const { isCommenting } = this.state;
        const { imgUrlUpload, noteText } = this.state.input;
        const { isViewingExamples } = this.state;

        // loading, err, id
        const { data, loading, errMsg, loadingAssignment, 
            errMsgAssignment, idAssignment, 
            idLessonComposition, toggleViewLesson } = this.props;

        const styleEx = {
            backgroundColor: "rgba(245, 245, 245)",
            maxWidth: "608px",
            border: "3px solid black"
        }

        // assignments
        const { title, shortDescription, exampleImgOneUrl
            , exampleImgTwoUrl, exampleImgThreeUrl, instructions
            , googleLink } = this.props.lessonId;

        const presentImages = data.filter(image => image.assignId._id === idAssignment).map((image, i) =>
            <ImagesList shortDescription={shortDescription} errMsg={errMsg} loading={loading} key={image._id + i} index={i} idImage={image._id} {...image}
                idAssignment={idAssignment}></ImagesList>
        );
        //comments?!    
        // const presentComments = data.filter(comment => comment.issueId === id).map((comment, i) =>
        //     <CommentDisplay key={comment._id + i}
        //         idComment={comment._id} index={i} loadingComment={loading} errMsgComment={errMsg}
        //         {...comment}></CommentDisplay>);

        const styleAssignment = {
            backgroundColor: "rgb(245, 245, 245, .01)",
            display: "flex",
            flexDirection: "column",
            position: "fixed"
        }
        const styleContain = {
            backgroundColor: "rgb(245, 245, 245)", display: "grid",
            gridTemplateColumns: "1fr",
            gridTemplateRows: ".1fr .9fr",
            lineHeight: "50px"
        }

        if (loadingAssignment) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>... loading Assignment</div>
            )
        } else if (errMsgAssignment) {
            return (
                <div style={{ color: "rgba(199, 2, 2, 0.63)", paddingLeft: "15px", fontSize: ".9em" }}>{errMsgAssignment}</div>
            )
        } else {
            return (
                <div style={styleAssignment} className="lessonsView">
                    <div className="singleItemOthers">
                        <div className="viewOneLesson">
                            <div>
                                <div className="viewOneLesson" style={styleContain}>
                                    <div style={{ paddingBottom: "15px" }} className="navRoom">
                                        <Link className="viewfinder" to="/"><span className="stubbornFour">Viewfinder</span></Link>
                                        <Link className="viewfinder" to="/lessons"><span className="stubbornThree">Lessons</span></Link>
                                        <div  onClick={toggleViewLesson} className="viewfinder"><span className="stubbornTwo">Compositions</span></div>
                                        <div className="stubbornOne" style={{color: "rgb(128, 128, 128)"}}>Progress: <span style={{
                                            color: "rgba(218, 38, 38, 0.952)", fontSize: "2em"}}>{presentImages.length / 10 * 100}%</span></div>
                                    </div>
                                    <div>
                                        <h2>Assignment {title}</h2>
                                        <div className="imgLessonWrap">
                                            <img className="imgLesson" src={exampleImgOneUrl} alt="Lesson for Composition" />
                                            <img className="imgLesson" src={exampleImgTwoUrl} alt="Lesson for Composition" />
                                            <img className="imgLesson" src={exampleImgThreeUrl} alt="Lesson for Composition" />
                                        </div>
                                        <span>{instructions}</span>
                                        <div style={{ lineHeight: "30px", width: "210px", margin: "0 auto", fontSize: "1.2em" }} onClick={this.toggleViewingExamples} className="exampleStudents" to="#">Check Examples from Students</div>
                                        {isViewingExamples ?
                                            <div className="bigViewExample" style={styleEx} >
                                                <button onClick={this.toggleViewingExamples}>Close</button>
                                                <div>
                                                    <Examples shortDescription={shortDescription} key={idLessonComposition} idLessonComposition={idLessonComposition}></Examples>
                                                </div>
                                            </div> : ""}
                                        <Link style={{ width: "190px", margin: "0 auto", textDecoration: "none" }} to={googleLink} target="_blank">Examples from the Web</Link>
                                        <div style={{ margin: "auto", display: "flex", flexDirection: "row", width: "210px", justifyContent: "space-evenly" }}>
                                            <form onSubmit={this.handleSubmitUpload}>
                                                <input style={{ textAlign: "center" }} onChange={this.handleChange} name="imgUrlUpload"
                                                    value={imgUrlUpload} type="url" placeholder="Add a Picture" />
                                                <button style={{ height: "30px", width: "90px" }} disabled={imgUrlUpload.length < 5}>Upload</button>
                                            </form>
                                            <form onSubmit={this.handleSubmitNote}>
                                                <input style={{ textAlign: "center" }} onChange={this.handleChange} name="noteText"
                                                    value={noteText} type="url" placeholder="Note" />
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <button style={{ height: "35px", width: "65px" }} disabled={noteText.length < 5}>Add Note</button>
                                                    <button style={{ height: "35px", width: "65px" }}>View Notes</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div style={{ margin: "auto", display: "flex", flexWrap: "wrap" }}>
                                            {presentImages}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="votes">
                                <div>
                                    Votes: {(upVotes + downVotes) > 0 ? (upVotes + downVotes) : 0}
                                </div>
                                <div>
                                    <i onClick={this.handleClickUpVote} className="fa fa-thumbs-up"></i>
                                    <i onClick={this.handleClickDownVote} className="fa fa-thumbs-down"></i>
                                    <i onClick={this.toggleComment} className="fa fa-comment"></i>
                                </div>
                            </div>
                            {isCommenting ?
                                <div className="view-comments">
                                    <button onClick={this.toggleCommentBack}>Go Back</button>
                                    <form onSubmit={this.handleSubmit}>
                                        <input onChange={this.handleChange} name="container"
                                            value={container} type="text" placeholder="Add a Comment" />
                                        <button disabled={container.length < 3}>Post</button>
                                    </form>
                                    <ol>Comments:
                            {presentComments}
                                    </ol>
                                </div>
                                : ""} */}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function stateToProps(globalState) {
    return globalState.images;
}

export default connect(stateToProps, { addImage, getImages })(Assignment);