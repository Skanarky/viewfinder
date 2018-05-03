import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Assignment from "./Assignment/Assignment.js";
import Examples from "./Examples/Examples.js";
import { getAssignment } from "./../../../../../../redux/assignments.js";

class Composition extends React.Component {
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
        const { getAssignment, idLessonComposition/*, userId*/ } = this.props;
        getAssignment(idLessonComposition);
    }

    toggleViewLesson = (event) => {
        const { toggleViewBelow } = this.props;
        this.setState({ ...this.state, isViewingLesson: !this.state.isViewingLesson });
        toggleViewBelow();
    }

    toggleViewingExamples = (event) => {
        this.setState({ ...this.state, isViewingExamples: !this.state.isViewingExamples });
    }

    toggleViewingAssignment = (event) => {
        this.setState({ ...this.state, isViewingAssignment: !this.state.isViewingAssignment });
    }

    render = () => {
        // console.log(this.props);
        const { title, shortDescription, exampleImgOneUrl
            , exampleImgTwoUrl, exampleImgThreeUrl, instructions
            , googleLink, data, loading, errMsg, idLessonComposition } = this.props;
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
            assignment.lessonId._id === idLessonComposition)
            .map((assignment, i) =>
                <Assignment idAssignment={assignment._id} index={i}
                    key={assignment._id + i} {...assignment}
                    loadingAssignment={loading} idLessonComposition={idLessonComposition}
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
                        <div style={{width:"210px", margin: "0 auto", fontSize: "1.2em"}} onClick={this.toggleViewingExamples} className="exampleStudents" to="#">Check Examples from Students</div>
                        {isViewingExamples ?
                            <div className="bigViewExample" style={styleEx} >
                                <button onClick={this.toggleViewingExamples}>Close</button>
                                <div>
                                    <Examples key={idLessonComposition} idLessonComposition={idLessonComposition}></Examples>
                                </div>
                            </div> : ""}
                        <Link style={{width:"190px", margin: "0 auto", textDecoration: "none"}} to={googleLink} target="_blank">Examples from the Web</Link>
                        <div>
                            <button onClick={this.toggleViewLesson}>back</button>
                            <button onClick={this.toggleViewingAssignment}>exercise</button>
                            {/* <button onClick={this.toggleViewLesson}><Link to="/lessons/composition/assignment" className="noLineThree" style={{ color: "black" }}>enroll</Link></button> */}
                        </div>
                        {isViewingAssignment ? presentAssignment : ""}
                    </div >
                    : ""}

                {/* <Switch>
                    <Route path="/lessons/composition/assignment"
                        component={presentAssignment}
                    ></Route>
                </Switch> */}
            </div >
        )
    }
}

function stateToProps(globalState) {
    return globalState.assignments;
}

export default connect(stateToProps, { getAssignment })(Composition);