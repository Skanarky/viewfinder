import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getLessons } from "./../../../../../redux/lessons.js";

import LessonDisplay from "./LessonDisplay/LessonDisplay.js";

class LightList extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isBelow: false
        }
        this.state = this.initialState;
    };

    toggleViewBelow = (event) => {
        this.setState({ ...this.state, isBelow: !this.state.isBelow });
    }


    componentDidMount = () => {
        const { getLessons } = this.props;
        getLessons("light");
    }

    render = () => {
        // console.log(this.props);
        const { data/*, loading, errMsg */ } = this.props;
        const { isBelow } = this.state;

        const presentLesson = data.map((lesson, i) => <LessonDisplay key={lesson._id + i}
            idLesson={lesson._id} index={i} toggleViewBelow={this.toggleViewBelow}
            {...lesson}></LessonDisplay>);

        return (
            <div style={isBelow ? { background: "rgb(128, 128, 128, .5)" } : { backgroundColor: "rgb(245, 245, 245)" }} className="lessonsView">
                <div className="topLeft"></div>
                <div className="topRight"></div>
                <div className="bottomLeft"></div>
                <div className="bottomRight"></div>
                <div className="lessonsArrangeWrap">
                    <div className="lessonsArrange">
                        <div className="navRoom">
                            <Link className="viewfinder" to="/"><span>Viewfinder</span></Link>
                            <Link className="viewfinder" to="/lessons"><span>Lessons</span></Link>
                        </div>
                        <div className="lessonsArrangeInsideLight">
                            {presentLesson}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function stateToProps(globalState) {
    return globalState.lessons;
}

export default connect(stateToProps, { getLessons })(LightList);