import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Assignment from "./Assignment/Assignment.js";
import Examples from "./Examples/Examples.js";
import { getAssignment } from "./../../../../../../redux/assignments.js";

class LessonDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isViewingLesson: false,
            isViewingExamples: false,
            isViewingAssignment: false
        }
        this.state = this.initialState;
    };

    componentDidMount = () => {
        //provide lessonId AND userId
        const { getAssignment, idLesson/*, userId*/ } = this.props;
        getAssignment(idLesson);
    }

    toggleViewLesson = (event) => {
        const { toggleViewBelow } = this.props;
        this.setState(prevState => {
            return {
                ...prevState,
                isViewingLesson: !prevState.isViewingLesson
            }
        });
        toggleViewBelow();
    }

    toggleViewingExamples = (event) => {
        this.setState(prevState => {
            return {
                ...prevState,
                isViewingExamples: !prevState.isViewingExamples
            }
        });
    }

    toggleViewingAssignment = (event) => {
        this.setState(prevState => {
            return {
                ...prevState,
                isViewingAssignment: !prevState.isViewingAssignment
            }
        });
    }

    render = () => {
        // console.log(this.props);
        const { title, shortDescription, exampleImgOneUrl
            , exampleImgTwoUrl, exampleImgThreeUrl, instructions
            , googleLink, data, loading, errMsg, idLesson } = this.props;
        const { isViewingLesson, isViewingExamples, isViewingAssignment } = this.state;
        const styleP = {
            textAlign: "center",
            height: "auto",
            width: "auto",
            padding: "0",
            paddingBottom: "20px"
        };

        const styleEx = {
            backgroundColor: "rgba(245, 245, 245)",
            maxWidth: "608px",
            border: "3px solid black"
        }

        const presentAssignment = data.filter(assignment =>
            assignment.lessonId._id === idLesson)
            .map((assignment, i) =>
                <Assignment idAssignment={assignment._id} index={i}
                    key={assignment._id + i} {...assignment}
                    loadingAssignment={loading} idLesson={idLesson}
                    toggleViewLesson={this.toggleViewLesson} errMsgAssignment={errMsg} />);

        return (
            <div className="singleItemOthers" >
                <div onClick={this.toggleViewLesson} className="noLineThree"><p style={styleP}>{title}: <span>{shortDescription}</span></p></div>
                <div onClick={this.toggleViewLesson} className="noLineThree"><img src={exampleImgOneUrl} alt="Lesson for Composition" /></div>

                {isViewingLesson ?
                    <div className="viewOneLesson" >
                        <h2>{title}</h2>
                        <div className="imgLessonWrap">
                            <img className="imgLesson" src={exampleImgOneUrl} alt="Lesson for Composition" />
                            <img className="imgLesson" src={exampleImgTwoUrl} alt="Lesson for Composition" />
                            <img className="imgLesson" src={exampleImgThreeUrl} alt="Lesson for Composition" />
                        </div>
                        <span>{instructions}</span>
                        <div style={{width:"210px", margin: "0 auto", fontSize: "1.2em"}} onClick={this.toggleViewingExamples} className="exampleStudents" to="#">View Examples from Students</div>
                        {isViewingExamples ?
                            <div className="bigViewExample" style={styleEx} >
                                <button onClick={this.toggleViewingExamples}>Close</button>
                                <div>
                                    <Examples key={idLesson} idLesson={idLesson}></Examples>
                                </div>
                            </div> : ""}
                        <Link style={{width:"190px", margin: "0 auto", textDecoration: "none"}} to={googleLink} target="_blank">Examples from the Web</Link>
                        <div>
                            <button onClick={this.toggleViewLesson}>back</button>
                            <button onClick={this.toggleViewingAssignment}>exercise</button>
                        </div>
                        {isViewingAssignment ? presentAssignment : ""}
                    </div >
                    : ""}
            </div >
        )
    }
}

function stateToProps(globalState) {
    return globalState.assignments;
}

export default connect(stateToProps, { getAssignment })(LessonDisplay);